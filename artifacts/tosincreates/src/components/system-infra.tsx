import { motion } from 'framer-motion';
import { FaJs, FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { Brain } from 'lucide-react';
import { useWorldClocks } from '@/hooks/use-world-clocks';

export function SystemInfra() {
  const { toronto, london, tokyo } = useWorldClocks();

  return (
    <section className="py-24 border-t border-white/5 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Node 1: Uplink Status */}
          <motion.div
            className="glass-card rounded-xl p-6 flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-between items-start mb-8">
              <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">UPLINK_STATUS</span>
              <div className="flex items-center gap-2 bg-[#00ff9d]/10 px-3 py-1 rounded border border-[#00ff9d]/20">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest text-[#00ff9d]">STABLE</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-white/5 pb-2">
                <span className="font-mono text-xs text-white/50">LATENCY</span>
                <span className="font-mono text-xl text-white">12ms</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-2">
                <span className="font-mono text-xs text-white/50">UPTIME</span>
                <span className="font-mono text-xl text-white">99.99%</span>
              </div>
            </div>
          </motion.div>

          {/* Node 2: Global Clocks */}
          <motion.div
            className="glass-card rounded-xl p-6 flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6">
              <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">GLOBAL_NODES</span>
            </div>
            
            <div className="space-y-3">
              {[
                { loc: 'LONDON', time: london },
                { loc: 'TOKYO', time: tokyo },
                { loc: 'TORONTO', time: toronto, active: true },
              ].map((node) => (
                <div key={node.loc} className={`flex justify-between items-center px-4 py-2 rounded font-mono text-sm border ${node.active ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white/5 border-transparent text-white/70'}`}>
                  <span className="tracking-widest">{node.loc}</span>
                  <span>{node.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Node 3: Tech Stack */}
          <motion.div
            className="glass-card rounded-xl p-6 flex flex-col justify-between"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-8">
              <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">CORE_MANIFEST</span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { icon: FaJs, label: 'JS' },
                { icon: FaReact, label: 'React' },
                { icon: FaHtml5, label: 'HTML5' },
                { icon: FaCss3Alt, label: 'CSS3' },
              ].map((Tech, i) => (
                <div key={i} className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xl text-white/60 hover:text-white hover:border-white/30 transition-colors">
                  <Tech.icon />
                </div>
              ))}
              <div className="w-12 h-12 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-xl text-primary animate-pulse">
                <Brain size={24} />
              </div>
            </div>
            
            <div className="font-mono text-xs tracking-widest text-white/30 uppercase mt-auto">
              AGENTIC_V2_CORE
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
