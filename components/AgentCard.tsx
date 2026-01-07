import { Agent } from "@/lib/mock-data";
import { Star, ShieldCheck, Download, Terminal } from "lucide-react";
import Link from "next/link";

export default function AgentCard({ agent }: { agent: Agent }) {
    return (
        <div className="group relative bg-[#0a0a0a] border border-[#333] hover:border-[#00ff9d] transition-all duration-300 flex flex-col h-full overflow-hidden hover:shadow-[0_0_20px_rgba(0,255,157,0.1)]">
            {/* Header / Banner */}
            <div className="h-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
                <img
                    src={`https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop`}
                    alt="Cyberpunk Background"
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[#00ff9d]/10 mix-blend-overlay"></div>
            </div>

            <div className="p-5 flex-1 flex flex-col relative z-20">
                {/* Icon & Meta */}
                <div className="flex justify-between items-start -mt-12 mb-4">
                    <div className="w-16 h-16 bg-[#000] border border-[#333] group-hover:border-[#00ff9d] transition-colors p-1 shadow-lg relative z-20 overflow-hidden">
                        <img
                            src={`https://robohash.org/${agent.name.replace(/\s+/g, '')}.png?set=set1&bgset=bg1&size=200x200`}
                            alt={agent.name}
                            className="w-full h-full object-cover bg-slate-900"
                        />
                    </div>
                    <div className="bg-[#1a1a1a] border border-[#333] px-2 py-1 text-[10px] font-mono font-bold uppercase text-[#00ff9d] tracking-wider relative z-20">
                        {agent.category}
                    </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                    <div className="flex items-center gap-1 mb-1">
                        <h3 className="font-bold text-lg text-white line-clamp-1 font-mono">{agent.name}</h3>
                        {agent.verified && <ShieldCheck size={16} className="text-[#00ff9d]" />}
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-2 min-h-[40px] font-sans">
                        {agent.description}
                    </p>
                </div>

                {/* Footer info */}
                <div className="mt-auto pt-4 border-t border-[#333] flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-1 text-[#00ff9d] font-bold">
                        <Star size={12} fill="currentColor" />
                        <span>{agent.rating}</span>
                        <span className="text-slate-500 font-normal">[{agent.reviews}]</span>
                    </div>
                    <div className="font-bold text-white">
                        {agent.price === 0 ? "FREE ACCESS" : `${agent.price} AMA`}
                    </div>
                </div>

                {/* Hover Action */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30">
                    <button className="w-full bg-[#00ff9d] text-black py-3 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#00cc7d]">
                        <Terminal size={14} />
                        Initialize Agent
                    </button>
                </div>
            </div>
        </div>
    );
}
