import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center px-6 md:px-12 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary blur-[150px] rounded-full" />
      </div>

      <div className="z-10 w-full max-w-7xl mx-auto flex flex-col items-start">
        <div className="overflow-hidden mb-2">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[8vw] font-display font-extrabold leading-none tracking-tighter uppercase"
          >
            Visual
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6 flex items-center gap-4 md:gap-8">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[12vw] md:text-[8vw] font-display font-extrabold leading-none tracking-tighter uppercase text-stroke"
          >
            Defiance
          </motion.h1>
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="hidden md:block w-32 h-4 bg-primary rounded-full"
          />
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed"
        >
          Designing digital experiences that refuse to be ignored. 
          Cinematic environments, bold identities, and unapologetic craft.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-primary"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Currently taking new projects
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
        <div className="w-[1px] h-12 bg-border relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
