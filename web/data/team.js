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
      // Deliberately EolianVR-only. The source bio also covers WIMS, Lumint
      // Power Solar and a prior consulting career; those are left out by
      // request, so this page reads as an author profile for the person who
      // writes about mission planning rather than a general CV.
      //
      // The customer naming here is NARROWER than the site's own approved list,
      // on purpose: USSOCOM and DIU on the government side, plus the two
      // healthcare engagements. Army, Marine Corps, Air Force, NATO SOF, DHS
      // and the Booz Allen / MITRE teaming are all approved and published
      // elsewhere on this site but were dropped from this page by request — do
      // not add them back as a completeness fix.
      bio: [
        "Mike Simmons is a co-founder and the Chief Operating Officer of EolianVR, Inc., the defense technology company behind ARTAK \u2014 the Augmented Reality Team Awareness Kit, a mixed-reality platform for multi-domain mission planning, command and control, and situational awareness.",
        "Mike leads operations at EolianVR and is the direct point of contact for units, contracting officers and partners evaluating ARTAK. He writes the company's field notes on immersive mission planning, command and control, and the acquisition side of getting software into the hands of a unit that wants it.",
        "EolianVR was founded in 2016 and is based in Largo, Florida. Its technology is built on a patented simulation platform, U.S. Patent No. 11,297,164 B2. ARTAK has been fielded across most components of USSOCOM since 2022 and the company works with the Defense Innovation Unit; earlier Eolian engagements include Mayo Clinic and Atrium Health on the healthcare side.",
        "EolianVR has received $18M in Department of Defense funding to date, including a $5M FY26 congressional appropriation that Mike played a central role in securing, and was one of ten companies selected for the USSOCOM-nominated APFIT Production OTA.",
        "EolianVR is a small business and a nontraditional defense contractor under 10 U.S.C. \u00a7 3014. Mike holds dual bachelor's degrees in Marketing and Finance, with a minor in Advertising, from the University of Miami.",
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
      // byline belongs to a real, findable person. Add profiles here as they
      // are confirmed; never guess a URL, since a sameAs pointing at the wrong
      // person is worse than an absent one.
      sameAs: ["https://www.linkedin.com/in/mikesimmons305/"],

      // Headshot for Person.image, served from public/.
      //
      // Converted from the uploaded "Mike Simmons Headshot.jpg" (4850×4850,
      // 9.9 MB) down to 640×640 / 14 KB — the page renders it at 112px, so the
      // source was ~700× larger than anything a visitor needs. A space in a
      // filename
      // means every reference needs %20, and a .jpg misses the immutable cache
      // rule in next.config.mjs, which matches /:file*.webp only. The -v1
      // suffix is the §6.3 rule: these are served immutable for a year, so a
      // replacement photo must be -v2, never a re-encode over this name.
      image: "/mike-simmons-v1.webp",

      // Interviews, podcast appearances and bylined work published elsewhere.
      //
      // `kind` decides both how it renders and what it means in schema:
      //   "interview" — Mike is the subject: a work genuinely about him.
      //                 Emitted as Person.subjectOf.
      //   "writing"   — Mike wrote it, published under someone else's masthead.
      //   "press"     — coverage of the company that quotes or mentions him.
      //
      // Only "interview" earns a schema property. subjectOf asserts the work
      // is about *this person*, which is true of an interview and false of a
      // news story about the company, so press and writing render as links and
      // claim nothing. Schema.org has no accurate property for "authored a
      // work hosted elsewhere" either, and a stretched one would assert
      // something untrue.
      //
      // Third-party corroboration is the part of an author profile that is
      // hardest to fake and therefore weighted most, so this list is worth
      // filling out properly. Empty entries are skipped; the section does not
      // render until there is at least one.
      //
      // The ClearanceJobs headline names a contract value that appears nowhere
      // else on this site. It is cited as a third-party headline, never
      // restated as our own claim, on the strength of the ruling recorded in
      // CLAUDE.md §3.1 — do not lift the figure into body copy without a
      // fresh one.
      elsewhere: [
        {
          kind: "interview",
          title: "EolianVR's Michael Simmons on Revolutionizing Military Mission Planning with AR/VR",
          publisher: "RADICL — Episode 48",
          url: "https://radicl.com/resources/michael-simmons-revolutionizing-military-planning-ar-vr",
        },
        {
          kind: "interview",
          // The episode title is the publisher's headline grab. Those units
          // are one part of USSOCOM among many, so "most components of
          // USSOCOM" stays the phrasing wherever the site speaks for itself —
          // this title is quoted, never paraphrased into our own copy.
          title: "Michael Simmons: \"I Refinanced My House to Build Tech for Navy SEALs\"",
          publisher: "Last Week In D.C.",
          url: "https://youtu.be/a1p_XHvCwcM",
        },
        {
          kind: "interview",
          title: "The Best Kept Secret Backdoor To Influence",
          publisher: "B2B Community Builder Show — Episode 103",
          url: "https://podcasts.apple.com/us/podcast/103-the-best-kept-secret-backdoor-to-influence-w-mike/id1489534133?i=1000519918352",
        },
        {
          // This is the APFIT Production OTA with USSOCOM S&T that
          // /about/awards and /about/past-performance already describe, not a
          // separate contract. Several outlets ran the release; swap the URL
          // for a larger-readership one once it is identified.
          kind: "press",
          title: "Eolian VR Inc. Wins $9.9M Contract to Provide USSOCOM with Augmented and Virtual Reality Systems",
          publisher: "ClearanceJobs",
          url: "https://news.clearancejobs.com/2022/11/08/eolian-vr-inc-wins-9-9m-contract-to-provide-ussocom-with-augmented-and-virtual-reality-systems/",
          date: "2022-11-08",
        },
        {
          kind: "writing",
          title: "Eolian Signs New Information Exchange Agreement with the US Department of Defense for Technology Innovation",
          publisher: "PRLog",
          url: "https://www.prlog.org/13085446-eolian-signs-new-information-exchange-agreement-with-the-us-department-of-defense-for-technology-innovation.html",
        },
      ],
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
