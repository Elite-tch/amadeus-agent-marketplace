export interface Agent {
    id: string;
    name: string;
    description: string;
    category: "Trading" | "Analysis" | "Automation" | "Gaming";
    price: number;
    rating: number;
    reviews: number;
    author: string;
    verified: boolean;
    imageColor: string;
}

export const MOCK_AGENTS: Agent[] = [
    {
        id: "1",
        name: "Alpha Sniper Bot",
        description: "High-frequency trading bot specialized in detecting liquidity pools on decentralized exchanges.",
        category: "Trading",
        price: 4.2,
        rating: 4.8,
        reviews: 124,
        author: "0xDev...8A2",
        verified: true,
        imageColor: "from-blue-500 to-indigo-500",
    },
    {
        id: "2",
        name: "Whale Watcher Pro",
        description: "Real-time alerts for large wallet movements across 10 EVM chains. Never miss a dump.",
        category: "Analysis",
        price: 2.5,
        rating: 4.9,
        reviews: 89,
        author: "DeepSeaLabs",
        verified: true,
        imageColor: "from-cyan-500 to-blue-500",
    },
    {
        id: "3",
        name: "Auto-Compounder",
        description: "Automatically claims and restakes rewards from major staking protocols to maximize APY.",
        category: "Automation",
        price: 0,
        rating: 4.5,
        reviews: 342,
        author: "YieldMaster",
        verified: false,
        imageColor: "from-emerald-500 to-teal-500",
    },
    {
        id: "4",
        name: "NPC Dialog Engine",
        description: "Generates dynamic, context-aware dialogue for in-game characters using LLMs.",
        category: "Gaming",
        price: 10.0,
        rating: 4.7,
        reviews: 56,
        author: "GameAI_Co",
        verified: true,
        imageColor: "from-purple-500 to-pink-500",
    },
    {
        id: "5",
        name: "Sentiment Analyzer",
        description: "Scrapes social media for token sentiment and provides a daily bullish/bearish score.",
        category: "Analysis",
        price: 1.5,
        rating: 4.2,
        reviews: 28,
        author: "TrendSpotter",
        verified: false,
        imageColor: "from-orange-500 to-red-500",
    },
    {
        id: "6",
        name: "Discord Mod Bot",
        description: "Autonomous moderation agent that detects spam and manages user tickets.",
        category: "Automation",
        price: 0.5,
        rating: 4.6,
        reviews: 210,
        author: "CommunitySafe",
        verified: true,
        imageColor: "from-slate-700 to-slate-900",
    },
];
