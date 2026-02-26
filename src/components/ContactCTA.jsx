import React, { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useMotionTemplate 
} from "framer-motion";
import { Mail, Download } from "lucide-react";

const ContactCTA = () => {
  const containerRef = useRef(null);
  
  // 1. Cursor Tracking Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };
  
  // Parallax effect for the background grid
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove} 
      className="relative w-full py-15 lg:py-20 overflow-hidden bg-[#020602] flex items-center justify-center group"
    >
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* 1. The "Pulse" Glow Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-green-500/10 blur-[120px] rounded-full opacity-60 animate-pulse" />
        
        {/* 2. Grid Pattern (Moving) */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" 
        />

        {/* 3. THE CURSOR FLASHLIGHT EFFECT */}
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

      <div className="relative z-10 container px-4 mx-auto max-w-4xl text-center">
        
        {/* --- CONTENT WRAPPER --- */}
        <div className="relative p-8 md:p-12 border border-white/5 bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden">
          
          {/* Decorative Corner Brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500/30 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500/30 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500/30 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/30 rounded-br-lg" />

          {/* Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Have a project in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">mind?</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            I am currently open to freelance work and internship opportunities. 
            Let's discuss how I can contribute to your team with scalable code and pixel-perfect design.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary Button: Open Email */}
            <a 
              href="mailto:7882mastersahil@gmail.com"
              className="group/btn relative overflow-hidden rounded-full bg-green-600 px-10 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-green-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Me
              </span>
              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
            </a>

            {/* Secondary Button: Download Resume */}
            <a 
              href="/Master_Sahil_Resume.pdf" 
              download="Sahil_Master_Resume.pdf"
              className="group/btn flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white active:scale-95"
            >
              <Download className="w-5 h-5 text-green-400" />
              Download CV
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactCTA;