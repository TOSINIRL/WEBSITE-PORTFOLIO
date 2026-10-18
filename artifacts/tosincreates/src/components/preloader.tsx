import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export function Preloader({ onComplete }: Props) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isExploding, setIsExploding] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const progressRef = useRef(0);
  const auraRef = useRef<HTMLDivElement>(null);

  // Particle canvas: runs once, reads progress from a ref, and uses pre-rendered glow sprites
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const makeSprite = (color: string) => {
      const size = 48;
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const g = c.getContext('2d')!;
      const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, color);
      grad.addColorStop(0.25, color);
      grad.addColorStop(0.45, 'rgba(255,62,62,0.35)');
      grad.addColorStop(1, 'rgba(255,62,62,0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, size, size);
      return c;
    };
    const sprites = { red: makeSprite('#ff3e3e'), white: makeSprite('#ffffff') };

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height + height,
      size: Math.random() * 2.5 + 1,
      speedY: (Math.random() * 2.5 + 1.2) * 60,
      speedX: (Math.random() - 0.5) * 1.5 * 60,
      opacity: Math.random() * 0.7 + 0.3,
      sprite: Math.random() > 0.3 ? sprites.red : sprites.white,
    }));

    let rafId = 0;
    let last = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const progress = progressRef.current;
      const boost = 1 + progress * 1.5;
      const alpha = Math.min(1, progress + 0.3);

      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.speedY * boost * dt;
        p.x += p.speedX * dt;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        const d = p.size * 6;
        ctx.globalAlpha = p.opacity * alpha;
        ctx.drawImage(p.sprite, p.x - d / 2, p.y - d / 2, d, d);
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Time-based counter: smooth at any frame rate, steady at first and surging toward 100%
  useEffect(() => {
    const DURATION = 1900;
    const START_DELAY = 100;
    let rafId = 0;
    let startTs = 0;
    let lastShown = -1;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;

    const frame = (now: number) => {
      if (!startTs) startTs = now + START_DELAY;
      const t = Math.min(Math.max((now - startTs) / DURATION, 0), 1);
      const eased = Math.pow(t, 1.35);
      progressRef.current = eased;

      const aura = auraRef.current;
      if (aura) {
        aura.style.opacity = String(Math.min(1, 0.2 + eased * 0.8));
        aura.style.transform = `translate3d(0,0,0) scale(${0.85 + eased * 0.35})`;
      }

      const shown = Math.round(eased * 100);
      if (shown !== lastShown) {
        lastShown = shown;
        setCount(shown);
      }

      if (t < 1) {
        rafId = requestAnimationFrame(frame);
        return;
      }
      setIsExploding(true);
      exitTimer = setTimeout(() => {
        setVisible(false);
        doneTimer = setTimeout(() => onCompleteRef.current(), 600);
      }, 450);
    };
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      if (exitTimer) clearTimeout(exitTimer);
      if (doneTimer) clearTimeout(doneTimer);
    };
  }, []);

  // Dynamic status text based on Mob Psycho percentage
  const getStatusText = () => {
    if (count === 100) return '100% UNSTOPPABLE';
    if (count >= 85) return 'WARNING: AURA OVERLOAD';
    if (count >= 50) return 'AURA CAPACITY: CRITICAL';
    return 'SYNCHRONIZING DIGITAL AURA';
  };

  // Determine shake intensity class based on count
  const getIntensityClass = () => {
    if (count === 100) return 'mob-intensity-critical';
    if (count >= 85) return 'mob-intensity-critical';
    if (count >= 65) return 'mob-intensity-high';
    if (count >= 40) return 'mob-intensity-mid';
    return '';
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed inset-0 bg-[#0c0202] z-[9999] flex flex-col items-center justify-center overflow-hidden select-none ${getIntensityClass()}`}
        >
          {/* Canvas for psychic energy particles */}
          <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />

          {/* Dynamic Shigeo Psychic Aura */}
          <div ref={auraRef} className="shigeo-aura" style={{ opacity: 0.2 }} />

          {/* Electric energy flash when > 80% */}
          {count > 80 && (
            <motion.div
              animate={{ opacity: [0.1, 0.4, 0.1, 0.5, 0.1] }}
              transition={{ repeat: Infinity, duration: 0.24, ease: 'linear' }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_60%)] pointer-events-none z-[2] will-change-[opacity]"
            />
          )}

          {/* Shockwave Burst on 100% */}
          {isExploding && (
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute z-[10] w-[500px] h-[500px] rounded-full border-4 border-[#ff3e3e] shadow-[0_0_100px_#ff3e3e] pointer-events-none"
            />
          )}

          {/* Mob Psycho Main Container */}
          <div className="mob-container relative z-10 flex flex-col items-center justify-center">
            
            {/* Percentage Counter */}
            <div className="mob-counter flex items-baseline justify-center">
              <span
                className={`font-display ${
                  count === 100 ? 'text-white drop-shadow-[0_0_80px_#ff3e3e]' : 'text-[#ff3e3e]'
                }`}
              >
                {String(count).padStart(2, '0')}
              </span>
              <span className="mob-percent text-[#ff3e3e] font-display ml-2">%</span>
            </div>

            {/* Status Line with Pulsing Red Indicator */}
            <div className="mob-status font-mono text-xs font-extrabold tracking-[0.45em] text-[#ff3e3e] flex items-center gap-3">
              <div className="status-pulse" />
              <span>{getStatusText()}</span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
