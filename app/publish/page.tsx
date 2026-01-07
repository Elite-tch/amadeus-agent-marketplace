"use client";

import Navbar from "@/components/Navbar";
import { Upload, DollarSign, Bot, FileCode, Terminal, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PublishPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeStep, setActiveStep] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Mock delay
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Application submitted successfully! (Mock)");
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-[#050505] selection:bg-[#00ff9d] selection:text-black font-mono">
            <Navbar />

            {/* Grid Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="pt-32 pb-20 container-custom max-w-4xl relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff9d]/10 border border-[#00ff9d]/30 text-[#00ff9d] text-xs font-bold tracking-widest uppercase mb-4">
                        <Upload size={14} />
                        <span>Upload Sequence</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4 uppercase tracking-wider">
                        Deploy New <span className="text-[#00ff9d]">Agent</span>
                    </h1>
                    <p className="text-slate-500 max-w-lg mx-auto">
                        Initialize deployment sequence. Your agent will be verified by the Amadeus DAO before listing on the public registry.
                    </p>
                </div>

                <div className="bg-[#0a0a0a] border border-[#333] relative overflow-hidden group">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff9d]"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ff9d]"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ff9d]"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ff9d]"></div>

                    {/* Progress / Steps Mock */}
                    <div className="bg-[#111] border-b border-[#333] p-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                        <div className={`flex items-center gap-2 ${activeStep >= 1 ? "text-[#00ff9d]" : ""}`}>
                            <span className={`w-6 h-6 rounded flex items-center justify-center border ${activeStep >= 1 ? "bg-[#00ff9d] text-black border-[#00ff9d]" : "border-[#333]"}`}>1</span>
                            Parameters
                        </div>
                        <div className={`h-px flex-1 mx-4 ${activeStep >= 2 ? "bg-[#00ff9d]" : "bg-[#333]"}`}></div>
                        <div className={`flex items-center gap-2 ${activeStep >= 2 ? "text-[#00ff9d]" : ""}`}>
                            <span className={`w-6 h-6 rounded flex items-center justify-center border ${activeStep >= 2 ? "bg-[#00ff9d] text-black border-[#00ff9d]" : "border-[#333]"}`}>2</span>
                            Source_Code
                        </div>
                        <div className={`h-px flex-1 mx-4 ${activeStep >= 3 ? "bg-[#00ff9d]" : "bg-[#333]"}`}></div>
                        <div className={`flex items-center gap-2 ${activeStep >= 3 ? "text-[#00ff9d]" : ""}`}>
                            <span className={`w-6 h-6 rounded flex items-center justify-center border ${activeStep >= 3 ? "bg-[#00ff9d] text-black border-[#00ff9d]" : "border-[#333]"}`}>3</span>
                            Revenue
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-10">
                        {/* Basic Info */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-lg text-white border-b border-[#333] pb-2 uppercase tracking-wide flex items-center gap-2">
                                <Terminal size={18} className="text-[#00ff9d]" />
                                Agent Identity
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#00ff9d] uppercase tracking-wider">Agent Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white focus:border-[#00ff9d] outline-none transition-all placeholder:text-slate-700" placeholder="e.g. ALPHA_SNIPER_V1" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#00ff9d] uppercase tracking-wider">Category Module</label>
                                    <select className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white focus:border-[#00ff9d] outline-none transition-all appearance-none cursor-pointer">
                                        <option>TRADING_ALGO</option>
                                        <option>MARKET_ANALYSIS</option>
                                        <option>AUTOMATION_BOT</option>
                                        <option>GAMING_NPC</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#00ff9d] uppercase tracking-wider">Function Description</label>
                                <textarea className="w-full px-4 py-3 bg-[#050505] border border-[#333] text-white focus:border-[#00ff9d] outline-none transition-all h-32 placeholder:text-slate-700" placeholder="Define primary directives and utility capabilities..." required />
                            </div>
                        </div>

                        {/* Upload */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-lg text-white border-b border-[#333] pb-2 uppercase tracking-wide flex items-center gap-2">
                                <FileCode size={18} className="text-[#00ff9d]" />
                                Payload Upload
                            </h3>

                            <div className="border-2 border-dashed border-[#333] bg-[#050505]/50 rounded-lg p-10 text-center hover:border-[#00ff9d] hover:bg-[#00ff9d]/5 transition-all cursor-pointer group/upload">
                                <div className="w-16 h-16 bg-[#111] text-[#00ff9d] rounded-full flex items-center justify-center mx-auto mb-6 group-hover/upload:scale-110 transition-transform shadow-[0_0_20px_rgba(0,255,157,0.1)]">
                                    <Upload size={28} />
                                </div>
                                <p className="text-white font-bold uppercase tracking-wider mb-2">Initialize Upload Stream</p>
                                <p className="text-xs text-slate-500 font-mono">Accepting .ZIP or .JSON Manifests</p>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-lg text-white border-b border-[#333] pb-2 uppercase tracking-wide flex items-center gap-2">
                                <DollarSign size={18} className="text-[#00ff9d]" />
                                Monetization Logic
                            </h3>

                            <div className="flex gap-4">
                                <label className="flex-1 p-4 border border-[#00ff9d] bg-[#00ff9d]/10 cursor-pointer flex items-center gap-3 relative overflow-hidden group/radio">
                                    <input type="radio" name="pricing" defaultChecked className="opacity-0 absolute" onClick={() => setActiveStep(3)} />
                                    <div className="w-4 h-4 rounded-full border border-[#00ff9d] flex items-center justify-center">
                                        <div className="w-2 h-2 bg-[#00ff9d] rounded-full"></div>
                                    </div>
                                    <div>
                                        <span className="block font-bold text-white uppercase tracking-wider text-sm">One-time License</span>
                                        <span className="text-[10px] text-[#00ff9d]">Single deployment fee</span>
                                    </div>
                                </label>
                                <label className="flex-1 p-4 border border-[#333] bg-[#050505] cursor-pointer flex items-center gap-3 hover:border-[#00ff9d]/50 transition-colors">
                                    <input type="radio" name="pricing" className="opacity-0 absolute" />
                                    <div className="w-4 h-4 rounded-full border border-[#333] flex items-center justify-center">
                                    </div>
                                    <div>
                                        <span className="block font-bold text-slate-400 uppercase tracking-wider text-sm">Open Source</span>
                                        <span className="text-[10px] text-slate-600">No deployment fee</span>
                                    </div>
                                </label>
                            </div>

                            <div className="relative w-full md:w-1/2">
                                <label className="text-xs font-bold text-[#00ff9d] uppercase tracking-wider mb-2 block">License Cost (AMA)</label>
                                <div className="relative group/input">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff9d] font-bold">$</span>
                                    <input type="number" className="w-full pl-8 pr-4 py-3 bg-[#050505] border border-[#333] text-white focus:border-[#00ff9d] outline-none transition-all placeholder:text-slate-700 font-mono" placeholder="0.00" min="0" step="0.01" />
                                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#00ff9d] opacity-0 group-focus-within/input:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex items-center justify-end gap-6 border-t border-[#333]">
                            <button type="button" className="text-slate-500 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors">
                                Save_To_Cache
                            </button>
                            <button type="submit" disabled={isSubmitting} className="bg-[#00ff9d] text-black px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-[#00cc7d] transition-all flex items-center gap-2 group/btn">
                                {isSubmitting ? (
                                    <>
                                        <span className="animate-spin w-4 h-4 border-2 border-black/30 border-t-black rounded-full"></span>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        Execute Deployment
                                        <CheckCircle size={16} className="group-hover/btn:scale-110 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
