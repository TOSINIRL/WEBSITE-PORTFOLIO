const ITEMS = ['GSAP', 'JAVASCRIPT', 'NEXT.JS', 'AGENTIC AI', 'UX DESIGN', 'LUXURY CODE'];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="tech-marquee-wrap">
      <div className="tech-marquee">
        <div className="marquee-content">
          {doubled.map((item, i) => (
            <span key={i} className={item === '•' ? 'dot' : undefined}>
              {item}
            </span>
          ))}
          {/* Separator dots between items (inline) */}
        </div>
      </div>
    </div>
  );
}
