"use client";

import { Star, ShieldCheck, Terminal, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import PurchaseModal from "./PurchaseModal";
import PurchaseNotification from "./PurchaseNotification";

// Agent type matching API response
export interface Agent {
    _id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    mcpConfig: {
        serverUrl: string;
        protocol: string;
    };
    pricing: {
        model: 'free' | 'paid';
        amount: number;
        currency: string;
    };
    owner: string;
    logoUrl?: string;
    demoVideoUrl?: string;
    screenshotUrls?: string[];
    documentationUrl?: string;
    githubUrl?: string;
    websiteUrl?: string;
    isVerified: boolean;
    isActive: boolean;
    stats: {
        totalPurchases: number;
        activeSubscribers: number;
        averageRating: number;
        totalReviews: number;
    };
    createdAt: string;
    updatedAt: string;
}

interface AgentCardProps {
    agent: Agent;
    isOwned?: boolean;
    onPurchaseSuccess?: () => void;
}

export default function AgentCard({ agent, isOwned = false, onPurchaseSuccess }: AgentCardProps) {
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationData, setNotificationData] = useState<{
        success: boolean;
        txHash?: string;
        error?: string;
    }>({ success: false });

    // Convert atomic units to AMA (divide by 1 billion)
    const displayPrice = agent.pricing.amount / 1000000000;
    const isFree = agent.pricing.model === 'free' || agent.pricing.amount === 0;

    const handleButtonClick = () => {
        if (!isOwned) {
            setShowPurchaseModal(true);
        }
    };

    const handlePurchaseSuccess = () => {
        setShowPurchaseModal(false);
        setNotificationData({ success: true });
        setShowNotification(true);
        onPurchaseSuccess?.();
    };

    return (
        <>
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
                                    src={`https://robohash.org/${agent.name.replace(/\s+/g, '')}.png?set=set1&bgset=bg1&size=200x200`}
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
                            <h3 className="font-bold text-lg text-white line-clamp-1 font-mono">{agent.name}</h3>
                            {agent.isVerified && <ShieldCheck size={16} className="text-[#00ff9d]" />}
                        </div>
                        <p className="text-sm text-slate-400 line-clamp-2 min-h-[40px] font-sans">
                            {agent.description}
                        </p>
                    </div>

                    {/* Footer info */}
                    <div className="mt-auto pt-4 border-t border-[#333] flex items-center justify-between font-mono text-xs">
                        <div className="flex items-center gap-1 text-[#00ff9d] font-bold">
                            <Star size={12} fill="currentColor" />
                            <span>{agent.stats.averageRating.toFixed(1)}</span>
                            <span className="text-slate-500 font-normal">[{agent.stats.totalReviews}]</span>
                        </div>
                        <div className="font-bold text-white">
                            {isFree ? "FREE" : `${displayPrice} AMA`}
                        </div>
                    </div>

                    {/* Hover Action */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30">
                        <button
                            onClick={handleButtonClick}
                            disabled={isOwned}
                            className={`w-full py-3 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${isOwned
                                ? "bg-[#1a1a1a] text-slate-500 cursor-not-allowed border-t border-[#333]"
                                : "bg-[#00ff9d] text-black hover:bg-[#00cc7d]"
                                }`}
                        >
                            {isOwned ? (
                                <>
                                    <CheckCircle2 size={14} />
                                    Already Owned
                                </>
                            ) : (
                                <>
                                    <Terminal size={14} />
                                    {isFree ? "Get Free" : `Get for ${displayPrice} AMA`}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Purchase Modal */}
            <PurchaseModal
                agent={agent}
                isOpen={showPurchaseModal}
                onClose={() => setShowPurchaseModal(false)}
                onSuccess={handlePurchaseSuccess}
            />

            {/* Success/Error Notification */}
            <PurchaseNotification
                isOpen={showNotification}
                onClose={() => setShowNotification(false)}
                success={notificationData.success}
                agentName={agent.name}
                transactionHash={notificationData.txHash}
                errorMessage={notificationData.error}
            />
        </>
    );
}
