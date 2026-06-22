/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { AIAssistant } from "./components/AIAssistant";
import { ArrowUp, Terminal } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Scroll event listener for active sub-section detection and Back to Top display state
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      setShowScrollTop(window.scrollY > 400);

      const sections = ["hero", "about", "experience", "projects", "certifications", "ai-assistant", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveSection("hero");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600/30 selection:text-indigo-200">
      {/* Upper Navigation Glass Panel */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Structural Layout */}
      <main className="flex-1 space-y-4">
        {/* Hero Section */}
        <Hero />

        {/* Technical Capabilities/Specialties Section */}
        <About />

        {/* Experience Timeline Section */}
        <Experience />

        {/* Interactive Case Studies/Projects Panel */}
        <Projects />

        {/* Academic Profile Certifications & Education Section */}
        <Certifications />

        {/* Interactive AI Chatbot section (Anchored Anchor) */}
        <section id="ai-assistant" className="py-20 border-b border-slate-950 bg-slate-950/20">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <span className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-widest block">
              06 // Conversational Portal
            </span>
            <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">AI Interview Chatbot</h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Ask the AI assistant about listed skills and projects. Answers are AI-generated and should be confirmed directly before hiring decisions.
            </p>
            <div className="flex justify-center pt-2">
              <div className="inline-flex items-center gap-2 px-4.5 py-2.5 bg-slate-900 border border-indigo-500/20 rounded-full text-indigo-300 text-xs font-bold font-mono tracking-wide">
                <Terminal className="w-4 h-4 animate-pulse text-indigo-400" />
                Click the floating bubble at bottom-right to start
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Inquiry Dispatch Section */}
        <Contact />
      </main>

      {/* Floating Assistant Widget Panel */}
      <AIAssistant />

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 w-10 h-10 flex items-center justify-center bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl shadow-2xl transition-all hover:text-indigo-400 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Footer Block */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 mt-16 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="text-center md:text-left space-y-1">
            <p className="font-semibold text-slate-400">© 2026 Rajesh Kumar. All rights reserved.</p>
            <p className="font-mono text-[10px] text-slate-600"></p>
          </div>
          <p className="text-center md:text-right text-[10px] leading-relaxed max-w-xs text-slate-600 font-mono">
            Karachi, Pakistan.
          </p>
        </div>
      </footer>
    </div>
  );
}
