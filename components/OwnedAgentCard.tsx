"use client";

import { Star, ShieldCheck, ExternalLink, CheckCircle2, Calendar } from "lucide-react";
import { Agent } from "@/components/AgentCard";

interface OwnedAgentCardProps {
  agent: Agent;
  purchaseDate: string;
  purchasePrice: number;
  transactionHash?: string;
}

export default function OwnedAgentCard({
  agent,
  purchaseDate,
  purchasePrice,
  transactionHash,
}: OwnedAgentCardProps) {
  const displayPrice = purchasePrice / 1000000000; // Convert atomic units to AMA
  const formattedDate = new Date(purchaseDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group relative bg-[#0a0a0a] border border-[#333] hover:border-[#00ff9d] transition-all duration-300 flex flex-col h-full overflow-hidden hover:shadow-[0_0_20px_rgba(0,255,157,0.1)]">
      {/* Header / Banner */}
      <div className="h-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] to-transparent z-10" />
        <img
          src={`https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop`}
          alt="Cyberpunk Background"
          className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-[#00ff9d]/10 mix-blend-overlay"></div>

        {/* Owned Badge */}
        <div className="absolute top-2 right-2 bg-[#00ff9d] text-black px-2 py-1 text-[8px] font-mono font-bold uppercase tracking-widest z-10 flex items-center gap-1">
          <CheckCircle2 size={10} />
          Owned
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col relative z-20">
        {/* Icon & Meta */}
        <div className="flex justify-between items-start -mt-12 mb-4">
          <div className="w-16 h-16 bg-black border border-[#333] group-hover:border-[#00ff9d] transition-colors p-1 shadow-lg relative z-20 overflow-hidden">
            {agent.logoUrl ? (
              <img
                src={agent.logoUrl}
                alt={agent.name}
                className="w-full h-full object-cover bg-slate-900"
              />
            ) : (
              <img
                src={`https://robohash.org/${agent.name.replace(/\s+/g, "")}.png?set=set1&bgset=bg1&size=200x200`}
                alt={agent.name}
                className="w-full h-full object-cover bg-slate-900"
              />
            )}
          </div>
          <div className="bg-[#1a1a1a] border border-[#333] px-2 py-1 text-[10px] font-mono font-bold uppercase text-[#00ff9d] tracking-wider relative z-20">
            {agent.category}
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <div className="flex items-center gap-1 mb-1">
            <h3 className="font-bold text-lg text-white line-clamp-1 font-mono">
              {agent.name}
            </h3>
            {agent.isVerified && <ShieldCheck size={16} className="text-[#00ff9d]" />}
          </div>
          <p className="text-sm text-slate-400 line-clamp-2 min-h-[40px] font-sans">
            {agent.description}
          </p>
        </div>

        {/* Purchase Info */}
        <div className="mt-auto space-y-2">
          <div className="pt-3 border-t border-[#333] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-1 text-slate-500">
              <Calendar size={12} />
              <span>{formattedDate}</span>
            </div>
            <div className="font-bold text-slate-400">
              {displayPrice === 0 ? "FREE" : `${displayPrice} AMA`}
            </div>
          </div>

          {transactionHash && (
            <a
              href={`https://explorer.ama.one/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-[#00ff9d] transition-colors"
            >
              <span className="uppercase tracking-widest">View TX</span>
              <ExternalLink size={10} />
            </a>
          )}
        </div>

        {/* Hover Action */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30">
          <a
            href={agent.documentationUrl || agent.githubUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#00ff9d] text-black py-3 text-xs font-mono font-bold uppercase tracking-widest text-center hover:bg-[#00cc7d] transition-colors"
          >
            Launch Agent
          </a>
        </div>
      </div>
    </div>
  );
}
