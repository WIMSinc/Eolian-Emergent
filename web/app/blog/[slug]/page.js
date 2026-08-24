import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import { pageMetadata, blogPostingSchema, faqSchema } from "@/lib/seo";
import { getPostBySlug, getPostSlugs, urlForImage, readingTime } from "@/lib/sanity";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: urlForImage(post.coverImage, { width: 1200 }) || undefined,
    path: `/blog/${slug}`,
    type: "article",
  });
}

// Renders Portable Text with the site's existing type scale rather than
// relying on a prose plugin, so posts match the rest of the site exactly.
const components = {
  block: {
    normal: ({ children }) => (
      <p className="text-base text-zinc-400 leading-relaxed mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-lg font-semibold text-white mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#FF0B1B] pl-5 my-8 text-zinc-300 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-5 mb-6 space-y-2 text-zinc-400">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-5 mb-6 space-y-2 text-zinc-400">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const external = /^https?:\/\//.test(href) && !href.includes("eolianvr.com");
      return (
        <a
          href={href}
          className="text-[#FF0B1B] hover:text-white underline transition-colors"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = urlForImage(value, { width: 1400 });
      if (!src) return null;
      return (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={value.alt || ""} className="w-full border border-zinc-800" />
          {value.caption && (
            <figcaption className="mt-3 font-mono text-[11px] text-zinc-600">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const cover = urlForImage(post.coverImage, { width: 1400 });
  const mins = readingTime(post.body);

  const schemas = [
    blogPostingSchema({
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      image: urlForImage(post.coverImage, { width: 1200 }) || undefined,
      slug,
      published: post.publishedAt,
      modified: post._updatedAt,
    }),
  ];
  // Posts can carry their own Q&A, which is the strongest AEO signal available
  // on an article — answer engines quote these directly.
  if (post.faqs?.length) {
    schemas.push(faqSchema(post.faqs.filter((f) => f.question && f.answer)));
  }

  return (
    <main className="pt-32 pb-24 md:pt-40">
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <article className="max-w-3xl mx-auto px-6 md:px-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-zinc-400 hover:text-white uppercase mb-10"
        >
          <ArrowLeft size={12} /> All Insights
        </Link>

        <div className="flex items-center gap-4 mb-5 font-mono text-[10px] tracking-[0.2em] uppercase">
          {post.publishedAt && (
            <time dateTime={post.publishedAt} className="text-[#FF0B1B]">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </time>
          )}
          {mins && <span className="text-zinc-600">{mins} min read</span>}
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">{post.excerpt}</p>
        )}

        {cover && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={cover}
            alt={post.coverImage?.alt || post.title}
            className="w-full mt-10 border border-zinc-800"
          />
        )}

        <div className="mt-12 border-t border-zinc-800 pt-10">
          {post.body ? (
            <PortableText value={post.body} components={components} />
          ) : (
            <p className="text-zinc-500">This post has no content yet.</p>
          )}
        </div>

        {post.faqs?.length > 0 && (
          <section className="mt-16 border-t border-zinc-800 pt-10">
            <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-6">
              Common Questions
            </h2>
            <dl className="space-y-6">
              {post.faqs.map((f, i) => (
                <div key={i}>
                  <dt className="font-heading text-base font-semibold text-white mb-2">
                    {f.question}
                  </dt>
                  <dd className="text-sm text-zinc-400 leading-relaxed">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {post.tags?.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] tracking-[0.15em] uppercase text-zinc-500 border border-zinc-800 px-3 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
