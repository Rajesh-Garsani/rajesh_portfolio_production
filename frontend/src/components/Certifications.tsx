import React from "react";
import { motion } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import { Award, GraduationCap, Calendar, MapPin, ShieldAlert, Sparkles, BookOpen } from "lucide-react";

export const Certifications: React.FC = () => {
  const { data: { certificationsData, educationData } } = usePortfolio();
  return (
    <section id="certifications" className="py-20 border-b border-neutral-800 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Education Section */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-500 font-mono uppercase tracking-widest block">
              04 // Education Background
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Academic Foundations</h2>
          </div>

          <div className="space-y-6">
            {educationData.map((edu, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={edu.degree}
                className="bg-[#121212] border border-neutral-800 rounded-3xl p-6 space-y-4 shadow-lg hover:border-neutral-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-white font-sans tracking-tight leading-snug">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-emerald-400 font-bold">{edu.institution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-neutral-400 font-mono border-t border-neutral-800 pt-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    {edu.location}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Rigorous curriculum focusing on Core Software Architecture, Advanced Algorithms, Databases (SQL & NoSQL), and Object Oriented Paradigms (OOP).
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-500 font-mono uppercase tracking-widest block">
              05 // Certifications
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificationsData.map((cert) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                key={cert.id}
                className="bg-[#121212] border border-neutral-800 rounded-3xl p-5 flex flex-col justify-between space-y-4 hover:border-emerald-500/35 hover:bg-[#121212]/90 transition-all shadow-md group"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-xs text-neutral-200 font-sans tracking-tight leading-snug group-hover:text-emerald-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-[10px] text-neutral-400 font-semibold">{cert.issuer}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono border-t border-neutral-800 pt-3 shrink-0">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-neutral-600" />
                    {cert.year}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 rounded font-bold uppercase font-mono">
                    Credential
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
