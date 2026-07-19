import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWorldClocks } from '@/hooks/use-world-clocks';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toronto } = useWorldClocks();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-background/80 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="cursor-pointer font-display text-2xl tracking-wide flex items-center gap-1 z-50" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            TOSIN<span className="text-primary">CREATES</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-10">
              {['home', 'about', 'work'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item}`} 
                    onClick={(e) => { e.preventDefault(); scrollTo(item); }}
                    className="font-display text-sm tracking-[0.2em] text-white/50 hover:text-primary transition-colors uppercase"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Status & Mobile Toggle */}
          <div className="flex items-center gap-6 z-50">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 font-mono text-xs font-bold tracking-widest text-white/80">
              <span className="text-primary">TORONTO</span>
              <span className="text-white/20">|</span>
              <span className="min-w-[70px]">{toronto}</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 relative"
              aria-label="Toggle Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`w-6 h-[2px] bg-white transition-all duration-300 rounded ${menuOpen ? 'translate-y-2 rotate-45 bg-primary' : ''}`} />
              <span className={`w-6 h-[2px] bg-white transition-all duration-300 rounded ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-[2px] bg-white transition-all duration-300 rounded ${menuOpen ? '-translate-y-2 -rotate-45 bg-primary' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <div 
        className={`fixed inset-0 bg-background/98 backdrop-blur-xl z-40 flex items-center justify-center transition-all duration-500 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div className="text-center w-full max-w-md px-6">
          <ul className="flex flex-col gap-8 mb-16">
            {['home', 'about', 'work', 'contact'].map((item, i) => (
              <li key={item}>
                <a 
                  href={`#${item}`} 
                  onClick={(e) => { e.preventDefault(); scrollTo(item); }}
                  className="font-display text-5xl tracking-widest text-white/80 hover:text-primary transition-colors uppercase block"
                  style={{ transform: menuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: menuOpen ? 1 : 0, transition: `all 0.5s ${i * 0.1}s cubic-bezier(0.16, 1, 0.3, 1)` }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          
          <div 
            className="flex items-center justify-center gap-3 font-mono text-xs text-primary/60 tracking-widest"
            style={{ transform: menuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: menuOpen ? 1 : 0, transition: 'all 0.5s 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <div className="status-dot" />
            <span>SYS_MOBILE_UPLINK_READY</span>
          </div>
        </div>
      </div>
    </>
  );
}
