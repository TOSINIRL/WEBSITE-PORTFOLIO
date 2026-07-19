import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { onComplete: () => void; }

export function Preloader({ onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const total = 100;
    const duration = 1800;
    const step = duration / total;

    const id = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= total) {
        clearInterval(id);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 650);
        }, 240);
      }
    }, step);

    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="preloader"
          className="fixed inset-0 bg-[#05060A] z-[9999] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Intense core glow */}
          <div className="absolute inset-[-50%] bg-[radial-gradient(circle_at_center,rgba(255,42,42,0.15)_0%,transparent_50%)] blur-[50px] animate-pulse" />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            
            <div className="flex items-baseline justify-center mb-6 drop-shadow-[0_0_50px_rgba(255,42,42,0.4)]">
              <span className="font-display text-[20vw] md:text-[15rem] leading-[0.8] text-primary tracking-tighter">
                {String(count).padStart(2, '0')}
              </span>
              <span className="font-display text-5xl md:text-7xl text-primary ml-2 mb-10">%</span>
            </div>
            
            <div className="font-mono text-xs font-bold tracking-[0.4em] text-primary/60 uppercase flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
              System Charging
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
