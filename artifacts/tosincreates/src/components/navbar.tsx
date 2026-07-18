import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50 py-4' : 'bg-transparent'
      }`}
    >
      <div 
        className="text-xl md:text-2xl font-display font-bold tracking-tighter cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        tosin<span className="text-primary">creates</span>
      </div>
      <div className="flex items-center gap-6 md:gap-10 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        {['work', 'about', 'contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className="hover:text-primary transition-colors duration-300"
          >
            {item}
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
