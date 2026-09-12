import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { pageMetadata, personSchema } from "@/lib/seo";
import { AUTHORS, AUTHOR_SLUGS } from "@/data/team";
import { getAllPosts } from "@/lib/sanity";

/**
 * Author page.
 *
 * This is the destination a byline needs in order to be worth anything. A
 * post credited to a name that resolves nowhere asserts no more than one
 * credited to the company; the credential signal comes from the name pointing
 * at a page that states who the person is, what they work on, and what they
 * have written.
 *
 * Server-rendered with no "use client", so the bio and the post list are in
 * the raw HTML that non-JS crawlers read (CLAUDE.md §3, AEO rules).
 */
export const revalidate = 3600;

export function generateStaticParams() {
  return AUTHOR_SLUGS.map((slug) => ({ slug }));
}

// Only the slugs above exist. Anything else is a 404 rather than an
// on-demand render of an empty profile.
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = AUTHORS[slug];
  if (!author) return pageMetadata({ title: "Author", path: `/team/${slug}` });
  return pageMetadata({
    title: `${author.name} — ${author.title}`,
    description: author.bio?.[0],
    path: `/team/${slug}`,
    type: "profile",
  });
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = AUTHORS[slug];
  if (!author) notFound();

  // getAllPosts degrades to [] when Sanity is unreachable, so the page still
  // renders the bio and credentials during a CMS outage.
  const all = await getAllPosts();
  const posts = all.filter((p) => (p.authorSlug || "mike-simmons") === slug);

  // Entries need a title and a URL to be worth rendering; a half-filled one is
  // dropped rather than shown as a dead link.
  const external = (author.elsewhere || []).filter((e) => e.url && e.title);
  const interviews = external.filter((e) => e.kind === "interview");
  const writing = external.filter((e) => e.kind === "writing");

  return (
    <main className="pt-32 pb-24 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(author)) }}
      />

      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-zinc-400 hover:text-white uppercase mb-10"
        >
          <ArrowLeft size={12} /> The Team
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#FF0B1B]" />
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
            People // Author
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white leading-[0.95]">
          {author.name}
        </h1>
        <p className="mt-3 font-mono text-xs tracking-[0.2em] text-[#FF0B1B] uppercase">
          {author.title}
        </p>

        <div className="mt-8 space-y-5">
          {author.bio?.map((para) => (
            <p key={para.slice(0, 40)} className="text-base text-zinc-400 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {author.knowsAbout?.length > 0 && (
          <section className="mt-10 border-t border-zinc-800 pt-8">
            <h2 className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase mb-4">
              Writes about
            </h2>
            <ul className="flex flex-wrap gap-2">
              {author.knowsAbout.map((topic) => (
                <li
                  key={topic}
                  className="font-mono text-[10px] tracking-[0.15em] text-zinc-400 uppercase border border-zinc-800 px-3 py-1.5"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Interviews and bylined work published elsewhere. Third-party
            corroboration is the hardest part of an author profile to fake, so
            it carries the most weight — but the section stays hidden until
            there is something real to put in it. */}
        {interviews.length + writing.length > 0 && (
          <section className="mt-10 border-t border-zinc-800 pt-8">
            <h2 className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase mb-4">
              Elsewhere
            </h2>
            {[
              ["Interviews & appearances", interviews],
              ["Published writing", writing],
            ].map(([label, items]) =>
              items.length ? (
                <div key={label} className="mb-6 last:mb-0">
                  <h3 className="font-mono text-[10px] tracking-[0.15em] text-zinc-600 uppercase mb-3">
                    {label}
                  </h3>
                  <ul className="space-y-3">
                    {items.map((e) => (
                      <li key={e.url}>
                        <a
                          href={e.url}
                          rel="noopener noreferrer"
                          target="_blank"
                          className="text-sm text-zinc-300 hover:text-[#FF0B1B] transition-colors"
                        >
                          {e.title}
                        </a>
                        {(e.publisher || e.date) && (
                          <span className="block font-mono text-[10px] text-zinc-600 tracking-wider uppercase mt-1">
                            {[e.publisher, e.date?.slice(0, 4)].filter(Boolean).join(" · ")}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null,
            )}
          </section>
        )}

        <section className="mt-10 border-t border-zinc-800 pt-8">
          <h2 className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase mb-4">
            Contact
          </h2>
          <ul className="space-y-2">
            {author.email && (
              <li>
                <a
                  href={`mailto:${author.email}`}
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#FF0B1B] transition-colors"
                >
                  <Mail size={14} /> {author.email}
                </a>
              </li>
            )}
            {author.sameAs?.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  rel="noopener noreferrer me"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#FF0B1B] transition-colors"
                >
                  {url.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {posts.length > 0 && (
          <section className="mt-12 border-t border-zinc-800 pt-10">
            <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-6">
              Posts by {author.name}
            </h2>
            <ul className="space-y-px bg-zinc-800">
              {posts.map((post) => (
                <li key={post._id} className="bg-[#0A0A0A]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block p-6 group hover:bg-[#0D0D0D] transition-colors"
                  >
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt}
                        className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase"
                      >
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          timeZone: "UTC",
                        })}
                      </time>
                    )}
                    <h3 className="font-heading text-base font-semibold text-white uppercase tracking-wide mt-2 mb-2 group-hover:text-[#FF0B1B] transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-zinc-500 leading-relaxed">{post.excerpt}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 border-t border-zinc-800 pt-8">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-[#FF0B1B] uppercase hover:gap-3 transition-all"
          >
            Get in touch <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </main>
  );
}
