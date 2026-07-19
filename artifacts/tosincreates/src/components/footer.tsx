import { useState, useEffect, useRef } from 'react';
import { Shield } from 'lucide-react';

const FOOTER_LOGS = [
  '> SYS_AGENT_LOG initialized...',
  '> Monitoring all digital nodes...',
  '> Encryption layer: ACTIVE',
  '> Agentic pipeline: RUNNING',
  '> Build 209.2-FINAL loaded.',
];

export function Footer() {
  const [lines, setLines] = useState<string[]>([]);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const addLine = () => {
      if (i < FOOTER_LOGS.length) {
        const idx = i;
        setLines((prev) => [...prev, FOOTER_LOGS[idx]]);
        i++;
        setTimeout(addLine, 600 + Math.random() * 400);
      }
    };
    const id = setTimeout(addLine, 1200);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="font-display text-3xl tracking-wide mb-6">
              TOSIN<span className="text-primary">CREATES</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm font-light">
              High-performance digital ecosystems forged at the intersection of cybernetic precision and bespoke design.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs tracking-widest text-primary mb-6 uppercase">Navigation</h4>
            <ul className="space-y-4">
              {['home', 'about', 'work', 'contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item}`} 
                    onClick={(e) => { e.preventDefault(); document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="font-display tracking-widest text-white/70 hover:text-white uppercase transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs tracking-widest text-primary mb-6 uppercase">Ecosystem</h4>
            <ul className="space-y-4">
              {['Agentic Logs', 'System Specs', 'Design Ethics', 'Legal Uplink'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-mono text-xs text-white/50 hover:text-white transition-colors uppercase">
                    [{item}]
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10 border-t border-white/10">
          
          {/* Terminal */}
          <div className="lg:col-span-2 glass-card rounded-lg flex flex-col h-40">
            <div className="flex items-center gap-3 px-4 py-2 border-b border-white/5 bg-black/60">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>
              <div className="font-mono text-[10px] text-white/40 tracking-widest ml-2">SYS_AGENT_LOG</div>
            </div>
            <div className="p-4 font-mono text-[10px] text-primary/70 flex-1 overflow-hidden" ref={termRef}>
              {lines.map((line, idx) => (
                <div key={idx} className="mb-1">{line}</div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-3 font-mono text-[10px] text-white/60 tracking-widest border border-white/5 bg-white/5 px-4 py-2 rounded">
              <div className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
              ALL_SYSTEMS_OPERATIONAL
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-white/60 tracking-widest border border-white/5 bg-white/5 px-4 py-2 rounded">
              <Shield size={12} className="text-primary" />
              ENCRYPTED_SESSION_ACTIVE
            </div>
            <div className="flex justify-between items-center mt-auto pt-2 text-white/30 font-mono text-[10px] tracking-widest">
              <span>BUILD: 209.2-F</span>
              <span>© 2026 TOSIN CREATES.</span>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
