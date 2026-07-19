import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LOG_LINES = [
  '> Initiating agentic sequence...',
  '> Scanning for luxury assets...',
  '> Loading design matrix...',
  '> AI context: ACTIVE',
  '> Premium output: ENABLED',
  '> Deploying next-gen stack...',
  '> System ready. All nodes online.',
];

export function About() {
  const [lines, setLines] = useState<string[]>([]);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const addLine = () => {
      if (i < LOG_LINES.length) {
        const current = i;
        setLines((prev) => [...prev, LOG_LINES[current]]);
        i++;
        setTimeout(addLine, 420 + Math.random() * 300);
      }
    };
    const id = setTimeout(addLine, 800);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  return (
    <section className="about" id="about">
      <div className="container">
        {/* About Card */}
        <motion.div
          className="about-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-accent-bar" />
          <div className="about-inner">
            <div className="about-content-left">
              <div className="about-top">
                <span className="about-eyebrow">Current Mission</span>
                <div className="about-divider" />
              </div>
              <h2 className="about-heading">
                The Intersection of<br />
                <span className="about-heading-highlight">Luxury &amp; Logic</span>
              </h2>
            </div>
            <div className="about-content-right">
              <p className="about-para">
                I am a creative web developer focused on mastering the transition from{' '}
                <em>'AI power user'</em> to building AI&#8209;driven digital ecosystems.
                My workflow is built on agentic systems, allowing me to ship premium,
                custom&#8209;coded solutions at record speed.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Ecosystem Grid */}
        <div className="ecosystem-grid">
          {/* Terminal Card */}
          <motion.div
            className="system-card terminal-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="terminal-header">
              <div className="terminal-dots">
                <span /><span /><span />
              </div>
              <div className="terminal-title">AGENTIC_LOG.EXE</div>
            </div>
            <div className="terminal-body" ref={termRef}>
              {lines.map((line, idx) => (
                <div key={idx} className="log-line">{line}</div>
              ))}
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className="system-card mission-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-top">
              <span className="about-eyebrow">Intel Report</span>
            </div>
            <h3 className="mission-title">Current Focus</h3>
            <p className="mission-desc">
              Mastering Advanced Agentic Workflows &amp; Multi-Agent Orchestration for
              2026 Web Ecosystems.
            </p>
            <div className="mission-status">
              <div className="status-pulse green" />
              <span>ACTIVE RESEARCH</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
