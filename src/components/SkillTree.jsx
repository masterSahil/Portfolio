import React, { useState } from "react";
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
  Layout, 
  Smartphone, 
  Bot, 
  Zap,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- SKILL DATA (Updated with Line Styling) ---
const SKILL_TREE = [
  {
    category: "Frontend",
    icon: Layout,
    text: "text-emerald-400",
    border: "border-emerald-500/50",
    bar: "bg-emerald-400",
    shadow: "shadow-[0_0_20px_rgba(52,211,153,0.4)]",
    // NEW: Explicit styling for the vertical line
    line: "group-hover/branch:bg-emerald-400",
    lineShadow: "group-hover/branch:shadow-[0_0_15px_#34d399]",
    skills: [
      { name: "React.js", level: 90 },
      { name: "HTML5/CSS3", level: 100 },
      { name: "JavaScript", level: 85 },
      { name: "Tailwind CSS", level: 95 }
    ]
  },
  {
    category: "Backend",
    icon: Server,
    text: "text-green-500",
    border: "border-green-500/50",
    bar: "bg-green-500",
    shadow: "shadow-[0_0_20px_rgba(34,197,94,0.4)]",
    line: "group-hover/branch:bg-green-500",
    lineShadow: "group-hover/branch:shadow-[0_0_15px_#22c55e]",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 90 },
      { name: "REST APIs", level: 95 },
      { name: "CRUD Ops", level: 95 }
    ]
  },
  {
    category: "Mobile",
    icon: Smartphone,
    text: "text-teal-400",
    border: "border-teal-500/50",
    bar: "bg-teal-400",
    shadow: "shadow-[0_0_20px_rgba(45,212,191,0.4)]",
    line: "group-hover/branch:bg-teal-400",
    lineShadow: "group-hover/branch:shadow-[0_0_15px_#2dd4bf]",
    skills: [
      { name: "React Native", level: 85 },
      { name: "Expo", level: 75 },
      { name: "APK Deployment", level: 82 }
    ]
  },
  {
    category: "Database",
    icon: Database,
    text: "text-lime-400",
    border: "border-lime-500/50",
    bar: "bg-lime-400",
    shadow: "shadow-[0_0_20px_rgba(163,230,53,0.4)]",
    line: "group-hover/branch:bg-lime-400",
    lineShadow: "group-hover/branch:shadow-[0_0_15px_#a3e635]",
    skills: [
      { name: "MongoDB", level: 95 },
      { name: "Firebase", level: 85 },
      { name: "Cloudinary", level: 80 },
      { name: "Supabase", level: 70 },
    ]
  },
  {
    category: "AI & Tech",
    icon: Bot,
    text: "text-cyan-400",
    border: "border-cyan-500/50",
    bar: "bg-cyan-400",
    shadow: "shadow-[0_0_20px_rgba(34,211,238,0.4)]",
    line: "group-hover/branch:bg-cyan-400",
    lineShadow: "group-hover/branch:shadow-[0_0_15px_#22d3ee]",
    skills: [
      { name: "Gen AI", level: 65 },
      { name: "Chatbots", level: 75 },
      { name: "C / C++", level: 90 },
      { name: "DSA", level: 85 }
    ]
  }
];

const SkillTree = () => {
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
      className="relative min-h-screen w-full bg-[#020602] py-24 lg:py-32 overflow-hidden flex flex-col items-center justify-center group"
    >
      {/* --- Dynamic Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-green-900/10 via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Flashlight Cursor */}
        <motion.div
          className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                800px circle at ${mouseX}px ${mouseY}px,
                rgba(74, 222, 128, 0.08), 
                rgba(34, 197, 94, 0.03),
                transparent 80%
              )
            `,
          }}
        />
      </div>

      {/* --- Header Content --- */}
      <div className="relative z-10 text-center mb-16 lg:mb-24 px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
          <Zap className="w-3 h-3 animate-pulse" />
          Technical Proficiency
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-600">Skill Matrix</span>
        </h2>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Hover over the nodes to see the energy flow.
        </p>
      </div>

      {/* --- TREE STRUCTURE --- */}
      <div className="relative z-10 w-full max-w-[1400px] px-4 flex flex-col items-center">
        
        {/* 1. ROOT NODE */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="relative z-20 mb-12 lg:mb-20"
        >
          <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-[#0a0d0b] border-2 border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.3)] flex items-center justify-center relative z-20 hover:scale-110 transition-transform duration-300">
            <Code2 className="w-8 h-8 lg:w-12 lg:h-12 text-white" />
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-center w-max">
            <span className="text-green-400 font-bold tracking-widest text-[10px] lg:text-xs uppercase bg-[#020602]/90 px-3 py-1 rounded border border-green-500/30 backdrop-blur-md">
              Full Stack Arch
            </span>
          </div>
          
          {/* Main Vertical Spine (Root) */}
          <div className="absolute top-20 lg:top-28 left-1/2 -translate-x-1/2 h-16 lg:h-24 w-[2px] bg-gradient-to-b from-green-500 to-green-500/40 shadow-[0_0_15px_#22c55e]"></div>
        </motion.div>

        {/* 2. BRANCH CONTAINER */}
        <div className="relative w-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 lg:gap-6 xl:gap-10">
          
          {/* PC Connector: Horizontal Bus Bar */}
          <div className="hidden lg:block absolute -top-0 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />

          {/* Mobile Connector: Vertical Spine Background */}
          <div className="lg:hidden absolute top-[-30px] bottom-20 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-green-500/40 via-green-500/10 to-transparent pointer-events-none" />

          {SKILL_TREE.map((branch, index) => (
            <SkillBranch key={branch.category} branch={branch} index={index} bar={branch.bar} />
          ))}

        </div>
      </div>
    </section>
  );
};

// --- BRANCH COMPONENT ---
const SkillBranch = ({ branch, index }) => {
  const [isTapped, setIsTapped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 3D Tilt Physics
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [20, -20]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsTapped(false);
  };

  const handleTap = () => setIsTapped(!isTapped);

  return (
    <div className="relative flex flex-col items-center group/branch w-full max-w-[320px] lg:w-64 xl:w-72">
      
      {/* --- VERTICAL HIGHLIGHT LINE --- 
          1. Default state: `bg-white/10` (Dim)
          2. Hover state: Uses `branch.line` (Color) & `branch.lineShadow` (Glow)
      */}
      <div className={cn(
          "hidden lg:block absolute -top-12 lg:-top-24 left-1/2 -translate-x-1/2 h-12 lg:h-24 w-0.5 transition-all duration-300",
          "bg-gradient-to-b from-white/10 to-transparent", // Inactive State
          branch.line,       // Active Color (e.g. bg-emerald-400)
          branch.lineShadow  // Active Glow (e.g. shadow-green)
      )}></div>

      {/* Node Icon */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        style={{ perspective: "1000px" }}
        className="relative z-10 mb-6 lg:mb-8"
        onClick={handleTap}
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={cn(
            "w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-[#0f1210] border flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg relative",
            branch.border,
            (isTapped 
              ? `${branch.shadow} scale-110 border-opacity-100 bg-white/5` 
              : `hover:${branch.shadow} group-hover/branch:scale-110 group-hover/branch:border-opacity-100`
            )
          )}
        >
          <branch.icon className={cn(
            "w-7 h-7 lg:w-9 lg:h-9 transition-transform duration-500",
            branch.text,
            (isTapped ? "rotate-12 scale-110" : "group-hover/branch:rotate-12")
          )} />
          
          {/* Inner Glow */}
          <div className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-br transition-opacity duration-300", 
            `from-white/10 to-transparent`,
            (isTapped ? "opacity-20" : "opacity-0 group-hover/branch:opacity-20")
          )} />
        </motion.div>
      </motion.div>

      {/* Category Label */}
      <span className={cn(
        "font-bold tracking-widest text-xs lg:text-sm mb-6 uppercase transition-all duration-300",
        (isTapped ? `${branch.text} scale-110` : `text-white opacity-70 group-hover/branch:opacity-100 group-hover/branch:${branch.text}`)
      )}>
        {branch.category}
      </span>

      {/* Skill List */}
      <div className="flex flex-col gap-3 w-full px-6 lg:px-0">
        {branch.skills.map((skill, i) => (
          <SkillItem 
            key={skill.name} 
            name={skill.name} 
            level={skill.level} 
            branchData={branch} 
            branchLine={branch.line}
            bar={skill}
            index={i} 
            parentActive={isTapped}
          />
        ))}
      </div>
    </div>
  );
};

// --- Skill Bar Item ---
const SkillItem = ({ name, level, branchData, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + (index * 0.1) }}
      className={cn(
        "relative pl-3 py-2 border-l-2 mb-2 transition-all duration-300",
        // 1. Apply the color class immediately (e.g., text-emerald-400)
        branchData.text, 
        // 2. Force the border to use that color
        "border-current hover:bg-white/5 rounded-r-lg" 
      )}
    >
      <div className="flex justify-between items-center mb-1">
        {/* 3. Force the Name to be white/slate so it doesn't turn Green */}
        <span className="text-xs font-medium text-slate-300">
          {name}
        </span>
        <span className="text-[10px] font-mono opacity-80">
          {level}%
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className={cn("h-full shadow-[0_0_8px_currentColor]", branchData.bar)}
        />
      </div>
    </motion.div>
  );
};

export default SkillTree;