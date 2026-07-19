import { motion } from 'framer-motion';
import { FaDiscord, FaYoutube } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';

export function SocialNexus() {
  return (
    <section id="community" className="social-nexus">
      <div className="container">
        <div className="social-nexus-grid">
          <motion.a
            href="https://discord.gg/RSez8hxtJS"
            target="_blank"
            rel="noopener noreferrer"
            className="nexus-card nexus-discord"
            aria-label="Join Discord community"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="nexus-orb"><FaDiscord /></span>
            <h3>Discord</h3>
            <span className="nexus-cta">
              JOIN THE LITTEST FUNCTION <ArrowRight size={11} />
            </span>
            <span className="nexus-pulse" aria-hidden="true" />
          </motion.a>

          <motion.a
            href="https://youtube.com/@tosinirl?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="nexus-card nexus-youtube"
            aria-label="Subscribe on YouTube"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="nexus-orb"><FaYoutube /></span>
            <h3>YouTube</h3>
            <span className="nexus-cta">
              I KNOW YOU'RE SEEING THIS &amp; AIN'T SUBBED YET?...CRAZY <ArrowRight size={11} />
            </span>
            <span className="nexus-pulse" aria-hidden="true" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
