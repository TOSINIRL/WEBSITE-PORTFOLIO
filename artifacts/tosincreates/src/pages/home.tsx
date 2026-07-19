import { useState } from 'react';
import { Preloader } from '@/components/preloader';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Marquee } from '@/components/marquee';
import { Work } from '@/components/work';
import { SocialLinks } from '@/components/social-links';
import { Contact } from '@/components/contact';
import { SystemInfra } from '@/components/system-infra';
import { Footer } from '@/components/footer';

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <div className="noise-overlay" />
      <Preloader onComplete={() => setReady(true)} />

      {/* Fade in main content after preloader */}
      <div
        style={{
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.6s ease',
          visibility: ready ? 'visible' : 'hidden',
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Marquee />
          <Work />
          <SocialLinks />
          <Contact />
          <SystemInfra />
        </main>
        <Footer />
      </div>
    </>
  );
}
