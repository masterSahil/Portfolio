import React, { useState } from "react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  ArrowUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// --- CUSTOM WHATSAPP ICON COMPONENT ---
const WhatsAppIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#020602] border-t border-green-500/10 pt-16 pb-8">
      
      {/* --- Background Grid --- */}
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

          {/* 3. Connect Section */}
          <div className="md:col-span-4">
            
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-green-400 font-bold tracking-widest text-sm uppercase">Connect</h3>
               
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
            <div className="flex flex-wrap items-center gap-4 mb-6">
              
              {/* GitHub */}
              <HoverableSocialButton
                icon={Github}
                href="https://github.com/masterSahil"
                label="GitHub"
                brandColor="hover:bg-[#333] hover:border-[#333] active:bg-[#333] active:border-[#333] active:text-white"
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
                brandColor="hover:bg-[#0077b5] hover:border-[#0077b5] active:bg-[#0077b5] active:border-[#0077b5] active:text-white"
              >
                <div className="w-48 bg-white rounded-xl overflow-hidden border border-white/10 shadow-xl">
                    <div className="h-12 bg-[#0077b5] relative"></div>
                    <div className="p-3 relative -mt-6">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-white flex items-center justify-center mb-2 relative z-10 shadow-sm">
                        <Linkedin className="w-6 h-6 text-[#0077b5]" />
                      </div>
                      <h4 className="text-slate-900 text-sm font-bold">Sahil Master</h4>
                      <p className="text-slate-900 font-semibold text-[10px]">Full Stack Dev</p>
                    </div>
                </div>
              </HoverableSocialButton>
              
              {/* WhatsApp */}
              <HoverableSocialButton
                icon={WhatsAppIcon}
                href="https://wa.me/919033352334?text=Hey%20Sahil,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!" 
                label="WhatsApp"
                brandColor="hover:bg-[#25D366] hover:border-[#25D366] active:bg-[#25D366] active:border-[#25D366] active:text-white"
              >
                 <div className="w-52 bg-[#0b141a] border border-[#25D366]/20 rounded-xl shadow-2xl overflow-hidden">
                    <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3 border-b border-white/5">
                      <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
                          <WhatsAppIcon className="w-5 h-5 text-white fill-white" />
                      </div>
                      <div>
                        <h4 className="text-white text-xs font-bold">Sahil Master</h4>
                        <p className="text-green-400 text-[10px]">Online</p>
                      </div>
                    </div>
                    <div className="p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-10">
                      <div className="bg-[#202c33] p-2 rounded-lg rounded-tl-none w-fit max-w-[85%] mb-2">
                        <p className="text-slate-200 text-[11px]">Hey! Need a developer?</p>
                      </div>
                      <div className="bg-[#005c4b] p-2 rounded-lg rounded-tr-none w-fit max-w-[85%] ml-auto">
                        <p className="text-white text-[11px]">Let's chat! 👋</p>
                      </div>
                    </div>
                 </div>
              </HoverableSocialButton>

              {/* Mail - MODIFIED TO CARD STYLE */}
              <HoverableSocialButton
                icon={Mail}
                href="mailto:7882mastersahil@gmail.com"
                label="Email"
                brandColor="hover:bg-green-600 hover:border-green-600 active:bg-green-600 active:border-green-600 active:text-white"
              >
                  <div className="w-60 bg-[#1a1d1b] rounded-xl overflow-hidden border border-white/10 shadow-xl">
                    {/* Banner */}
                    <div className="h-12 bg-gradient-to-r from-green-600 to-emerald-400 relative"></div>
                    
                    {/* Content */}
                    <div className="p-3 relative -mt-6">
                      <div className="w-10 h-10 rounded-full bg-[#1a1d1b] border-2 border-[#1a1d1b] flex items-center justify-center mb-2 relative z-10">
                          <div className="w-full h-full rounded-full bg-green-500/20 flex items-center justify-center">
                             <Mail className="w-5 h-5 text-green-400" />
                          </div>
                      </div>
                      
                      <h4 className="text-white text-sm font-bold">Sahil Master</h4>
                      <p className="text-slate-400 text-[11px] mb-3">7882mastersahil@gmail.com</p>
                      
                      {/* Status Badge */}
                      <div className="flex items-center gap-2 bg-white/5 rounded-md px-2 py-1.5 w-full border border-white/5">
                         <span className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                         </span>
                         <span className="text-[10px] font-medium text-green-400">Open to opportunities</span>
                      </div>
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
      </div>
    </footer>
  );
};

// --- REUSABLE BUTTON COMPONENT ---
const HoverableSocialButton = ({ icon: Icon, href, label, brandColor, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMail = href.startsWith('mailto:');

  return (
    <div 
      className={`relative flex justify-center ${isHovered ? 'z-50' : 'z-20'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a 
        href={href}
        target={isMail ? undefined : "_blank"}
        rel={isMail ? undefined : "noopener noreferrer"}
        className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-1 active:scale-90 relative z-20 ${brandColor}`}
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
            className="hidden md:block absolute bottom-14 left-1/2 -translate-x-1/2 z-50 origin-bottom whitespace-nowrap"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Footer;