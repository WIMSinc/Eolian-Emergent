/**
 * Server-side submission to HubSpot Forms.
 *
 * Why this exists: every form on the site posts to an API route that sends an
 * email and nothing else. The only thing putting those people into the CRM was
 * Collected Forms — a client script that scrapes the DOM — so a visitor with an
 * ad blocker, a hardened browser or a managed corporate laptop submitted the
 * form, we received the email, and HubSpot received nothing. That population is
 * a large share of a defense audience. Submitting from the server cannot be
 * blocked, because it never touches the visitor's browser.
 *
 * The Forms API rather than the CRM contacts API, deliberately:
 *   - No credential. The submission endpoint is authenticated by the form GUID
 *     alone, so there is no private app token to store, rotate, or leak.
 *   - Submissions land as real form submissions, so HubSpot workflows,
 *     notifications and form analytics all fire as they would natively.
 *   - Passing the visitor's hubspotutk cookie keeps the submission attached to
 *     their tracking session, which preserves original-source attribution.
 *
 * Nothing HubSpot renders is involved. The HubSpot form is a schema and a
 * destination; the visitor only ever sees the site's own markup.
 */

const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID || "19544401";
const SUBMIT_TIMEOUT_MS = 4000;

/**
 * Convert a flat object into the fields array the Forms API expects, dropping
 * anything empty. HubSpot rejects a submission that names a field the form does
 * not define, so only send what was actually filled in.
 */
function toFields(values) {
  return Object.entries(values)
    .filter(([, value]) => value !== undefined && value !== null && `${value}`.trim() !== "")
    .map(([name, value]) => ({ name, value: `${value}`.trim() }));
}

/**
 * Submit to a HubSpot form.
 *
 * Returns a result rather than throwing. The email send is the path the user
 * is actually waiting on, and a CRM write failing is not a reason to tell
 * someone their message did not go through — so callers log this and carry on.
 *
 * A missing formGuid is a no-op, which keeps the site working in any
 * environment where the variable is not set, the same way lib/sanity.js
 * degrades to empty rather than failing a build.
 */
async function submitToHubSpotForm({
  formGuid,
  values,
  hutk,
  pageUri,
  pageName,
}) {
  if (!formGuid) return { skipped: true, reason: "no form GUID configured" };

  const body = {
    fields: toFields(values),
    context: {
      // Ties the submission to the visitor's tracking cookie so HubSpot keeps
      // original source, first touch and session history intact. Absent when
      // the tracking script has not loaded yet, which is allowed.
      ...(hutk ? { hutk } : {}),
      ...(pageUri ? { pageUri } : {}),
      ...(pageName ? { pageName } : {}),
    },
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${formGuid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      },
    );

    if (!res.ok) {
      // HubSpot returns a descriptive body on 400 — usually a field the form
      // does not define. Worth surfacing in logs, since it is silent otherwise.
      const detail = await res.text().catch(() => "");
      return { ok: false, status: res.status, detail: detail.slice(0, 500) };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err?.name === "AbortError" ? "timeout" : err?.message };
  } finally {
    clearTimeout(timer);
  }
}

/** Read the HubSpot tracking cookie from a Next API request. */
function getHutk(req) {
  return req.cookies?.hubspotutk || undefined;
}

const FORM_GUIDS = {
  contact: process.env.HUBSPOT_CONTACT_FORM_GUID,
  catalog: process.env.HUBSPOT_CATALOG_FORM_GUID,
  kitQuote: process.env.HUBSPOT_KIT_QUOTE_FORM_GUID,
};

// CommonJS to match lib/catalog.js — the libraries consumed by pages/api are
// required, not imported, and mixing the two module systems in one route is
// not worth the interop risk.
module.exports = { submitToHubSpotForm, getHutk, FORM_GUIDS };
