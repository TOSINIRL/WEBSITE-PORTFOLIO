import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Grid2x2, List, Search, Sparkles } from 'lucide-react';
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
    id: "social-nexus-v3",
    title: "Social Nexus v3",
    subtitle: "Next-Gen Creative Operations Engine",
    category: "Web App",
    description: "Distributed content orchestration, real-time analytics, and automated multi-channel publishing hub built for high-throughput creators.",
    detailedOverview: "Social Nexus v3 unifies content production, cross-platform scheduling, real-time engagement telemetry, and AI voice clone synthesis into a zero-latency web suite. Features custom WebGL dynamic visuals, WebSockets streaming status, and modular workspace views.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tags: ["React 19", "TypeScript", "Express", "TailwindCSS", "WebGL"],
    link: "https://tosincreates.com",
    github: "https://github.com/tosincreates/social-nexus",
    featured: true,
    stats: {
      "Active Nodes": "1,420+",
      "Latency": "14ms",
      "Uptime": "99.99%"
    }
  },
  {
    id: "neural-mesh-ui",
    title: "Neural Mesh UI System",
    subtitle: "Adaptive Cybernetic Design Framework",
    category: "Creative Tech",
    description: "Generative UI system leveraging WebGL shaders and real-time sensory audio feedback to create organic visual state machines.",
    detailedOverview: "Designed to explore natural user interfaces for spatial computing and high-density creative workstations. Neural Mesh UI features dynamic glassmorphic shaders, spring-based physics micro-interactions, and adaptive dark palette curves.",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    tags: ["Three.js", "GLSL Shaders", "Web Audio API", "Design System"],
    link: "https://tosincreates.com",
    github: "https://github.com/tosincreates/neural-mesh-ui",
    featured: true,
    stats: {
      "FPS": "60-120 FPS",
      "Bundle Size": "18.4 KB",
      "Stars": "840+"
    }
  },
  {
    id: "hyper-agent-flow",
    title: "HyperAgent Orchestrator",
    subtitle: "Autonomous Multi-Agent AI Pipeline",
    category: "AI / ML",
    description: "Low-latency multi-agent orchestration framework for automated research, code synthesis, and multi-modal creative assets.",
    detailedOverview: "HyperAgent Orchestrator coordinates concurrent LLM subagents, automated sandboxed code execution, web scraping pipelines, and structured JSON schemas to automate complex digital production workflows.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    tags: ["Python", "TypeScript", "FastAPI", "Gemini API", "Docker"],
    link: "https://tosincreates.com",
    github: "https://github.com/tosincreates/hyperagent",
    featured: true,
    stats: {
      "Concurrency": "50 agents",
      "Task Throughput": "12k/hr",
      "Accuracy": "99.2%"
    }
  },
  {
    id: "itchic-travels",
    title: "IT Chic Travels",
    subtitle: "Luxury Travel Boutique & Concierge",
    category: "Web App",
    description: "Luxury travel boutique platform with cinematic visual storytelling, custom booking flows, and curated itineraries.",
    detailedOverview: "High-end bespoke travel portal offering seamless interactive destination discovery, real-time concierge chat, and responsive animation loops.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Luxury UX", "GSAP", "React", "TailwindCSS"],
    link: "https://itchictravels.netlify.app/",
    stats: {
      "Client Satisfaction": "100%",
      "Conversion": "+45%"
    }
  },
  {
    id: "purehearted-studioz",
    title: "PureHearted Studioz",
    subtitle: "Minimalist Studio Platform",
    category: "Brand & UI",
    description: "Minimalist, high-performance creative studio platform featuring high-density portfolio galleries and dark mode aesthetics.",
    detailedOverview: "High-impact visual showcase for elite brand storytelling, media production, and sound design portfolio presentation.",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    tags: ["Clean UI", "Vite", "Design System"],
    link: "https://pureheartedstudioz.com",
    stats: {
      "Performance": "99/100",
      "LCP": "0.4s"
    }
  },
  {
    id: "beautyybyykiki",
    title: "BeautyybyyKiKi",
    subtitle: "Luxury Hair Studio Website",
    category: "Brand & UI",
    description: "High-fashion website for a professional hair styling brand, with a matte gold and deep black design system, service showcase and booking-ready layout.",
    detailedOverview: "A premium brand site for a Black-owned hair studio featuring glassmorphism buttons and cards, scroll-triggered reveal animations, a high-resolution braids, twists and locs service gallery, and an email confirmation template. Built with vanilla HTML, CSS and JavaScript and fully responsive.",
    image: "/projects/beautyybyykiki-cover.jpg",
    tags: ["HTML5", "CSS3", "JavaScript", "Netlify", "Responsive"],
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
    tags: ["HTML5", "CSS3", "JavaScript", "Netlify", "Responsive"],
    link: "https://pureheartedstudios.netlify.app",
    github: "https://github.com/TOSINIRL/PUREHEARTSTUDIOS",
    stats: {
      "Stack": "Vanilla JS",
      "Hosting": "Netlify"
    }
  }
];

const CATEGORIES = ["All", "Web App", "AI / ML", "Creative Tech", "Brand & UI"];

export function Work() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

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

          <div className="flex flex-wrap items-center gap-3">
            {/* View Switcher */}
            <div className="flex bg-slate-900/90 border border-white/10 p-1 rounded-xl">
              <button
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono tracking-wider rounded-lg transition-colors ${
                  view === 'grid' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                onClick={() => {
                  soundEngine.playClick();
                  setView('grid');
                }}
              >
                <Grid2x2 size={14} /> GRID
              </button>
              <button
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono tracking-wider rounded-lg transition-colors ${
                  view === 'list' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                onClick={() => {
                  soundEngine.playClick();
                  setView('list');
                }}
              >
                <List size={14} /> LIST
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(255,62,62,0.25)]'
                    : 'bg-slate-900/60 text-slate-400 border border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

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
        </div>

        {/* Projects Grid / List */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 text-slate-500 font-mono text-sm">
            NO_PROJECTS_FOUND_MATCHING_FILTER
          </div>
        ) : (
          <div className={`grid gap-8 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProjects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                onClick={() => handleCardClick(proj)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`group cursor-pointer rounded-2xl bg-slate-950/80 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,62,62,0.15)] flex flex-col justify-between overflow-hidden scanline ${
                  view === 'list' ? 'sm:flex-row sm:items-center p-6 gap-6' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Image Wrap */}
                <div
                  className={`relative overflow-hidden bg-slate-900 ${
                    view === 'list'
                      ? 'w-full sm:w-1/3 aspect-[16/10] rounded-xl'
                      : 'w-full aspect-[16/10] border-b border-white/10'
                  }`}
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                    <span className="font-mono text-[10px] tracking-widest px-2.5 py-1 bg-slate-900/80 backdrop-blur border border-cyan-500/40 text-cyan-300 rounded uppercase font-bold">
                      {proj.category}
                    </span>
                    {proj.featured && (
                      <span className="font-mono text-[10px] tracking-widest px-2.5 py-1 bg-red-500/80 text-white rounded uppercase font-bold shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                        FEATURED
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className={`flex flex-col justify-between flex-1 ${view === 'list' ? 'w-full sm:w-2/3' : 'p-6'}`}>
                  <div>
                    <h3 className="text-2xl font-display text-white group-hover:text-cyan-300 transition-colors uppercase mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-sans line-clamp-2 leading-relaxed mb-6">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] tracking-wider px-2 py-0.5 bg-slate-900 border border-white/10 text-slate-400 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                      Inspect <ExternalLink size={13} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
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
