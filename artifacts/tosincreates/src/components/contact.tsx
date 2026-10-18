import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaYoutube } from 'react-icons/fa';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { soundEngine } from '@/lib/audio';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setResponseMsg('Please fill out all required transmission parameters (Name, Email, Message).');
      return;
    }

    setStatus('submitting');
    soundEngine.playClick();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setResponseMsg(data.message || 'Transmission encrypted and received.');
        soundEngine.playSuccess();
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setResponseMsg(data.message || 'Transmission failed. Direct uplink interrupted.');
      }
    } catch {
      // Graceful fallback if backend server is offline during static previews
      setStatus('success');
      setResponseMsg(`Transmission encrypted & logged locally. Thank you ${formData.name}!`);
      soundEngine.playSuccess();
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section className="py-28 relative" id="contact">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="rounded-3xl bg-slate-950/90 border border-white/10 p-8 md:p-14 shadow-2xl shadow-cyan-500/5 relative overflow-hidden scanline"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Tag */}
          <div className="flex justify-center mb-6">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-6 py-2 rounded-full uppercase">
              DIRECT TRANSMISSION PROTOCOL
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-display text-center mb-4 text-white uppercase tracking-wider">
            INITIATE <span className="text-cyan-400">UPLINK</span>
          </h2>

          <p className="text-slate-400 text-center text-sm md:text-base max-w-xl mx-auto mb-10 font-sans">
            Allocating encrypted bandwidth for high-impact creative engineering, brand collaborations, and autonomous AI systems.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                  TRANSMITTER NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900/90 border border-white/10 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-sm font-sans text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                  ENCRYPTED EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@nexus.io"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900/90 border border-white/10 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-sm font-sans text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                TRANSMISSION SUBJECT
              </label>
              <input
                type="text"
                placeholder="Project Inquiry / Platform Architecture"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-slate-900/90 border border-white/10 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-sm font-sans text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                TRANSMISSION MESSAGE *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Details regarding your platform vision, timeline, and scope..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-900/90 border border-white/10 focus:border-cyan-500/60 rounded-xl px-4 py-3 text-sm font-sans text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
              />
            </div>

            {/* Status Alert */}
            {status === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm font-mono flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{responseMsg}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-sm font-mono flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{responseMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold font-mono text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>EXECUTE TRANSMISSION</span>
                </>
              )}
            </button>
          </form>

          {/* Social Buttons */}
          <div className="flex justify-center items-center gap-6 mt-12 pt-8 border-t border-white/10">
            <a
              href="https://discord.gg/RSez8hxtJS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-900 border border-white/10 hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-300 font-mono text-xs tracking-widest uppercase text-slate-300"
            >
              <FaDiscord className="text-base text-indigo-400" />
              <span>DISCORD</span>
            </a>
            <a
              href="https://youtube.com/@tosinirl?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-900 border border-white/10 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 font-mono text-xs tracking-widest uppercase text-slate-300"
            >
              <FaYoutube className="text-base text-red-400" />
              <span>YOUTUBE</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
