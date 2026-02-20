import React, { useState, useRef } from "react";
import {  motion,  useMotionTemplate,  useMotionValue,  AnimatePresence } from "framer-motion";
import {  Send, Mail, MapPin, Phone,  Github, Linkedin,  ArrowRight, CheckCircle2, AlertCircle, Loader2, Sparkles, ExternalLink } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from 'axios'

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const CONTACT_DETAILS = {
  email: "7882mastersahil@gmail.com",
  phone: "+91 9033352334",
  address: "Adajan, Surat.",
  googleMapsUrl: "https://maps.google.com/?q=Adajan,Surat",
  github: "https://github.com/masterSahil",
  linkedin: "https://www.linkedin.com/in/sahil-master/"
};

const ContactComponent = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#020602] overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-200 font-sans text-slate-200 group"
    >
      
      {/* --- BACKGROUND MATRIX & TORCH EFFECT --- */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Top Fade Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-green-900/20 via-transparent to-transparent opacity-50" />
        
        {/* Matrix Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* 1. DESKTOP TORCH (Hidden on Mobile) 
            Follows the mouse cursor.
        */}
        <motion.div
          className="block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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

        {/* 2. MOBILE TORCH (Hidden on Desktop)
            Automatically floats around like a searchlight.
        */}
        <motion.div
            className="md:hidden absolute inset-0 opacity-100"
            animate={{
                background: [
                    "radial-gradient(600px circle at 20% 20%, rgba(74, 222, 128, 0.15), transparent 80%)",
                    "radial-gradient(600px circle at 80% 80%, rgba(74, 222, 128, 0.15), transparent 80%)",
                    "radial-gradient(600px circle at 20% 80%, rgba(74, 222, 128, 0.15), transparent 80%)",
                    "radial-gradient(600px circle at 80% 20%, rgba(74, 222, 128, 0.15), transparent 80%)",
                    "radial-gradient(600px circle at 20% 20%, rgba(74, 222, 128, 0.15), transparent 80%)"
                ]
            }}
            transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
            }}
        />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col gap-12 py-20 md:py-24">
        <HeaderSection />
        <ContactFormSection />
      </div>
    </div>
  );
};

const HeaderSection = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center text-center space-y-6"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">System Online</span>
      </div>
  
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
        Let's <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-green-600">Connect</span>
      </h1>
      <p className="max-w-xl text-slate-400 text-base md:text-lg leading-relaxed">
        Have a project in mind? I'm available for freelance work. 
        Initialize a connection request below.
      </p>
    </motion.div>
  );
  
  const ContactFormSection = () => {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle");
  
    const validate = () => {
      let tempErrors = {};
      if (!formData.name.trim()) tempErrors.name = "Name is required";
      if (!formData.email.trim()) tempErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid email address";
      if (!formData.subject.trim()) tempErrors.subject = "Subject is required"; 
      if (!formData.message.trim()) tempErrors.message = "Message is required";
      
      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validate()) return;

      try {
        setStatus("submitting");

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, formData);

        if (res.data.success) {
          setStatus("success");
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          setStatus("idle");
        }
      } catch (err) {
        console.error(err);
        setStatus("idle");
      }
    };
  
    const handleChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: null }));
      }
    };
  
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Contact Info (Left) */}
        <motion.div 
          className="lg:col-span-4 space-y-6 order-2 lg:order-1"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative p-6 rounded-xl bg-[#0a0f0b] border border-white/10 flex flex-col gap-6 h-full overflow-hidden group/card">
              {/* Hover Glow for Card */}
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <h3 className="text-lg font-bold text-white flex items-center gap-2 relative z-10">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Contact Info
              </h3>
              
              {/* Contact Items - All Clickable */}
              <div className="space-y-3 relative z-10">
                  <ContactItem 
                    icon={Mail} 
                    label="Email" 
                    value={CONTACT_DETAILS.email} 
                    href={`mailto:${CONTACT_DETAILS.email}`} 
                  />
                  <ContactItem 
                    icon={Phone} 
                    label="Phone" 
                    value={CONTACT_DETAILS.phone} 
                    href={`tel:${CONTACT_DETAILS.phone}`} 
                  />
                  <ContactItem 
                    icon={MapPin} 
                    label="Location" 
                    value={CONTACT_DETAILS.address} 
                    href={CONTACT_DETAILS.googleMapsUrl}
                    isExternal 
                  />
              </div>
              
              <div className="w-full h-px bg-white/5 my-2 relative z-10" />
  
              {/* Social Buttons */}
              <div className="grid grid-cols-1 gap-3 mt-auto relative z-10">
                    <SocialButton 
                      icon={Github} 
                      label="GitHub" 
                      href={CONTACT_DETAILS.github} 
                    />
                    <SocialButton 
                      icon={Linkedin} 
                      label="LinkedIn" 
                      href={CONTACT_DETAILS.linkedin} 
                    />
              </div>
          </div>
        </motion.div>
  
        {/* Main Form (Right) */}
        <motion.div 
          className="lg:col-span-8 order-1 lg:order-2"
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-full">
              <form 
                  onSubmit={handleSubmit}
                  className="relative bg-[#0a0f0b] rounded-xl p-6 md:p-8 border border-white/10 h-full flex flex-col group/form overflow-hidden"
              >
                  {/* Subtle Scanline on Form Hover */}
                  <div className="absolute top-0 left-0 w-full h-px bg-emerald-500/30 -translate-x-full group-hover/form:animate-[scan_3s_linear_infinite] opacity-0 group-hover/form:opacity-100 pointer-events-none" />
  
                  <div className="grid md:grid-cols-2 gap-6 mb-6 relative z-10">
                      <GreenInput 
                          label="Name" 
                          value={formData.name} 
                          error={errors.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="John Doe"
                      />
                      <GreenInput 
                          label="Email" 
                          type="email"
                          value={formData.email} 
                          error={errors.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="john@example.com"
                      />
                  </div>
  
                  <div className="mb-6 relative z-10">
                      <GreenInput 
                          label="Subject" 
                          value={formData.subject} 
                          error={errors.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          placeholder="Project Inquiry"
                      />
                  </div>
  
                  <div className="mb-8 grow relative z-10">
                      <GreenInput 
                          label="Message" 
                          textarea 
                          value={formData.message} 
                          error={errors.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          placeholder="Tell me about your idea..."
                      />
                  </div>
  
                  <SubmitButton status={status} />
              </form>
          </div>
        </motion.div>
      </div>
    );
  };
  
  const SocialButton = ({ icon: Icon, label, href }) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-200"
      >
          <div className="flex items-center gap-3">
              <div className="p-1.5 bg-black/40 rounded text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{label}</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
      </a>
  );
  
  const ContactItem = ({ icon: Icon, label, value, href, isExternal }) => (
      <a 
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="flex items-center gap-4 group p-3 -mx-2 rounded-lg hover:bg-white/5 transition-colors"
      >
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 transition-all duration-300">
              <Icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">{label}</p>
              <p className="text-sm text-white font-medium group-hover:text-emerald-100 transition-colors truncate">
                  {value}
              </p>
          </div>
          <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-400" />
      </a>
  );
  
  const GreenInput = ({ label, value, onChange, error, placeholder, type = "text", textarea = false }) => {
    const [isFocused, setIsFocused] = useState(false);
    const Component = textarea ? "textarea" : "input";
  
    const shakeVariants = {
      idle: { x: 0 },
      shake: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.3 } }
    };
  
    return (
      <motion.div 
          className="flex flex-col gap-1.5 w-full"
          animate={error ? "shake" : "idle"}
          variants={shakeVariants}
      >
        <div className="flex justify-between items-end">
          <label className={cn(
              "text-[10px] font-bold uppercase tracking-widest transition-colors duration-200",
              error ? "text-red-400" : isFocused ? "text-emerald-400" : "text-slate-500"
          )}>
              {label} {error && "*"}
          </label>
          
          <AnimatePresence>
              {error && (
                  <motion.span 
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      className="text-[10px] text-red-400 font-medium flex items-center gap-1"
                  >
                      <AlertCircle className="w-3 h-3" /> {error}
                  </motion.span>
              )}
          </AnimatePresence>
        </div>
  
        <div className="relative group">
          <Component
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            rows={textarea ? 4 : undefined}
            type={type}
            className={cn(
              "w-full bg-[#111] text-slate-200 border outline-none py-3 px-3 transition-all duration-200 placeholder:text-slate-700 font-mono text-sm",
              "rounded-lg",
              error 
                  ? "border-red-500/50 bg-red-500/5 focus:border-red-500" 
                  : isFocused 
                      ? "border-emerald-500/50 bg-[#131614] shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                      : "border-white/10 hover:border-white/20 hover:bg-[#141414]"
            )}
          />
        </div>
      </motion.div>
    );
  };
  
  const SubmitButton = ({ status }) => (
      <button
          disabled={status === "submitting"}
          className={cn(
              "w-full relative overflow-hidden rounded-lg group transition-all duration-200",
              status === "submitting" ? "opacity-80" : "hover:brightness-110 active:scale-[0.99]"
          )}
      >
          <div className={cn(
              "absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 transition-all duration-300",
              status === "success" ? "opacity-0" : "opacity-100"
          )} />
  
          <div className={cn(
              "absolute inset-0 bg-emerald-500 transition-all duration-300",
              status === "success" ? "opacity-100" : "opacity-0"
          )} />
          
          <div className="relative flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-lg text-sm tracking-wide">
              {status === "submitting" ? (
                  <>
                      <Loader2 className="w-4 h-4 animate-spin text-white/80" />
                      <span>Processing...</span>
                  </>
              ) : status === "success" ? (
                  <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Sent Successfully</span>
                  </>
              ) : (
                  <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </>
              )}
          </div>
      </button>
  );
  
  export default ContactComponent;