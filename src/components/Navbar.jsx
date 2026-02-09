import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  Briefcase, 
  Mail, 
  Terminal, 
  Download 
} from "lucide-react";

// Import your resume file here
import resume from '../assets/resume/resume.pdf'; 

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Projects", icon: Briefcase, href: "/projects" },
  { name: "Contact", icon: Mail, href: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Home");
  const [hoveredTab, setHoveredTab] = useState(null);

  // Sync active tab with current URL path
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.href === currentPath);
    if (activeItem) {
      setActiveTab(activeItem.name);
    }
  }, [location]);

  return (
    <>
      {/* ======================================================= */}
      {/* DESKTOP NAVIGATION (No Changes)           */}
      {/* ======================================================= */}
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl">
        <nav className="w-full px-2 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-lg shadow-green-900/10 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link to="/" className="pl-4 flex items-center gap-2 group cursor-pointer">
            <div className="p-1.5 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
              <Terminal className="w-5 h-5 text-green-400" />
            </div>
            <span className="font-bold text-slate-200 tracking-tight group-hover:text-white transition-colors">
              Sahil<span className="text-green-500">.dev</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul 
            className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {navItems.map((item) => {
              const isHovered = hoveredTab === item.name;
              const isActive = activeTab === item.name;
              const showPill = isHovered || (hoveredTab === null && isActive);

              return (
                <li key={item.name} className="relative z-0">
                  <Link
                    to={item.href}
                    onClick={() => setActiveTab(item.name)}
                    onMouseEnter={() => setHoveredTab(item.name)}
                    className={`relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 block ${
                        showPill ? "text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {showPill && (
                      <motion.div
                        layoutId="desktop-nav-pill"
                        className="absolute inset-0 bg-green-600 rounded-full -z-10 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Download Resume Button (Desktop) */}
          <div className="pr-2">
            <a 
              href={resume}
              download="Sahil_Master_Resume.pdf"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-green-400 transition-colors duration-300 group"
            >
              <span>Resume</span>
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </nav>
      </div>

      {/* ======================================================= */}
      {/* MOBILE NAVIGATION (Top Bar)               */}
      {/* ======================================================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-green-900/5"
        >
          
          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-green-500/10">
              <Terminal className="w-4 h-4 text-green-400" />
            </div>
            <span className="font-bold text-slate-200 text-sm tracking-tight">
              Sahil<span className="text-green-500">.dev</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Mobile Nav Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.name;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setActiveTab(item.name)}
                    className="relative px-3 py-2 group"
                  >
                    <div className={`relative z-10 transition-colors duration-300 ${
                      isActive ? "text-green-400" : "text-slate-400"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Active Indicator (Small Dot/Line below) */}
                    {isActive && (
                      <motion.div 
                        layoutId="mobile-active-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Resume Button (Mobile - Compact) */}
            <a 
              href={resume}
              download="Sahil_Master_Resume.pdf"
              className="p-2 rounded-full bg-white/10 text-white hover:bg-green-500 hover:text-black transition-all duration-300 border border-white/10"
              aria-label="Download Resume"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;