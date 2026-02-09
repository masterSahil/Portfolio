import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Github, 
  Terminal,
  Sparkles,
  Zap,
  Cpu,
  Layers,
  Code2
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- DATA: MATHEMATICALLY ALIGNED FOR 3-COLUMN GRID ---
const PROJECTS = [
  // --- ROW 1 & 2 BLOCK ---
  {
    id: 1,
    title: "Neon E-Commerce",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    desc: "Futuristic shopping with WebGL previews.",
    tech: ["React", "Three.js", "Tailwind"],
    size: "wide", // Spans 2 Cols
  },
  {
    id: 2,
    title: "TurboScale DB",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2670&auto=format&fit=crop",
    desc: "Distributed engine handling 1M+ req/s.",
    tech: ["Go", "Redis", "Docker"],
    size: "tall", // Spans 1 Col, 2 Rows (The Anchor)
  },
  {
    id: 3,
    title: "Glassmorphism UI",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    desc: "Frosted-glass component library.",
    tech: ["Storybook", "CSS Modules"],
    size: "normal",
  },
  {
    id: 4,
    title: "AuthShield API",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2670&auto=format&fit=crop",
    desc: "Military-grade auth microservice.",
    tech: ["Node.js", "PostgreSQL"],
    size: "normal",
  },

  // --- ROW 3 & 4 BLOCK ---
  {
    id: 5,
    title: "Nexus Neural Core",
    category: "AI",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2560&auto=format&fit=crop",
    desc: "Real-time edge object detection.",
    tech: ["Python", "TensorFlow"],
    size: "wide", // Spans 2 Cols
  },
  {
    id: 6,
    title: "LoFi IDE",
    category: "Vibe Coding",
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=2574&auto=format&fit=crop",
    desc: "Ambient coding env with synced lighting.",
    tech: ["Electron", "Philips Hue"],
    size: "tall", // Spans 1 Col, 2 Rows (The Anchor)
  },
  {
    id: 7,
    title: "DreamWeaver Bot",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop",
    desc: "Generative AI chatbot for UI code.",
    tech: ["OpenAI", "LangChain"],
    size: "normal",
  },
  {
    id: 8,
    title: "Retro Terminal",
    category: "Vibe Coding",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    desc: "Gamified portfolio terminal.",
    tech: ["Canvas", "WebSockets"],
    size: "normal",
  }
];

const TABS = ["All", "Frontend", "Backend", "AI", "Vibe Coding"];

// --- MAIN SECTION ---
const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeTab);

  return (
    <section className="min-h-screen bg-[#020602] py-24 px-4 md:px-8 font-sans selection:bg-emerald-500/30 overflow-hidden">
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4"
            >
              <Terminal className="w-4 h-4" />
              <span>System Portfolio</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tight"
            >
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Works</span>
            </motion.h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 z-10 overflow-hidden group border",
                  activeTab === tab 
                    ? "text-white border-emerald-500/30 bg-emerald-500/10" 
                    : "text-slate-500 border-white/5 hover:text-slate-300 hover:border-white/10"
                )}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-emerald-500/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- BENTO GRID (DENSE) --- */}
        <motion.div 
          layout
          // UPDATED: Used 'dense' to fill gaps, and specific 3-column layout for laptops
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[280px] grid-flow-dense"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

// --- THE CINEMATIC CARD ---
const ProjectCard = ({ project, index }) => {
  const isWide = project.size === "wide";
  const isTall = project.size === "tall";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "group relative rounded-2xl overflow-hidden bg-[#0a0d0b] border border-white/10 cursor-pointer h-full w-full",
        
        // --- RESPONSIVE SPAN LOGIC ---
        // Mobile: Always 1 col / 1 row (stacked)
        // Desktop (md): Follows the bento rules
        isWide ? "md:col-span-2" : "md:col-span-1",
        isTall ? "md:row-span-2" : "md:row-span-1"
      )}
    >
      {/* 1. BACKGROUND IMAGE (Zooms Out on Hover) */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:blur-[2px]"
        />
        {/* Gradient Overlay (Darkens on Hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020602] via-[#020602]/50 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
      </div>

      {/* 2. GLOWING BORDER (The "Pulse") */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/50 rounded-2xl transition-colors duration-500" />
      
      {/* 3. LIGHT SHEEN (The "Glass Reflection") */}
      <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine left-[-100%]" />

      {/* 4. CONTENT WRAPPER */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        
        {/* Category Badge (Top Left) */}
        <div className="absolute top-4 left-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded">
            {project.category}
          </span>
        </div>

        {/* Text Content */}
        <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
            {project.title}
          </h3>

          {/* Hidden Details (Slide Up) */}
          <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {project.desc}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t, i) => (
                <span 
                  key={i} 
                  className="text-[10px] font-bold text-slate-300 bg-white/5 px-2 py-1 rounded border border-white/5"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
               <button className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-[#020602] text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  View Project <ArrowUpRight className="w-3.5 h-3.5" />
               </button>
               <button className="px-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg flex items-center justify-center transition-colors">
                  <Github className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* Initial "See More" Hint (Disappears on Hover) */}
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-500/70 uppercase tracking-widest mt-2 group-hover:hidden transition-all">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>Hover to decrypt</span>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsSection;