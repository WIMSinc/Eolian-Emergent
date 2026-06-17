import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, AlertCircle } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/admin/login`, { email, password });
      sessionStorage.setItem("admin_token", data.token);
      sessionStorage.setItem("admin_user", JSON.stringify(data.user));
      navigate("/admin/dashboard");
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="admin-login-page" className="min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 tactical-grid opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md mx-6"
      >
        <div className="bg-[#0A0A0A] border border-zinc-800 p-8 md:p-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 border border-[#FF0B1B] flex items-center justify-center">
              <Lock size={14} className="text-[#FF0B1B]" />
            </div>
            <span className="font-heading text-lg font-bold text-white">EOLIAN</span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-600 uppercase block mb-8">
            Admin // Dashboard Access
          </span>

          {error && (
            <div data-testid="login-error" className="flex items-center gap-2 text-[#FF0B1B] text-sm mb-6 font-mono">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-2">Email</label>
              <input
                type="email"
                data-testid="admin-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@eolianvr.com"
                className="w-full bg-transparent border border-zinc-800 py-3 px-4 text-sm text-white font-mono placeholder:text-zinc-700 focus:border-[#FF0B1B] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-2">Password</label>
              <input
                type="password"
                data-testid="admin-password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full bg-transparent border border-zinc-800 py-3 px-4 text-sm text-white font-mono placeholder:text-zinc-700 focus:border-[#FF0B1B] focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              data-testid="admin-login-submit"
              disabled={loading}
              className="w-full bg-[#D90412] text-white font-mono uppercase text-sm tracking-widest px-8 py-4 hover:bg-[#FF0B1B] transition-colors disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
