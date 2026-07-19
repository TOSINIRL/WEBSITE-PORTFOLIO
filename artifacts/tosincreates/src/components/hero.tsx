import { motion } from 'framer-motion';
import { useWorldClocks } from '@/hooks/use-world-clocks';

export function Hero() {
  const { toronto } = useWorldClocks();

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="badge"
        >
          AGENTIC AI POWERED
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Crafting Digital Excellence
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Bespoke luxury web design &amp; premium digital experiences built with 2026-grade AI technology.
        </motion.p>

        <motion.div
          className="hero-btns"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#work" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View Portfolio
          </a>
          <a href="#contact" className="btn btn-outline" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Start Project
          </a>
        </motion.div>

        <motion.div
          className="hero-system-clock"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="clock-prefix">SYS_CORE_UPLINK // TORONTO</div>
          <div className="clock-time" id="heroClock">{toronto}</div>
          <div className="clock-status">
            <span className="status-dot" />
            SIGNAL_STRENGTH_MAXIMIZED
          </div>
        </motion.div>
      </div>

      {/* Watermark */}
      <div className="hero-watermark" aria-hidden="true">
        <span className="watermark-text">TOSIN</span>
        <span className="watermark-text">CREATES</span>
      </div>
    </section>
  );
}
