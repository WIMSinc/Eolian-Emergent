import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText, Mail, Plus, Pencil, Trash2, LogOut, Save, X, Eye, Calendar, Tag,
} from "lucide-react";
import axios from "axios";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

function getAuthHeader() {
  const token = sessionStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const CATEGORIES = ["Product", "Company", "Operations", "News"];

// ─── Post Form ──────────────────────────────────────────

function PostForm({ post, onSave, onCancel, saving }) {
  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    category: post?.category || "News",
    image: post?.image || "",
  });

  const handleTitleChange = (val) => {
    setForm((f) => ({
      ...f,
      title: val,
      slug: post ? f.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    }));
  };

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ header: [2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "link", "image"],
      ["clean"],
    ],
  }), []);

  const inputCls = "w-full bg-transparent border border-zinc-800 py-2.5 px-3 text-sm text-white font-mono placeholder:text-zinc-700 focus:border-[#FF0B1B] focus:outline-none transition-colors";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-1.5">Title *</label>
          <input data-testid="post-form-title" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required className={inputCls} placeholder="Post title" />
        </div>
        <div>
          <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-1.5">Slug *</label>
          <input data-testid="post-form-slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required className={inputCls} placeholder="url-friendly-slug" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-1.5">Category</label>
          <select data-testid="post-form-category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={`${inputCls} bg-[#050505]`}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-1.5">Image URL</label>
          <input data-testid="post-form-image" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputCls} placeholder="https://..." />
        </div>
      </div>
      <div>
        <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-1.5">Excerpt *</label>
        <textarea data-testid="post-form-excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required rows={2} className={`${inputCls} resize-none`} placeholder="Brief summary..." />
      </div>
      <div>
        <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-1.5">Content *</label>
        <div className="quill-dark-wrapper" data-testid="post-form-content-editor">
          <ReactQuill
            theme="snow"
            value={form.content}
            onChange={(val) => setForm({ ...form, content: val })}
            modules={quillModules}
            placeholder="Write your post content..."
          />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button data-testid="post-form-save" onClick={() => onSave(form)} disabled={saving || !form.title || !form.slug || !form.excerpt || !form.content || form.content === "<p><br></p>"} className="flex items-center gap-2 bg-[#FF0B1B] text-white font-mono uppercase text-xs tracking-widest px-6 py-3 hover:bg-[#D90412] transition-colors disabled:opacity-40">
          <Save size={14} /> {saving ? "Saving..." : post ? "Update" : "Publish"}
        </button>
        <button data-testid="post-form-cancel" onClick={onCancel} className="flex items-center gap-2 bg-transparent text-zinc-500 border border-zinc-800 font-mono uppercase text-xs tracking-widest px-6 py-3 hover:text-white hover:border-zinc-600 transition-colors">
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────

export default function AdminDashboard() {
  const [tab, setTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null); // null=list, "new"=create, post obj=edit
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/blog`);
      setPosts(data);
    } catch { /* empty */ }
  }, []);

  const fetchContacts = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/admin/contacts`, { headers: getAuthHeader() });
      setContacts(data);
    } catch { /* empty */ }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    const u = sessionStorage.getItem("admin_user");
    if (!token) { navigate("/admin"); return; }
    setUser(u ? JSON.parse(u) : null);
    Promise.all([fetchPosts(), fetchContacts()]).finally(() => setLoading(false));
  }, [navigate, fetchPosts, fetchContacts]);

  const logout = () => {
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_user");
    navigate("/admin");
  };

  const handleSavePost = async (form) => {
    setSaving(true);
    try {
      if (editingPost && editingPost !== "new") {
        await axios.put(`${API}/admin/blog/${editingPost.id}`, form, { headers: getAuthHeader() });
      } else {
        await axios.post(`${API}/admin/blog`, form, { headers: getAuthHeader() });
      }
      await fetchPosts();
      setEditingPost(null);
    } catch (err) {
      alert(err.response?.data?.detail || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (post) => {
    if (!window.confirm(`Delete "${post.title}"?`)) return;
    try {
      await axios.delete(`${API}/admin/blog/${post.id}`, { headers: getAuthHeader() });
      await fetchPosts();
    } catch (err) {
      alert(err.response?.data?.detail || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="pt-32 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-zinc-800 w-1/4" />
          <div className="h-64 bg-zinc-800" />
        </div>
      </div>
    );
  }

  return (
    <div data-testid="admin-dashboard" className="pt-24 pb-20 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-[#FF0B1B] animate-pulse" />
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
                Admin // {user?.email}
              </span>
            </div>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-white">Dashboard</h1>
          </div>
          <button data-testid="admin-logout" onClick={logout} className="flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-white transition-colors uppercase tracking-wider border border-zinc-800 px-4 py-2 hover:border-zinc-600">
            <LogOut size={14} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-zinc-800 mb-8">
          {[
            { id: "posts", label: "Blog Posts", icon: FileText, count: posts.length },
            { id: "contacts", label: "Contact Submissions", icon: Mail, count: contacts.length },
          ].map((t) => (
            <button
              key={t.id}
              data-testid={`tab-${t.id}`}
              onClick={() => { setTab(t.id); setEditingPost(null); }}
              className={`flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase px-6 py-3 border-b-2 transition-colors ${
                tab === t.id ? "border-[#FF0B1B] text-white" : "border-transparent text-zinc-600 hover:text-zinc-400"
              }`}
            >
              <t.icon size={14} /> {t.label}
              <span className={`ml-1 text-[10px] ${tab === t.id ? "text-[#FF0B1B]" : "text-zinc-700"}`}>({t.count})</span>
            </button>
          ))}
        </div>

        {/* ─── Posts Tab ─── */}
        {tab === "posts" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {editingPost ? (
              <div className="bg-[#0A0A0A] border border-zinc-800 p-6 md:p-8">
                <h2 className="font-heading text-lg font-bold uppercase text-white mb-6">
                  {editingPost === "new" ? "New Post" : "Edit Post"}
                </h2>
                <PostForm
                  post={editingPost === "new" ? null : editingPost}
                  onSave={handleSavePost}
                  onCancel={() => setEditingPost(null)}
                  saving={saving}
                />
              </div>
            ) : (
              <>
                <div className="flex justify-end mb-4">
                  <button data-testid="new-post-btn" onClick={() => setEditingPost("new")} className="flex items-center gap-2 bg-[#FF0B1B] text-white font-mono uppercase text-xs tracking-widest px-6 py-3 hover:bg-[#D90412] transition-colors">
                    <Plus size={14} /> New Post
                  </button>
                </div>
                <div className="border border-zinc-800">
                  {/* Table header */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#0A0A0A] border-b border-zinc-800 font-mono text-[10px] tracking-[0.15em] text-zinc-500 uppercase">
                    <div className="col-span-5">Title</div>
                    <div className="col-span-2">Category</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-3 text-right">Actions</div>
                  </div>
                  {posts.length === 0 ? (
                    <div className="px-4 py-8 text-center text-zinc-600 font-mono text-sm">No posts yet</div>
                  ) : (
                    posts.map((post, i) => (
                      <div key={post.id} data-testid={`admin-post-row-${i}`} className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 items-center hover:bg-[#0A0A0A] transition-colors">
                        <div className="col-span-5">
                          <p className="text-sm text-white truncate font-medium">{post.title}</p>
                          <p className="text-[10px] text-zinc-600 font-mono truncate mt-0.5">/{post.slug}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase flex items-center gap-1">
                            <Tag size={10} /> {post.category}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="font-mono text-[10px] text-zinc-600 flex items-center gap-1">
                            <Calendar size={10} /> {new Date(post.published).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>
                        <div className="col-span-3 flex justify-end gap-2">
                          <a href={`/news/${post.slug}`} target="_blank" rel="noreferrer" data-testid={`view-post-${i}`} className="w-8 h-8 border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-white hover:border-zinc-600 transition-colors">
                            <Eye size={14} />
                          </a>
                          <button data-testid={`edit-post-${i}`} onClick={() => setEditingPost(post)} className="w-8 h-8 border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-[#FF0B1B] hover:border-[#FF0B1B] transition-colors">
                            <Pencil size={14} />
                          </button>
                          <button data-testid={`delete-post-${i}`} onClick={() => handleDeletePost(post)} className="w-8 h-8 border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-[#FF0B1B] hover:border-[#FF0B1B] transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* ─── Contacts Tab ─── */}
        {tab === "contacts" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="border border-zinc-800">
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#0A0A0A] border-b border-zinc-800 font-mono text-[10px] tracking-[0.15em] text-zinc-500 uppercase">
                <div className="col-span-2">Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Organization</div>
                <div className="col-span-3">Message</div>
                <div className="col-span-2">Date</div>
              </div>
              {contacts.length === 0 ? (
                <div className="px-4 py-8 text-center text-zinc-600 font-mono text-sm">No submissions yet</div>
              ) : (
                contacts.map((c, i) => (
                  <div key={c.id} data-testid={`contact-row-${i}`} className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 items-start hover:bg-[#0A0A0A] transition-colors">
                    <div className="col-span-2">
                      <p className="text-sm text-white truncate">{c.name}</p>
                      {c.phone && <p className="text-[10px] text-zinc-600 font-mono">{c.phone}</p>}
                    </div>
                    <div className="col-span-3">
                      <p className="text-xs text-zinc-400 font-mono truncate">{c.email}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-zinc-500 truncate">{c.organization || "—"}</p>
                    </div>
                    <div className="col-span-3">
                      <p className="text-xs text-zinc-400 line-clamp-2">{c.message}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-mono text-[10px] text-zinc-600">
                        {new Date(c.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
