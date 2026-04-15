import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const categoryColors = {
  Product: "text-[#FF0B1B]",
  Company: "text-blue-400",
  Operations: "text-emerald-400",
  News: "text-amber-400",
};

export default function NewsPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/blog/${slug}`)
      .then((res) => setPost(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (notFound) return <Navigate to="/news" replace />;

  if (loading) {
    return (
      <div className="pt-40 pb-20 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-zinc-800 w-1/3" />
          <div className="h-10 bg-zinc-800 w-2/3" />
          <div className="h-64 bg-zinc-800 mt-8" />
        </div>
      </div>
    );
  }

  return (
    <div data-testid="news-post-page">
      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 tactical-grid opacity-20" />
        {post.image && (
          <div className="absolute inset-0 z-0">
            <img src={post.image} alt="" className="w-full h-full object-cover opacity-10 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/90 to-[#050505]" />
          </div>
        )}
        <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12">
          <Link to="/news" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-zinc-600 hover:text-white transition-colors uppercase mb-6">
            <ArrowLeft size={12} /> Back to News
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${categoryColors[post.category] || "text-zinc-500"}`}>
              <Tag size={10} className="inline mr-1" />{post.category}
            </span>
            <span className="font-mono text-[10px] text-zinc-600 tracking-wider">
              <Calendar size={10} className="inline mr-1" />{new Date(post.published).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white leading-[0.95]">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 border-t border-zinc-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[900px] mx-auto px-6 md:px-12"
        >
          {post.image && (
            <div className="mb-10 overflow-hidden border border-zinc-800">
              <img src={post.image} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
            </div>
          )}
          <div className="prose-invert max-w-none">
            {post.content.trim().startsWith("<") ? (
              <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              post.content.split("\n\n").map((para, i) => (
                <p key={i} className="text-base text-zinc-400 leading-relaxed mb-6">{para}</p>
              ))
            )}
          </div>
        </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 border-t border-zinc-800">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/news" data-testid="post-back-link" className="inline-flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-wider">
            <ArrowLeft size={14} /> All News
          </Link>
          <Link to="/#contact" data-testid="post-contact-cta" className="inline-flex items-center gap-2 font-mono text-xs text-[#FF0B1B] hover:text-white transition-colors uppercase tracking-wider">
            Contact Us <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
