import React from "react";
import { motion, type Variants } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import { Terminal, Github, Linkedin, Mail, ArrowDown, ExternalLink } from "lucide-react";

export const Hero: React.FC = () => {
  const { data: { personalInfo } } = usePortfolio();
  
  // ADDED: Dynamic base URL for local testing and production deployment
  const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const stats = [
    { label: "Web Development", value: "Modern, Responsive, SEO Optimized", caption: "Python, Django, DRF, React" },
    { label: "AI & Automation", value: "Lead Automation, Custom AI Solutions, Smart Notifications", caption: "Python, n8n, Firebase" },
    { label: "Web Scraping", value: "Real-Time Data Monitoring, Custom Scraping, Automated Data Extraction", caption: "Scrapy, Selenium, Numpy, Pandas " },
  ];

  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center items-center py-16 text-white overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-600/5 rounded-full blur-[60px] pointer-events-none -z-10 animate-pulse" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 text-center space-y-6 sm:space-y-8"
      >
        {/* Available for Hire Tag */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#121212] border border-neutral-800 rounded-full text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-[10px] font-mono font-bold tracking-wider uppercase">Open for Dev Roles</span>
        </motion.div>

        {/* Catchy Main Heading */}
        <div className="space-y-3">
          <motion.h4 variants={itemVariants} className="text-neutral-500 font-mono text-xs sm:text-sm tracking-widest uppercase">
            Hi, my name is
          </motion.h4>
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]"
          >
            RAJESH KUMAR <br/>
            <span className="text-emerald-500 underline decoration-neutral-800 underline-offset-8 font-display"></span>
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl font-bold text-neutral-300 font-mono"
          >
            {personalInfo.title}
          </motion.h2>
        </div>

        {/* Minimal Bio Copy */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-400 leading-relaxed font-sans"
        >
          Specialized in crafting full-stack, enterprise-grade backends with <span className="text-emerald-400 font-semibold font-mono">Python, Django, and DRF</span> paired with modern frontends in <span className="text-neutral-100 font-semibold">React & Tailwind CSS</span>. Let's design scalable API architectures.
        </motion.p>

        {/* Personal Links */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={personalInfo.github}
            target="_blank"
            referrerPolicy="no-referrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#121212] hover:bg-neutral-900 text-neutral-300 rounded-xl text-xs font-semibold border border-neutral-800 transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub Profile
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            referrerPolicy="no-referrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#121212] hover:bg-neutral-900 text-neutral-300 rounded-xl text-xs font-semibold border border-neutral-800 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn Network
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-2 px-4 py-2 bg-[#121212] hover:bg-neutral-900 text-neutral-300 rounded-xl text-xs font-semibold border border-neutral-800 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </a>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => handleScrollToSection("projects")}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-xs font-bold tracking-wider uppercase shadow-lg shadow-emerald-500/10 transition-all cursor-pointer"
          >
            EXPLORE PROJECTS
          </button>

          {/* UPDATED: Dynamic URL switching */}
          {personalInfo.resume_file && (
            <a
              href={`${baseURL}${personalInfo.resume_file}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#121212] hover:bg-neutral-900 text-white border border-neutral-800 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center"
            >
              RESUME
            </a>
          )}
        </motion.div>

        {/* Bento Stats Counter Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 text-left max-w-2xl mx-auto"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#121212] border border-neutral-800 rounded-2xl p-4 flex flex-col justify-start space-y-1.5"
            >
              {/* TITLE: Adjusted to fit smaller box */}
              <span className="text-base sm:text-lg font-extrabold text-white tracking-wide font-sans leading-tight">
                {stat.label}
              </span>

              {/* GREEN TEXT: Tiny sub-tag */}
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider leading-snug">
                {stat.value}
              </span>

              {/* CAPTION: Tech stack */}
              <span className="text-[10px] text-neutral-500 font-mono leading-relaxed pt-1">
                {stat.caption}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bounce scroll reminder */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-neutral-600">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => handleScrollToSection("about")}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
          <ArrowDown className="w-4 h-4 text-emerald-500/85" />
        </motion.div>
      </div>
    </section>
  );
};
