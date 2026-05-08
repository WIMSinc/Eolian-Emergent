import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import axios from "axios";
import SEO from "@/components/SEO";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const categoryColors = {
  Product: "text-[#FF0B1B]",
  Company: "text-blue-400",
  Operations: "text-emerald-400",
  News: "text-amber-400",
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function News() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/blog`)
      .then((res) => setPosts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div data-testid="news-page">
      <SEO
        title="News & Updates"
        description="The latest from EolianVR — product releases, ARTAK deployments, partnerships, and company milestones."
        path="/news"
      />
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#FF0B1B]" />
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Updates // News</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95]">
            News <span className="text-[#FF0B1B]">&</span> Updates
          </h1>
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            The latest from EolianVR — product releases, deployments, partnerships, and milestones.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 md:py-28 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-[#0A0A0A] p-6 animate-pulse">
                  <div className="h-48 bg-zinc-800 mb-4" />
                  <div className="h-4 bg-zinc-800 w-3/4 mb-2" />
                  <div className="h-3 bg-zinc-800 w-1/2" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-zinc-500 font-mono text-sm">No posts yet.</p>
          ) : (
            <>
              {/* Featured post (first) */}
              {posts.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={0}
                  className="mb-8"
                >
                  <Link to={`/news/${posts[0].slug}`} data-testid="featured-post" className="block group">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
                      <div className="bg-[#0A0A0A] overflow-hidden relative h-64 md:h-auto">
                        {posts[0].image && (
                          <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" loading="lazy" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0A0A]/80 md:block hidden" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent md:hidden" />
                      </div>
                      <div className="bg-[#0A0A0A] p-8 md:p-12 flex flex-col justify-center relative">
                        <div className="flex items-center gap-4 mb-4">
                          <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${categoryColors[posts[0].category] || "text-zinc-500"}`}>
                            <Tag size={10} className="inline mr-1" />{posts[0].category}
                          </span>
                          <span className="font-mono text-[10px] text-zinc-600 tracking-wider">
                            <Calendar size={10} className="inline mr-1" />{new Date(posts[0].published).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </span>
                        </div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-4 group-hover:text-[#FF0B1B] transition-colors">{posts[0].title}</h2>
                        <p className="text-sm text-zinc-400 leading-relaxed mb-6">{posts[0].excerpt}</p>
                        <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-[#FF0B1B] uppercase">
                          Read More <ArrowRight size={12} />
                        </span>
                        <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Remaining posts */}
              {posts.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
                  {posts.slice(1).map((post, i) => (
                    <motion.div
                      key={post.id}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeUp}
                    >
                      <Link to={`/news/${post.slug}`} data-testid={`news-card-${i}`} className="block bg-[#0A0A0A] group relative overflow-hidden h-full">
                        {post.image && (
                          <div className="relative h-48 overflow-hidden">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${categoryColors[post.category] || "text-zinc-500"}`}>{post.category}</span>
                            <span className="font-mono text-[10px] text-zinc-600">{new Date(post.published).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
                          </div>
                          <h3 className="font-heading text-base font-semibold text-white uppercase tracking-wide mb-2 group-hover:text-[#FF0B1B] transition-colors">{post.title}</h3>
                          <p className="text-xs text-zinc-500 leading-relaxed">{post.excerpt}</p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-0 h-px bg-[#FF0B1B] group-hover:w-full transition-all duration-700" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
