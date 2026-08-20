/**
 * Local product presentation data, keyed by the SKU carried in Stripe metadata
 * (`website_sku`).
 *
 * Split of responsibility:
 *   Stripe  — price, display name, promotional features (marketing_features)
 *   here    — image, blurb, spec list, and a fallback price
 *
 * Specs mirror the Stripe product descriptions, which are the current source of
 * truth for what ships in each kit, but they are stored rather than synced so
 * the site keeps control of formatting and its own optimised images.
 *
 * `fallbackAmount` (cents) renders if /api/catalog is unreachable, so a Stripe
 * outage degrades to a possibly-stale price rather than an empty product grid.
 * Keep it in step with Stripe when prices change.
 */

export const KITS = [
  {
    sku: "KIT.01",
    fallbackName: "ARTAK UPT Kit",
    fallbackAmount: 2198900,
    image: "/artak-kit-upt.webp",
    desc: "Entry-level system for capability evaluation, proof of concept, training, and small-unit operations.",
    specs: ["2 XR HMDs", "1 Samsung Tablet", "WiFi/LTE Network Node", "Edge Server", "3-Year Software Licence"],
  },
  {
    sku: "KIT.02",
    fallbackName: "ARTAK Command Team Kit",
    fallbackAmount: 3749900,
    image: "/artak-kit-command.webp",
    desc: "Optimised for small command-element tactical planning and coordination.",
    specs: ["4 XR HMDs", "Samsung Tablet", "WiFi/LTE Network Node", "Edge Server", "3-Year Software Licence"],
  },
  {
    sku: "KIT.03",
    fallbackName: "ARTAK Squad Kit",
    fallbackAmount: 23468300,
    image: "/artak-kit-squad.webp",
    desc: "Squad-level tactical XR situational awareness and mission planning.",
    specs: ["8 XR HMDs", "Samsung Tablet", "WiFi/LTE Network Node", "Edge Server", "3-Year Software Licence"],
  },
  {
    sku: "KIT.04",
    fallbackName: "ARTAK Platoon Kit",
    fallbackAmount: 33382700,
    image: "/artak-kit-platoon.webp",
    desc: "Platoon-level tactical XR planning and mission execution.",
    specs: ["10 XR HMDs", "2 Samsung Tablets", "2 Network Nodes", "2 Edge Servers", "3-Year Software Licence"],
  },
  {
    sku: "KIT.05",
    fallbackName: "ARTAK Battalion HQ Kit",
    fallbackAmount: 58203000,
    image: "/artak-kit-battalion.webp",
    desc: "Battalion-level command and tactical XR planning.",
    specs: ["18 XR HMDs", "4 Samsung Tablets", "2 Network Nodes", "2 Edge Servers", "3-Year Software Licence"],
  },
  {
    sku: "KIT.06",
    fallbackName: "ARTAK Brigade HQ Kit",
    fallbackAmount: 84270800,
    image: "/artak-kit-brigade.webp",
    desc: "Brigade-level command, control, and tactical XR planning.",
    specs: ["40 XR HMDs", "8 Samsung Tablets", "2 Network Nodes", "2 Edge Servers", "3-Year Software Licence"],
  },
];

// One shared mark for every software card — the card title already names the
// product, so baking the name into the artwork would only duplicate it.
const SW_IMAGE = "/artak-software-card.webp";

export const SOFTWARE = [
  {
    sku: "SW.03",
    fallbackName: "ARTAK User License",
    fallbackAmount: 340000,
    image: SW_IMAGE,
    duration: "1 Year · 2 Licences",
    desc: "ARTAK front-end licence for existing hardware. Includes updates and standard support.",
  },
  {
    sku: "SW.05",
    fallbackName: "ARTAK User License x 2",
    fallbackAmount: 680000,
    image: SW_IMAGE,
    duration: "1 Year · 4 Licences",
    desc: "Double-seat bundle of the ARTAK front-end licence for existing hardware.",
  },
  {
    sku: "SW.04",
    fallbackName: "ARTAK User License (3 years)",
    fallbackAmount: 1020000,
    image: SW_IMAGE,
    duration: "3 Years",
    desc: "ARTAK front-end licence at a discounted multi-year rate.",
  },
  {
    sku: "SW.01",
    fallbackName: "ARTAK Backend Software Subscription (1 year)",
    fallbackAmount: 1500000,
    image: SW_IMAGE,
    duration: "1 Year",
    desc: "Server-side infrastructure powering ARTAK devices in the field. Required for multi-device deployments.",
  },
  {
    sku: "SW.02",
    fallbackName: "ARTAK Backend Software Subscription (3 years)",
    fallbackAmount: 4500000,
    image: SW_IMAGE,
    duration: "3 Years",
    desc: "Backend infrastructure at a discounted multi-year rate.",
  },
];

export function formatUsd(cents) {
  if (typeof cents !== "number") return "";
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

/** Merge Stripe-sourced pricing onto the local presentation rows. */
export function mergeCatalog(local, remoteBySku) {
  return local.map((row) => {
    const remote = remoteBySku[row.sku];
    return {
      ...row,
      name: remote?.name || row.fallbackName,
      amount: typeof remote?.amount === "number" ? remote.amount : row.fallbackAmount,
      features: remote?.features || [],
      live: Boolean(remote),
    };
  });
}
