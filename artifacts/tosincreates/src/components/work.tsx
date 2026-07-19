import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Grid2x2, List } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'IT Chic Travels',
    desc: 'Luxury travel boutique with cinematic storytelling.',
    image: 'https://tosincreates.com/assets/images/it_chic_logo.png',
    badge: 'live',
    tags: ['Luxury UX', 'GSAP'],
    url: 'https://itchictravels.netlify.app/',
  },
  {
    id: 2,
    title: 'PureHearted Studioz',
    desc: 'Minimalist, high-performance studio platform.',
    image: 'https://tosincreates.com/assets/images/purehearted_logo_v2.png',
    badge: 'new',
    tags: ['Clean UI', 'Vite'],
    url: 'https://pureheartedstudioz.com',
  },
  {
    id: 3,
    title: 'BeautyybyyKiKi',
    desc: 'Professional booking & portfolio for hair artistry.',
    image: 'https://tosincreates.com/assets/images/beautyybyykiki_logo_v2.png',
    badge: 'deployed',
    tags: ['Booking', 'Branding'],
    url: 'https://tosinirl.github.io/beautyybyykiki/',
  },
  {
    id: 4,
    title: 'Payless Moving',
    desc: 'Refined logistics for local delivery excellence.',
    image: 'https://tosincreates.com/assets/images/payless_logo.png',
    badge: 'active',
    tags: ['SEO', 'Forms'],
    url: 'https://tosinirl.github.io/PAYLESSMOVING/',
  },
];

export function Work() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <section className="py-24" id="work">
      <div className="container mx-auto px-6">
        
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-xl">
            <div className="font-mono text-xs font-bold tracking-[0.2em] text-primary mb-4 uppercase">Project Matrix</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4">DEPLOYED ECOSYSTEMS</h2>
            <p className="text-white/60 text-lg font-light">
              A curated selection of high-fidelity digital assets engineered for elite brands.
            </p>
          </div>
          
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-lg">
            <button
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-widest rounded transition-colors ${view === 'grid' ? 'bg-primary text-white' : 'text-white/40 hover:text-white'}`}
              onClick={() => setView('grid')}
            >
              <Grid2x2 size={14} /> GRID
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-widest rounded transition-colors ${view === 'list' ? 'bg-primary text-white' : 'text-white/40 hover:text-white'}`}
              onClick={() => setView('list')}
            >
              <List size={14} /> LIST
            </button>
          </div>
        </motion.div>

        <div className={`grid gap-8 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          {PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.id}
              className={`project-card glass-card rounded-2xl flex ${view === 'list' ? 'flex-col sm:flex-row items-center p-6 gap-8' : 'flex-col'}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: (idx % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`project-card-image-wrap bg-black ${view === 'list' ? 'w-full sm:w-1/3 aspect-[4/3] rounded-xl' : 'w-full aspect-[16/9] border-b border-white/10'}`}>
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover project-img transition-transform duration-700 ease-out" 
                  onError={(e) => {
                    // Fallback if the original URLs 404
                    e.currentTarget.src = `https://placehold.co/800x600/111/444?text=${proj.title.replace(' ', '+')}&font=Montserrat`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-6">
                  <div className="self-end">
                    <span className="font-mono text-[10px] tracking-widest px-3 py-1 bg-primary/90 text-white rounded uppercase shadow-[0_0_15px_rgba(255,42,42,0.5)]">
                      {proj.badge}
                    </span>
                  </div>
                  {view === 'grid' && (
                    <div className="flex gap-2">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] tracking-wider px-2 py-1 bg-black/50 backdrop-blur border border-white/20 text-white/80 rounded uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className={`flex flex-col justify-center ${view === 'list' ? 'w-full sm:w-2/3' : 'p-8'}`}>
                <h3 className="text-3xl text-white mb-3">{proj.title}</h3>
                <p className="text-white/60 font-light mb-8 leading-relaxed max-w-md">{proj.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  {view === 'list' && (
                    <div className="flex gap-2">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] tracking-wider px-2 py-1 bg-white/5 border border-white/10 text-white/60 rounded uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <a 
                    href={proj.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-white transition-colors tracking-widest group uppercase"
                  >
                    View Project <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
