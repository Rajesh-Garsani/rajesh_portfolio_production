import React from "react";
import { motion } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export const Experience: React.FC = () => {
  const { data: { experienceData } } = usePortfolio();
  return (
    <section id="experience" className="py-20 border-b border-neutral-800 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Title Block */}
      <div className="space-y-2 mb-12 text-center md:text-left">
        <span className="text-xs font-bold text-emerald-500 font-mono uppercase tracking-widest block">
          02 // Professional Experience
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Employment History</h2>
        <p className="text-sm text-neutral-400 max-w-2xl">

        </p>
      </div>

      <div className="relative border-l border-neutral-800 ml-3 md:ml-6 space-y-12">
        {experienceData.map((exp, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            key={exp.role}
            className="relative pl-6 md:pl-10"
          >
            {/* Timeline node icon */}
            <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-[#080808] border-2 border-emerald-500 text-emerald-400 flex items-center justify-center shadow-lg">
              <Briefcase className="w-3.5 h-3.5" />
            </div>

            <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 space-y-4 shadow-xl hover:border-neutral-700 transition-all">
              {/* Job Info Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
                    {exp.role}
                    <span className="text-[10px] uppercase font-mono tracking-wider font-normal px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                      {exp.type}
                    </span>
                  </h3>
                  <p className="text-xs text-emerald-400 font-semibold">{exp.company}</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-neutral-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    {exp.period}
                  </span>

                </div>
              </div>

              {/* Bullets List */}
              <ul className="space-y-2.5 text-neutral-400 text-xs sm:text-sm pl-4 list-disc marker:text-emerald-500 leading-relaxed">
                {exp.bullets.map((bullet, b_idx) => (
                  <li key={b_idx}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
