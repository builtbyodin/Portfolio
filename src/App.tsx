import { motion, useScroll, useSpring } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  ChevronDown
} from "lucide-react";

// Types for our data
interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
  github?: string;
}

interface PortfolioData {
  name: string;
  tagline: string;
  bio: string;
  skills: string[];
  projects: Project[];
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
}

// Initial placeholder data
const DEFAULT_DATA: PortfolioData = {
  name: "Flazzy",
  tagline: "Building Digital Experiences with Precision & Flair",
  bio: "I'm a software developer focused on creating clean, performant, and user-centric applications. I love solving complex problems with elegant code.",
  skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Firebase", "PostgreSQL", "Docker", "AWS"],
  projects: [
    {
      id: "1",
      title: "Project Alpha",
      description: "A high-performance dashboard for real-time data visualization and analytics.",
      tech: ["React", "D3.js", "Express"],
      image: "https://picsum.photos/seed/alpha/1200/800",
      link: "#"
    },
    {
      id: "2",
      title: "Project Beta",
      description: "E-commerce platform with seamless checkout and advanced filtering capabilities.",
      tech: ["Next.js", "Stripe", "Prisma"],
      image: "https://picsum.photos/seed/beta/1200/800",
      link: "#"
    }
  ],
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "contact@flazzy.de"
  }
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen font-sans">
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
            {["Work", "About", "Skills", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors"
                id={`nav-${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
          </div>

          <a 
            href={`mailto:${DEFAULT_DATA.socials.email}`}
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors"
            id="nav-hire-me"
          >
            Hire Me
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 mb-6 rounded-full border border-neutral-800 text-xs font-mono tracking-widest text-neutral-500 uppercase">
            Available for new projects
          </span>
          <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
            {DEFAULT_DATA.tagline.split(" ").map((word, i) => (
              <motion.span 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="max-w-2xl text-neutral-400 text-lg md:text-xl mb-12">
            {DEFAULT_DATA.bio}
          </p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-6 justify-center"
          >
            <a href={DEFAULT_DATA.socials.github} className="text-neutral-500 hover:text-white transition-colors" id="hero-github">
              <Github size={24} />
            </a>
            <a href={DEFAULT_DATA.socials.linkedin} className="text-neutral-500 hover:text-white transition-colors" id="hero-linkedin">
              <Linkedin size={24} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-20 text-neutral-600"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 italic tracking-tighter text-white">Selected Work</h2>
            <p className="text-neutral-500 max-w-md italic uppercase text-sm tracking-widest">Case studies of solutions I've engineered from the ground up.</p>
          </div>
          <div className="h-[1px] flex-grow bg-neutral-900 hidden md:block mx-12 mb-4" />
          <span className="font-mono text-sm text-neutral-700 uppercase hidden md:block mb-4">
            Total Projects (02)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {DEFAULT_DATA.projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.01 }}
              viewport={{ once: true }}
              transition={{ 
                y: { type: "spring", stiffness: 300, damping: 20 },
                scale: { type: "spring", stiffness: 300, damping: 20 },
                opacity: { duration: 0.5, delay: idx * 0.1 } 
              }}
              className="group cursor-pointer"
              id={`project-${project.id}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 bg-neutral-900">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <span className="bg-white text-black px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    View Project
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-display font-medium">{project.title}</h3>
                <div className="flex gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] font-mono border border-neutral-800 px-2 py-1 rounded text-neutral-500 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-neutral-500 line-clamp-2 italic">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4 tracking-tighter text-white">Technical Playground</h2>
            <p className="text-neutral-500">The tools and technologies I use to bring ideas to life.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DEFAULT_DATA.skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 border border-neutral-800 rounded-xl hover:border-neutral-600 transition-colors flex items-center gap-4 bg-neutral-950/50"
                id={`skill-${skill.toLowerCase()}`}
              >
                <Terminal size={18} className="text-neutral-500" />
                <span className="font-medium text-neutral-300">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 max-w-7xl mx-auto text-center border-t border-neutral-900 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">Ready to start a project?</h2>
          <p className="text-neutral-400 mb-12 max-w-xl mx-auto text-lg">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll do my best to get back to you!
          </p>
          <a 
            href={`mailto:${DEFAULT_DATA.socials.email}`}
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform"
            id="contact-button"
          >
            <Mail size={24} />
            Say Hello
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} FLAZZY.DE — DESIGNED BY AI
          </p>
          <div className="flex gap-8 text-neutral-600 text-sm italic">
            <a href="#work" className="hover:text-white">WORK</a>
            <a href="#about" className="hover:text-white">ABOUT</a>
            <a href="#contact" className="hover:text-white">CONTACT</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
