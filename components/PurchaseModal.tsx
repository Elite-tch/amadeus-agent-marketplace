"use client";

import { Agent } from "@/components/AgentCard";
import { usePurchase } from "@/hooks/usePurchase";
import { useBalance } from "@/hooks/useBalance";
import { X, Terminal, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState, useContext } from "react";
import { WalletContext } from "@/contexts/WalletContext";

interface PurchaseModalProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PurchaseModal({
  agent,
  isOpen,
  onClose,
  onSuccess,
}: PurchaseModalProps) {
  const wallet = useContext(WalletContext);
  const { balance } = useBalance(wallet?.account || null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [successTxHash, setSuccessTxHash] = useState<string | undefined>();

  const { purchaseAgent, isPurchasing, error } = usePurchase({
    onSuccess: () => {
      setPurchaseSuccess(true);
      onSuccess?.();
    },
  });

  if (!isOpen) return null;

  const displayPrice = agent.pricing.amount / 1000000000; // Convert atomic units to AMA
  const isFree = agent.pricing.model === "free" || agent.pricing.amount === 0;
  // balance is already in float format from useBalance, so compare with displayPrice
  const hasInsufficientBalance = !isFree && balance !== null && balance < displayPrice;

  const handlePurchase = async () => {
    await purchaseAgent(agent._id, agent.pricing.amount, agent.owner);
  };

  const handleClose = () => {
    setPurchaseSuccess(false);
    setSuccessTxHash(undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-[#0a0a0a] border-2 border-[#333] max-w-md w-full">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          disabled={isPurchasing}
        >
          <X size={20} />
        </button>

        {purchaseSuccess ? (
          // Success State
          <div className="p-8 text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-[#00ff9d] mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2 font-mono uppercase">
              {isFree ? "Agent Added" : "Purchase Complete"}
            </h2>
            <p className="text-slate-400 mb-6">
              {agent.name} has been added to your collection
            </p>

            {successTxHash && (
              <div className="mb-6 p-3 bg-[#1a1a1a] border border-[#333] text-xs">
                <span className="text-slate-500 uppercase tracking-widest">TX Hash:</span>
                <p className="text-[#00ff9d] font-mono break-all mt-1">{successTxHash}</p>
              </div>
            )}

            <button
              onClick={handleClose}
              className="w-full bg-[#00ff9d] text-black py-3 text-sm font-mono font-bold uppercase tracking-widest hover:bg-[#00cc7d] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          // Purchase Form
          <div className="p-8">
            <div className="flex items-center gap-2 mb-2 text-[#00ff9d] text-xs uppercase tracking-widest">
              <Terminal size={14} />
              <span>Purchase Agent</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6 font-mono uppercase">
              {agent.name}
            </h2>

            {/* Agent Details */}
            <div className="mb-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-[#1a1a1a] border border-[#333] p-1 shrink-0">
                  {agent.logoUrl ? (
                    <img src={agent.logoUrl} alt={agent.name} className="w-full h-full object-cover" />
                  ) : (
                    <img
                      src={`https://robohash.org/${agent.name.replace(/\s+/g, "")}.png?set=set1&bgset=bg1&size=200x200`}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-400 line-clamp-3">{agent.description}</p>
                </div>
              </div>

              {/* Price Info */}
              <div className="p-4 bg-[#1a1a1a] border border-[#333]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Price:</span>
                  <span className="text-lg font-bold text-white font-mono">
                    {isFree ? "FREE" : `${displayPrice} AMA`}
                  </span>
                </div>

                {!isFree && balance !== null && (
                  <div className="flex justify-between items-center pt-2 border-t border-[#333]">
                    <span className="text-xs text-slate-500 uppercase tracking-widest">Your Balance:</span>
                    <span className={`text-sm font-bold font-mono ${hasInsufficientBalance ? "text-red-500" : "text-[#00ff9d]"}`}>
                      {balance.toFixed(2)} AMA
                    </span>
                  </div>
                )}
              </div>

              {/* Warnings/Errors */}
              {hasInsufficientBalance && (
                <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>Insufficient balance to purchase this agent</p>
                </div>
              )}

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                disabled={isPurchasing}
                className="flex-1 bg-transparent border border-[#333] text-slate-400 py-3 text-xs font-mono font-bold uppercase tracking-widest hover:border-[#00ff9d] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={isPurchasing || hasInsufficientBalance}
                className="flex-1 bg-[#00ff9d] text-black py-3 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#00cc7d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#00ff9d]"
              >
                {isPurchasing ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Terminal size={14} />
                    {isFree ? "Get Free" : "Confirm Purchase"}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
