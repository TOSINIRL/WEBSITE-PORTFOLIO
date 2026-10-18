import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Sparkles, CheckCircle2 } from 'lucide-react';
import type { Project } from './work';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 z-10 text-slate-100 scanline"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-t-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="px-3 py-1 text-xs font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 rounded-md uppercase mb-2 inline-block">
                    {project.category}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-white">
                    {project.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Subtitle */}
              <p className="text-lg font-sans font-medium text-cyan-300">
                {project.subtitle || project.description}
              </p>

              {/* Detailed Overview */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  System Overview
                </h3>
                <p className="text-slate-300 leading-relaxed font-sans text-sm sm:text-base">
                  {project.detailedOverview || project.description}
                </p>
              </div>

              {/* Stats Grid */}
              {project.stats && Object.keys(project.stats).length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/60 border border-white/5 font-mono">
                  {Object.entries(project.stats).map(([key, val]) => (
                    <div key={key} className="space-y-1">
                      <div className="text-xs text-slate-400 uppercase tracking-wider">{key}</div>
                      <div className="text-lg font-bold text-cyan-400">{val}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack Badges */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Tech Stack & Architecture
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-sm uppercase tracking-wider transition-colors shadow-lg shadow-cyan-500/20"
                  >
                    <span>Launch Live System</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/50 text-white font-mono text-sm uppercase tracking-wider transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
