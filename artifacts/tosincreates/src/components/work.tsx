import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Grid2x2, List } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'IT Chic Travels',
    desc: 'Luxury travel boutique with cinematic storytelling.',
    image: 'https://tosincreates.com/assets/images/it_chic_logo.png',
    badge: 'live' as const,
    tags: ['Luxury UX', 'GSAP'],
    url: 'https://itchictravels.netlify.app/',
  },
  {
    id: 2,
    title: 'PureHearted Studioz',
    desc: 'Minimalist, high-performance studio platform.',
    image: 'https://tosincreates.com/assets/images/purehearted_logo_v2.png',
    badge: 'new' as const,
    tags: ['Clean UI', 'Vite'],
    url: 'https://pureheartedstudioz.com',
  },
  {
    id: 3,
    title: 'BeautyybyyKiKi',
    desc: 'Professional booking & portfolio for hair artistry.',
    image: 'https://tosincreates.com/assets/images/beautyybyykiki_logo_v2.png',
    badge: 'deployed' as const,
    tags: ['Booking', 'Branding'],
    url: 'https://tosinirl.github.io/beautyybyykiki/',
  },
  {
    id: 4,
    title: 'Payless Moving',
    desc: 'Refined logistics for local delivery excellence.',
    image: 'https://tosincreates.com/assets/images/payless_logo.png',
    badge: 'active' as const,
    tags: ['SEO', 'Forms'],
    url: 'https://tosinirl.github.io/PAYLESSMOVING/',
  },
];

export function Work() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <section className="work" id="work">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2>Featured Case Studies</h2>
          <p>Selection of high-end digital solutions for ambitious brands.</p>
          <div className="view-controls">
            <button
              className={`view-btn${view === 'grid' ? ' active' : ''}`}
              onClick={() => setView('grid')}
            >
              <Grid2x2 size={12} /> GRID
            </button>
            <button
              className={`view-btn${view === 'list' ? ' active' : ''}`}
              onClick={() => setView('list')}
            >
              <List size={12} /> LIST
            </button>
          </div>
        </motion.div>

        <div className={`project-grid${view === 'list' ? ' list-view' : ''}`}>
          {PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.id}
              className="project-card dashboard-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="card-image-wrapper">
                <img src={proj.image} alt={proj.title} className="project-img" />
                <div className="card-overlay">
                  <span className={`card-badge ${proj.badge}`}>{proj.badge.toUpperCase()}</span>
                  <div className="card-tags">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card-info">
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
                <a href={proj.url} className="card-btn" target="_blank" rel="noopener noreferrer">
                  View Project <ExternalLink size={11} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
