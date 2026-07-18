export function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono text-muted-foreground uppercase tracking-widest">
        <div>
          © {new Date().getFullYear()} Tosin Creates
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
