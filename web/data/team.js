/**
 * Leadership, and the subset of it that writes for the site.
 *
 * One array rather than two, because a name or title stored in two places
 * eventually disagrees with itself — and this exact failure already happened
 * here: /team said "Co-Founder & CMO" while CLAUDE.md §2 and the Block 3
 * newsletter signature both said COO. /team, the author pages and the Person
 * JSON-LD now all read from this file, so the three cannot drift again.
 *
 * A member with an `author` block gets a page at /team/<slug> and can be
 * credited on a post. Everyone else renders as a card and nothing more.
 */
export const TEAM = [
  { name: "Michael McCormack", title: "Co-Founder & CEO" },
  {
    name: "Mike Simmons",
    title: "Co-Founder & COO",
    slug: "mike-simmons",
    author: {
      // Byline shown on posts. Shorter than `title` on purpose — a byline is
      // read in passing, the full title belongs on the author page.
      byline: "Co-Founder & COO",
      email: "mike@eolianvr.com",
      // Kept to what is verifiable. Anything about career history before
      // EolianVR would be invention, and an author bio is exactly the wrong
      // place to guess — it is the page asserting that the author is credible.
      bio: [
        "Mike Simmons is a co-founder and the Chief Operating Officer of EolianVR, Inc., the defense technology company behind ARTAK — the Augmented Reality Team Awareness Kit used for multi-domain mission planning and command and control.",
        "Since EolianVR was founded in 2016, the company has delivered ARTAK across most components of USSOCOM as well as the Army, Marine Corps, Air Force, NATO SOF, DIU and DHS. Mike leads operations and is the direct point of contact for units, contracting officers and partners evaluating ARTAK.",
      ],
      // What this author is credibly an authority on. Feeds Person.knowsAbout,
      // which is how an answer engine decides whose byline to weight on a
      // subject.
      knowsAbout: [
        "Mission planning",
        "Command and control",
        "Augmented reality for defense",
        "Defense acquisition",
        "Simplified Acquisition Procedures",
        "Small business contracting",
      ],
      // Profile URLs for Person.sameAs — the strongest single signal that a
      // byline belongs to a real, findable person. EMPTY ON PURPOSE: the
      // correct URLs are not knowable from this repo, and a guessed profile
      // link is worse than none. Add the real LinkedIn URL here and the schema
      // picks it up with no other change.
      sameAs: [],
    },
  },
  { name: "John Cannizzaro", title: "Co-Founder & CBDO" },
  { name: "Michael Havenick", title: "Co-Founder" },
  { name: "Pablo Lopez", title: "Chief Financial Officer" },
  { name: "Shaun Kelley", title: "Information Security Officer" },
];

/** Members who can be credited on a post, keyed by slug. */
export const AUTHORS = Object.fromEntries(
  TEAM.filter((m) => m.author && m.slug).map((m) => [
    m.slug,
    { slug: m.slug, name: m.name, title: m.title, ...m.author },
  ]),
);

export const AUTHOR_SLUGS = Object.keys(AUTHORS);

/** Credited on any post that does not name an author — every post today. */
export const DEFAULT_AUTHOR_SLUG = "mike-simmons";

/**
 * Resolve a post's author key.
 *
 * Falls back to the default rather than returning null, so a post imported
 * without an author still carries a byline instead of silently reverting to
 * the old Organization-as-author behaviour.
 */
export function getAuthor(slug) {
  return AUTHORS[slug] || AUTHORS[DEFAULT_AUTHOR_SLUG] || null;
}
