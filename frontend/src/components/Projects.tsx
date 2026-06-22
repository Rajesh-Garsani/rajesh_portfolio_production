import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import type { DemoType } from "../types";
import { InteractiveProjects } from "./InteractiveProjects";
import { Library, Sparkles, ExternalLink, Cpu, Shield, Eye } from "lucide-react";

export const Projects: React.FC = () => {
  const { data: { projectsData } } = usePortfolio();
  const [activeDemo, setActiveDemo] = useState<DemoType>("security");
  useEffect(() => { if (!projectsData.some((item) => item.demoType === activeDemo) && projectsData[0]) setActiveDemo(projectsData[0].demoType); }, [activeDemo, projectsData]);
  const getDemoIcon = (type: DemoType) => type === "security" ? <Shield className="w-5 h-5 text-emerald-400" /> : <Cpu className="w-5 h-5 text-cyan-400" />;
  const getDemoGradient = (type: DemoType) => type === "security" ? "from-emerald-500/10 to-emerald-950/5 border-emerald-500/10 hover:border-emerald-500/30" : "from-cyan-500/10 to-cyan-950/5 border-cyan-500/10 hover:border-cyan-500/30";
  return (
    <section id="projects" className="py-20 border-b border-neutral-800 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="space-y-2 mb-12 text-center md:text-left">
        <span className="text-xs font-bold text-emerald-500 font-mono uppercase tracking-widest block">03 // Key Projects & Prototypes</span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Interactive Sandbox Portfolio</h2>
        <p className="text-sm text-neutral-400 max-w-2xl">Explore interactive demonstrations of my Django and React project workflows. These panels are portfolio simulations, with source links configurable from the admin dashboard.</p>
      </div>
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project) => { const selected = activeDemo === project.demoType; return (
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} key={project.id} onClick={() => setActiveDemo(project.demoType)}
              className={`flex flex-col justify-between rounded-3xl p-6 bg-gradient-to-br border transition-all cursor-pointer h-full ${selected ? "bg-[#121212] border-emerald-500 shadow-2xl shadow-emerald-500/5 ring-1 ring-emerald-500/30" : `bg-neutral-950/60 ${getDemoGradient(project.demoType)}`}`}>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2"><div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800">{getDemoIcon(project.demoType)}</div>{selected && <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 tracking-wider animate-pulse flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"/>Simulating Live</span>}</div>
                <div className="space-y-1.5"><h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight leading-snug">{project.name}</h3><p className="text-xs text-neutral-400 leading-relaxed">{project.description}</p></div>
                <div className="flex flex-wrap gap-1 pt-1.5">{project.tech.map((badge) => <span key={badge} className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800">{badge}</span>)}</div>
              </div>
              <div className="border-t border-neutral-800 pt-4 mt-6 flex items-center justify-between gap-2">
                {project.github ? <a onClick={(e) => e.stopPropagation()} href={project.github} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-neutral-500 flex items-center gap-1 hover:text-neutral-300"><Library className="w-3.5 h-3.5"/>View Code <ExternalLink className="w-3 h-3"/></a> : <span className="text-[10px] font-mono text-neutral-500">Repository pending</span>}
                <button type="button" className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-colors text-[10px] py-1.5 px-3 rounded-xl text-emerald-300 font-bold font-mono"><Eye className="w-3.5 h-3.5"/>Play Demo</button>
              </div>
            </motion.div>); })}
        </div>
        <div className="bg-neutral-950 rounded-3xl border border-emerald-500/15 p-1">
          <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden p-1.5">
            <div className="bg-neutral-950 px-4 py-2.5 border-b border-neutral-900 flex items-center justify-between text-neutral-400 font-mono text-[11px]">
              <div className="flex items-center gap-2"><div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500/80"/><span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"/><span className="w-2.5 h-2.5 rounded-full bg-green-500/80"/></div><span className="text-neutral-600">|</span><span className="text-emerald-400 font-semibold tracking-wider uppercase text-[10px] flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 animate-pulse"/>Active Workbench Simulation Mode</span></div>
              <span className="hidden sm:inline text-neutral-600">portfolio_demo_v1.0.sh</span>
            </div>
            <div className="p-3 sm:p-5"><InteractiveProjects demoType={activeDemo}/></div>
          </div>
        </div>
      </div>
    </section>
  );
};
