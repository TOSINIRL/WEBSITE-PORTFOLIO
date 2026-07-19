import { motion } from 'framer-motion';
import { FaDiscord, FaYoutube } from 'react-icons/fa';

export function Contact() {
  return (
    <section className="py-32 relative" id="contact">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="glass-card scanline-animated rounded-3xl p-12 md:p-20 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] border-t border-primary/20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-center mb-8">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 px-6 py-2 rounded-full uppercase">
              Direct Uplink
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl mb-6 leading-tight">
            INITIATE <br className="hidden md:block"/>
            <span className="text-gradient-red">PROTOCOL</span>
          </h2>
          
          <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto">
            Allocating bandwidth for visionary brands and high-end collaborations. System ready for deployment.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <a href="mailto:contact@tosincreates.com" className="btn-cyber w-full sm:w-auto text-lg px-12 py-5">
              Start Transmission
            </a>
          </div>
          
          <div className="flex justify-center items-center gap-6">
            <a
              href="https://discord.gg/RSez8hxtJS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#5865F2]/10 hover:border-[#5865F2]/50 hover:text-[#5865F2] transition-all duration-300 font-mono text-xs tracking-widest uppercase group text-white/70"
            >
              <FaDiscord className="text-xl group-hover:scale-110 transition-transform" />
              <span>Discord</span>
            </a>
            <a
              href="https://youtube.com/@tosinirl?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#FF0000]/10 hover:border-[#FF0000]/50 hover:text-[#FF0000] transition-all duration-300 font-mono text-xs tracking-widest uppercase group text-white/70"
            >
              <FaYoutube className="text-xl group-hover:scale-110 transition-transform" />
              <span>YouTube</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
