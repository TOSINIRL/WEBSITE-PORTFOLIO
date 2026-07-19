import { useState, useEffect, useRef } from 'react';
import { Shield } from 'lucide-react';

const FOOTER_LOGS = [
  '> SYS_AGENT_LOG initialized...',
  '> Monitoring all digital nodes...',
  '> Encryption layer: ACTIVE',
  '> Agentic pipeline: RUNNING',
  '> Build 209.2-FINAL loaded.',
];

export function Footer() {
  const [lines, setLines] = useState<string[]>([]);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const addLine = () => {
      if (i < FOOTER_LOGS.length) {
        const idx = i;
        setLines((prev) => [...prev, FOOTER_LOGS[idx]]);
        i++;
        setTimeout(addLine, 600 + Math.random() * 400);
      }
    };
    const id = setTimeout(addLine, 1200);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  return (
    <footer className="dashboard-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-col brand-col">
            <div className="logo footer-logo">TOSIN<span>CREATES</span></div>
            <p className="brand-tagline">
              Bespoke luxury web design &amp; premium digital experiences built with
              2026-grade AI technology.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              {['home', 'about', 'work', 'contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={(e) => { e.preventDefault(); document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' }); }}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div className="footer-col">
            <h4 className="footer-title">Ecosystem</h4>
            <ul className="footer-links">
              <li><a href="#">Agentic Logs</a></li>
              <li><a href="#">System Specs</a></li>
              <li><a href="#">Design Ethics</a></li>
              <li><a href="#">Legal Uplink</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom grid */}
        <div className="footer-bottom-grid">
          {/* Terminal */}
          <div className="system-card terminal-card footer-terminal">
            <div className="terminal-header">
              <div className="terminal-dots"><span /><span /><span /></div>
              <div className="terminal-title">SYS_AGENT_LOG</div>
            </div>
            <div className="terminal-body" ref={termRef} style={{ minHeight: 80 }}>
              {lines.map((line, idx) => (
                <div key={idx} className="log-line">{line}</div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="footer-col status-col">
            <h4 className="footer-title">System Status</h4>
            <div className="footer-status-item">
              <div className="status-pulse green" />
              <span>ALL_SYSTEMS_OPERATIONAL</span>
            </div>
            <div className="footer-status-item">
              <Shield size={10} />
              <span>ENCRYPTED_SESSION_ACTIVE</span>
            </div>
            <p className="footer-version">BUILD_VER: 209.2-FINAL</p>
            <p className="copyright">© 2026 TOSIN CREATES.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
