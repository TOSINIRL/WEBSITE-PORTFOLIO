import { motion } from 'framer-motion';
import { FaDiscord, FaYoutube } from 'react-icons/fa';

export function SocialLinks() {
  return (
    <section className="social-links" id="socials">
      <div className="container">
        <div className="social-links-grid">
          <motion.a
            href="https://discord.gg/RSez8hxtJS"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card discord"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="social-card-glow" aria-hidden="true" />
            <span className="social-card-icon"><FaDiscord /></span>
            <div className="social-card-content">
              <h3>Discord</h3>
              <p>JOIN THE LITTEST FUNCTION<span className="arrow">→</span></p>
            </div>
          </motion.a>

          <motion.a
            href="https://youtube.com/@tosinirl?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="social-card youtube"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="social-card-glow" aria-hidden="true" />
            <span className="social-card-icon"><FaYoutube /></span>
            <div className="social-card-content">
              <h3>YouTube</h3>
              <p>I KNOW YOU&apos;RE SEEING THIS RN &amp; AIN&apos;T SUB YET?...CRAZY<span className="arrow">→</span></p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
