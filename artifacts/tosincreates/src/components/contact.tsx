import { motion } from 'framer-motion';
import { FaDiscord, FaYoutube } from 'react-icons/fa';

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-top" style={{ justifyContent: 'center' }}>
            <span className="about-eyebrow">Direct Uplink</span>
          </div>
          <h2 className="contact-heading">
            Ready to Build<br />
            <span className="about-heading-highlight">Excellence?</span>
          </h2>
          <p className="contact-desc">
            Currently accepting premium projects and high-end collaborations for 2026.
          </p>
          <div className="contact-btns">
            <a href="mailto:contact@tosincreates.com" className="btn btn-primary">
              Start Transmission
            </a>
          </div>
          <div className="social-pills">
            <a
              href="https://discord.gg/RSez8hxtJS"
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill dc"
            >
              <i><FaDiscord /></i>
              <span className="social-label">Discord</span>
            </a>
            <a
              href="https://youtube.com/@tosinirl?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill yt"
            >
              <i><FaYoutube /></i>
              <span className="social-label">YouTube</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
