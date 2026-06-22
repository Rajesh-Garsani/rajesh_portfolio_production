import React, { useState } from "react";
import { motion } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import { Database, Layers, HardDrive, Cpu, Terminal, Code, CheckCircle, ChevronRight } from "lucide-react";

const iconMap: Record<string, any> = {
  Database: Database,
  Layers: Layers,
  HardDrive: HardDrive,
  Cpu: Cpu,
  Terminal: Terminal,
  Code: Code,
};

export const About: React.FC = () => {
  const { data: { skillsData, personalInfo } } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <section id="about" className="py-20 border-b border-neutral-800 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Title block */}
      <div className="space-y-2 mb-12 text-center md:text-left">
        <span className="text-xs font-bold text-emerald-500 font-mono uppercase tracking-widest block">
          01 // Technical Specialties
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Full-Stack Capability Blueprint</h2>
        <p className="text-sm text-neutral-400 max-w-2xl">
          An overview of technical disciplines, engineered components, and web technologies I operate every day. 
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Summary and dynamic values */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-emerald-500 font-mono">
              Professional Brief
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              {personalInfo.summary}
            </p>
            <div className="border-t border-neutral-800 pt-4 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block">Core philosophy</span>
              <p className="text-xs text-neutral-200 font-mono italic">
                "Writing clean, modular, and optimized API code to empower snappy user experiences."
              </p>
            </div>
          </div>

          <div className="hidden lg:block bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 rounded-3xl border border-neutral-800">
            <h4 className="text-xs font-bold uppercase font-mono text-emerald-400 tracking-wider mb-2">Karachi Operations</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Available for localized integration and remote co-engineering workflows. Responsive within standard business hours on UTC+5.
            </p>
          </div>
        </div>

        {/* Right Side: Tabbed Dynamic Skill catalog */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tabs */}
          <div className="overflow-x-auto pb-2 flex gap-2 font-mono scrollbar-none">
            {skillsData.map((cat, idx) => {
              const Icon = iconMap[cat.icon] || Code;
              const isSelected = selectedCategory === idx;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(idx)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer shrink-0 transition-colors ${
                    isSelected
                      ? "bg-emerald-500 text-black font-bold border border-emerald-400/30"
                      : "bg-[#121212] text-neutral-400 border border-neutral-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Current Category Skill Sheet */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 min-h-[290px] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 border-b border-neutral-800 pb-4 mb-4">
                <div className="w-9 h-9 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  {React.createElement(iconMap[skillsData[selectedCategory].icon] || Code, { className: "w-5 h-5" })}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-tight">
                    {skillsData[selectedCategory].name}
                  </h4>
                  <p className="text-[11px] text-neutral-500">Documented technical capabilities in engineering cycles</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsData[selectedCategory].skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2.5 p-2 bg-neutral-900/30 hover:bg-neutral-900/60 border border-neutral-800/50 rounded-lg text-xs transition-colors"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="text-neutral-300 font-medium font-sans">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-neutral-800 pt-4 mt-6 flex items-center gap-2 text-[10px] text-neutral-500 font-mono">
              <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
              <span>Extensive 1+ year practical application of these skill packages.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
