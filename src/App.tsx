import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "motion/react";
import { 
  Github, 
  Mail, 
  Terminal, 
  ChevronDown,
  Send,
  CheckCircle2,
  Loader2,
  ArrowUp
} from "lucide-react";
import React, { useState, useEffect } from "react";

// Types for our data
interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
  link?: string;
  github?: string;
}

interface PortfolioData {
  name: string;
  tagline: string;
  bio: string;
  skills: string[];
  categories: string[];
  projects: Project[];
  socials: {
    github: string;
    email: string;
  };
}

// Initial placeholder data
const DEFAULT_DATA: PortfolioData = {
  name: "Flazzy",
  tagline: "Digitale Erlebnisse mit Präzision & Flair",
  bio: "Ich bin ein Software-Entwickler mit Fokus auf saubere, performante und nutzerzentrierte Anwendungen. Ich liebe es, komplexe Probleme mit elegantem Code zu lösen.",
  skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Python", "Lua", "Debian", "Linux", "Supabase", "VSCode", "Antigravity", "Docker"],
  categories: ["Alle", "FiveM", "Web", "Hosting", "System", "Bots", "Tools"],
  projects: [
    {
      id: "nc",
      category: "Hosting",
      title: "Nextcloud Hosting",
      description: "Eigene Nextcloud-Instanz für sichere Datenverwaltung, Kalender-Synchronisation und Cloud-Storage.",
      tech: ["PHP", "MySQL", "Linux"]
    },
    {
      id: "odoo",
      category: "Hosting",
      title: "Odoo Cloud",
      description: "Deployment und Management einer Odoo ERP-Lösung in der Cloud für optimierte Geschäftsprozesse.",
      tech: ["Python", "PostgreSQL", "Docker"]
    },
    {
      id: "cd",
      category: "Tools",
      title: "PC Cheat Detector",
      description: "Ein spezialisiertes Tool zur Erkennung von Manipulationen und Third-Party Software auf Windows-Systemen.",
      tech: ["C++", "WinAPI"]
    },
    {
      id: "bt",
      category: "FiveM",
      title: "FiveM Ban Tool",
      description: "Globales Ban-System für FiveM Communities, um Cheater effektiv und dauerhaft auszuschließen.",
      tech: ["Node.js", "Lua", "Supabase"]
    },
    {
      id: "dw",
      category: "Web",
      title: "Discord Wrapped",
      description: "Eine Web-Anwendung, die Discord-Statistiken für Server-Communities visuell ansprechend aufbereitet.",
      tech: ["React", "D3.js", "Discord API"]
    },
    {
      id: "1",
      category: "FiveM",
      title: "FiveM Server",
      description: "Hosting und Management eines eigenen FiveM Servers mit Fokus auf Performance und Stabilität.",
      tech: ["Linux", "FiveM", "MySQL"]
    },
    {
      id: "2",
      category: "Hosting",
      title: "Datenbank Hosting",
      description: "Skalierbarer Hosting-Service für Datenbanken (PostgreSQL/MySQL) mit automatischer Optimierung.",
      tech: ["Docker", "PostgreSQL", "Debian"]
    },
    {
      id: "3",
      category: "Web",
      title: "100% E2E Chat",
      description: "Ein absolut sicherer Messenger mit vollständiger Ende-zu-Ende-Verschlüsselung der Nachrichten.",
      tech: ["Node.js", "Cryptography", "React"]
    },
    {
      id: "4",
      category: "Hosting",
      title: "Debian Server & Pterodactyl",
      description: "Einrichtung und Verwaltung eines eigenen Debian-Servers mit Pterodactyl Panel für Game-Server Hosting und Container-Management.",
      tech: ["Debian", "Linux", "Docker"]
    },
    {
      id: "5",
      category: "System",
      title: "Flazzy OS",
      description: "Ein vollwertiges Betriebssystem, entwickelt in Python, mit grafischer Oberfläche und eigenen System-Tools.",
      tech: ["Python", "GUI Libs"]
    },
    {
      id: "6",
      category: "FiveM",
      title: "FiveM Bus Simulation",
      description: "Ein hochgradig realistisches Bus-Simulations-Script für die FiveM-Plattform mit Fokus auf Immersion.",
      tech: ["Lua", "FiveM API"]
    },
    {
      id: "7",
      category: "Tools",
      title: "FiveM Server Launcher",
      description: "Ein maßgeschneiderter Launcher für FiveM Server mit integrierten Auto-Updates und optimierter Performance.",
      tech: ["C#", ".NET"]
    },
    {
      id: "8",
      category: "Bots",
      title: "Diverse Discord Bots",
      description: "Entwicklung verschiedenster Bots für Moderation, Entertainment und spezialisierte Community-Features.",
      tech: ["Node.js", "Discord.js"]
    },
    {
      id: "9",
      category: "Web",
      title: "WebAI",
      description: "Eine KI-gestützte Plattform für innovative Web-Services und intelligente Automatisierung.",
      tech: ["React", "Gemini API", "Tailwind"],
      link: "https://webai.flazzy.de"
    },
    {
      id: "10",
      category: "Web",
      title: "Schul-Lehrervoting",
      description: "Ein sicheres und anonymes System zur Lehrerbewertung, entwickelt für den Einsatz an meiner Schule.",
      tech: ["React", "Supabase", "TypeScript"]
    },
    {
      id: "11",
      category: "Software",
      title: "Frosted Designs",
      description: "Full-Stack Ökosystem bestehend aus Website, Discord-Bot und Server-Management.",
      tech: ["Next.js", "Node.js", "Express"]
    },
    {
      id: "12",
      category: "Web",
      title: "Informatik Lernwebsite",
      description: "Eine Scratch-ähnliche visuelle Lernplattform, um Schülern die Grundlagen der Programmierung näherzubringen.",
      tech: ["React", "Blockly", "Motion"]
    },
    {
      id: "13",
      category: "Web",
      title: "Persönliches Portfolio",
      description: "Dieses Portfolio: Ein minimalistisches, hochperformantes Showcase meiner technischen Projekte.",
      tech: ["React", "Vite", "Motion"],
      link: "https://flazzy.de"
    }
  ],
  socials: {
    github: "https://github.com/builtbyodin",
    email: "info@flazzy.de"
  }
};

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto text-left bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-10"
          >
            <CheckCircle2 size={64} className="text-green-500 mb-6" />
            <h3 className="text-2xl font-bold mb-2">Nachricht gesendet!</h3>
            <p className="text-neutral-400 text-center">Danke für deine Nachricht. Ich melde mich in Kürze bei dir.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 text-sm font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
            >
              Weitere Nachricht senden
            </button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-500 ml-1">Dein Name</label>
              <input
                required
                type="text"
                placeholder="Max Mustermann"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-500 ml-1">E-Mail Adresse</label>
              <input
                required
                type="email"
                placeholder="max@beispiel.de"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-neutral-500 ml-1">Nachricht</label>
              <textarea
                required
                rows={4}
                placeholder="Wie kann ich dir helfen?"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-colors resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Send size={18} />
                  Nachricht absenden
                </>
              )}
            </button>
            {status === 'error' && (
              <p className="text-red-500 text-sm italic text-center">Etwas ist schiefgelaufen. Bitte versuche es erneut.</p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Alle");

  const filteredProjects = DEFAULT_DATA.projects.filter(project => 
    activeFilter === "Alle" || project.category === activeFilter
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotateS = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
  };

  return (
    <div className="relative min-h-screen font-sans bg-black text-white overflow-x-hidden">
      {/* Background Parallax Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          style={{ y: y1, rotate: rotateS }}
          className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-neutral-900/20 rounded-full blur-[120px]"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-neutral-900/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display font-bold text-xl tracking-tighter"
          >
            FLAZZY<span className="text-neutral-500">.DE</span>
          </motion.span>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            {["Projekte", "Über", "Skills", "Kontakt"].map((item) => (
              <a 
                key={item} 
                href={`#${item === "Projekte" ? "work" : item.toLowerCase()}`}
                className="hover:text-white transition-colors"
                id={`nav-${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
          </div>

          <a 
            href="#contact"
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors"
            id="nav-hire-me"
          >
            Kontaktieren
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block py-1 px-4 mb-8 rounded-full border border-neutral-800 text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase bg-neutral-950/50 backdrop-blur-sm"
          >
            Verfügbar für neue Herausforderungen
          </motion.span>
          
          <h1 className="font-display text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-10 overflow-hidden">
            {DEFAULT_DATA.tagline.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-2 mr-[0.2em]">
                <motion.span 
                  variants={itemVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p 
            variants={itemVariants}
            className="max-w-2xl text-neutral-400 text-lg md:text-xl mb-14 leading-relaxed font-light"
          >
            {DEFAULT_DATA.bio}
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-8 justify-center"
          >
            <a 
              href={DEFAULT_DATA.socials.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-all transform hover:scale-110" 
              id="hero-github"
            >
              <Github size={28} />
            </a>
            <a 
              href="#contact"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group"
            >
              Projekte ansehen
              <ChevronDown size={14} className="transform -rotate-90 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-32 text-neutral-800"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-6 max-w-7xl mx-auto overflow-visible">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 italic tracking-tighter text-white">Projekte</h2>
            <p className="text-neutral-500 max-w-md italic uppercase text-sm tracking-widest">Ein Auszug meiner technischen Lösungen und Eigenentwicklungen.</p>
          </motion.div>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[1px] flex-grow bg-neutral-900 hidden md:block mx-12 mb-4 origin-left" 
          />
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-mono text-sm text-neutral-700 uppercase hidden md:block mb-4"
          >
            Gesamt ({filteredProjects.length})
          </motion.span>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-16 overflow-x-auto pb-4 scrollbar-hide">
          {DEFAULT_DATA.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-mono uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                activeFilter === cat 
                ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                : "bg-neutral-900 text-neutral-500 hover:text-white hover:bg-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02, 
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  layout: { type: "spring", stiffness: 300, damping: 25 },
                  y: { type: "spring", stiffness: 100, damping: 20 },
                  scale: { type: "spring", stiffness: 400, damping: 10 },
                  opacity: { duration: 0.6 }
                }}
                className="group p-8 rounded-3xl border border-neutral-900 bg-neutral-950/50 transition-all cursor-pointer flex flex-col h-full"
                id={`project-${project.id}`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 rounded-2xl bg-neutral-900 text-neutral-400 group-hover:text-white transition-colors">
                    <Terminal size={24} />
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] font-mono border border-neutral-800 px-2 py-1 rounded text-neutral-500 uppercase tracking-tighter">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-2xl font-display font-medium mb-4 group-hover:text-white transition-colors">{project.title}</h3>
                
                <p className="text-neutral-500 leading-relaxed italic mb-10 flex-grow">
                  {project.description}
                </p>

                <div className="pt-6 border-t border-neutral-900 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 group-hover:text-neutral-400 transition-colors">
                    {project.link ? "Live ansehen" : "Projekt Details"}
                  </span>
                  <ChevronDown size={16} className="text-neutral-600 -rotate-90 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4 tracking-tighter text-white">Tech Stack</h2>
            <p className="text-neutral-500">Die Werkzeuge und Technologien, die ich nutze.</p>
          </div>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {DEFAULT_DATA.skills.map((skill) => (
              <motion.div
                key={skill}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }
                  }
                }}
                whileHover={{ y: -5, borderColor: "rgba(255, 255, 255, 0.3)", backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                className="p-6 border border-neutral-800 rounded-xl transition-all flex items-center gap-4 bg-neutral-950/50 cursor-default"
                id={`skill-${skill.toLowerCase()}`}
              >
                <Terminal size={18} className="text-neutral-500" />
                <span className="font-medium text-neutral-300">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 max-w-3xl mx-auto text-center border-t border-neutral-900 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">Lass uns reden.</h2>
          <p className="text-neutral-400 mb-12 text-lg">
            Hast du ein Projekt im Kopf oder willst du einfach nur Hallo sagen? Schreib mir unten.
          </p>

          <ContactForm />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} FLAZZY.DE — DESIGNED BY AI
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-neutral-600 text-sm italic">
            <a href="#work" className="hover:text-white transition-colors uppercase tracking-wider">Projekte</a>
            <a href="#skills" className="hover:text-white transition-colors uppercase tracking-wider">Skills</a>
            <a href="#contact" className="hover:text-white transition-colors uppercase tracking-wider">Kontakt</a>
            <a href={DEFAULT_DATA.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors uppercase tracking-wider">GitHub</a>
          </div>
        </div>
      </footer>

      {/* Watermark */}
      <motion.a
        href="https://webai.flazzy.de"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 px-4 py-2 rounded-full shadow-2xl group hover:border-neutral-500 transition-all"
        id="flazzy-watermark"
      >
        <div className="w-2 h-2 rounded-full bg-neutral-500 group-hover:bg-white animate-pulse transition-colors" />
        <span className="text-[10px] font-mono tracking-widest text-neutral-500 group-hover:text-white uppercase transition-colors">
          Flazzy Web AI
        </span>
      </motion.a>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1, backgroundColor: "#fff", color: "#000" }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-50 p-4 rounded-full bg-neutral-900 border border-neutral-800 text-white shadow-2xl transition-colors backdrop-blur-md"
            aria-label="Scroll to top"
            id="scroll-to-top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
