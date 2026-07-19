import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { onComplete: () => void; }

export function Preloader({ onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const total = 100;
    const duration = 2200;
    const step = duration / total;

    const id = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= total) {
        clearInterval(id);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 550);
        }, 280);
      }
    }, step);

    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >
          <div className="mob-container">
            <div className="shigeo-aura" />
            <div className="mob-counter">
              <span id="load-count">{String(count).padStart(2, '0')}</span>
              <span className="mob-percent">%</span>
            </div>
            <div className="mob-status">Synchronizing Digital Aura</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
