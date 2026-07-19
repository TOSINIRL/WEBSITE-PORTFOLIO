const ITEMS = ['GSAP', 'JAVASCRIPT', 'NEXT.JS', 'AGENTIC AI', 'UX DESIGN', 'LUXURY CODE'];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="marquee-container py-8 md:py-12 my-10 relative">
      {/* Edge gradients to mask the scroll */}
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="marquee-content flex items-center">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="marquee-item">{item}</span>
            <span className="mx-4 md:mx-8 text-primary/50 text-xl font-display">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
