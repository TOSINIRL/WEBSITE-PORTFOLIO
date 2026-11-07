import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, MoveHorizontal, Search, Sparkles } from 'lucide-react';
import { ProjectModal } from './project-modal';
import { soundEngine } from '@/lib/audio';

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  detailedOverview?: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  stats?: Record<string, string>;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "beautyybyykiki",
    title: "BeautyybyyKiKi",
    subtitle: "Luxury Hair Studio Website",
    category: "Brand & UI",
    description: "High-fashion website for a professional hair styling brand, with a matte gold and deep black design system, service showcase and booking-ready layout.",
    detailedOverview: "A premium brand site for a Black-owned hair studio featuring glassmorphism buttons and cards, scroll-triggered reveal animations, a high-resolution braids, twists and locs service gallery, and an email confirmation template. Built with vanilla HTML, CSS and JavaScript and fully responsive.",
    image: "/projects/beautyybyykiki-cover.jpg",
    tags: ["Responsive"],
    link: "https://beautyybyykiki.com",
    github: "https://github.com/TOSINIRL/BEAUTYBYKIKI",
    stats: {
      "Stack": "Vanilla JS",
      "Hosting": "Netlify"
    }
  },
  {
    id: "pure-heart-studios",
    title: "Pure Heart Studios",
    subtitle: "Premium Hair Care & Styling",
    category: "Brand & UI",
    description: "Clean, conversion-focused website for a braiding and locs studio, with a service menu, stylist profile and image gallery.",
    detailedOverview: "A responsive studio website presenting braids, twists and starter locs services with a stylist profile, photo gallery and a streamlined booking flow. Built with HTML, CSS and JavaScript and deployed on Netlify.",
    image: "/projects/pure-heart-studios-cover.jpg",
    tags: ["Responsive"],
    link: "https://pureheartedstudios.netlify.app",
    github: "https://github.com/TOSINIRL/PUREHEARTSTUDIOS",
    stats: {
      "Stack": "Vanilla JS",
      "Hosting": "Netlify"
    }
  }
];


export function Work() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState(-1);
  const wasDraggedRef = useRef(false);
  const dragClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const projects: Project[] = FALLBACK_PROJECTS;

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" ||
      project.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });
  const activeIndex = filteredProjects.length
    ? activeProjectIndex % filteredProjects.length
    : 0;
  const activeProject = filteredProjects[activeIndex];

  const shuffleProjects = (direction: -1 | 1) => {
    if (filteredProjects.length < 2) return;
    setExitDirection(direction === 1 ? -1 : 1);
    setActiveProjectIndex((current) =>
      (current + direction + filteredProjects.length) % filteredProjects.length,
    );
  };

  const handleSwipeEnd = (
    offsetX: number,
    velocityX: number,
  ) => {
    if (Math.abs(offsetX) < 90 && Math.abs(velocityX) < 500) return;
    shuffleProjects(offsetX < 0 || velocityX < -500 ? 1 : -1);
  };

  const handleCardClick = (project: Project) => {
    soundEngine.playClick();
    setActiveProjectModal(project);
  };

  return (
    <section className="py-28 relative" id="work">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-2xl">
            <div className="font-mono text-xs font-bold tracking-[0.25em] text-cyan-400 mb-3 uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              PORTFOLIO MATRIX
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white tracking-wider mb-4">
              DEPLOYED ECOSYSTEMS
            </h2>
            <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed">
              Curated selection of high-fidelity digital platforms, autonomous AI agent pipelines, and interactive cybernetic web systems.
            </p>
          </div>

        </motion.div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search matrix..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/10 focus:border-cyan-500/50 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.2em] text-slate-500 uppercase">
            <MoveHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
            Drag to shuffle
          </div>
        </div>

        {/* Swipeable project deck */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 text-slate-500 font-mono text-sm">
            NO_PROJECTS_FOUND_MATCHING_FILTER
          </div>
        ) : (
          <div className="relative mx-auto max-w-5xl px-3 pb-8">
            {filteredProjects.length > 1 && (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-x-7 inset-y-0 translate-y-4 rounded-2xl border border-white/10 bg-slate-900/80"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-4 inset-y-0 translate-y-2 rounded-2xl border border-white/10 bg-slate-950/90"
                />
              </>
            )}

            <div
              role="region"
              aria-roledescription="card carousel"
              aria-label="Projects. Drag a card left or right to browse."
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  shuffleProjects(-1);
                } else if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  shuffleProjects(1);
                }
              }}
              className="relative z-10 touch-pan-y rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <p className="sr-only" aria-live="polite">
                Project {activeIndex + 1} of {filteredProjects.length}: {activeProject.title}
              </p>
              <AnimatePresence initial={false} mode="wait" custom={exitDirection}>
                <motion.div
                  key={activeProject.id}
                  custom={exitDirection}
                  variants={{
                    exit: (direction: number) => ({
                      x: direction * 700,
                      rotate: direction * 12,
                      opacity: 0,
                      transition: { duration: 0.28, ease: 'easeIn' },
                    }),
                  }}
                  initial={{ x: 0, opacity: 1 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit="exit"
                  drag={filteredProjects.length > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.75}
                  whileDrag={{ rotate: 2, scale: 0.98, cursor: 'grabbing' }}
                  onDragStart={() => {
                    wasDraggedRef.current = true;
                  }}
                  onDragEnd={(_, info) => {
                    handleSwipeEnd(info.offset.x, info.velocity.x);
                    dragClickTimeoutRef.current = setTimeout(() => {
                      wasDraggedRef.current = false;
                    }, 150);
                  }}
                  onClick={() => {
                    if (wasDraggedRef.current) {
                      wasDraggedRef.current = false;
                      if (dragClickTimeoutRef.current) {
                        clearTimeout(dragClickTimeoutRef.current);
                      }
                      return;
                    }
                    handleCardClick(activeProject);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="group relative flex cursor-grab flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-[0_20px_70px_rgba(0,0,0,0.5)] active:cursor-grabbing scanline"
                >
                    {/* Image */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-white/10 bg-slate-900">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                        <span className="font-mono text-[10px] tracking-widest px-2.5 py-1 bg-slate-900/80 backdrop-blur border border-cyan-500/40 text-cyan-300 rounded uppercase font-bold">
                          {activeProject.category}
                        </span>
                        {activeProject.featured && (
                          <span className="font-mono text-[10px] tracking-widest px-2.5 py-1 bg-red-500/80 text-white rounded uppercase font-bold shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                            FEATURED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1 p-6">
                      <div>
                        <h3 className="text-2xl font-display text-white group-hover:text-cyan-300 transition-colors uppercase mb-2">
                          {activeProject.title}
                        </h3>
                        <p className="text-slate-400 text-sm font-sans line-clamp-2 leading-relaxed mb-6">
                          {activeProject.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex flex-wrap gap-1.5">
                          {activeProject.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] tracking-wider px-2 py-0.5 bg-slate-900 border border-white/10 text-slate-400 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <a
                          href={activeProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold group-hover:translate-x-1 transition-transform"
                        >
                          Visit Site <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative z-10 mt-4 flex justify-center gap-1.5" aria-hidden="true">
              {filteredProjects.map((project, index) => (
                <span
                  key={project.id}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-7 bg-primary' : 'w-1.5 bg-white/25'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Project Modal Deep Dive */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
}
