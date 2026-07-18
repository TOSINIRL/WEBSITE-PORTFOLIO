import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-12 bg-secondary/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        <div className="w-full md:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-[4/5] relative overflow-hidden bg-muted"
          >
            <div className="absolute inset-0 bg-primary mix-blend-overlay opacity-20 z-10 pointer-events-none"></div>
            <img 
              src="/about-portrait.jpg" 
              alt="Tosin Portrait" 
              className="w-full h-full object-cover grayscale brightness-75 contrast-125"
            />
          </motion.div>
          {/* Abstract decorative elements */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 -left-6 w-1 bg-primary z-20"
          />
        </div>

        <div className="w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-8">The Architect</h2>
            <p className="text-3xl md:text-5xl font-display font-medium leading-[1.1] tracking-tight text-foreground mb-8">
              I am a creative director and digital artist obsessed with the intersection of motion, technology, and culture.
            </p>
            <p className="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed">
              I don't just build interfaces; I craft cinematic digital environments that demand attention. Every pixel is intentional. Every interaction is a performance.
            </p>
            
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-8">
              <div>
                <h4 className="text-3xl font-display font-bold text-white">05+</h4>
                <p className="text-xs uppercase font-mono tracking-widest text-muted-foreground mt-2">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-display font-bold text-white">Awwwards</h4>
                <p className="text-xs uppercase font-mono tracking-widest text-muted-foreground mt-2">Site of the Day</p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
