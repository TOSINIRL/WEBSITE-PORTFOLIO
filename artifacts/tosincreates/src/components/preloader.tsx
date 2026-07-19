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
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
        >
          <div className="mob-container">
            <div className="shigeo-aura" />
            <div className="mob-counter">
              <span id="load-count">{String(count).padStart(2, '0')}</span>
              <span className="mob-percent">%</span>
            </div>
            <div className="mob-status">System Charging</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
