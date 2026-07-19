import { motion } from 'framer-motion';
import { useWorldClocks } from '@/hooks/use-world-clocks';

export function Hero() {
  const { toronto } = useWorldClocks();

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 pb-10 overflow-hidden" id="home">
      
      {/* Background visual anchor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] aura-glow rounded-full z-[-1]" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 font-mono text-xs font-bold tracking-widest text-primary mb-8 uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Agentic AI Powered
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-9xl leading-[0.85] tracking-[-0.02em] text-gradient"
          >
            ENGINEERING <br />
            <span className="text-gradient-red">DIGITAL LUXURY</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light"
        >
          High-performance digital ecosystems forged at the intersection of cybernetic precision and bespoke design.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#work" className="btn-cyber w-full sm:w-auto" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Access Portfolio
          </a>
          <a href="#contact" className="btn-cyber-outline w-full sm:w-auto" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Initiate Project
          </a>
        </motion.div>

        <motion.div
          className="mt-24 pointer-events-none select-none relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="font-mono text-xs text-primary tracking-[0.3em] mb-2 font-bold opacity-80">SYS_CORE_UPLINK // TORONTO</div>
          <div className="font-mono text-5xl md:text-7xl font-black text-white/90 tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] mb-4">{toronto}</div>
          <div className="font-mono text-[10px] text-white/40 tracking-[0.3em] flex items-center justify-center gap-2">
            <span className="status-dot" />
            SIGNAL_STRENGTH_MAXIMIZED
          </div>
        </motion.div>
      </div>

      {/* Massive Watermark */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex flex-col pointer-events-none z-[-2] opacity-20">
        <span className="font-display text-[15vw] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] whitespace-nowrap">TOSIN</span>
        <span className="font-display text-[15vw] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] whitespace-nowrap ml-[10vw]">CREATES</span>
      </div>
    </section>
  );
}
