import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import { submitContact } from "../api";
import { Phone, Mail, MapPin, Send, Github, Linkedin, CheckCircle, RefreshCw, AlertCircle } from "lucide-react";

export const Contact: React.FC = () => {
  const { data: { personalInfo } } = usePortfolio();
  const [formData, setFormData] = useState({ name: "", company: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData((v) => ({ ...v, [e.target.name]: e.target.value }));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (!formData.name.trim() || !formData.email.trim() || formData.message.trim().length < 10) { setError("Enter your name, email, and a message of at least 10 characters."); return; }
    setIsSubmitting(true);
    try { await submitContact(formData); setIsSubmitted(true); setFormData({ name: "", company: "", email: "", message: "" }); }
    catch { setError("Message could not be delivered. Please contact me directly by email."); }
    finally { setIsSubmitting(false); }
  };
  return (
    <section id="contact" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-12 space-y-2 text-center md:text-left mb-6">
          <span className="text-xs font-bold text-emerald-500 font-mono uppercase tracking-widest block">07 // Get In Touch</span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Initiate Coordination</h2>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl">Whether you are hiring for a development role or want to discuss a web project, send a message through the secure form.</p>
        </div>
        <div className="lg:col-span-5 space-y-4">
          {personalInfo.phone && <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-4 p-5 bg-[#121212] border border-neutral-800 rounded-3xl hover:border-neutral-700 transition-all group"><div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-colors"><Phone className="w-4 h-4"/></div><div><span className="text-[10px] text-neutral-500 uppercase font-mono block">Phone</span><span className="text-xs sm:text-sm text-neutral-200 font-semibold font-mono">{personalInfo.phone}</span></div></a>}
          <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 p-5 bg-[#121212] border border-neutral-800 rounded-3xl hover:border-neutral-700 transition-all group"><div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-colors"><Mail className="w-4 h-4"/></div><div><span className="text-[10px] text-neutral-500 uppercase font-mono block">Email</span><span className="text-xs sm:text-sm text-neutral-200 font-semibold font-mono">{personalInfo.email}</span></div></a>
          <div className="flex items-center gap-4 p-5 bg-[#121212] border border-neutral-800 rounded-3xl"><div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0"><MapPin className="w-4 h-4"/></div><div><span className="text-[10px] text-neutral-500 uppercase font-mono block">Location</span><span className="text-xs sm:text-sm text-neutral-200 font-semibold">{personalInfo.location}</span></div></div>
          <div className="flex items-center gap-3 pt-2">
            {personalInfo.github && <a aria-label="GitHub profile" href={personalInfo.github} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl bg-[#121212] border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-emerald-400 hover:border-neutral-700 transition-all"><Github className="w-5 h-5"/></a>}
            {personalInfo.linkedin && <a aria-label="LinkedIn profile" href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl bg-[#121212] border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-emerald-400 hover:border-neutral-700 transition-all"><Linkedin className="w-5 h-5"/></a>}
          </div>
        </div>
        <div className="lg:col-span-7 bg-[#121212] border border-neutral-800 rounded-3xl p-6 md:p-8">
          <AnimatePresence mode="wait">
            {!isSubmitted ? <motion.form key="contact-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1"><label htmlFor="name" className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide block">Your Name *</label><input id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-[#080808] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none" /></div>
                <div className="space-y-1"><label htmlFor="company" className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide block">Profession</label><input id="company" name="company" value={formData.company} onChange={handleChange} className="w-full bg-[#080808] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none" /></div>
              </div>
              <div className="space-y-1"><label htmlFor="email" className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide block">Email Address *</label><input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full bg-[#080808] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none" /></div>
              <div className="space-y-1"><label htmlFor="message" className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide block">Message *</label><textarea id="message" name="message" required minLength={10} maxLength={3000} rows={5} value={formData.message} onChange={handleChange} className="w-full resize-none bg-[#080808] border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none" /></div>
              {error && <p role="alert" className="flex gap-2 items-center text-xs text-red-400"><AlertCircle className="w-4 h-4" />{error}</p>}
              <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black text-xs font-bold font-mono uppercase tracking-wide px-7 py-3.5 rounded-xl transition-colors">{isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4"/>}{isSubmitting ? "Sending..." : "Send Message"}</button>
            </motion.form> : <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="min-h-[360px] flex flex-col items-center justify-center text-center gap-5"><div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center"><CheckCircle className="w-8 h-8 text-emerald-400"/></div><div><h3 className="text-lg font-extrabold text-white">Message Sent</h3><p className="text-sm text-neutral-400 mt-2 max-w-sm">Thank you for contacting us. We will respond shortly.
 </p></div><button type="button" onClick={() => setIsSubmitted(false)} className="text-xs text-emerald-400 font-mono hover:text-emerald-300">Send another message</button></motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
