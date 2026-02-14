import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  motion, 
  useMotionTemplate, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  animate 
} from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Server, Smartphone, Cpu, Terminal } from "lucide-react";

import profile from '../assets/Image/Home/Hero/profile.png';

const Hero = () => {
  // --- Global Mouse & Parallax Logic (For Background) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const rightSideVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } 
    },
  };

  const navigate = useNavigate()

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-dvh w-full overflow-hidden bg-[#020602] text-white flex items-center justify-center pt-24 pb-12 sm:pt-32 sm:pb-16 selection:bg-green-500/30"
    >
      {/* --- 1. Base Background Layers --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-linear-to-b from-green-900/20 via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[2rem_2rem] md:bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* --- 2. HUGE BACKGROUND NAME (Animated) --- */}
      <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="whitespace-nowrap"
        >
          <h1
            className="text-[20vw] font-black text-transparent select-none leading-none tracking-tighter"
            style={{
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.08)',
              fontFamily: 'system-ui, sans-serif'
            }}
          >
            SAHIL
          </h1>
        </motion.div>
      </div>

      {/* --- 3. Interactive Flashlight Overlay (Global) --- */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(74, 222, 128, 0.1), 
              rgba(34, 197, 94, 0.02),
              transparent 80%
            )
          `,
        }}
      />

      {/* --- 4. Main Content --- */}
      <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* TEXT COLUMN */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // amount ensures 20% is visible before triggering
            className="flex flex-col gap-6 lg:pr-10 order-2 lg:order-1 items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0"
          >
            {/* Availability Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 w-fit backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.2)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-semibold text-green-400 tracking-wide uppercase">Available for Hire</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
              >
                Building <span className="text-transparent bg-clip-text bg-linear-to-r from-green-300 via-green-400 to-emerald-600">Scalable</span> <br />
                Future Systems
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center lg:justify-start gap-2 text-slate-300 text-base sm:text-xl font-mono h-8 min-h-8"
              >
                <span className="text-green-500 font-bold">{`>`}</span>
                <Typewriter
                  words={["Full Stack Developer", "React Native App Developer", "Vibe Coding Developer", "MERN Stack Developer"]}
                  typingSpeed={80}
                  deletingSpeed={40}
                  pauseTime={1500}
                />
              </motion.div>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl"
            >
              I architect robust <span className="text-slate-200 font-medium">Backend</span> systems and build high-performance <span className="text-slate-200 font-medium">React Native</span> applications, integrated with next-gen AI automation.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 w-full"
            >
              {/* View Projects */}
              <motion.button
                onClick={()=>navigate('/projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-green-600 px-8 py-3.5 text-white transition-all duration-300 hover:bg-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
              >
                <span className="font-bold tracking-wide text-sm sm:text-base">View Projects</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              {/* Contact Me */}
              <Link to="/contact" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full group flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-white transition-all duration-300 hover:bg-white/10 backdrop-blur-md cursor-pointer"
                >
                  <Mail className="w-5 h-5 text-green-400" />
                  <span className="font-bold tracking-wide text-sm sm:text-base">Contact Me</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-8 sm:gap-12 pt-8 border-t border-white/10 mt-4 w-full justify-center lg:justify-start"
            >
              <Stat 
                value={<CountUp from={0} to={20} />} 
                suffix="+" 
                label="Projects" 
              />
              <div className="w-px h-10 bg-white/10"></div>
              <Stat value="BCA" label="Student" />

              <div className="flex gap-4 ml-auto lg:ml-0">
                <SocialIcon icon={Github} target="_blank" rel="noopener noreferrer" href="https://github.com/masterSahil" />
                <SocialIcon icon={Linkedin} target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/sahil-master/" />
              </div>
            </motion.div>
          </motion.div>

          {/* IMAGE COLUMN */}
          <motion.div
            variants={rightSideVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative order-1 lg:order-2 flex flex-col items-center lg:items-end"
          >
            <ProfileCard />

            {/* Tech Badges with their own stagger */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } }
              }}
              className="w-full max-w-md mt-6 flex flex-wrap justify-center sm:justify-between gap-3"
            >
              <TechBadge icon={Smartphone} text="Native" />
              <TechBadge icon={Server} text="Backend" />
              <TechBadge icon={Cpu} text="AI" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// --- Helper Components ---

// *** CountUp Animation ***
const CountUp = ({ from = 0, to, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  // Use a ref to ensure we only trigger the animation when in view
  const ref = useRef(null);
  const isInView = React.useMemo(() => true, []); // We rely on parent 'whileInView', but to be safe we can use controls

  useEffect(() => {
    // This simple logic works because the parent holds the 'whileInView' state
    // But for a true scroll trigger on just the number:
    const controls = animate(count, to, { duration: duration, ease: "easeOut" });
    return controls.stop;
  }, [count, to, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

// *** Profile Card ***
const ProfileCard = () => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 15 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]), springConfig);
  const codeX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const codeY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), springConfig);

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(
    circle at ${glareX} ${glareY}, 
    rgba(255,255,255, 0.15) 0%, 
    transparent 80%
  )`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[85%] sm:max-w-md aspect-4/5 z-20 group/card cursor-pointer mx-auto lg:mr-0"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full h-full rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-sm border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 mix-blend-overlay"
          style={{ background: glareBackground }}
        />
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-10 sm:h-12 bg-black/60 backdrop-blur-md flex items-center justify-between px-4 border-b border-white/5 z-30">
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/5">
            <Terminal className="w-3 h-3 text-green-400" />
            <span className="text-[10px] font-mono text-slate-300">sahil_dev.tsx</span>
          </div>
        </div>

        {/* Profile Image & Background */}
        <div className="relative h-full w-full bg-[#0a0a0a]">
          <motion.img
            src={profile}
            alt="Sahil"
            className="w-full h-full object-cover grayscale-20% group-hover/card:grayscale-0 transition-all duration-500"
            style={{ scale: 1.15 }}
          />
           <div className="absolute inset-0 bg-black/35 group-hover/card:bg-black/25 transition-colors duration-500 z-10" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />

          {/* 3D Floating Code Snippet */}
          <motion.div
            style={{
              x: codeX,
              y: codeY,
              z: 50,
              rotateX: useTransform(rotateX, (v) => v * -0.5)
            }}
            className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 pt-24 z-40 transform-gpu"
          >
            <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-xl p-4 shadow-xl">
              <div className="font-mono text-xs sm:text-sm leading-relaxed text-slate-300">
                <p><span className="text-purple-400">const</span> <span className="text-yellow-300">profile</span> <span className="text-white">=</span> <span className="text-white">{`{`}</span></p>
                <div className="pl-4 space-y-1">
                  <p><span className="text-blue-300">name</span>: <span className="text-green-400">'Sahil Master'</span>,</p>
                  <p><span className="text-blue-300">stack</span>: [<span className="text-green-400">'MERN'</span>, <span className="text-green-400">'AI'</span>],</p>
                  <p><span className="text-blue-300">status</span>: <span className="text-green-400">'Building'</span></p>
                </div>
                <p className="text-white">{'};'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Typewriter = ({ words, typingSpeed = 150, deletingSpeed = 100, pauseTime = 1000 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => { setBlink((prev) => !prev); }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index >= words.length) { setIndex(0); return; }
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => { setReverse(true); }, pauseTime);
      return () => clearTimeout(timeout);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="text-slate-200">
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? "opacity-100" : "opacity-0"} text-green-400 font-bold ml-0.5`}>|</span>
    </span>
  );
};

// Modified Stat to accept "value" (for counter) and "suffix"
const Stat = ({ value, suffix, label }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="text-center sm:text-left cursor-default">
    <div className="flex items-center justify-center sm:justify-start gap-1">
      <p className="text-xl sm:text-2xl font-bold text-white flex items-center">
        {value}{suffix}
      </p>
    </div>
    <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider font-semibold">{label}</p>
  </motion.div>
);

const SocialIcon = ({ icon: Icon, ...props }) => (
  <a  {...props} 
    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-green-600 hover:border-green-600 transition-all duration-300 hover:scale-110" >
    <Icon className="w-5 h-5" />
  </a>
);

// Updated TechBadge to respond to Parent Stagger
const TechBadge = ({ icon: Icon, text }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
    }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="flex-1 min-w-25 group flex items-center justify-center gap-2 px-3 py-3 rounded-xl border border-white/5 bg-[#0f172a]/50 backdrop-blur-md hover:bg-green-900/20 hover:border-green-500/30 transition-all duration-300 cursor-default"
  >
    <Icon className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-colors" />
    <span className="text-xs font-bold tracking-wide text-slate-300 group-hover:text-white transition-colors">{text}</span>
  </motion.div>
);

export default Hero;