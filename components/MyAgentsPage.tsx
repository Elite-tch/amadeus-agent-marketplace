"use client";

import { useContext } from "react";
import { WalletContext } from "@/contexts/WalletContext";
import { useMyAgents } from "@/hooks/useMyAgents";
import OwnedAgentCard from "@/components/OwnedAgentCard";
import { Terminal, Activity, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MyAgentsPage() {
  const wallet = useContext(WalletContext);
  const { ownedAgents, isLoading, error } = useMyAgents(wallet?.account || null);

  // Wallet not connected state
  if (!wallet?.account) {
    return (
      <main className="min-h-screen bg-[#050505] selection:bg-[#00ff9d] selection:text-black font-mono">
        {/* Grid Overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        <div className="pt-32 pb-10 container-custom relative z-10">
          <div className="max-w-md mx-auto text-center py-32">
            <Terminal className="mx-auto h-16 w-16 text-slate-700 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-3 uppercase tracking-wide">
              Wallet Not Connected
            </h2>
            <p className="text-slate-400 mb-8">
              Please connect your Amadeus wallet to view your owned agents
            </p>
            <button
              onClick={wallet?.connect}
              className="bg-[#00ff9d] text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#00cc7d] transition-colors"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-[#00ff9d] selection:text-black font-mono">
      {/* Grid Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="pt-32 pb-10 container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b border-[#333] pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#00ff9d] text-xs uppercase tracking-widest">
              <Terminal size={14} />
              <span>Personal Collection</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 uppercase tracking-wide">
              My <span className="text-stroke-green">Agents</span>
            </h1>
            <p className="text-slate-500 max-w-lg">
              Access and manage your purchased autonomous agents
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/explore"
              className="px-4 py-2 bg-transparent border border-[#333] text-slate-400 hover:border-[#00ff9d] hover:text-[#00ff9d] text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Explore More
            </Link>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="flex items-center justify-between mb-6 text-[10px] uppercase text-slate-500 tracking-widest font-mono">
          <div>
            {isLoading ? (
              "Loading agents..."
            ) : (
              <>
                Owned Agents: <span className="text-white">{ownedAgents.length}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${isLoading
                  ? "bg-yellow-500 animate-pulse"
                  : ownedAgents.length > 0
                    ? "bg-[#00ff9d] animate-pulse"
                    : "bg-slate-500"
                }`}
            />
            Status: {isLoading ? "LOADING" : ownedAgents.length > 0 ? "READY" : "EMPTY"}
          </div>
        </div>

        {/* Grid */}
        {error ? (
          <div className="col-span-full py-32 text-center border border-dashed border-red-500/30 rounded-lg bg-red-500/5">
            <Activity className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <p className="text-red-400 text-lg mb-2">Error Loading Agents</p>
            <p className="text-red-600 text-sm mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-[#00ff9d] text-xs font-bold uppercase tracking-widest hover:underline hover:text-white transition-colors"
            >
              &lt; Retry &gt;
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {isLoading ? (
              // Skeleton loaders
              [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#0a0a0a] border border-[#333] flex flex-col h-full overflow-hidden animate-pulse"
                >
                  <div className="h-24 bg-[#1a1a1a]"></div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start -mt-12 mb-4">
                      <div className="w-16 h-16 bg-[#1a1a1a] border border-[#333]"></div>
                      <div className="bg-[#1a1a1a] border border-[#333] px-3 py-1.5 w-20 h-6"></div>
                    </div>
                    <div className="mb-4 space-y-2">
                      <div className="h-5 bg-[#1a1a1a] rounded w-3/4"></div>
                      <div className="h-3 bg-[#1a1a1a] rounded w-full"></div>
                      <div className="h-3 bg-[#1a1a1a] rounded w-5/6"></div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-[#333] flex items-center justify-between">
                      <div className="h-4 bg-[#1a1a1a] rounded w-16"></div>
                      <div className="h-4 bg-[#1a1a1a] rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : ownedAgents.length > 0 ? (
              ownedAgents.map(({ purchase, agent }) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={purchase._id}
                  className="h-full"
                >
                  <OwnedAgentCard
                    agent={agent}
                    purchaseDate={purchase.purchaseDate}
                    purchasePrice={purchase.purchasePrice}
                    transactionHash={purchase.transactionHash}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-32 text-center border border-dashed border-[#333] rounded-lg bg-[#0a0a0a]/50">
                <Activity className="mx-auto h-12 w-12 text-slate-700 mb-4" />
                <p className="text-slate-400 text-lg mb-2">No Agents Owned</p>
                <p className="text-slate-600 text-sm mb-6">
                  Browse the marketplace to start building your collection
                </p>
                <Link
                  href="/explore"
                  className="inline-block text-[#00ff9d] text-xs font-bold uppercase tracking-widest hover:underline hover:text-white transition-colors"
                >
                  &lt; Explore Agents &gt;
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
