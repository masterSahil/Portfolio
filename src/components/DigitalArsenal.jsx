import React, { useRef, useState } from "react";
import { 
  motion, 
  useMotionTemplate, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "framer-motion";
import { 
  Code2, 
  Server, 
  Database, 
  Cpu, 
  Layers, 
  Palette, 
  Terminal,
  Smartphone,
  FileCode2,
  FileJson,
  Globe,
  GitBranch,
  Flame,
  Send,
  RefreshCcw,
  Triangle,
  Monitor
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Data Configuration ---
const TECH_STACK = [
  // Frontend
  { name: "HTML5", icon: FileCode2, level: "Expert", color: "text-orange-400" },
  { name: "CSS3", icon: Palette, level: "Expert", color: "text-blue-400" },
  { name: "JavaScript", icon: FileJson, level: "Expert", color: "text-yellow-400" },
  { name: "React", icon: Code2, level: "Advanced", color: "text-cyan-400" },
  
  // Mobile
  { name: "React Native", icon: Smartphone, level: "Advanced", color: "text-blue-500" },
  { name: "Expo", icon: Layers, level: "Advanced", color: "text-white" },
  
  // Backend
  { name: "Node.js", icon: Server, level: "Advanced", color: "text-green-500" },
  { name: "Express.js", icon: Terminal, level: "Advanced", color: "text-white" },
  { name: "REST APIs", icon: Globe, level: "Expert", color: "text-emerald-400" },
  { name: "CRUD", icon: RefreshCcw, level: "Expert", color: "text-slate-300" },
  
  // Database
  { name: "MongoDB", icon: Database, level: "Intermediate", color: "text-green-400" },
  { name: "Firebase", icon: Flame, level: "Intermediate", color: "text-orange-500" },
  // { name: "NoSQL", icon: Database, level: "Intermediate", color: "text-blue-300" },
  
  // Tools & Languages
  { name: "Git/GitHub", icon: GitBranch, level: "Essential", color: "text-red-400" },
  { name: "VS Code", icon: Monitor, level: "Editor", color: "text-blue-400" },
  { name: "Postman", icon: Send, level: "Tool", color: "text-orange-500" },
  { name: "Vercel", icon: Triangle, level: "Deploy", color: "text-white" },
  { name: "C / C++", icon: Cpu, level: "Core", color: "text-blue-600" },
];

const DigitalArsenal = () => {
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
      className="relative w-full bg-[#020602] py-24 overflow-hidden group perspective-2000"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-green-900/20 via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Tech Ecosystem
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-600">Digital Arsenal</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Tap any skill to see details. A network of interconnected technologies powering scalable systems.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-6xl mx-auto perspective-1000">
          {TECH_STACK.map((tech, index) => (
            <Hexagon3D key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 3D Hexagon Component (Updated for Touch) ---
const Hexagon3D = ({ tech, index }) => {
  const [isTapped, setIsTapped] = useState(false); // New state for mobile tap
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsTapped(false); // Reset on mouse leave (desktop)
  };

  const handleTap = () => {
    setIsTapped(!isTapped); // Toggle on tap (mobile)
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={cn(
        "relative w-32 h-36 md:w-36 md:h-40 flex items-center justify-center",
        index % 2 !== 0 ? "md:mt-16" : "mt-0" 
      )}
      style={{ perspective: "1000px" }}
      onClick={handleTap} // Enable tap interaction
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d" 
        }}
        className="group/hex relative w-full h-full cursor-pointer tap-highlight-transparent"
      >
        {/* Hexagon Shape - Logic updated to support isTapped OR hover */}
        <div 
          className={cn(
            "absolute inset-0 bg-[#0f1210] transition-all duration-300", 
            "border-[2px]",
            // Apply Green Border if Tapped OR Hovered
            (isTapped ? "border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.4)]" : "border-white/5 group-hover/hex:border-green-500 group-hover/hex:shadow-[0_0_40px_rgba(34,197,94,0.4)]"),
            "flex flex-col items-center justify-center z-10 shadow-lg"
          )}
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            transform: "translateZ(20px)"
          }}
        >
          {/* Spotlight Gradient - Visible if Tapped OR Hovered */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/20 transition-opacity duration-500",
            (isTapped ? "opacity-100" : "opacity-0 group-hover/hex:opacity-100")
          )} />

          {/* Icon Spin - Spin if Tapped OR Hovered */}
          <div className={cn(
            "mb-3 transition-transform duration-500",
            (isTapped ? "rotate-[360deg] scale-110" : "group-hover/hex:rotate-[360deg] group-hover/hex:scale-110")
          )}>
            <tech.icon className={cn("w-8 h-8 md:w-10 md:h-10", tech.color)} />
          </div>
          
          <span className={cn(
            "text-[10px] md:text-xs font-bold transition-colors",
            (isTapped ? "text-white" : "text-slate-400 group-hover/hex:text-white")
          )}>
            {tech.name}
          </span>
        </div>

        {/* Wires */}
        <div className={cn(
          "absolute inset-0 z-0 transition-opacity duration-300",
          (isTapped ? "opacity-100" : "opacity-30 group-hover/hex:opacity-100")
        )}>
           <div className="absolute top-1/2 left-1/2 w-[120%] h-[2px] bg-green-500/30 -translate-x-1/2 -translate-y-1/2 rotate-[-60deg]" />
           <div className="absolute top-1/2 left-1/2 w-[120%] h-[2px] bg-green-500/30 -translate-x-1/2 -translate-y-1/2 rotate-[60deg]" />
           <div className="absolute top-1/2 left-1/2 w-[120%] h-[2px] bg-green-500/30 -translate-x-1/2 -translate-y-1/2 rotate-[0deg]" />
        </div>

        {/* Tooltip - Visible if Tapped OR Hovered */}
        <div 
          className={cn(
            "absolute -top-12 left-1/2 -translate-x-1/2 transition-all duration-300 transform z-30 pointer-events-none",
            (isTapped ? "opacity-100 -translate-y-2" : "opacity-0 -translate-y-0 group-hover/hex:opacity-100 group-hover/hex:-translate-y-2")
          )}
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="bg-green-600 text-white text-[10px] font-bold py-1 px-3 rounded shadow-xl whitespace-nowrap border border-green-400/50">
            {tech.level}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-green-600" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DigitalArsenal;