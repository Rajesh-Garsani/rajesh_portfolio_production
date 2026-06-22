import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, AlertTriangle, CheckCircle, Search, Play, Key, ShoppingBag, CreditCard, ChevronRight, RefreshCw, Layers } from "lucide-react";

interface InteractiveProjectsProps {
  demoType: "security" | "scraping";
}

// ----------------------------------------------------
// 1. DYNAMIC SECURITY ALLOCATION SYSTEM SIMULATION
// ----------------------------------------------------
const SecurityAllocationDemo = () => {
  const [sectors, setSectors] = useState([
    { id: "S1", name: "Clifton (Zone A)", incidentRisk: "Low", requiredPatrols: 2, allocated: 2 },
    { id: "S2", name: "Saddar Modern Market", incidentRisk: "Medium", requiredPatrols: 4, allocated: 3 },
    { id: "S3", name: "Gulshan Town Center", incidentRisk: "High", requiredPatrols: 6, allocated: 2 },
    { id: "S4", name: "DHA Boulevard", incidentRisk: "Low", requiredPatrols: 2, allocated: 2 },
    { id: "S5", name: "Federal B Area", incidentRisk: "Medium", requiredPatrols: 5, allocated: 1 },
  ]);
  const [availableSecurity, setAvailableSecurity] = useState(8);
  const [log, setLog] = useState<string[]>(["System initialized.", "Karachi Sector coordination live."]);

  const addLog = (msg: string) => {
    setLog((prev) => [msg, ...prev.slice(0, 5)]);
  };

  const handAlloc = (sectorId: string, increase: boolean) => {
    setSectors((prev) =>
      prev.map((s) => {
        if (s.id === sectorId) {
          if (increase && availableSecurity > 0) {
            setAvailableSecurity((a) => a - 1);
            addLog(`Allocated 1 tactical unit to ${s.name}.`);
            return { ...s, allocated: s.allocated + 1 };
          } else if (!increase && s.allocated > 0) {
            setAvailableSecurity((a) => a + 1);
            addLog(`Recalled 1 unit from ${s.name} to central reserve.`);
            return { ...s, allocated: s.allocated - 1 };
          }
        }
        return s;
      })
    );
  };

  const rebalanceAll = () => {
    setLog(["Initiating rule-based resource rebalancing workflow..."]);
    setTimeout(() => {
      let reserve = availableSecurity;
      sectors.forEach((s) => {
        reserve += s.allocated;
      });

      const updated = sectors.map((s) => {
        let targets = 1;
        if (s.incidentRisk === "High") targets = 4;
        else if (s.incidentRisk === "Medium") targets = 2;

        const allocated = Math.min(targets, reserve);
        reserve -= allocated;
        return { ...s, allocated };
      });

      setSectors(updated);
      setAvailableSecurity(reserve);
      addLog("Successfully rebalanced defensive divisions. Priority shifted to high-risk zones.");
    }, 800);
  };

  return (
    <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-5 md:p-6 text-neutral-300 font-sans shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 mb-4">
        <div>
          <h4 className="text-emerald-400 font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            Dynamic Police Allocation Console
          </h4>
          <p className="text-xs text-neutral-400 mt-0.5">Simulating Rajesh's smart distribution algorithm for Karachi security forces.</p>
        </div>
        <button
          onClick={rebalanceAll}
          className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-xs font-semibold tracking-wide cursor-pointer transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin-reverse" />
          Auto-Rebalance Threats
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Control Panel */}
        <div className="md:col-span-7 space-y-3">
          <div className="bg-[#080808] p-3.5 rounded-2xl border border-neutral-800 flex justify-between items-center">
            <span className="text-xs text-neutral-400 uppercase tracking-wider font-mono">Central Tactical Reserve:</span>
            <span className="text-lg font-bold text-white font-mono bg-[#121212] px-3 py-0.5 rounded-xl border border-neutral-800">
              {availableSecurity} Units Available
            </span>
          </div>

          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {sectors.map((sector) => {
              const deficit = sector.requiredPatrols - sector.allocated;
              const statusColor =
                deficit <= 0 ? "text-emerald-400" : sector.allocated > 0 ? "text-amber-400" : "text-rose-400";

              return (
                <div
                  key={sector.id}
                  className="bg-[#080808]/30 p-3.5 rounded-2xl border border-neutral-800/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{sector.name}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                          sector.incidentRisk === "High"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/25"
                            : sector.incidentRisk === "Medium"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/25"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                        }`}
                      >
                        {sector.incidentRisk} Risk
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 flex gap-4">
                      <span>Required: <strong className="text-neutral-300 font-mono">{sector.requiredPatrols}</strong></span>
                      <span>Allocated: <strong className={`${statusColor} font-mono`}>{sector.allocated}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      disabled={sector.allocated <= 0}
                      onClick={() => handAlloc(sector.id, false)}
                      className="w-7 h-7 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono rounded-lg font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <button
                      disabled={availableSecurity <= 0}
                      onClick={() => handAlloc(sector.id, true)}
                      className="w-7 h-7 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700 text-white font-mono rounded-lg font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Logs and system data */}
        <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-between bg-[#080808] rounded-2xl border border-neutral-800 p-3.5">
          <div>
            <span className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider flex items-center gap-1 mb-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              Live Tactical Feed
            </span>
            <div className="space-y-1.5 font-mono text-[11px] h-[190px] overflow-y-auto pr-1">
              {log.map((l, idx) => (
                <div key={idx} className={`p-1.5 rounded-lg ${idx === 0 ? "bg-[#121212] border-l-2 border-emerald-500 text-white" : "text-neutral-500"}`}>
                  &gt; {l}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-2.5 mt-2 flex items-center gap-2 text-[10px] text-neutral-500">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Integrates SMS dispatcher logs via Twilio API.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 2. WEB SCRAPER SIMULATOR
// ----------------------------------------------------
const WebScraperDemo = () => {
  const [query, setQuery] = useState("Python Scrapy");
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [scrapedCourses, setScrapedCourses] = useState<any[]>([]);

  const mockPreScrapedData: Record<string, any[]> = {
    "python scrapy": [
      { id: 1, title: "Scrapy Spiders Mastery Guide", author: "Rajesh Kumar", rating: 4.9, source: "Udemy Tutorial", price: "Free" },
      { id: 2, title: "Modern Advanced Scraping Pipelines", author: "Scrapy Expert Group", rating: 4.8, source: "Coursera", price: "Premium" },
      { id: 3, title: "BeautifulSoup vs Scrapy Automation", author: "Dev Articles", rating: 4.7, source: "Medium Web", price: "Free" },
    ],
    "react tailwind": [
      { id: 4, title: "Beautiful Portfolios with React & Motion", author: "Tailwind Master", rating: 4.9, source: "YouTube Premium", price: "Free" },
      { id: 5, title: "Vite + Tailwind V4 Complete Guide", author: "Frontend Experts", rating: 4.8, source: "FreeCodeCamp", price: "Free" },
    ],
    "django jwt": [
      { id: 6, title: "Secure Django Rest APIs with SimpleJWT", author: "Rajesh Kumar", rating: 5.0, source: "Fiverr Custom Docs", price: "Premium" },
      { id: 7, title: "Django DRF Session & Token Security", author: "Admin Backend Pro", rating: 4.9, source: "Django University", price: "Premium" },
    ],
  };

  const handleRunScraper = () => {
    setIsRunning(true);
    setStep(1);
    setScrapedCourses([]);

    // Step-by-step console simulation
    setTimeout(() => {
      setStep(2);
      setTimeout(() => {
        setStep(3);
        setTimeout(() => {
          setStep(4);
          const term = query.toLowerCase().trim();
          const results = mockPreScrapedData[term] || [
            { id: 10, title: `${query} Handbooks & Crashcourses`, author: "Self-taught Hub", rating: 4.6, source: "Archive.org", price: "Free" },
            { id: 11, title: `Fast Scraping Tutorials for ${query}`, author: "Dev.to Spiders", rating: 4.5, source: "Dev.to Search", price: "Free" },
          ];
          setScrapedCourses(results);
          setIsRunning(false);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="bg-[#121212] border border-neutral-800 rounded-3xl p-5 md:p-6 text-neutral-300 font-sans shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 mb-4">
        <div>
          <h4 className="text-cyan-400 font-semibold flex items-center gap-2">
            <Search className="w-5 h-5 text-cyan-400" />
            Educational Scraper Portal Demo
          </h4>
          <p className="text-xs text-neutral-400 mt-0.5">Observe Rajesh's Scrapy & BeautifulSoup worker architecture displaying sample aggregated results.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Scraper config inputs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
              <Search className="w-4 h-4" />
            </span>
            <select
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isRunning}
              className="pl-9 pr-3 py-3 w-full bg-[#080808] border border-neutral-800 rounded-xl font-mono text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-none text-white"
            >
              <option value="python scrapy">Python Scrapy (Topic Recommendation)</option>
              <option value="react tailwind">React Tailwind (Topic Recommendation)</option>
              <option value="django jwt">Django JWT (Topic Recommendation)</option>
            </select>
          </div>
          <button
            onClick={handleRunScraper}
            disabled={isRunning}
            className="w-full sm:w-auto px-5 py-3 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold tracking-wide cursor-pointer transition-colors disabled:opacity-55 disabled:cursor-not-allowed"
          >
            {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current text-white" />}
            Execute Scrapy Spider
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Terminal view */}
          <div className="lg:col-span-5 bg-[#080808] rounded-2xl p-4 border border-neutral-800 font-mono text-xs text-cyan-400 space-y-2 h-[240px] overflow-y-auto flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-500 text-[10px] border-b border-neutral-900 pb-1">
                <span>TERMINAL_LOGS</span>
                <span className="animate-pulse text-red-500">⬤ ACTIVE</span>
              </div>
              {step >= 1 && <div className="text-neutral-400">&gt; Starting Scrapy Spider engine...</div>}
              {step >= 1 && <div className="text-cyan-400/90">&gt; scrapy runspider course_crawler.py -a query="{query}"</div>}
              {step >= 2 && <div className="text-neutral-400">&gt; GET https://learningplatforms.mock/search?q={encodeURIComponent(query)} [200 OK]</div>}
              {step >= 2 && <div className="text-amber-400/95">&gt; Parsing HTML response using BeautifulSoup4...</div>}
              {step >= 3 && <div className="text-emerald-400/95">&gt; Extracting course fields: TITLE, RATING, SOURCE, URL...</div>}
              {step >= 4 && <div className="text-neutral-400">&gt; Scraper complete. Sample aggregation workflow complete.</div>}
            </div>
            {isRunning && (
              <div className="text-[10px] text-neutral-600 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running BeautifulSoup extractor...</span>
              </div>
            )}
          </div>

          {/* Results display */}
          <div className="lg:col-span-7 bg-[#080808]/40 rounded-2xl p-4 border border-neutral-800 h-[240px] overflow-y-auto">
            <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase block mb-3 border-b border-neutral-900 pb-1">
              Aggregated Learning Feeds ({scrapedCourses.length} results)
            </span>

            {scrapedCourses.length === 0 && !isRunning && (
              <div className="flex flex-col items-center justify-center h-[170px] text-neutral-500">
                <Layers className="w-8 h-8 text-neutral-600 mb-2" />
                <p className="text-xs">No active dataset in cache. Launch scraper above to fetch records.</p>
              </div>
            )}

            {isRunning && scrapedCourses.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[170px] text-cyan-400 font-mono text-xs gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
                <span>Crawling website nodes...</span>
              </div>
            )}

            {!isRunning && scrapedCourses.length > 0 && (
              <div className="space-y-2">
                {scrapedCourses.map((c) => (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={c.id}
                    className="bg-[#080808] p-3 rounded-xl border border-neutral-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <h5 className="font-semibold text-white">{c.title}</h5>
                      <p className="text-[10px] text-neutral-400 mt-0.5">By {c.author} · Source: {c.source}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        ★ {c.rating}
                      </span>
                      <p className="text-[10px] text-neutral-500 mt-1 font-mono">{c.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const InteractiveProjects: React.FC<InteractiveProjectsProps> = ({ demoType }) => {
  return demoType === "security" ? <SecurityAllocationDemo /> : <WebScraperDemo />;
};
