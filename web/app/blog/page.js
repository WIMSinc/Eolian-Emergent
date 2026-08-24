import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { getAllPosts, urlForImage, isSanityConfigured } from "@/lib/sanity";

export const metadata = pageMetadata({
  title: "Insights",
  description:
    "Field notes and analysis from EolianVR on immersive command and control, 3D mission planning, and AR/VR for defense and public safety.",
  path: "/blog",
});

// Rebuild the index at most once an hour so publishing in Sanity appears
// without a redeploy, while keeping the page static for almost every request.
export const revalidate = 3600;

function formatDate(value) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function Page() {
  const posts = await getAllPosts();

  const listSchema = posts.length
    ? {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "EolianVR Insights",
        url: `${SITE_URL}/blog`,
        blogPost: posts.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.publishedAt,
        })),
      }
    : null;

  return (
    <main className="pt-32 pb-24 md:pt-40">
      {listSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
        />
      )}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#FF0B1B]" />
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-400 uppercase">
            Field Notes // Insights
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-4">
          Insights
        </h1>
        <p className="text-base text-zinc-400 max-w-2xl mb-14">
          Analysis and field notes on immersive command and control, 3D mission
          planning, and where AR/VR is actually earning its place in defense and
          public safety operations.
        </p>

        {posts.length === 0 ? (
          <div className="border border-zinc-800 bg-[#0A0A0A] p-10">
            <p className="font-mono text-sm text-zinc-400">
              {isSanityConfigured
                ? "No posts published yet — check back shortly."
                : "The content workspace is not connected yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {posts.map((post) => {
              const img = urlForImage(post.coverImage, { width: 800 });
              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="bg-[#0A0A0A] group relative overflow-hidden block hover:bg-[#0D0D0D] transition-colors"
                >
                  {img && (
                    <div className="relative h-44 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={post.coverImage?.alt || post.title}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt}
                        className="font-mono text-[10px] tracking-[0.2em] text-[#FF0B1B] uppercase"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                    )}
                    <h2 className="font-heading text-base font-semibold text-white uppercase tracking-wide mt-3 mb-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-zinc-500 leading-relaxed mb-4">{post.excerpt}</p>
                    )}
                    <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-zinc-400 group-hover:text-[#FF0B1B] uppercase transition-colors">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
