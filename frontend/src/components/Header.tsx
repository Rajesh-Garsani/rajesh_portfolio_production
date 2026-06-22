import React from "react";
import { motion } from "motion/react";
import { Sparkles, Library, Layers, Award, GraduationCap, Phone, BookOpen } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: "hero", label: "Home", icon: Layers },
    { id: "about", label: "Skills", icon: Award },
    { id: "experience", label: "Work", icon: GraduationCap },
    { id: "projects", label: "Projects", icon: Library },
    { id: "certifications", label: "Education", icon: BookOpen },
    { id: "ai-assistant", label: "AI Representative", icon: Sparkles },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-[#080808]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo and Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavClick("hero")}
        >
          <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-black font-black text-xs tracking-tighter">
            P
          </div>
          <span className="font-sans font-bold text-neutral-100 text-sm tracking-tight hidden sm:inline">
            PORTFOLIO
            <span className="text-emerald-500 font-mono text-[10px] ml-1.5 px-1.5 py-0.2 bg-emerald-500/10 border border-emerald-500/25 rounded-md uppercase font-normal">
              Full Stack
            </span>
          </span>
        </motion.div>

        {/* Navigation items (Optimized layout) */}
        <nav className="flex items-center gap-1.5 md:gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                  isActive ? "text-white" : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/30"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-500" : "text-neutral-500"}`} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
