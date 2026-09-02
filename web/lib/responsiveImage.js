import { IMAGE_VARIANTS } from "./imageVariants";

/**
 * Build a srcset for the hand-optimised WebP in public/.
 *
 * The card images are authored at 800–1600px and were served at that width to
 * every device, including a phone rendering them about 364px wide. PageSpeed
 * flagged ~98 KiB across three of them on mobile.
 *
 * Re-encoding was not the answer — the 800px originals came back the same size,
 * because they were already at the quality floor. The saving comes entirely
 * from serving a narrower file to a narrow viewport: the three bento images are
 * 44 KB at 400w against 122 KB at 800w.
 *
 * Widths come from lib/imageVariants.js, which the generator writes from the
 * files it actually produced. Advertising a width whose file does not exist is
 * a 404 the browser quietly papers over, so the list is never hand-maintained.
 * An image with no manifest entry returns undefined and renders from `src`
 * alone, exactly as before.
 *
 * next/image stays unadopted (CLAUDE.md §6.2): this is two extra attributes on
 * the existing <img>, not a rendering pipeline.
 */
export function srcSetFor(src) {
  const entry = IMAGE_VARIANTS[src];
  if (!entry) return undefined;
  const base = src.slice(0, -".webp".length);
  return [
    ...entry.widths.map((w) => `${base}-${w}.webp ${w}w`),
    // The original is the largest candidate rather than a re-encoded copy of
    // itself, so its true intrinsic width is what gets advertised.
    `${src} ${entry.intrinsic}w`,
  ].join(", ");
}

/**
 * Card grids here sit inside `max-w-[1400px]` with `px-6 md:px-12`, so the
 * content box tops out at 1304px and each card is a fraction of it.
 *
 * `sizes` describes the *rendered* width. The browser then applies its own
 * device pixel ratio, which is why a 2x phone may still pick the widest file.
 * That is correct, not a miss: the saving lands on 1x displays and on desktop,
 * where the rendered width is genuinely far below the source.
 */
export const CARD_SIZES = {
  // ProductSection: one per row on mobile, roughly half the grid from md up.
  bento: "(min-width: 1400px) 700px, (min-width: 768px) 50vw, 100vw",
  // UseCasesSection: 1 / 2 / 3 columns.
  useCase:
    "(min-width: 1400px) 430px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
};
