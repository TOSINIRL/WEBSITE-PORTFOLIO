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
        className={`dashboard-header${scrolled ? ' scrolled' : ''}`}
      >
        {/* Left: Logo */}
        <div className="header-left">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            TOSIN<span>CREATES</span>
          </div>
        </div>

        {/* Center: Nav */}
        <nav className="header-center">
          <ul className="nav-links">
            {['home', 'about', 'work'].map((item) => (
              <li key={item}>
                <a href={`#${item}`} onClick={(e) => { e.preventDefault(); scrollTo(item); }}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Status + mobile btn */}
        <div className="header-right">
          <div className="header-status">
            <span className="status-loc">TORONTO</span>
            <span className="status-sep">|</span>
            <span className="status-time" id="headerTime">{toronto}</span>
          </div>
          <button
            className={`mobile-menu-btn${menuOpen ? ' active' : ''}`}
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <div id="mobileNav" className={`mobile-nav-overlay${menuOpen ? ' active' : ''}`}>
        <div className="mobile-nav-content">
          <ul className="mobile-nav-links">
            {['home', 'about', 'work', 'contact'].map((item) => (
              <li key={item}>
                <a href={`#${item}`} onClick={(e) => { e.preventDefault(); scrollTo(item); }}>
                  {item.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-nav-footer">
            <div className="status-badge">
              <div className="status-pulse" />
              <span>SYS_MOBILE_UPLINK_READY</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
