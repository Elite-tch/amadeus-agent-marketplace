"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import { Menu, X, Wallet, Terminal, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConnectWallet from "@/components/ConnectWallet";
import { WalletContext } from "@/contexts/WalletContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const wallet = useContext(WalletContext);

    return (
        <nav className="fixed w-full py-3 top-0 z-50 border-b border-[#333] bg-[#050505]/95 backdrop-blur-md">
            <div className="container-custom mx-auto">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <Cpu className="text-[#00ff9d] relative z-10" size={24} />
                            <div className="absolute inset-0 bg-[#00ff9d]/20 blur-md rounded-full group-hover:bg-[#00ff9d]/40 transition-all" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-mono font-bold text-lg tracking-wider text-white group-hover:text-[#00ff9d] transition-colors">AMADEUS</span>
                            <span className="text-[10px] text-[#00ff9d] uppercase tracking-[0.2em] leading-none">Marketplace</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-wide">
                        <NavLink href="/explore">Registry</NavLink>
                        {wallet?.isConnected && <NavLink href="/my-agents">My Agents</NavLink>}
                        <NavLink href="/publish">Deploy</NavLink>
                        <NavLink href="/docs">Docs</NavLink>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-2.5 border border-[#333] bg-black/50 text-xs font-mono text-[#00ff9d]">
                            <span className="w-2 h-2 bg-[#00ff9d] rounded-full animate-pulse" />
                            SYSTEM ONLINE
                        </div>
                        <ConnectWallet />
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-[#00ff9d] border border-[#333] bg-black/50"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-[#333] overflow-hidden"
                    >
                        <div className="container-custom py-4 space-y-4 font-mono">
                            <MobileNavLink href="/explore" onClick={() => setIsOpen(false)}>
                                [Registry]
                            </MobileNavLink>
                            {wallet?.isConnected && (
                                <MobileNavLink href="/my-agents" onClick={() => setIsOpen(false)}>
                                    [My Agents]
                                </MobileNavLink>
                            )}
                            <MobileNavLink href="/publish" onClick={() => setIsOpen(false)}>
                                [Deploy]
                            </MobileNavLink>
                            <MobileNavLink href="/docs" onClick={() => setIsOpen(false)}>
                                [Docs]
                            </MobileNavLink>
                            <div className="pt-4 border-t border-[#333]">
                                <ConnectWallet />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-slate-400 hover:text-[#00ff9d] transition-colors relative group hover:text-glow"
        >
            <span className="text-[#00ff9d]/0 group-hover:text-[#00ff9d] transition-colors mr-1">&gt;</span>
            {children}
        </Link>
    );
}

function MobileNavLink({
    href,
    children,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block text-slate-300 hover:text-[#00ff9d] text-lg py-2 uppercase tracking-wide"
        >
            {children}
        </Link>
    );
}
