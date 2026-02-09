import React, { useState } from "react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Send,
  Minimize2,
  X,
  ArrowUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {

  // --- Scroll to Top Function ---
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    // FIX: Removed 'overflow-hidden' from here so tooltips can float outside
    <footer className="relative w-full bg-[#020602] border-t border-green-500/10 pt-16 pb-8">
      
      {/* --- Background Grid (Contained & Clipped) --- */}
      {/* Kept overflow-hidden HERE to contain the background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,100,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,100,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/10 rounded-full blur-[100px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          
          {/* 1. Brand Section */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 group cursor-pointer w-fit">
              <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                <Terminal className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-xl font-bold text-slate-100 tracking-tight">
                Sahil<span className="text-green-500">.dev</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Building digital experiences that matter. Focused on clean code, high performance, and next-gen user interfaces.
            </p>
          </div>

          {/* 2. Explore Links */}
          <div className="md:col-span-3">
            <h3 className="text-green-400 font-bold tracking-widest text-sm uppercase mb-6">Explore</h3>
            <ul className="flex flex-col gap-3">
              {['Home', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    // FIX: Added '/' to ensure paths are absolute (e.g., /projects)
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/0 group-hover:bg-green-500 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Connect Section & Back to Top */}
          <div className="md:col-span-4">
            
            {/* Header with "Back to Top" button floated right */}
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-green-400 font-bold tracking-widest text-sm uppercase">Connect</h3>
               
               {/* --- BACK TO TOP BUTTON --- */}
               <button 
                 onClick={scrollToTop}
                 className="group flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-green-400 transition-colors"
               >
                 <span>Back to Top</span>
                 <div className="p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-green-500/20 group-hover:border-green-500/30 transition-all">
                    <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" />
                 </div>
               </button>
            </div>
            
            {/* Social Icons Row */}
            <div className="flex items-center gap-4 mb-6">
              
              {/* GitHub */}
              <HoverableSocialButton
                icon={Github}
                href="https://github.com/masterSahil"
                label="GitHub"
                brandColor="hover:bg-[#333] hover:border-[#333]"
              >
                <div className="w-48 bg-[#0d1117] rounded-xl overflow-hidden border border-white/10 shadow-xl">
                    <div className="h-12 bg-gradient-to-r from-slate-800 to-[#333] relative"></div>
                    <div className="p-3 relative -mt-6">
                      <div className="w-10 h-10 rounded-full bg-black border-2 border-[#0d1117] flex items-center justify-center mb-2 relative z-10">
                         <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Profile" className="w-6 h-6 rounded-full" />
                      </div>
                      <h4 className="text-white text-sm font-bold">Sahil Master</h4>
                      <p className="text-slate-400 text-[10px]">@masterSahil</p>
                    </div>
                </div>
              </HoverableSocialButton>

              {/* LinkedIn */}
              <HoverableSocialButton
                icon={Linkedin}
                href="https://www.linkedin.com/in/sahil-master/"
                label="LinkedIn"
                brandColor="hover:bg-[#0077b5] hover:border-[#0077b5]"
              >
                <div className="w-48 bg-white rounded-xl overflow-hidden border border-white/10 shadow-xl">
                    <div className="h-12 bg-[#0fb500] relative"></div>
                    <div className="p-3 relative -mt-6">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-white flex items-center justify-center mb-2 relative z-10 shadow-sm">
                        <Linkedin className="w-6 h-6 text-[#0fb500]" />
                      </div>
                      <h4 className="text-slate-900 text-sm font-bold">Sahil Master</h4>
                      <p className="text-slate-500 text-[10px]">Full Stack Dev</p>
                    </div>
                </div>
              </HoverableSocialButton>
              
              {/* Mail */}
              <HoverableSocialButton
                icon={Mail}
                href="mailto:7882mastersahil@gmail.com"
                label="Email"
                brandColor="hover:bg-green-600 hover:border-green-600"
              >
                 <div className="w-64 bg-[#1a1d1b] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    <div className="bg-green-600 px-3 py-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-white">New Message</span>
                      <div className="flex gap-2"><Minimize2 className="w-3 h-3 text-white/70" /><X className="w-3 h-3 text-white/70" /></div>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex items-center gap-2 text-xs border-b border-white/5 pb-1">
                        <span className="text-slate-500">To:</span><span className="text-green-400">7882mastersahil@gmail.com</span>
                      </div>
                      <div className="text-xs text-slate-500 border-b border-white/5 pb-1">Subject: Project Inquiry</div>
                      <div className="h-12 text-xs text-slate-400 pt-1">Hi Sahil...</div>
                      <button className="w-full py-1.5 bg-white/5 hover:bg-green-500/20 text-green-400 text-xs font-bold rounded flex items-center justify-center gap-2 transition-colors">
                        Send <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
              </HoverableSocialButton>
            </div>

            <a href="mailto:7882mastersahil@gmail.com" className="flex items-center gap-2 text-slate-400 text-sm group cursor-pointer hover:text-green-400 transition-colors w-fit">
              <Mail className="w-4 h-4" />
              <span>7882mastersahil@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 Sahil Master. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- REUSABLE HOVERABLE BUTTON COMPONENT ---
const HoverableSocialButton = ({ icon: Icon, href, label, brandColor, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMail = href.startsWith('mailto:');

  return (
    // FIX: Added z-50 to container when hovered to ensure it sits on top of everything
    <div 
      className={`relative flex justify-center ${isHovered ? 'z-50' : 'z-20'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a 
        href={href}
        target={isMail ? undefined : "_blank"}
        rel={isMail ? undefined : "noopener noreferrer"}
        className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-1 relative z-20 ${brandColor}`}
        aria-label={label}
      >
        <Icon className="w-4 h-4" />
      </a>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 z-50 origin-bottom"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Footer;