import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Utility: Scramble Text Effect ---
const ScrambleText = ({ text, trigger }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let interval;
    let iteration = 0;
    
    clearInterval(interval);
    interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return <span className="font-mono">{display}</span>;
};

const NexusLoader = ({ isLoading }) => {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("INITIALIZING");

  useEffect(() => {
    if (!isLoading) {
      // 1. Site is ready, change text to "ACCESS GRANTED"
      setStatus("ACCESS GRANTED");
      
      // 2. Wait 800ms for the user to read it, then open the gates
      const timer = setTimeout(() => {
        setShow(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[9999] flex flex-col pointer-events-none">
          
          {/* --- TOP SHUTTER --- */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="relative flex-1 bg-[#020602] w-full flex items-end justify-center border-b border-green-500/20"
          >
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </motion.div>

          {/* --- BOTTOM SHUTTER --- */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="relative flex-1 bg-[#020602] w-full flex items-start justify-center border-t border-green-500/20"
          >
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </motion.div>

          {/* --- CENTER CONTENT (Absolute) --- */}
          <motion.div 
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex top-16 items-center justify-center z-50"
          >
             <div className="relative flex flex-col items-center gap-8">
                
                {/* 1. The Glowing Hexagon Reactor */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                  
                  {/* Outer Ring Spinning */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-green-500/30"
                  />
                  
                  {/* Inner Hexagon Drawing Animation */}
                  <svg viewBox="0 0 100 100" className="w-full h-full p-4 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">
                    <motion.path
                      d="M50 5 L95 27.5 L95 72.5 L50 95 L5 72.5 L5 27.5 Z"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    {/* Inner Details */}
                    <motion.path
                      d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z"
                      fill="#22c55e"
                      fillOpacity="0.1"
                      stroke="#22c55e"
                      strokeWidth="1"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    />
                  </svg>

                  {/* Pulsing Core */}
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_20px_#fff]"
                  />
                </div>

                {/* 2. Scramble Text Status */}
                <div className="flex flex-col items-center gap-2">
                   <div className="text-green-500 text-sm md:text-base tracking-[0.3em] font-bold">
                      <ScrambleText text={status} trigger={status} />
                   </div>
                   
                   {/* Progress Bar Line */}
                   <div className="w-48 h-[2px] bg-green-900/50 rounded-full overflow-hidden relative">
                     <motion.div 
                        layoutId="loader-bar"
                        className="absolute inset-y-0 left-0 bg-green-500 shadow-[0_0_10px_#22c55e]"
                        initial={{ width: "0%" }}
                        animate={{ width: isLoading ? "60%" : "100%" }}
                        transition={{ duration: isLoading ? 20 : 0.5 }}
                     />
                   </div>
                </div>

             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NexusLoader;