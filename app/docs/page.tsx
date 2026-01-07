"use client";

import Navbar from "@/components/Navbar";
import { Book, Code, Terminal, ChevronRight, FileText, Folder } from "lucide-react";
import { motion } from "framer-motion";

export default function DocsPage() {
    return (
        <main className="min-h-screen bg-[#050505] selection:bg-[#00ff9d] selection:text-black font-mono">
            <Navbar />

            {/* Grid Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="pt-32 pb-20 container-custom relative z-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar: File Explorer Style */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-[#0a0a0a] border border-[#333] sticky top-24">
                            <div className="p-3 bg-[#111] border-b border-[#333] flex items-center gap-2">
                                <Book size={16} className="text-[#00ff9d]" />
                                <span className="text-xs font-bold text-white uppercase tracking-widest">System_Manual</span>
                            </div>
                            <nav className="p-2 space-y-1">
                                <SidebarItem label="INTRODUCTION.md" active />
                                <SidebarItem label="QUICK_START.sh" />
                                <SidebarItem label="AGENT_SDK_V2" isFolder />
                                <SidebarItem label="MCP_PROTOCOL_SPEC" isFolder />
                                <SidebarItem label="PUBLISHING_GUIDELINES" />
                            </nav>
                        </div>
                    </div>

                    {/* Content: Readme Style */}
                    <div className="flex-1 max-w-4xl">
                        <div className="border border-[#333] bg-[#0a0a0a] min-h-[800px] relative">
                            {/* Doc Header */}
                            <div className="border-b border-[#333] bg-[#111] p-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <Folder size={14} />
                                    <span>docs</span>
                                    <ChevronRight size={14} />
                                    <FileText size={14} className="text-[#00ff9d]" />
                                    <span className="text-white">Introduction.md</span>
                                </div>
                                <div className="text-[10px] text-[#00ff9d] uppercase tracking-widest border border-[#00ff9d]/30 px-2 py-1 bg-[#00ff9d]/10 rounded">
                                    Read Only
                                </div>
                            </div>

                            {/* Doc Body */}
                            <div className="p-8 md:p-12 prose prose-invert max-w-none">
                                <h1 className="text-4xl font-bold text-white mb-6 uppercase tracking-tight flex items-center gap-3">
                                    <span className="text-[#00ff9d]">#</span> Introduction
                                </h1>
                                <p className="text-lg text-slate-400 mb-8 leading-relaxed font-sans border-l-2 border-[#00ff9d] pl-6">
                                    The Amadeus Agent Marketplace is the central hub for discovering and deploying autonomous agents on the Amadeus Network.
                                    Whether you're looking to automate DeFi strategies or build complex gaming NPCs, our platform provides the tools you need.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 not-prose">
                                    <div className="p-6 bg-[#050505] border border-[#333] hover:border-[#00ff9d] transition-colors group cursor-pointer">
                                        <div className="w-10 h-10 bg-[#111] border border-[#333] flex items-center justify-center text-[#00ff9d] mb-4 group-hover:bg-[#00ff9d] group-hover:text-black transition-all">
                                            <Terminal size={20} />
                                        </div>
                                        <h3 className="font-bold text-lg text-white mb-2 uppercase tracking-wide">User_Manual</h3>
                                        <p className="text-sm text-slate-500 mb-4 font-mono">Execute browsing, verification, and deployment protocols.</p>
                                        <span className="text-[#00ff9d] text-xs font-bold uppercase tracking-widest group-hover:underline">Read Guide &gt;</span>
                                    </div>

                                    <div className="p-6 bg-[#050505] border border-[#333] hover:border-purple-500 transition-colors group cursor-pointer">
                                        <div className="w-10 h-10 bg-[#111] border border-[#333] flex items-center justify-center text-purple-500 mb-4 group-hover:bg-purple-500 group-hover:text-black transition-all">
                                            <Code size={20} />
                                        </div>
                                        <h3 className="font-bold text-lg text-white mb-2 uppercase tracking-wide">Dev_Documentation</h3>
                                        <p className="text-sm text-slate-500 mb-4 font-mono">Access SDKs, manifest schemas, and monetization logic.</p>
                                        <span className="text-purple-500 text-xs font-bold uppercase tracking-widest group-hover:underline">Read Docs &gt;</span>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-4 mt-12 flex items-center gap-2">
                                    <span className="text-[#00ff9d]">##</span> CLI Quick Start
                                </h2>
                                <div className="bg-[#050505] border border-[#333] rounded p-6 font-mono text-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">BASH</div>
                                    </div>
                                    <div className="space-y-2">
                                        <p><span className="text-slate-500"># Install the Amadeus SDK</span></p>
                                        <p><span className="text-[#00ff9d]">$</span> npm install @amadeus/sdk</p>
                                        <br />
                                        <p><span className="text-slate-500"># Initialize a new agent project</span></p>
                                        <p><span className="text-[#00ff9d]">$</span> amadeus init my-new-agent</p>
                                        <br />
                                        <p><span className="text-slate-500"># Publish to the registry</span></p>
                                        <p><span className="text-[#00ff9d]">$</span> amadeus publish</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function SidebarItem({ label, active, isFolder }: { label: string, active?: boolean, isFolder?: boolean }) {
    return (
        <a href="#" className={`flex items-center gap-2 px-3 py-2 text-xs font-mono transition-colors group ${active ? "bg-[#00ff9d]/10 text-[#00ff9d]" : "text-slate-500 hover:text-white hover:bg-[#111]"}`}>
            {isFolder ? (
                <Folder size={14} className={active ? "text-[#00ff9d]" : "text-slate-600 group-hover:text-slate-400"} />
            ) : (
                <FileText size={14} className={active ? "text-[#00ff9d]" : "text-slate-600 group-hover:text-slate-400"} />
            )}
            <span>{label}</span>
            {active && <span className="ml-auto text-[#00ff9d]">&lt;</span>}
        </a>
    )
}
