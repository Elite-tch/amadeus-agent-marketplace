"use client";

import Navbar from "@/components/Navbar";
import AgentCard from "@/components/AgentCard";
import { MOCK_AGENTS } from "@/lib/mock-data";
import { Search, SlidersHorizontal, Terminal, Activity } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ExplorePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = ["All", "Trading", "Analysis", "Automation", "Gaming"];

    const filteredAgents = MOCK_AGENTS.filter(agent => {
        const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory && selectedCategory !== "All" ? agent.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-[#050505] selection:bg-[#00ff9d] selection:text-black font-mono">
            <Navbar />

            {/* Grid Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="pt-32 pb-10 container-custom relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b border-[#333] pb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-[#00ff9d] text-xs uppercase tracking-widest">
                            <Terminal size={14} />
                            <span>Registry Access</span>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2 uppercase tracking-wide">
                            Agent <span className="text-stroke-green">Directory</span>
                        </h1>
                        <p className="text-slate-500 max-w-lg">
                            Query verified autonomous instances. Filter by capability logic or popularity metrics.
                        </p>
                    </div>

                    <div className="flex w-full md:w-auto items-center gap-3">
                        <div className="relative group w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-[#00ff9d] font-bold mr-1">&gt;</span>
                            </div>
                            <input
                                type="text"
                                placeholder="QUERY_AGENTS..."
                                className="w-full pl-8 pr-10 py-3 bg-[#0a0a0a] border border-[#333] text-white focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] outline-none transition-all placeholder:text-slate-600 uppercase tracking-widest text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <Search className="text-slate-500" size={16} />
                            </div>
                        </div>
                        <button className="p-3 bg-[#0a0a0a] border border-[#333] hover:border-[#00ff9d] hover:text-[#00ff9d] text-slate-500 transition-colors">
                            <SlidersHorizontal size={20} />
                        </button>
                    </div>
                </div>

                {/* Categories Tabs */}
                <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                    <span className="text-slate-500 text-xs mr-2 uppercase tracking-widest hidden sm:block">Filter:</span>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-all border ${(selectedCategory === cat || (cat === "All" && !selectedCategory))
                                    ? "bg-[#00ff9d] text-black border-[#00ff9d]"
                                    : "bg-transparent text-slate-400 border-[#333] hover:border-[#00ff9d] hover:text-[#00ff9d]"
                                }`}
                        >
                            [{cat}]
                        </button>
                    ))}
                </div>

                {/* Results Banner */}
                <div className="flex items-center justify-between mb-6 text-[10px] uppercase text-slate-500 tracking-widest font-mono">
                    <div>Matches Found: <span className="text-white">{filteredAgents.length}</span></div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${filteredAgents.length > 0 ? "bg-[#00ff9d] animate-pulse" : "bg-red-500"}`} />
                        Status: {filteredAgents.length > 0 ? "ONLINE" : "NO DATA"}
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredAgents.length > 0 ? (
                        filteredAgents.map(agent => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={agent.id}
                                className="h-full"
                            >
                                <AgentCard agent={agent} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center border border-dashed border-[#333] rounded-lg bg-[#0a0a0a]/50">
                            <Activity className="mx-auto h-12 w-12 text-slate-700 mb-4" />
                            <p className="text-slate-400 text-lg mb-2">Null Results Returned</p>
                            <p className="text-slate-600 text-sm mb-6">Search query yielded 0 matches in registry.</p>
                            <button
                                onClick={() => { setSearchTerm(""); setSelectedCategory(null); }}
                                className="text-[#00ff9d] text-xs font-bold uppercase tracking-widest hover:underline hover:text-white transition-colors"
                            >
                                &lt; Reset Parameters &gt;
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </main>
    );
}
