"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Search, Bot, ShieldCheck, Zap, ArrowRight, Activity, Terminal, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Separate component for Typewriter effect to avoid hydration mismatches
function TypewriterLog() {
  const [logs, setLogs] = useState<string[]>([
    "[10:42:01] Initializing process daemon...",
    "[10:42:02] Connected to Amadeus Node (v1.2)",
    "[10:42:04] Scanning mempool for arbitrage...",
  ]);

  useEffect(() => {
    const possibleLogs = [
      "Opportunity detected: UNI/ETH pool variance 1.2%",
      "Tx Submitted: 0x8a7...2f9a [Pending]",
      "Tx Confirmed: Block #1823901",
      "Profit secured: +0.042 ETH",
      "Scanning next block...",
      "Network congestion low. Gas: 12 gwei",
      "Updating price oracles...",
      "Whale movement detected: 500 ETH -> Coinbase",
      "Rebalancing portfolio weights...",
    ];

    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLog = `[${new Date().toLocaleTimeString('en-GB')}] ${possibleLogs[Math.floor(Math.random() * possibleLogs.length)]}`;
        const newLogs = [...prev, newLog];
        if (newLogs.length > 6) return newLogs.slice(1);
        return newLogs;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {logs.map((log, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-slate-400"
        >
          <span className="text-slate-600 mr-2">{log.split("] ")[0]}]</span>
          <span className={log.includes("Profit") ? "text-[#00ff9d]" : log.includes("Tx") ? "text-blue-400" : ""}>
            {log.split("] ")[1]}
          </span>
        </motion.p>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-[#00ff9d] selection:text-black font-mono">
      <Navbar />

      {/* Grid Overlay */}
      <motion.div
        initial={{ backgroundPosition: "0px 0px" }}
        animate={{ backgroundPosition: "50px 50px" }}
        transition={{ repeat: Infinity, ease: "linear", duration: 3 }}
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{ backgroundImage: 'linear-gradient(#00ff9d 1px, transparent 1px), linear-gradient(90deg, #00ff9d 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </motion.div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden z-10 border-b border-[#333]">
        <div className="container-custom relative">
          <div className="flex flex-col  items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className=" text-center "
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#00ff9d]/30 bg-[#00ff9d]/5 text-[#00ff9d] text-xs font-bold tracking-widest uppercase mb-6">
                <span className="w-2 h-2 bg-[#00ff9d] rounded-full animate-pulse"></span>
                Amadeus Network V1.0
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter text-white mb-4 uppercase leading-tight">
                Autonomous Agent
                <span className="text-[#00ff9d] text-glow"> Marketplace</span>
              </h1>

              <p className="text-lg text-slate-400 mb-8 max-w-3xl mx-auto lg:mx-0 font-sans ">
                Deploy decentralized intelligence.
                From MEV Snipers to Whale Watchers.
                Verified. Audited. Non-custodial.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center ">
                <Link href="/explore" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group min-w-[180px]">
                  &gt; Initialize
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/publish" className="btn-secondary w-full sm:w-auto text-center min-w-[180px]">
                  Upload Agent
                </Link>
              </div>

              <div className="mt-10 flex items-center justify-center  gap-8 text-[#00ff9d] text-xs font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} />
                  <span>Verified Hash</span>
                </div>
                <div className="flex items-center gap-2">
                  <Terminal size={16} />
                  <span>CLI Ready</span>
                </div>
              </div>
            </motion.div>

            {/* Visual/Image: Active Terminal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex-1 w-full max-w-lg lg:max-w-4xl relative group"
            >
              {/* Glowing Backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff9d] to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative border border-[#00ff9d]/30 bg-[#050505]/95 backdrop-blur-xl rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,255,157,0.15)]">

                {/* CRT Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
                <motion.div
                  animate={{ backgroundPosition: ["0% 0%", "0% 100%"] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-transparent via-[#00ff9d]/5 to-transparent h-[200%] w-full opacity-30"
                />

                {/* Terminal Header */}
                <div className="bg-[#1a1a1a] border-b border-[#333] p-2.5 flex items-center justify-between relative z-30">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-[#00ff9d]" />
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">agent_monitor_v1.sh</div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 font-mono text-sm leading-relaxed text-slate-300 relative z-30 min-h-[360px] flex flex-col">
                  <div className="flex justify-between border-b border-[#333] pb-4 mb-4">
                    <div>
                      <p className="text-white font-bold uppercase tracking-wide">Alpha_Sniper_Bot</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-1.5 py-0.5 bg-[#00ff9d]/20 text-[#00ff9d] text-[10px] rounded">v2.4.1</span>
                        <span className="text-xs text-slate-500">Target: ETH/USDC</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">4.2 AMA/mo</p>
                      <div className="flex items-center justify-end gap-1.5 text-[10px] text-[#00ff9d] mt-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff9d] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff9d]"></span>
                        </span>
                        ACTIVE
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#111] p-3 border border-[#222] rounded">
                      <div className="text-[10px] text-slate-500 uppercase mb-1">Profitability</div>
                      <div className="text-[#00ff9d] font-bold text-lg">+12.5%</div>
                      <div className="w-full h-1 bg-[#222] mt-2 overflow-hidden rounded-full">
                        <motion.div
                          initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full bg-[#00ff9d]"
                        />
                      </div>
                    </div>
                    <div className="bg-[#111] p-3 border border-[#222] rounded">
                      <div className="text-[10px] text-slate-500 uppercase mb-1">Trades (24h)</div>
                      <div className="text-white font-bold text-lg">1,402</div>
                      <div className="w-full h-1 bg-[#222] mt-2 overflow-hidden rounded-full">
                        <motion.div
                          initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ duration: 1.5, delay: 0.7 }}
                          className="h-full bg-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden relative">
                    <p className="text-slate-500 mb-2 text-xs uppercase tracking-wider">// System Logs</p>
                    <div className="text-xs space-y-1.5 font-mono h-32 overflow-hidden">
                      <TypewriterLog />
                    </div>
                    {/* Fade out at bottom of logs */}
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#050505] to-transparent"></div>
                  </div>

                  <button className="w-full mt-4 py-2.5 border border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black uppercase font-bold tracking-[0.2em] text-xs transition-all relative overflow-hidden group/btn">
                    <span className="relative z-10">Deploy Instance</span>
                    <div className="absolute inset-0 bg-[#00ff9d] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 z-0"></div>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-[#050505]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Find Your Perfect Agent</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Browse through our curated categories to find autonomous agents that fit your specific workflow needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              icon={<TrendingUp className="text-[#00ff9d]" size={24} />}
              title="DeFi Trading"
              desc="Arbitrage, sniping, and portfolio management bots."
            />
            <CategoryCard
              icon={<Search className="text-blue-500" size={24} />}
              title="Market Analysis"
              desc="Whale watching, sentiment analysis, and alerts."
            />
            <CategoryCard
              icon={<Zap className="text-purple-500" size={24} />}
              title="Automation"
              desc="Task runners, schedulers, and workflow connectors."
            />
            <CategoryCard
              icon={<Bot className="text-indigo-500" size={24} />}
              title="Gaming & NPCs"
              desc="Autonomous characters and game logic handlers."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function CategoryCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="relative p-6 rounded-2xl border border-[#333] bg-[#0a0a0a] overflow-hidden group cursor-pointer hover:border-[#00ff9d] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,157,0.2)]">

      {/* Animated Background Layer */}
      <div className="absolute inset-0 bg-[#00ff9d] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom will-change-transform" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="w-12 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-[#333] mb-4 group-hover:bg-black/10 group-hover:border-black/5 group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
          <div className="group-hover:brightness-0 transition-all duration-300">
            {icon}
          </div>
        </div>
        <h3 className="font-bold text-lg text-white mb-2 group-hover:text-black transition-colors duration-300 delay-[50ms]">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed group-hover:text-black/75 transition-colors duration-300 delay-[75ms]">{desc}</p>
      </div>
    </div>
  );
}
