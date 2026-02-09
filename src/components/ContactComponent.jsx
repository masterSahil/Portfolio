import React, { useState } from "react";
import { 
  motion, 
  useMotionTemplate, 
  useMotionValue, 
  useSpring,
  AnimatePresence 
} from "framer-motion";
import { 
  Send, Mail, MapPin, Phone, 
  Github, Linkedin, 
  ArrowRight, CheckCircle2, AlertCircle, Loader2, Sparkles, ExternalLink
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- CONFIGURATION ---
const CONTACT_DETAILS = {
  email: "7882mastersahil@gmail.com",
  phone: "+91 98765 43210",
  address: "Gujarat, India",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Gujarat+India", // Map Link
  github: "https://github.com/masterSahil",
  linkedin: "https://linkedin.com/in/yourprofile"
};

// --- MAIN WRAPPER ---
const ContactComponent = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse tracking (Spring Physics)
  const springX = useSpring(mouseX, { stiffness: 20, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 15 });

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#020602] overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-200 font-sans text-slate-200"
    >
      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* THE GREEN FLASHLIGHT CURSOR */}
        <motion.div
          className="absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${springX}px ${springY}px,
                rgba(16, 185, 129, 0.1),
                transparent 80%
              )
            `,
          }}
        />
        
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col gap-16 py-24">
        <HeaderSection />
        <ContactFormSection />
      </div>
    </div>
  );
};

// --- COMPONENT 1: HEADER ---
const HeaderSection = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="flex flex-col items-center text-center space-y-6"
  >
    {/* Animated Status Pill */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)] backdrop-blur-md">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
      <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">System Online</span>
    </div>

    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
      Let's <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-green-600">Connect</span>
    </h1>
    <p className="max-w-xl text-slate-400 text-lg leading-relaxed">
      Have a project in mind? I'm available for freelance work. 
      Fill out the terminal below and I'll get back to you shortly.
    </p>
  </motion.div>
);

// --- COMPONENT 2: THE FORM & LINKS ---
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
    if (!validate()) return; // Form shakes via component logic

    setStatus("submitting");
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* Contact Info (Left) */}
      <motion.div 
        className="lg:col-span-4 space-y-6"
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Contact Info
            </h3>
            
            {/* Contact Items - All Clickable */}
            <div className="space-y-4">
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
            
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

            {/* Social Buttons - Text & Icon */}
            <div className="grid grid-cols-1 gap-3">
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
        className="lg:col-span-8"
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-[24px] blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
            
            <form 
                onSubmit={handleSubmit}
                className="relative bg-[#0a0f0b] rounded-[22px] p-8 md:p-10 border border-white/10 shadow-2xl"
            >
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <GreenInput 
                        label="Name" 
                        value={formData.name} 
                        error={errors.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Sahil"
                    />
                    <GreenInput 
                        label="Email" 
                        type="email"
                        value={formData.email} 
                        error={errors.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="sahil@example.com"
                    />
                </div>

                <div className="mb-8">
                    <GreenInput 
                        label="Subject" 
                        value={formData.subject} 
                        error={errors.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        placeholder="Project Inquiry"
                    />
                </div>

                <div className="mb-10">
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

// --- HELPER COMPONENTS ---

// 1. Social Button (Icon + Text, Clickable Area)
const SocialButton = ({ icon: Icon, label, href }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300"
    >
        <div className="flex items-center gap-3">
            <div className="p-2 bg-black/50 rounded-lg text-emerald-400 group-hover:text-emerald-300 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{label}</span>
        </div>
        <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
    </a>
);

// 2. Contact Item (Clickable Row)
const ContactItem = ({ icon: Icon, label, value, href, isExternal }) => (
    <a 
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 group p-3 -mx-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
    >
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-300">
            <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5 group-hover:text-emerald-400/80 transition-colors">{label}</p>
            <p className="text-white font-medium group-hover:text-emerald-100 transition-colors flex items-center gap-2">
                {value}
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-emerald-400" />
            </p>
        </div>
    </a>
);

// 3. Green Input (With Validation)
const GreenInput = ({ label, value, onChange, error, placeholder, type = "text", textarea = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const Component = textarea ? "textarea" : "input";

  const shakeVariants = {
    idle: { x: 0 },
    shake: { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
        className="relative flex flex-col gap-1.5"
        animate={error ? "shake" : "idle"}
        variants={shakeVariants}
    >
      <div className="flex justify-between items-end">
        <label className={cn(
            "text-xs font-bold uppercase tracking-widest transition-colors duration-300",
            error ? "text-red-400" : isFocused ? "text-emerald-400" : "text-slate-500"
        )}>
            {label} {error && "*"}
        </label>
        
        <AnimatePresence>
            {error && (
                <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-xs text-red-400 font-medium flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded"
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
            "w-full bg-[#111] text-slate-200 border-b-2 outline-none py-4 px-4 transition-all duration-300 placeholder:text-slate-700 font-mono text-sm",
            "rounded-t-lg", 
            error 
                ? "border-red-500/50 bg-red-500/5 focus:border-red-500" 
                : isFocused 
                    ? "border-emerald-500 bg-[#141a16]" 
                    : "border-white/10 hover:border-white/20 hover:bg-[#161616]"
          )}
        />
        
        <div className={cn(
            "absolute bottom-0 left-0 h-[2px] w-full bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-transform duration-300 origin-left",
            isFocused && !error ? "scale-x-100" : "scale-x-0"
        )} />
        
        <div className={cn(
            "absolute top-0 right-0 w-2 h-2 border-t border-r transition-all duration-300",
            error ? "border-red-500" : isFocused ? "border-emerald-500" : "border-white/20"
        )} />
      </div>
    </motion.div>
  );
};

// 4. Submit Button
const SubmitButton = ({ status }) => (
    <button
        disabled={status === "submitting"}
        className={cn(
            "w-full relative overflow-hidden rounded-lg p-[1px] group transition-all duration-300",
            status === "submitting" ? "opacity-70 cursor-wait" : "hover:scale-[1.01] active:scale-[0.99]"
        )}
    >
        <span className={cn(
            "absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 transition-opacity duration-300",
            status === "success" ? "opacity-100" : "opacity-70 group-hover:opacity-100"
        )} />
        
        <div className={cn(
            "relative flex items-center justify-center gap-3 bg-[#0a0f0b] text-white font-bold py-4 rounded-lg transition-colors duration-300",
            status === "success" ? "bg-transparent" : "group-hover:bg-[#0a0f0b]/80"
        )}>
            {status === "submitting" ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                    <span className="text-emerald-400">Transmitting...</span>
                </>
            ) : status === "success" ? (
                <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Message Received</span>
                </>
            ) : (
                <>
                    <span className="tracking-widest uppercase text-sm">Initialize Sequence</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
            )}
        </div>
    </button>
);

export default ContactComponent;