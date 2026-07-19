import { motion } from 'framer-motion';
import { FaDiscord, FaYoutube } from 'react-icons/fa';

export function SocialLinks() {
  return (
    <section className="py-24 relative overflow-hidden" id="socials">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.a
            href="https://discord.gg/RSez8hxtJS"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card rounded-2xl p-10 flex items-center gap-8 relative overflow-hidden border-white/10 hover:border-[#5865F2]/50 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-[#5865F2] rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
            
            <div className="w-20 h-20 rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/30 flex items-center justify-center text-4xl text-[#5865F2] group-hover:scale-110 transition-transform duration-500 shrink-0">
              <FaDiscord />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl text-white mb-2">Discord</h3>
              <p className="font-mono text-xs tracking-widest text-white/50 group-hover:text-white/80 transition-colors uppercase flex items-center gap-2">
                JOIN THE LITTEST FUNCTION <span className="text-[#5865F2] text-lg leading-none group-hover:translate-x-2 transition-transform">→</span>
              </p>
            </div>
          </motion.a>

          <motion.a
            href="https://youtube.com/@tosinirl?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card rounded-2xl p-10 flex items-center gap-8 relative overflow-hidden border-white/10 hover:border-[#FF0000]/50 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-[#FF0000] rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
            
            <div className="w-20 h-20 rounded-2xl bg-[#FF0000]/10 border border-[#FF0000]/30 flex items-center justify-center text-4xl text-[#FF0000] group-hover:scale-110 transition-transform duration-500 shrink-0">
              <FaYoutube />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl text-white mb-2">YouTube</h3>
              <p className="font-mono text-[10px] sm:text-xs tracking-widest text-white/50 group-hover:text-white/80 transition-colors uppercase flex items-center gap-2">
                NOT SUBBED YET? CRAZY <span className="text-[#FF0000] text-lg leading-none group-hover:translate-x-2 transition-transform">→</span>
              </p>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
}
