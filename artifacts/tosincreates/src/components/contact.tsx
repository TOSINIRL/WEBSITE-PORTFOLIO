import { motion } from 'framer-motion';

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
          <div className="contact-inner">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
