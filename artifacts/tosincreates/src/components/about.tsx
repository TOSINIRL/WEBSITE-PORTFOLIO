import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LOG_LINES = [
  '> Initiating agentic sequence...',
  '> Scanning for luxury assets...',
  '> Loading design matrix...',
  '> AI context: ACTIVE',
  '> Premium output: ENABLED',
  '> Deploying next-gen stack...',
  '> System ready. All nodes online.',
];

export function About() {
  const [lines, setLines] = useState<string[]>([]);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const addLine = () => {
      if (i < LOG_LINES.length) {
        const current = i;
        setLines((prev) => [...prev, LOG_LINES[current]]);
        i++;
        setTimeout(addLine, 420 + Math.random() * 300);
      }
    };
    const id = setTimeout(addLine, 800);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  return (
    <section className="py-32 relative z-10" id="about">
      <div className="container mx-auto px-6">
        
        {/* About Card */}
        <motion.div
          className="glass-card scanline-animated rounded-3xl p-0 flex flex-col md:flex-row mb-8 shadow-2xl shadow-black/50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Accent bar */}
          <div className="w-full md:w-1.5 h-1.5 md:h-auto bg-primary shadow-[0_0_20px_rgba(255,42,42,0.5)]" />
          
          <div className="p-8 md:p-16 flex flex-col md:flex-row gap-12 lg:gap-24 w-full">
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full uppercase">
                  Current Mission
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white">
                PRECISION MEETS<br />
                <span className="text-primary relative inline-block group">
                  AESTHETICS
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </span>
              </h2>
            </div>
            
            <div className="flex-1 flex items-center">
              <p className="text-white/60 text-lg leading-relaxed font-light">
                Transitioning from traditional development to orchestrating advanced <strong className="text-white font-medium">agentic AI systems</strong>. 
                Delivering elite digital architecture that commands attention and performs with absolute certainty.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Ecosystem Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Terminal Card */}
          <motion.div
            className="glass-card rounded-2xl flex flex-col min-h-[250px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5 bg-black/40">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              <div className="font-mono text-xs text-white/50 tracking-widest ml-2">AGENTIC_LOG.EXE</div>
            </div>
            <div className="p-6 font-mono text-sm text-primary/80 flex-1 overflow-auto bg-black/20" ref={termRef}>
              {lines.map((line, idx) => (
                <div key={idx} className="mb-2 opacity-90">{line}</div>
              ))}
              <div className="w-2 h-4 bg-primary animate-pulse inline-block align-middle ml-2 mt-1" />
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className="glass-card rounded-2xl p-8 flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <div className="mb-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">Intel Report</span>
              </div>
              <h3 className="text-2xl text-white mb-4">Current Focus</h3>
              <p className="text-white/50 leading-relaxed font-light">
                Mastering Advanced Agentic Workflows & Multi-Agent Orchestration for 2026 Web Ecosystems.
              </p>
            </div>
            
            <div className="mt-8 flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-lg w-max font-mono text-xs tracking-widest text-[#00ff9d]">
              <div className="w-2 h-2 rounded-full bg-[#00ff9d] shadow-[0_0_8px_#00ff9d] animate-pulse" />
              ACTIVE RESEARCH
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
