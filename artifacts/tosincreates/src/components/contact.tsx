import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-40 px-6 md:px-12 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between"
          >
            <div>
              <h2 className="text-6xl md:text-[8vw] font-display font-extrabold leading-none tracking-tighter uppercase mb-6">
                Let's Make<br/><span className="text-primary">Something.</span>
              </h2>
              <a 
                href="mailto:hello@tosincreates.com" 
                className="inline-flex items-center gap-4 text-xl md:text-3xl font-light hover:text-primary transition-colors duration-300 group"
              >
                hello@tosincreates.com
                <span className="p-3 bg-secondary rounded-full group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                  <ArrowUpRight className="w-6 h-6" />
                </span>
              </a>
            </div>

            <div className="mt-20 flex gap-6">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Mail, href: "mailto:hello@tosincreates.com" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-14 h-14 border border-border flex items-center justify-center rounded-full hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 cursor-pointer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <form className="flex flex-col gap-10 mt-4 md:mt-0" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input 
                  type="text" 
                  id="name"
                  className="w-full bg-transparent border-b border-border/50 py-4 text-xl focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                  placeholder="Your Name"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 -top-6 text-sm font-mono text-muted-foreground uppercase tracking-widest peer-focus:text-primary transition-colors peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-sm"
                >
                  What's your name?
                </label>
              </div>

              <div className="relative group mt-6">
                <input 
                  type="email" 
                  id="email"
                  className="w-full bg-transparent border-b border-border/50 py-4 text-xl focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                  placeholder="Your Email"
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 -top-6 text-sm font-mono text-muted-foreground uppercase tracking-widest peer-focus:text-primary transition-colors peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-sm"
                >
                  What's your email?
                </label>
              </div>

              <div className="relative group mt-6">
                <textarea 
                  id="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-border/50 py-4 text-xl focus:outline-none focus:border-primary transition-colors peer placeholder-transparent resize-none"
                  placeholder="Your Message"
                />
                <label 
                  htmlFor="message" 
                  className="absolute left-0 -top-6 text-sm font-mono text-muted-foreground uppercase tracking-widest peer-focus:text-primary transition-colors peer-placeholder-shown:text-xl peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-sm"
                >
                  Tell me about the project
                </label>
              </div>

              <button className="self-start mt-8 flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300">
                Send Message <ArrowUpRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
