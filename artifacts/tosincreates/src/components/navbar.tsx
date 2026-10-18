import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useWorldClocks } from '@/hooks/use-world-clocks';
import { soundEngine } from '@/lib/audio';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const { toronto } = useWorldClocks();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleAudio = () => {
    const state = soundEngine.toggleSound();
    setSoundActive(state);
  };

  const scrollTo = (id: string) => {
    if (soundActive) soundEngine.playClick();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: 'HOME', id: 'hero' },
    { label: 'ABOUT', id: 'about' },
    { label: 'WORK', id: 'work' },
    { label: 'INFRA', id: 'infra' },
    { label: 'CONTACT', id: 'contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-background/85 backdrop-blur-md border-white/10 py-4 shadow-2xl shadow-primary/5'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div
            className="cursor-pointer font-display text-2xl tracking-wider flex items-center gap-1 z-50 group"
            onClick={() => {
              if (soundActive) soundEngine.playClick();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onMouseEnter={() => soundActive && soundEngine.playHover()}
          >
            <span className="text-white group-hover:text-primary transition-colors duration-300">TOSIN</span>
            <span className="text-primary group-hover:text-cyan-400 transition-colors duration-300">CREATES</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.id);
                    }}
                    onMouseEnter={() => soundActive && soundEngine.playHover()}
                    className="font-display text-xs tracking-[0.25em] text-white/60 hover:text-primary transition-colors uppercase py-2 border-b-2 border-transparent hover:border-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-4 z-50">
            {/* Audio Synth Toggle */}
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 ${
                soundActive
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-[0_0_12px_rgba(255,62,62,0.3)]'
                  : 'border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20'
              }`}
              title={soundActive ? 'Mute Cyber Audio FX' : 'Enable Web Audio FX Synth'}
            >
              {soundActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="hidden sm:inline tracking-wider">AUDIO [ON]</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline tracking-wider">AUDIO [OFF]</span>
                </>
              )}
            </button>

            {/* Time Clock */}
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono text-xs font-semibold tracking-widest text-white/80">
              <span className="text-primary font-bold">YYZ</span>
              <span className="text-white/20">|</span>
              <span className="min-w-[65px] text-cyan-300">{toronto}</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 relative"
              aria-label="Toggle Menu"
              onClick={() => {
                if (soundActive) soundEngine.playClick();
                setMenuOpen(!menuOpen);
              }}
            >
              <span
                className={`w-6 h-[2px] bg-white transition-all duration-300 rounded ${
                  menuOpen ? 'translate-y-2 rotate-45 bg-primary' : ''
                }`}
              />
              <span
                className={`w-6 h-[2px] bg-white transition-all duration-300 rounded ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-[2px] bg-white transition-all duration-300 rounded ${
                  menuOpen ? '-translate-y-2 -rotate-45 bg-primary' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed inset-0 bg-background/98 backdrop-blur-2xl z-40 flex items-center justify-center transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="text-center w-full max-w-md px-6">
          <ul className="flex flex-col gap-6 mb-12">
            {navItems.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className="font-display text-4xl tracking-widest text-white/80 hover:text-primary transition-colors uppercase block"
                  style={{
                    transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: menuOpen ? 1 : 0,
                    transition: `all 0.5s ${i * 0.08}s cubic-bezier(0.16, 1, 0.3, 1)`,
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            className="flex items-center justify-center gap-3 font-mono text-xs text-primary/70 tracking-widest"
            style={{
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
              transition: 'all 0.5s 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>TOSINCREATES_SYSTEM_ONLINE</span>
          </div>
        </div>
      </div>
    </>
  );
}
