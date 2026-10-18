import { Router, type IRouter } from "express";

const router: IRouter = Router();

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  detailedOverview: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  stats?: Record<string, string>;
}

const PROJECTS: ProjectData[] = [
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
    id: "vector-soundscape",
    title: "Vector Soundscape Visualizer",
    subtitle: "Real-Time Spatial Audio Engine",
    category: "Creative Tech",
    description: "Interactive audio visualizer translating micro-beats and vocal harmonics into high-resolution reactive vector canvases.",
    detailedOverview: "Vector Soundscape converts frequency spectrum analyzer data into smooth parametric bezier curves and particle bursts using Canvas2D and Web Audio API node graphs.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    tags: ["Web Audio API", "HTML5 Canvas", "DSP", "TypeScript"],
    link: "https://tosincreates.com",
    github: "https://github.com/tosincreates/vector-soundscape",
    featured: false,
    stats: {
      "Sample Rate": "48 kHz",
      "Latency": "< 5ms"
    }
  },
  {
    id: "prism-brand-suite",
    title: "Prism Brand Identity & Systems",
    subtitle: "Futuristic Brand Visual Architecture",
    category: "Brand & UI",
    description: "End-to-end design language, brand identity, 3D motion graphics, and interactive design guidelines for modern tech platforms.",
    detailedOverview: "Crafted a comprehensive design system featuring custom variable typography, neon chromatic palettes, responsive 3D assets, and interactive component libraries.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Figma", "Blender", "Design System", "Brand Identity"],
    link: "https://tosincreates.com",
    github: "https://github.com/tosincreates/prism-brand",
    featured: false,
    stats: {
      "Components": "120+",
      "Platforms": "Web, iOS, Android"
    }
  }
];

router.get("/projects", (req, res) => {
  const category = (req.query.category as string || "").toLowerCase();
  const search = (req.query.search as string || "").toLowerCase();

  let results = PROJECTS;

  if (category && category !== "all") {
    results = results.filter((p) => p.category.toLowerCase() === category);
  }

  if (search) {
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.tags.some((t) => t.toLowerCase().includes(search))
    );
  }

  res.json(results);
});

export default router;
