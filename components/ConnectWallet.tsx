"use client";

import { useWallet } from '@/hooks/useWallet';
import { useBalance } from '@/hooks/useBalance';
import { Wallet, AlertCircle, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function ConnectWallet() {
  const { account, connect, disconnect, isConnected, isConnecting, status, isProviderAvailable } = useWallet();
  const { balance, loading: balanceLoading, network } = useBalance(account);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Wallet not installed
  if (status === 'not-found') {
    return (
      <div className="relative">
        <button
          type='button'
          onClick={() => setShowDropdown(!showDropdown)}
          className="btn-secondary flex items-center gap-2 uppercase text-sm"
        >
          <AlertCircle size={16} />
          <span>No Wallet</span>
        </button>

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full mt-2 right-0 w-72 p-4 bg-[#1a1a1a] border border-[#333] text-sm z-50"
            >
              <p className="text-slate-400 mb-2">
                Amadeus Wallet extension not found
              </p>
              <a
                href="https://chromewebstore.google.com/detail/amadeus-wallet/gigmkdnbhopbandngplohmilogilbkjn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00ff9d] hover:underline text-xs font-mono"
              >
                &gt; Install Amadeus Wallet
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Checking for wallet
  if (status === 'checking') {
    return (
      <button className="btn-secondary flex items-center gap-2 opacity-50 cursor-wait">
        <Loader2 size={18} className="animate-spin" />
        <span>Checking...</span>
      </button>
    );
  }

  // Connected state
  if (isConnected && account) {
    return (
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-[#00ff9d]/30 bg-[#0a0a0a] hover:border-[#00ff9d] transition-all group text-xs">
          {/* Pulsing green dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff9d] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff9d]"></span>
          </span>

          {/* Account address - clickable to show dropdown */}
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-white font-mono text-xs hover:text-[#00ff9d] transition-colors cursor-pointer"
          >
            {formatAddress(account)}
          </button>

          {/* Disconnect icon */}
          <button
            onClick={disconnect}
            type="button"
            className="ml-2 p-1 text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
            title="Disconnect wallet"
          >
            <X size={16} />
          </button>
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 right-0 w-64 bg-[#0a0a0a] border border-[#333] z-50 font-mono"
            >
              {/* Chain Info */}
              <div className="p-4 border-b border-[#333] uppercase">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-500 text-xs">Network</span>
                  <span className="text-[#00ff9d] text-xs font-bold">Amadeus</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-xs">Type</span>
                  <span className="text-white text-xs">{network}</span>
                </div>
              </div>

              {/* Balance */}
              <div className="p-4 uppercase">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-xs">Balance</span>
                  {balanceLoading ? (
                    <span className="text-slate-400 text-sm">Loading...</span>
                  ) : balance !== null ? (
                    <span className="text-white text-sm font-bold">{balance.toFixed(4)} AMA</span>
                  ) : (
                    <span className="text-slate-600 text-sm">--- AMA</span>
                  )}
                </div>
              </div>

              {/* Full Address */}
              <div className="p-4 border-t border-[#333] bg-[#050505]">
                <div className="text-slate-500 text-xs uppercase mb-2"> Address</div>
                <div className="text-white text-xs break-all font-mono bg-[#0a0a0a] p-2 border border-[#333]">
                  {account}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Disconnected state - show connect button
  return (
    <motion.button
      onClick={connect}
      disabled={isConnecting || !isProviderAvailable}
      className="btn-primary flex items-center gap-2 clip-path-button relative overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: isConnecting ? 1 : 1.02 }}
      whileTap={{ scale: isConnecting ? 1 : 0.98 }}
    >
      {isConnecting ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Wallet size={18} />
          <span>Connect</span>
        </>
      )}

      {/* Animated background on hover */}
      <div className="absolute inset-0 bg-[#00ff9d] translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 -z-10" />
    </motion.button>
  );
}
