import React, { useState } from "react";
import { 
  motion, 
  useMotionTemplate, 
  useMotionValue 
} from "framer-motion";
import { 
  ArrowUpRight, 
  Github, 
  Terminal,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import img1 from '../assets/Image/Home/Projects/prj1.png'
import img2 from '../assets/Image/Home/Projects/prj2.png'
import img3 from '../assets/Image/Home/Projects/prj3.png'
import img4 from '../assets/Image/Home/Projects/prj4.png'
import img5 from '../assets/Image/Home/Projects/prj5.png'
import img6 from '../assets/Image/Home/Projects/prj6.png'

// --- PROJECT DATA ---
const PROJECTS = [
  {
    id: 1,
    title: "Secure Credentials Vault",
    desc: "A secure web-based vault for credentials storage integration.",
    image: img2,
    tech: ["React", "Node.js", "JWT", "Cloudinary"],
    category: "Full Stack",
    repoUrl: "https://github.com/masterSahil/Credentials",
    liveUrl: "https://credentials-bay.vercel.app/"
  },
  {
    id: 2,
    title: "Secure Vault Mobile App",
    desc: "A cross-platform mobile vault application to securely store any kind of credentials.",
    image: img6,
    tech: ["Native", "MongoDB", "Supabase", "Expo"],
    category: "Mobile App",
    repoUrl: "https://github.com/masterSahil/Vault-App",
    liveUrl: "https://github.com/masterSahil/Vault-App"
  },
  {
    id: 3,
    title: "Chatbot Core",
    desc: "Real-time conversational agent with memory.",
    image: img3,
    tech: ["React JS", "Multi Theme", "Gemini API"],
    category: "AI",
    repoUrl: "https://github.com/masterSahil/Chatbot-main",
    liveUrl: "https://chatbot-main-nine.vercel.app/"
  },
  {
  id: 4,
    title: "Full Stack E-Commerce",
    desc: "A complete MERN-based e-commerce platform with inventory management.",
    image: img4,
    tech: ["React", "MongoDB", "Multer"],
    category: "Full Stack",
    repoUrl: "https://github.com/masterSahil/E-Shop",
    liveUrl: "https://e-shop-pearl-gamma.vercel.app"
  },
  {
    id: 5,
    title: "React Projects Collection",
    desc: "A curated collection of multiple React.js projects.",
    image: img5,
    tech: ["React", "Tailwind", "Redux"],
    category: "Frontend",
    repoUrl: "https://github.com/masterSahil/React-Projects",
    liveUrl: "https://github.com/masterSahil/React-Projects"
  },
  {
    id: 6,
    title: "AI Image Gen",
    desc: "Text-to-image engine using Stable Diffusion.",
    image: img1,
    tech: ["HuggingFace", "React", "Vite"],
    category: "AI",
    repoUrl: "https://github.com/masterSahil/text-to-img-ai",
    liveUrl: "https://text-to-img-ai-cyan.vercel.app/"
  }
];

const RecentProjects = () => {
  // --- Green Background Cursor Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#020602] py-24 px-4 md:px-8 font-sans selection:bg-emerald-500/30 overflow-hidden group"
    >
      
      {/* --- Dynamic Background Flashlight --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(74, 222, 128, 0.10), 
                rgba(34, 197, 94, 0.05),
                transparent 80%
              )
            `,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4">
              <Terminal className="w-4 h-4" />
              <span>System Output</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Deployments</span>
            </h2>
          </div>
          <Link to="/projects" 
           className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all cursor-pointer">
            <span className="text-sm font-medium text-slate-300 hover:text-emerald-400">View All Archives</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500 hover:text-emerald-400 transition-colors" />
          </Link>
        </div>

        {/* --- THE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <PowerCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ISOLATED CARD COMPONENT ---
const PowerCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative h-[400px] rounded-2xl bg-[#0a0d0b] overflow-hidden transition-all duration-500",
        isHovered ? "border border-emerald-500/50" : "border border-white/10"
      )}
    >
      {/* 1. BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img 
          src={project.image} 
          alt={project.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isHovered ? "opacity-40 scale-105 blur-[2px]" : "opacity-60 scale-100"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020602] via-[#020602]/80 to-transparent" />
      </div>

      {/* 2. THE VERTICAL CORD */}
      <div 
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[35%] bg-white/10 overflow-hidden z-20 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        <div className={cn(
          "absolute top-0 left-0 w-full h-full bg-emerald-400 shadow-[0_0_15px_#34d399] transition-transform duration-500",
          isHovered ? "translate-y-0" : "-translate-y-full"
        )} />
      </div>

      {/* 3. CYBERNETIC ORBITAL DATA CORE & READOUT */}
      <div 
        className={cn(
          "absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500",
          isHovered ? "opacity-100 delay-100 scale-100" : "opacity-0 scale-50"
        )}
      >
        <div className="relative flex items-center justify-center">
            {/* Orbital Spinning Rings */}
            <div className="absolute w-16 h-16 rounded-full border-t-2 border-r-2 border-emerald-500/30 animate-[spin_3s_linear_infinite]" />
            <div className="absolute w-12 h-12 rounded-full border-b-2 border-l-2 border-emerald-400/50 animate-[spin_2s_linear_infinite_reverse]" />
            <div className="absolute w-10 h-10 rounded-full border border-dashed border-emerald-200/40 animate-[spin_4s_linear_infinite]" />
            
            {/* The Core Diamond */}
            <div className="relative z-10 w-2.5 h-2.5 rotate-45 bg-emerald-300 shadow-[0_0_20px_#34d399,0_0_8px_#fff]" />
        </div>
      </div>

      {/* 4. CONTENT */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full pointer-events-none">
        
        {/* Category & Github Icon */}
        <div className={cn(
          "mb-auto pt-6 flex justify-between items-start transition-all duration-500",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        )}>
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-900/20 border border-emerald-500/20 rounded-full">
            {project.category}
          </span>
          
          {/* GitHub Icon Link */}
          <a 
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 text-white pointer-events-auto cursor-pointer hover:bg-emerald-500 transition-colors"
          >
             <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Title & Desc */}
        <div className={cn(
          "relative z-10 transition-transform duration-500",
          isHovered ? "translate-y-0" : "translate-y-4"
        )}>
          <h3 className={cn(
            "text-2xl font-bold mb-2 transition-colors",
            isHovered ? "text-emerald-400" : "text-white"
          )}>
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
            {project.desc}
          </p>

          {/* Tech Stack & Preview Link */}
          <div className={cn(
            "flex items-center justify-between border-t border-white/10 pt-4 transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-50"
          )}>
            <div className="flex gap-2">
              {project.tech.map((t, i) => (
                <span key={i} className="text-[10px] text-slate-300 font-mono bg-white/5 px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
            
            {/* Live Preview Link */}
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                 "pointer-events-auto cursor-pointer p-1 rounded hover:bg-white/10 transition-colors",
                 isHovered ? "scale-100" : "scale-0"
              )}
            >
               <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            </a>
          </div>
        </div>
      </div>
    
    </motion.div>
  );
};

export default RecentProjects;