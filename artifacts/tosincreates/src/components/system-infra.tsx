import { motion } from 'framer-motion';
import { FaJs, FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { Brain } from 'lucide-react';
import { useWorldClocks } from '@/hooks/use-world-clocks';

export function SystemInfra() {
  const { toronto, london, tokyo } = useWorldClocks();

  return (
    <section className="system-infra">
      <div className="container">
        <div className="infra-grid">
          {/* Node 1: Uplink Status */}
          <motion.div
            className="infra-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="infra-header">
              <span className="infra-label">UPLINK_STATUS</span>
              <div className="status-indicator">
                <div className="status-pulse green" />
                <span className="pulse-text">STABLE</span>
              </div>
            </div>
            <div className="infra-body">
              <div className="infra-stat">
                <span className="stat-key">LATENCY</span>
                <span className="stat-value">12ms</span>
              </div>
              <div className="infra-stat">
                <span className="stat-key">UPTIME</span>
                <span className="stat-value">99.9%</span>
              </div>
            </div>
          </motion.div>

          {/* Node 2: Global Clocks */}
          <motion.div
            className="infra-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="infra-header">
              <span className="infra-label">GLOBAL_NODES</span>
            </div>
            <div className="infra-body nodes">
              <div className="node-item">
                <span className="node-loc">LONDON</span>
                <span className="node-time">{london}</span>
              </div>
              <div className="node-item">
                <span className="node-loc">TOKYO</span>
                <span className="node-time">{tokyo}</span>
              </div>
              <div className="node-item">
                <span className="node-loc">TORONTO</span>
                <span className="node-time">{toronto}</span>
              </div>
            </div>
          </motion.div>

          {/* Node 3: Tech Stack */}
          <motion.div
            className="infra-card stack-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="infra-header">
              <span className="infra-label">CORE_MANIFEST</span>
            </div>
            <div className="stack-icons">
              <FaJs title="JavaScript" />
              <FaReact title="Next.js" />
              <FaHtml5 title="HTML5" />
              <FaCss3Alt title="CSS3" />
              <Brain size={27} title="Agentic AI" />
            </div>
            <div className="stack-text">AGENTIC_V2_CORE</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
