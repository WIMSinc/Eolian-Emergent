/**
 * Honeypot verdict, shared by the three form routes.
 *
 * Exists because the honeypot ate real submissions twice on 2026-09-17. The
 * hidden field is the first input in each form, so Chrome groups it with the
 * address fields, fails to classify it, and fills it from the visitor's
 * contact profile — the logged value was literally "EolianVR, Inc.". Renaming
 * the field from `website` to `_hp` did not help, because Chrome's autofill
 * uses structural position, not the name attribute.
 *
 * Two defences, in this order:
 *
 *   1. The input is `readOnly` in the markup. Chrome and password managers
 *      skip readonly fields entirely, which stops the problem at source. A
 *      naive bot setting `.value` or POSTing the field directly is unaffected,
 *      so the trap still works on what it is meant to catch.
 *
 *   2. This function. If the hidden value merely repeats something the visitor
 *      typed in a visible field, that is autofill and not a bot — a spammer
 *      fills a honeypot with a URL or a payload, not with a copy of the
 *      organisation name they just entered.
 *
 * The bias is deliberate: **fail open for humans.** A bot that slips through
 * still has to clear server-side reCAPTCHA v3 at score >= 0.5, whereas a
 * discarded customer is gone with no trace and no complaint.
 */
function honeypotVerdict({ hp, fields = {}, route, userAgent }) {
  if (!hp) return { bot: false };

  const value = String(hp).trim().toLowerCase();
  const typed = Object.values(fields)
    .filter(Boolean)
    .map((v) => String(v).trim().toLowerCase());

  if (typed.includes(value)) {
    console.warn(
      "Honeypot matched a visible field — treated as autofill, submission ALLOWED",
      { route, hp: String(hp).slice(0, 80), ua: userAgent },
    );
    return { bot: false, autofill: true };
  }

  console.warn("Honeypot triggered — submission discarded", {
    route,
    hp: String(hp).slice(0, 80),
    ua: userAgent,
  });
  return { bot: true };
}

module.exports = { honeypotVerdict };
