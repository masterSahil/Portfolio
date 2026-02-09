import React from "react";
import { 
  motion, 
  useMotionTemplate, 
  useMotionValue 
} from "framer-motion";
import { 
  Monitor, 
  Smartphone, 
  BrainCircuit, 
  ArrowUpRight, 
  Code2, 
  Cpu, 
  Globe,
  Database,
  Layers,
  Zap
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Service Data (Fixed Mapping Logic) ---
const SERVICES = [
  {
    id: 1,
    title: "Web Development",
    description: "Full-stack MERN applications built for scalability. I craft responsive, accessible, and dynamic user experiences with modern architecture.",
    icon: Monitor,
    bgIcon: Globe,
    // Explicit tailwind classes for the theme
    themeColor: "text-green-400",
    themeBorder: "group-hover:border-green-500/50",
    themeShadow: "group-hover:shadow-[0_0_40px_rgba(74,222,128,0.2)]",
    themeBg: "group-hover:bg-green-500",
    // Specific tags for THIS service
    features: [
      { icon: Code2, txt: "React" },
      { icon: Database, txt: "Node" },
      { icon: Layers, txt: "MongoDB" }
    ]
  },
  {
    id: 2,
    title: "AI Integration",
    description: "Leveraging OpenAI and Python to build smart tools. From chatbots to automated analysis, I bring next-gen intelligence to your web presence.",
    icon: BrainCircuit,
    bgIcon: Cpu,
    themeColor: "text-emerald-400",
    themeBorder: "group-hover:border-emerald-500/50",
    themeShadow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]",
    themeBg: "group-hover:bg-emerald-500",
    features: [
      { icon: Cpu, txt: "Gen AI" },
      { icon: BrainCircuit, txt: "OpenAI" },
      { icon: Zap, txt: "Chatbot" }
    ]
  },
  {
    id: 3,
    title: "Mobile Apps",
    description: "Cross-platform mobile solutions using React Native. One codebase, two platforms (iOS & Android), delivering native-like performance.",
    icon: Smartphone,
    bgIcon: Smartphone,
    themeColor: "text-teal-400",
    themeBorder: "group-hover:border-teal-500/50",
    themeShadow: "group-hover:shadow-[0_0_40px_rgba(20,184,166,0.2)]",
    themeBg: "group-hover:bg-teal-500",
    features: [
      { icon: Code2, txt: "React Native" },
      { icon: Smartphone, txt: "Expo" },
      { icon: Layers, txt: "Cross-Platform" }
    ]
  }
];

const Deliver = () => {
  // --- Global Spotlight Logic (Section Level Only) ---
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
      className="relative w-full bg-[#020602] py-24 overflow-hidden group/section"
    >
      {/* --- Dynamic Green Grid Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 1. Ambient Bottom Light */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[128px]" />
        
        {/* 2. Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* 3. The Interactive Flashlight Overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover/section:opacity-100 transition-opacity duration-500"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                800px circle at ${mouseX}px ${mouseY}px,
                rgba(74, 222, 128, 0.1), 
                rgba(34, 197, 94, 0.05),
                transparent 80%
              )
            `,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 mb-4">
               <span className="w-8 h-[2px] bg-green-500"></span>
               <span className="text-green-400 font-bold tracking-widest text-sm uppercase">What I Deliver</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              High-Impact Services <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-600">
                For Modern Brands.
              </span>
            </h2>
          </motion.div>

          <motion.a 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            href="#" 
            className="hidden md:flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors group/link"
          >
            <span className="font-mono text-sm">View All Services</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
          </motion.a>
        </div>

        {/* Services Grid (Mapped correctly) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="md:hidden mt-12 text-center">
          <a className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors" href="#">
             View All Services <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

// --- Standard Service Card Component (No 3D) ---
const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-[420px] w-full"
    >
      <div className={cn(
        "relative h-full w-full rounded-2xl bg-[#0f1210] border p-8 flex flex-col justify-between transition-all duration-300 overflow-hidden",
        "border-white/5",
        service.themeBorder, 
        service.themeShadow
      )}>
        {/* --- Background Elements --- */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/80 pointer-events-none" />
        
        {/* Giant Abstract Icon Background */}
        <div className="absolute -right-12 -top-12 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
           <service.bgIcon className="w-64 h-64 text-white rotate-12" />
        </div>

        {/* --- Card Content --- */}
        <div className="relative z-10">
          {/* Icon Box */}
          <div className={cn(
            "w-16 h-16 rounded-xl flex items-center justify-center mb-8 transition-all duration-300",
            "bg-white/5 border border-white/10",
            service.themeBg, // Active bg color on hover
            "group-hover:scale-110"
          )}>
            <service.icon className={cn(
              "w-8 h-8 transition-colors duration-300",
              service.themeColor,
              "group-hover:text-black"
            )} />
          </div>

          <h4 className="text-2xl font-bold text-white mb-4">{service.title}</h4>
          <p className="text-slate-400 leading-relaxed text-sm">
            {service.description}
          </p>
        </div>

        {/* Bottom Action (Fixed Tag Mapping) */}
        <div className="relative z-10 pt-8 mt-auto">
           <div className="flex flex-wrap gap-3">
              {/* Map specific features for THIS service only */}
              {service.features.map((feature, i) => (
                <div key={i} className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors",
                  `group-hover:border-${service.themeColor.split('-')[1]}-500/30 group-hover:text-white`
                )}>
                  <feature.icon className={cn("w-3 h-3", service.themeColor)} />
                  {feature.txt}
                </div>
              ))}
           </div>
        </div>

        {/* --- Interactive Gradient Overlay --- */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      </div>
    </motion.div>
  );
};

export default Deliver;