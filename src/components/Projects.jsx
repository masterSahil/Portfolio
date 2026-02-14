import React, { useState } from "react";
import { 
  motion, 
  useMotionTemplate, 
  useMotionValue, 
  AnimatePresence 
} from "framer-motion";
import { 
  ArrowUpRight, 
  Github, 
  Terminal,
  Sparkles
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILS ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- ASSET IMPORTS ---
import img1 from '../assets/Image/Home/Projects/prj1.png'
import img2 from '../assets/Image/Home/Projects/prj2.png'
import img3 from '../assets/Image/Home/Projects/prj3.png'
import img4 from '../assets/Image/Home/Projects/prj4.png'
import img5 from '../assets/Image/Home/Projects/prj5.png'
import img6 from '../assets/Image/Home/Projects/prj6.png'

// --- DATA ---
const PROJECTS = [
  {
    id: 1,
    title: "AI Image Gen",
    desc: "Text-to-image engine using Stable Diffusion.",
    image: img1,
    tech: ["React", "Vite", "HuggingFace"],
    category: "AI",
    repoUrl: "https://github.com/masterSahil/text-to-img-ai",
    liveUrl: "https://text-to-img-ai-cyan.vercel.app/"
  },
  {
    id: 2,
    title: "Secure Credentials Vault",
    desc: "A secure web-based vault for credentials storage.",
    image: img2,
    tech: ["React", "Node.js", "JWT"],
    category: "Full Stack",
    repoUrl: "https://github.com/masterSahil/Credentials",
    liveUrl: "https://credentials-bay.vercel.app/"
  },
  {
    id: 3,
    title: "Chatbot Core",
    desc: "Real-time conversational agent with memory.",
    image: img3,
    tech: ["React", "Gemini API", "Theme UI"],
    category: "AI",
    repoUrl: "https://github.com/masterSahil/Chatbot-main",
    liveUrl: "https://chatbot-main-nine.vercel.app/"
  },
  {
    id: 4,
    title: "E-SHOP Platform",
    desc: "Complete MERN e-commerce with inventory.",
    image: img4,
    tech: ["MongoDB", "Express", "React"],
    category: "Full Stack",
    repoUrl: "https://github.com/masterSahil/E-Shop",
    liveUrl: "https://e-shop-pearl-gamma.vercel.app"
  },
  {
    id: 5,
    title: "React Collection",
    desc: "A curated library of modular React components.",
    image: img5,
    tech: ["React", "Tailwind", "Redux"],
    category: "Frontend",
    repoUrl: "https://github.com/masterSahil/React-Projects",
    liveUrl: "https://github.com/masterSahil/React-Projects"
  },
  {
    id: 6,
    title: "Secure Vault Mobile",
    desc: "Cross-platform mobile vault for sensitive data.",
    image: img6,
    tech: ["React Native", "Expo", "Supabase"],
    category: "App",
    repoUrl: "https://github.com/masterSahil/Vault-App",
    liveUrl: "https://github.com/masterSahil/Vault-App"
  }
];

const TABS = ["All", "Full Stack", "Frontend", "AI", "App"];

// --- MAIN SECTION ---
const RecentProjects = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [focusedProjectId, setFocusedProjectId] = useState(null);
  
  // 1. Setup Motion Values for global cursor effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Mouse Move Handler for the Section
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  const filteredProjects = activeTab === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeTab);

  return (
    <section 
      className="relative w-full bg-[#020602] py-24 px-4 md:px-8 font-sans selection:bg-emerald-500/30 overflow-hidden"
      onMouseMove={handleMouseMove} // Attach handler to section
    >
      
      {/* --- DYNAMIC BACKGROUND SPOTLIGHT (Green Effect) --- */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* --- STATIC BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4"
            >
              <Terminal className="w-4 h-4" />
              <span>System Archives</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tight"
            >
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Deployments</span>
            </motion.h2>
          </div>

          {/* TABS */}
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 z-10 overflow-hidden border",
                  activeTab === tab 
                    ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" 
                    : "text-slate-500 border-white/5 hover:text-slate-300 hover:border-white/10 hover:bg-white/5"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* --- GRID --- */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                isFocused={focusedProjectId === project.id}
                setFocused={setFocusedProjectId}
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

// --- ISOLATED CARD COMPONENT ---
const ProjectCard = ({ project, isFocused, setFocused }) => {
  // Kept local spotlight for hover effect inside cards (optional - remove if you strictly want ONLY bg effect)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      onClick={() => setFocused(isFocused ? null : project.id)}
      onMouseLeave={() => setFocused(null)}
      className="group relative h-[400px] rounded-2xl bg-[#0a0d0b] border border-white/10 overflow-hidden cursor-pointer"
    >
      
      {/* 1. LOCAL SPOTLIGHT (Card Hover) */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300 z-30"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
         <img 
           src={project.image} 
           alt={project.title}
           className={cn(
             "w-full h-full object-cover transition-transform duration-700 ease-out",
             isFocused ? "scale-110 blur-[2px]" : "group-hover:scale-110 group-hover:blur-[2px]"
           )}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#020602] via-[#020602]/80 to-transparent opacity-90 transition-opacity duration-500" />
      </div>

      {/* 3. CONTENT CONTAINER */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
        
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
           <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-black/50 backdrop-blur-md border border-emerald-500/20 rounded-full">
             {project.category}
           </span>
           <div className={cn(
             "transition-opacity duration-300 text-emerald-400",
             isFocused ? "opacity-100" : "opacity-0 group-hover:opacity-100"
           )}>
             <Sparkles className="w-4 h-4 animate-pulse" />
           </div>
        </div>

        <div className={cn(
            "transition-transform duration-500 ease-out",
            isFocused ? "translate-y-0" : "translate-y-4 group-hover:translate-y-0"
        )}>
          
          <h3 className={cn(
            "text-2xl font-bold text-white mb-2 transition-colors",
            isFocused ? "text-emerald-400" : "group-hover:text-emerald-400"
          )}>
            {project.title}
          </h3>
          
          <p className={cn(
            "text-slate-400 text-sm leading-relaxed mb-4 transition-all",
            isFocused ? "line-clamp-none" : "line-clamp-2 group-hover:line-clamp-none"
          )}>
            {project.desc}
          </p>

          <div className={cn(
              "grid transition-[grid-template-rows] duration-500 ease-out",
              isFocused ? "grid-rows-[1fr]" : "grid-rows-[0fr] group-hover:grid-rows-[1fr]"
          )}>
             <div className="overflow-hidden">
               
               <div className="flex flex-wrap gap-2 mb-6 pt-2">
                 {project.tech.map((t, i) => (
                   <span key={i} className="text-[10px] font-medium text-slate-300 bg-white/10 px-2 py-1 rounded border border-white/5">
                     {t}
                   </span>
                 ))}
               </div>

               <div className="flex items-center gap-3 pb-2">
                 <a 
                   href={project.liveUrl}
                   target="_blank" 
                   rel="noopener noreferrer"
                   onClick={(e) => e.stopPropagation()}
                   className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                 >
                   Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
                 </a>
                 <a 
                   href={project.repoUrl}
                   target="_blank" 
                   rel="noopener noreferrer"
                   onClick={(e) => e.stopPropagation()}
                   className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg flex items-center justify-center transition-colors hover:border-emerald-500/30 hover:text-emerald-400"
                 >
                   <Github className="w-4 h-4" />
                 </a>
               </div>

             </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default RecentProjects;