import React from "react";
import { 
  motion, 
  useMotionTemplate, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "framer-motion";
import { 
  Home, 
  MoveLeft, 
  AlertTriangle, 
  Terminal,
  Ghost,
  SearchX
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NotFound = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Handle Mouse Move (Desktop)
  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Handle Touch Move (Mobile)
  const handleTouchMove = ({ currentTarget, touches }) => {
    if (touches.length > 0) {
      const { left, top } = currentTarget.getBoundingClientRect();
      const { clientX, clientY } = touches[0];
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative min-h-[80vh] py-25 w-full bg-[#020602] overflow-hidden flex flex-col items-center justify-center group"
    >
      {/* --- Dynamic Background & Flashlight Effect --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-green-900/20 via-transparent to-transparent opacity-50" />
        
        {/* Tech Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Interactive Flashlight (Works on Hover & Touch) */}
        <motion.div
          className="absolute inset-0 opacity-100 transition-opacity duration-500"
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

      {/* --- Main Content --- */}
      <div className="relative z-10  text-center px-4 max-w-4xl mx-auto space-y-8">
        
        {/* 404 Glitch Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
          
          <div className="relative z-10 flex items-center justify-center">
            <h1 className="text-[8rem] md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-green-300 to-green-900/20 tracking-tighter leading-none select-none">
              404
            </h1>
            
            {/* Floating Ghost/Icon */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 md:top-4 md:right-0 bg-[#020602] border border-green-500/30 p-3 rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.2)]"
            >
              <SearchX className="w-8 h-8 md:w-12 md:h-12 text-green-400" />
            </motion.div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max">
             <div className="flex items-center gap-2 px-3 py-1 rounded border border-green-500/30 bg-green-500/5 text-green-400 text-xs font-mono">
               <AlertTriangle className="w-3 h-3" />
               <span>ERR_DATA_NOT_FOUND</span>
             </div>
          </div>
        </motion.div>

        {/* Text Description */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            System Malfunction: <span className="text-green-400">Path Unknown</span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
            The requested vector is outside the mapped parameters. The page you are looking for has been moved, deleted, or never existed in this timeline.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button 
            onClick={() => window.history.back()}
            className="group relative px-6 py-3 rounded-lg bg-[#0a0d0b] border border-white/10 hover:border-green-500/50 text-slate-300 hover:text-green-400 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-green-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="relative z-10 text-sm font-medium">Go Back</span>
          </button>

          <a 
            href="/"
            className="group relative px-8 py-3 rounded-lg bg-green-500 hover:bg-green-400 text-[#020602] font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Return to Home</span>
          </a>
        </div>
      </div>
      
      {/* Decorative Code Fragments in Background */}
      <div className="absolute bottom-10 left-10 opacity-20 hidden lg:block">
        <div className="text-[10px] font-mono text-green-500 space-y-1">
          <p>{`> locating_target... failed`}</p>
          <p>{`> trace_route... timeout`}</p>
          <p>{`> system_status... critical`}</p>
        </div>
      </div>

    </section>
  );
};

export default NotFound;