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

  // Psychic Energy Particle Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Energy particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height + height,
      size: Math.random() * 2.5 + 1,
      speedY: Math.random() * 2.5 + 1.2,
      speedX: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.7 + 0.3,
      color: Math.random() > 0.3 ? '#ff3e3e' : '#ffffff',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY * (1 + (count / 100) * 1.5);
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity * Math.min(1, (count / 100) + 0.3);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#ff3e3e';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count]);

  // Mob Psycho percentage counter logic with dynamic emotional surge acceleration
  useEffect(() => {
    let current = 0;
    const total = 100;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      if (current >= total) {
        setCount(total);
        setIsExploding(true);
        setTimeout(() => {
          setVisible(false);
          setTimeout(() => {
            onCompleteRef.current();
          }, 600);
        }, 450);
        return;
      }

      current += 1;
      setCount(current);

      // Speed ramps dynamically like Mob's emotional surge:
      // Starts steady, accelerates dramatically as it approaches 100%
      let delay = 20;
      if (current > 70) delay = 12;
      if (current > 90) delay = 8;

      timerId = setTimeout(tick, delay);
    };

    timerId = setTimeout(tick, 100);
    return () => {
      if (timerId) clearTimeout(timerId);
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
            filter: 'blur(10px)',
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed inset-0 bg-[#0c0202] z-[9999] flex flex-col items-center justify-center overflow-hidden select-none ${getIntensityClass()}`}
        >
          {/* Canvas for psychic energy particles */}
          <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />

          {/* Dynamic Shigeo Psychic Aura */}
          <div
            className="shigeo-aura"
            style={{
              opacity: Math.min(1, 0.2 + (count / 100) * 0.8),
              transform: `scale(${0.85 + (count / 100) * 0.35})`,
            }}
          />

          {/* Electric energy flash when > 80% */}
          {count > 80 && (
            <motion.div
              animate={{ opacity: [0.1, 0.4, 0.1, 0.5, 0.1] }}
              transition={{ repeat: Infinity, duration: 0.12 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_60%)] pointer-events-none z-[2]"
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
                className={`font-display transition-colors duration-100 ${
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
