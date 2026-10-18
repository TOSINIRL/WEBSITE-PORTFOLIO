import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { FaJs, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiPostgresql, SiExpress } from 'react-icons/si';
import { Cpu, Activity, Clock, ShieldCheck, Zap } from 'lucide-react';
import { useWorldClocks } from '@/hooks/use-world-clocks';

interface InfraMetrics {
  status: string;
  uptime: number;
  latencies: {
    YYZ: number;
    LDN: number;
    TKY: number;
  };
  services: Array<{
    name: string;
    status: string;
    ping: string;
  }>;
  cpuLoad: number;
  memoryUsage: number;
}

const FALLBACK_INFRA: InfraMetrics = {
  status: "OPERATIONAL",
  uptime: 99.99,
  latencies: { YYZ: 14, LDN: 78, TKY: 145 },
  services: [
    { name: "Content Delivery Network (Edge)", status: "OPTIMAL", ping: "14ms" },
    { name: "AI Inference Cluster (Gemini)", status: "ONLINE", ping: "18ms" },
    { name: "PostgreSQL Database Engine", status: "HEALTHY", ping: "2ms" },
    { name: "Web Audio Synthesizer Node", status: "READY", ping: "< 1ms" },
  ],
  cpuLoad: 24,
  memoryUsage: 45,
};

export function SystemInfra() {
  const { toronto, london, tokyo } = useWorldClocks();

  const { data: infra = FALLBACK_INFRA } = useQuery<InfraMetrics>({
    queryKey: ['system-infra'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/system/infra');
        if (!res.ok) throw new Error('API offline');
        return await res.json();
      } catch {
        return FALLBACK_INFRA;
      }
    },
    refetchInterval: 5000,
  });

  return (
    <section className="py-24 border-t border-white/10 bg-slate-950/60 relative" id="infra">
      <div className="container mx-auto px-6">
        
        {/* Section Title */}
        <div className="mb-12">
          <div className="font-mono text-xs font-bold tracking-[0.25em] text-cyan-400 mb-2 uppercase flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            LIVE SYSTEM TELEMETRY
          </div>
          <h2 className="text-3xl md:text-4xl font-display text-white tracking-wider">
            SYSTEM INFRASTRUCTURE & NODES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Node 1: Live Status & Load */}
          <motion.div
            className="rounded-2xl bg-slate-950 border border-white/10 p-6 flex flex-col justify-between scanline hover:border-cyan-500/40 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-[11px] tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                UPLINK_STATUS
              </span>
              <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] font-bold tracking-widest text-emerald-400">
                  {infra.status}
                </span>
              </div>
            </div>

            <div className="space-y-4 my-4">
              <div>
                <div className="flex justify-between font-mono text-xs text-slate-400 mb-1">
                  <span>CPU LOAD</span>
                  <span className="text-cyan-400 font-bold">{infra.cpuLoad}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${infra.cpuLoad}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs text-slate-400 mb-1">
                  <span>MEMORY UTILIZATION</span>
                  <span className="text-cyan-400 font-bold">{infra.memoryUsage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${infra.memoryUsage}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center font-mono text-xs">
              <span className="text-slate-400">GLOBAL UPTIME</span>
              <span className="text-emerald-400 font-bold">{infra.uptime}%</span>
            </div>
          </motion.div>

          {/* Node 2: Global Clocks & Latencies */}
          <motion.div
            className="rounded-2xl bg-slate-950 border border-white/10 p-6 flex flex-col justify-between scanline hover:border-cyan-500/40 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4">
              <span className="font-mono text-[11px] tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                GLOBAL_EDGE_NODES
              </span>
            </div>

            <div className="space-y-3">
              {[
                { loc: 'TORONTO (YYZ)', time: toronto, ping: `${infra.latencies.YYZ}ms`, active: true },
                { loc: 'LONDON (LDN)', time: london, ping: `${infra.latencies.LDN}ms`, active: false },
                { loc: 'TOKYO (TKY)', time: tokyo, ping: `${infra.latencies.TKY}ms`, active: false },
              ].map((node) => (
                <div
                  key={node.loc}
                  className={`flex justify-between items-center px-4 py-2.5 rounded-xl font-mono text-xs border ${
                    node.active
                      ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                      : 'bg-slate-900/60 border-white/5 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold tracking-wider">{node.loc}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white">{node.time}</span>
                    <span className="text-[10px] text-cyan-400 font-bold px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                      {node.ping}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center font-mono text-xs">
              <span className="text-slate-400">ROUTING PROTOCOL</span>
              <span className="text-cyan-400 font-bold">ANYCAST v6</span>
            </div>
          </motion.div>

          {/* Node 3: Core Technology Manifest */}
          <motion.div
            className="rounded-2xl bg-slate-950 border border-white/10 p-6 flex flex-col justify-between scanline hover:border-cyan-500/40 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4">
              <span className="font-mono text-[11px] tracking-widest text-slate-400 uppercase flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                CORE_TECHNOLOGY_MANIFEST
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2.5 mb-4">
              {[
                { icon: FaReact, label: 'React 19' },
                { icon: SiTypescript, label: 'TS 5.9' },
                { icon: FaNodeJs, label: 'Node 24' },
                { icon: SiExpress, label: 'Express' },
                { icon: SiPostgresql, label: 'PostgreSQL' },
                { icon: SiTailwindcss, label: 'Tailwind' },
                { icon: FaJs, label: 'ESNext' },
              ].map((Tech, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-300 group"
                  title={Tech.label}
                >
                  <Tech.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-mono text-slate-400 truncate w-full text-center">
                    {Tech.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center font-mono text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SECURITY STATUS
              </span>
              <span className="text-emerald-400 font-bold">ENCRYPTED</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
