import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Work } from '@/components/work';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left" 
        style={{ scaleX }} 
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
