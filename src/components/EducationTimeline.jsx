import React, { useRef, useState } from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useMotionTemplate,
  AnimatePresence
} from "framer-motion";
import { GraduationCap, Code2, Calendar, MapPin, Briefcase, Cpu, Hash, Clock, BookOpen, School } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- DATA ---
const EDUCATION_DATA = [
  {
    id: 1,
    title: "Bachelor of Computer Applications (BCA)",
    institution: "Vidhyadeep Institute of Technology",
    range: "2024 — 2027 (Expected)",
    year: "2024",
    description:
      "Currently pursuing BCA with a strong focus on software engineering, data structures, database systems, and full-stack development. Actively building real-world projects and strengthening problem-solving skills.",
    tags: ["DSA", "Software Engg", "DBMS", "Web Dev"],
    icon: GraduationCap,
    status: "IN PROGRESS",
    code: "EDU-01",
  },
  {
    id: 2,
    title: "Full Stack Development Course",
    institution: "Red & White Institute",
    range: "2024 — Present",
    year: "2024",
    description:
      "Hands-on training in MERN stack development. Built multiple production-ready applications with authentication, APIs, cloud storage, and responsive UI following industry best practices.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Tailwind"],
    icon: Code2,
    status: "ONGOING",
    code: "EDU-02",
  },
  {
    id: 3,
    title: "Higher Secondary (H.S.C)",
    institution: "GSEB Board",
    range: "2023 — 2024",
    year: "2024",
    description:
      "Completed H.S.C with distinction. This phase marked my deep entry into programming, where I learned C language and basic JavaScript while strengthening logical thinking.",
    tags: ["C Language", "JavaScript", "Web Dev", "Logic"],
    icon: BookOpen,
    status: "COMPLETED",
    code: "EDU-03",
  },
  {
    id: 4,
    title: "Secondary School (S.S.C)",
    institution: "GSEB Board",
    range: "2021 — 2022",
    year: "2022",
    description:
      "Completed S.S.C with strong academic performance. Wrote my first HTML code during this period, which sparked my long-term passion for web development and technology.",
    tags: ["HTML", "Basics of CS", "Foundation"],
    icon: School,
    status: "COMPLETED",
    code: "EDU-04",
  },
];


const EducationTimeline = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#020602] py-20 md:py-32 overflow-hidden group"
    >
      {/* --- BACKGROUND MATRIX EFFECT --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-green-900/20 via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Flashlight Cursor */}
        <motion.div
          className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(74, 222, 128, 0.15), 
                rgba(34, 197, 94, 0.05),
                transparent 80%
              )
            `,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="mb-20 md:mb-32 text-left md:text-center pl-4 md:pl-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Cpu className="w-3 h-3 animate-pulse" />
              System Logs
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Evolution</span>
            </motion.h2>
        </div>

        {/* --- TIMELINE CONTAINER --- */}
        <div className="relative">
          
          {/* THE SPINE */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] lg:-translate-x-1/2 bg-white/5 rounded-full overflow-hidden">
             <motion.div 
               style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
               className="absolute top-0 left-0 w-full bg-gradient-to-b from-green-400 via-emerald-500 to-green-600 shadow-[0_0_15px_#22c55e]"
             />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {EDUCATION_DATA.map((item, index) => (
              <TimelineItem key={item.id} data={item} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ data, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={cn(
      "relative flex flex-col lg:flex-row lg:items-center",
      isEven ? "lg:flex-row-reverse" : ""
    )}>
      
      {/* CONNECTOR LINE */}
      <div className={cn(
        "hidden lg:block absolute top-1/2 -translate-y-1/2 z-0",
        isEven ? "left-1/2 -translate-x-full" : "left-1/2"
      )}>
        <svg 
            className={cn(
                "w-24 h-12 opacity-60", 
                isEven ? "scale-x-[-1]" : ""
            )} 
            viewBox="0 0 100 50" 
            fill="none"
        >
            <path 
                d="M0,25 L40,25 L55,10 L100,10" 
                stroke="#22c55e" 
                strokeWidth="1.5" 
                className="path-draw"
                vectorEffect="non-scaling-stroke"
            />
            <circle cx="100" cy="10" r="3" fill="#22c55e" />
        </svg>
      </div>

      {/* --- DATE DISPLAY --- */}
      <div className={cn(
        "hidden lg:flex w-1/2 px-16 justify-end items-center",
        isEven ? "justify-start" : ""
      )}>
        <div className="flex flex-col gap-2">
           <div className={cn(
             "text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-transparent font-mono select-none",
             isEven ? "text-left" : "text-right"
           )}>
             {data.year}
           </div>
           <div className={cn(
             "h-[1px] bg-green-500/30 w-full relative",
             isEven ? "origin-left" : "origin-right"
           )}>
              <div className={cn("absolute top-[-2px] w-1 h-1 bg-green-500", isEven ? "right-0" : "left-0")}/>
           </div>
        </div>
      </div>

      {/* --- CENTER NODE --- */}
      <div className="absolute left-4 lg:left-1/2 top-0 lg:top-1/2 lg:-translate-y-1/2 -translate-x-1/2 flex items-center justify-center z-20">
         <div className="relative flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-[#020602] border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_#22c55e]" />
            <div className="absolute inset-0 border border-green-500/20 rounded-full animate-[spin_4s_linear_infinite]" 
                 style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }} 
            />
         </div>
      </div>

      {/* --- THE CARD --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={cn(
          "w-full lg:w-1/2 z-10",
          "pl-10 lg:pl-0",
          isEven ? "lg:pr-24" : "lg:pl-24"
        )}
      >
        <EducationCard data={data} />
      </motion.div>
    </div>
  );
};

// --- NEW COMPONENT FOR ISOLATED HOVER LOGIC ---
const EducationCard = ({ data }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
        className="group/card relative perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <div className="relative hover:scale-[1.02] transition-transform duration-300 ease-out">
            
            {/* 1. OUTER GLOW (The Aura) */}
            <div 
              className="absolute inset-0 bg-green-500/40 blur-[40px] opacity-0 group-hover/card:opacity-60 transition-opacity duration-500" 
              style={{ clipPath: "polygon(0 0, 92% 0, 100% 15%, 100% 100%, 8% 100%, 0 85%)" }}
            />

            {/* 2. CARD BODY */}
            <div 
              className="relative bg-[#0a0d0b] p-6 md:p-8 overflow-hidden"
              style={{ clipPath: "polygon(0 0, 92% 0, 100% 15%, 100% 100%, 8% 100%, 0 85%)" }}
            >
                
                {/* --- MOUSE FOLLOW SPOTLIGHT & GRID --- */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/card:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            rgba(34, 197, 94, 0.15),
                            transparent 80%
                            )
                        `,
                    }}
                >
                    {/* The Grid Texture inside the spotlight */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                </motion.div>


                {/* --- BORDER LAYERS --- */}
                {/* Base Border */}
                <div className="absolute inset-0 bg-white/5 pointer-events-none" />
                {/* Active Border (Bright Green on Hover) */}
                <div className="absolute inset-[1px] bg-[#0a0d0b] pointer-events-none z-0" 
                     style={{ clipPath: "polygon(0 0, 92% 0, 100% 15%, 100% 100%, 8% 100%, 0 85%)" }} 
                />
                
                {/* --- SCANLINE EFFECT --- */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ top: "-100%", opacity: 0 }}
                            animate={{ top: "200%", opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
                            className="absolute left-0 right-0 h-[2px] bg-green-400 shadow-[0_0_20px_2px_#4ade80] z-20 pointer-events-none"
                        />
                    )}
                </AnimatePresence>

                {/* --- CONTENT --- */}
                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-white/5 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500/10 rounded text-green-400 group-hover/card:bg-green-500 group-hover/card:text-black transition-colors duration-300">
                               <data.icon size={18} />
                            </div>
                            <span className="text-[10px] font-mono text-green-500/80 tracking-widest uppercase">
                               {data.code}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                             {/* Date Badge */}
                            <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded border border-white/10 group-hover/card:border-green-500/50 transition-colors">
                               <Clock className="w-3 h-3 text-green-400" />
                               <span className="text-[10px] font-mono text-slate-400 group-hover/card:text-green-300">{data.range}</span>
                            </div>
                             {/* Mobile Date */}
                            <div className="lg:hidden flex items-center gap-1.5 px-2 py-1 bg-green-500/20 rounded border border-green-500/30">
                               <Calendar className="w-3 h-3 text-green-400" />
                               <span className="text-[10px] font-mono font-bold text-green-300">{data.range}</span>
                            </div>
                            <div className="px-2 py-1 bg-green-900/20 border border-green-500/30 text-[10px] text-green-400 font-mono rounded-sm">
                                {data.status}
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover/card:text-green-400 transition-colors duration-300">
                        {data.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm mb-4 font-mono group-hover/card:text-green-500/70 transition-colors">
                        <MapPin className="w-3 h-3" />
                        {data.institution}
                    </div>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 group-hover/card:text-slate-300 transition-colors">
                        {data.description}
                    </p>

                    {/* Footer Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-dashed border-white/10 group-hover/card:border-green-500/30 transition-colors">
                        {data.tags.map((tag) => (
                            <span key={tag} className="flex items-center gap-1 px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-white/5 border border-white/5 group-hover/card:border-green-500/30 group-hover/card:text-green-300 hover:!bg-green-500 hover:!text-black transition-all cursor-crosshair">
                                <Hash className="w-2 h-2 opacity-50" />
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Decorative Tech Markers (Corner Pieces) */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-50 group-hover/card:opacity-100 transition-opacity">
                    <div className="absolute top-0 right-[8%] w-[20px] h-[2px] bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                    <div className="absolute top-0 right-0 w-[2px] h-[10px] bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none opacity-50 group-hover/card:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-[8%] w-[20px] h-[2px] bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                    <div className="absolute bottom-0 left-0 w-[2px] h-[10px] bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default EducationTimeline;