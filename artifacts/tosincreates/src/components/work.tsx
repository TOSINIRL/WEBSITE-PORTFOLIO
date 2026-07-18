import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const projects = [
  {
    id: 1,
    title: "Echoes of Void",
    category: "Brand Identity",
    image: "/projects/project1.jpg",
    className: "md:col-span-8 md:row-span-2 aspect-[4/3] md:aspect-[16/9]"
  },
  {
    id: 2,
    title: "Cybernetics",
    category: "Motion",
    image: "/projects/project2.jpg",
    className: "md:col-span-4 md:row-span-1 aspect-square md:aspect-auto md:h-[400px]"
  },
  {
    id: 3,
    title: "Form & Flow",
    category: "Digital Art",
    image: "/projects/project3.jpg",
    className: "md:col-span-4 md:row-span-1 aspect-square md:aspect-auto md:h-[400px]"
  },
  {
    id: 4,
    title: "Brutal",
    category: "UI/UX",
    image: "/projects/project4.jpg",
    className: "md:col-span-4 md:row-span-2 aspect-[3/4] md:aspect-[3/4]"
  },
  {
    id: 5,
    title: "Obsidian Dreams",
    category: "Concept",
    image: "/projects/project5.jpg",
    className: "md:col-span-8 md:row-span-1 aspect-[16/9]"
  },
  {
    id: 6,
    title: "Lumen",
    category: "Brand Identity",
    image: "/projects/project6.jpg",
    className: "md:col-span-8 md:row-span-1 aspect-[16/9]"
  }
];

export function Work() {
  return (
    <section id="work" className="py-24 md:py-40 px-6 md:px-12 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex items-end justify-between"
        >
          <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter">Selected<br/><span className="text-stroke">Works</span></h2>
          <span className="hidden md:block text-muted-foreground font-mono text-sm">( 01 — 06 )</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-min">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn("group relative block overflow-hidden bg-card cursor-pointer", project.className)}
    >
      <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
      
      <motion.div style={{ y }} className="absolute inset-[-20%] w-[140%] h-[140%] bg-muted">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover scale-[0.85] group-hover:scale-100 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
        />
      </motion.div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
          <p className="text-primary font-mono text-xs uppercase tracking-widest mb-2">{project.category}</p>
          <h3 className="text-2xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">{project.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}
