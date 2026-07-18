import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center text-center px-4 max-w-md">
        <AlertCircle className="w-16 h-16 text-primary mb-6" />
        <h1 className="text-4xl font-display font-bold mb-4 uppercase tracking-tighter">404 - Not Found</h1>
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mb-8">
          The page you're looking for has drifted into the void.
        </p>
        <Link 
          href="/" 
          className="bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300 inline-flex"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
