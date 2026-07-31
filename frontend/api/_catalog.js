/**
 * Server-authoritative product catalog.
 *
 * The browser only ever sends a SKU. Every amount used to charge a card or
 * draft an invoice is read from this file — never from the request body — so
 * a tampered client cannot buy an $842,708 kit for $1.
 *
 * Amounts are in cents (USD), matching Stripe's smallest-currency-unit
 * convention. Keep these in sync with the display prices in
 * src/components/KitsSoftwareSection.jsx; the values there are cosmetic.
 */

const CATALOG = {
  // Hardware kits — quote/invoice flow only. Too large for card payment, and
  // defense procurement runs on POs and wire/ACH rather than self-serve checkout.
  "KIT.01": { name: "ARTAK UPT Kit", type: "kit", amount: 2198900 },
  "KIT.02": { name: "ARTAK Command Team Kit", type: "kit", amount: 3749900 },
  "KIT.03": { name: "ARTAK Squad Kit", type: "kit", amount: 23468300 },
  "KIT.04": { name: "ARTAK Platoon Kit", type: "kit", amount: 33382700 },
  "KIT.05": { name: "ARTAK Battalion HQ Kit", type: "kit", amount: 58203000 },
  "KIT.06": { name: "ARTAK Brigade HQ Kit", type: "kit", amount: 84270800 },

  // Software subscriptions — self-serve Checkout. Priced inline via price_data
  // so no pre-created Stripe Products are required to go live.
  "SW.01": {
    name: "ARTAK Backend Software Subscription — 1 Year",
    type: "software",
    amount: 1500000,
    interval: "year",
    intervalCount: 1,
  },
  "SW.02": {
    name: "ARTAK Backend Software Subscription — 3 Years",
    type: "software",
    amount: 4500000,
    interval: "year",
    intervalCount: 3,
  },
  "SW.03": {
    name: "ARTAK Software Subscription — 1 Year",
    type: "software",
    amount: 340000,
    interval: "year",
    intervalCount: 1,
  },
  "SW.04": {
    name: "ARTAK Software Subscription — 3 Years",
    type: "software",
    amount: 1020000,
    interval: "year",
    intervalCount: 3,
  },
};

function getItem(sku, expectedType) {
  const item = CATALOG[sku];
  if (!item) return null;
  if (expectedType && item.type !== expectedType) return null;
  return { sku, ...item };
}

function formatUsd(cents) {
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

module.exports = { CATALOG, getItem, formatUsd };
