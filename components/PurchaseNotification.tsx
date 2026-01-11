"use client";

import { CheckCircle, XCircle, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PurchaseNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  success: boolean;
  agentName: string;
  transactionHash?: string;
  errorMessage?: string;
}

export default function PurchaseNotification({
  isOpen,
  onClose,
  success,
  agentName,
  transactionHash,
  errorMessage,
}: PurchaseNotificationProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-[#0a0a0a] border-2 border-[#333] max-w-md w-full overflow-hidden"
        >
          {/* Glow effect */}
          <div className={`absolute inset-0 ${success ? 'bg-[#00ff9d]/5' : 'bg-red-500/5'} pointer-events-none`} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="p-8 text-center relative">
            {success ? (
              <>
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="mx-auto h-20 w-20 text-[#00ff9d] mb-4" />
                </motion.div>

                {/* Success Title */}
                <h2 className="text-2xl font-bold text-white mb-2 font-mono uppercase">
                  Purchase Complete
                </h2>

                {/* Agent Name */}
                <p className="text-slate-400 mb-6">
                  <span className="text-[#00ff9d] font-bold">{agentName}</span> has been added to your collection
                </p>

                {/* Transaction Hash */}
                {transactionHash && (
                  <div className="mb-6 p-4 bg-[#1a1a1a] border border-[#333]">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">
                      Transaction Hash
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[#00ff9d] font-mono text-xs break-all">
                        {transactionHash.slice(0, 20)}...{transactionHash.slice(-20)}
                      </p>
                      <a
                        href={`https://explorer.ama.one/tx/${transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 p-2 hover:bg-[#00ff9d]/10 transition-colors"
                        title="View on Explorer"
                      >
                        <ExternalLink size={16} className="text-[#00ff9d]" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 bg-transparent border border-[#333] text-slate-400 py-3 text-xs font-mono font-bold uppercase tracking-widest hover:border-[#00ff9d] hover:text-white transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href="/my-agents"
                    className="flex-1 bg-[#00ff9d] text-black py-3 text-xs font-mono font-bold uppercase tracking-widest text-center hover:bg-[#00cc7d] transition-colors"
                  >
                    View Collection
                  </a>
                </div>
              </>
            ) : (
              <>
                {/* Error Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  <XCircle className="mx-auto h-20 w-20 text-red-500 mb-4" />
                </motion.div>

                {/* Error Title */}
                <h2 className="text-2xl font-bold text-white mb-2 font-mono uppercase">
                  Purchase Failed
                </h2>

                {/* Error Message */}
                <p className="text-slate-400 mb-6">
                  Unable to complete purchase of <span className="text-white font-bold">{agentName}</span>
                </p>

                {/* Error Details */}
                {errorMessage && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-left">
                    <div className="text-xs text-red-400 uppercase tracking-widest mb-2">
                      Error Details
                    </div>
                    <p className="text-red-300 text-sm font-mono">
                      {errorMessage}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 bg-transparent border border-[#333] text-slate-400 py-3 text-xs font-mono font-bold uppercase tracking-widest hover:border-white hover:text-white transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 py-3 text-xs font-mono font-bold uppercase tracking-widest hover:bg-red-500/30 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
