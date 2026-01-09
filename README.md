# 🤖 Amadeus Agent Marketplace

<div align="center">

**Decentralized MCP Agent Marketplace on Amadeus Blockchain**  
*Discover, deploy, and monetize AI agents powered by the Model Context Protocol*

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📖 Overview

**Amadeus Agent Marketplace** is a decentralized platform for discovering, publishing, and monetizing MCP (Model Context Protocol) servers on the Amadeus blockchain. It allows AI agent developers to list their self-hosted MCP servers and enables users to discover and purchase access using AMA tokens.

### Key Concept

Developers maintain full control over their infrastructure by deploying on our platform or self-hosting MCP agents anywhere, while the marketplace handles discovery, payments, and access management through the Amadeus blockchain.

---

## ✨ Features

### 🔍 For Users
- **Agent Discovery** - Browse marketplace with real-time search and category filtering
- **Wallet Integration** - Connect Amadeus wallet with automatic balance updates
- **Secure Payments** - Purchase agent access using AMA tokens
- **MCP Configuration** - Receive server details for Claude (or any other LLM) Desktop integration
- **Rating System** - View community ratings before purchasing

### 📤 For Developers
- **Easy Publishing** - 3-step agent registration workflow (Agent Info → MCP & Pricing → Additional Info)
- **Flexible Pricing** - Set free or paid access models with custom pricing
- **Self-Hosted** - Full control over infrastructure and deployment
- **File Uploads** - Upload logos and demo videos via Vercel Blob storage
- **Verification** - Agents reviewed by Amadeus DAO before listing

### 🎨 Platform Features
- **Real-time Updates** - Live balance fetching and agent status
- **Responsive Design** - Mobile-first cyberpunk terminal aesthetic
- **Auto-Registration** - Users automatically registered on first wallet connection

---

## 🛠 Technology Stack

### Frontend
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion 12** - Advanced animations and transitions
- **Lucide React** - Beautiful icon library

### Backend & Blockchain
- **Amadeus SDK** (`@amadeus-protocol/sdk ^1.0.2`) - Amadeus Blockchain integration
- **MongoDB + Mongoose** - Database for agent metadata and users
- **Vercel Blob** - File storage for media uploads

### Wallet Integration
- **Amadeus Wallet Extension** - BLS12-381 signature support
- **Balance Tracking** - Real-time AMA balance updates

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (local or cloud instance like MongoDB Atlas)
- Amadeus Wallet Extension
- Vercel Blob account (for file uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Elite-tch/amadeus-agent-marketplace.git
   cd amadeus-agent-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=your_mongodb_connection_string
   
   # Amadeus Network
   NEXT_PUBLIC_DEFAULT_NODE_URL=https://nodes.amadeus.bot/api
   NEXT_PUBLIC_TESTNET_NODE_URL="http://testnet.ama.one/api"

   # Vercel Blob Storage (for file uploads)
   BLOB_READ_WRITE_TOKEN=your_blob_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
amadeus-agent-marketplace/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── agent/          # Agent CRUD operations
│   │   │   ├── route.ts    # List/Create agents
│   │   │   └── upload/     # File upload endpoint
│   │   └── user/           # User registration & retrieval
│   ├── explore/            # Agent marketplace page
│   │   └── page.tsx        # Wrapper for Explore component
│   ├── publish/            # Agent publishing page
│   │   └── page.tsx        # Wrapper for Publish component  
│   ├── docs/               # Documentation page
│   ├── layout.tsx          # Root layout with Navbar
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
│
├── components/              # React components
│   ├── AgentCard.tsx       # Agent display card with pricing
│   ├── ConnectWallet.tsx   # Wallet connection button with balance
│   ├── Explore.tsx         # Main explore page component
│   ├── Navbar.tsx          # Navigation with wallet integration
│   ├── Publish.tsx         # Multi-step publish form
│   └── ui/                 # Reusable UI components
│
├── contexts/               # React contexts
│   └── WalletContext.tsx   # Global Amadeus wallet state
│
├── hooks/                  # Custom React hooks
│   ├── useAmadeus.ts      # Wallet provider detection
│   ├── useBalance.ts      # AMA balance fetching
│   ├── useWallet.ts       # Wallet state consumer
│   └── useUserRegistration.ts  # Auto user registration
│
├── lib/                    # Utilities and configurations
│   ├── models/            # MongoDB schemas
│   │   ├── Agent.ts       # Agent model with MCP config
│   │   └── User.ts        # User model
│   ├── connectDb.ts       # Database connection utility
│   └── validation.ts      # Form validation logic
│
├── types/                  # TypeScript definitions
│   └── amadeus.d.ts       # Amadeus wallet provider types
│
└── docs/                   # Documentation files
    └──
```

---

## 🌐 Available Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured agents and call-to-action |
| `/explore` | Browse marketplace with search, filters, and skeleton loaders |
| `/publish` | 3-step agent registration form with file uploads |
| `/docs` | Developer documentation and guides |

---

## 🔌 API Endpoints

### User API
```
GET  /api/user?publicKey={address}  - Get user by wallet address
GET  /api/user                      - Get all users
POST /api/user                      - Register new user
     Body: { publicKey, username?, email? }
```

### Agent API
```
GET  /api/agent                     - List all active agents
GET  /api/agent?id={agentId}        - Get specific agent details
POST /api/agent                     - Register new agent (requires wallet)
     Body: {
       name, description, category, mcpConfig,
       pricing, owner, logoUrl?, demoVideoUrl?,
       githubUrl?, websiteUrl?
     }
```

### Upload API
```
POST /api/agent/upload              - Upload agent media files
     FormData: { file, type: 'logo' | 'video' | 'screenshot' }
     Returns: { url: string }
```

---

## 💰 Agent Publishing Workflow

### Step 1: Agent Info
- Agent name and category
- Description (4-line textarea)
- Logo upload (optional, PNG/JPG/SVG, max 2MB)

### Step 2: MCP & Pricing
- MCP Server URL
- Protocol selection (SSE or STDIO)
- Pricing model (Free or Paid)
- Price in AMA tokens (for paid agents)

### Step 3: Additional Info
- Demo video upload (optional, MP4/WebM, max 50MB)
- GitHub repository URL (optional)
- Website URL (optional)

**Validation:** Each step validates fields before allowing progression. Price validation ensures paid agents have valid amounts.

---

## 🗄️ Database Models

### User Model
```typescript
{
  publicKey: string;      // Amadeus wallet address (unique)
  username?: string;
  email?: string;
  createdAt: Date;
}
```

### Agent Model
```typescript
{
  name: string;                    // 3-100 characters
  description: string;             // 10-1000 characters
  category: string;                // trading, analysis, defi, etc.
  tags: string[];                  // Max 10 tags
  
  mcpConfig: {
    serverUrl: string;             // MCP server endpoint
    protocol: 'stdio' | 'sse';
    transport?: 'http' | 'websocket';
  };
  
  pricing: {
    model: 'free' | 'paid';
    amount: number;                // In atomic units (1 AMA = 1e9)
    currency: 'AMA';
  };
  
  owner: string;                   // Wallet address
  logoUrl?: string;
  demoVideoUrl?: string;
  screenshotUrls?: string[];
  githubUrl?: string;
  websiteUrl?: string;
  
  isVerified: boolean;             // DAO verification status
  isActive: boolean;               // Listing status
  
  stats: {
    totalPurchases: number;
    activeSubscribers: number;
    averageRating: number;
    totalReviews: number;
  };
}
```

---

## 🚀 Future Enhancements

- [ ] **On-chain Registry** - Store agent metadata on Amadeus blockchain
- [ ] **Payment Processing** - Implement AMA token payments via smart contracts  
- [ ] **Agent Analytics** - Dashboard for developers to track usage and revenue
- [ ] **Rating System** - Allow users to rate and review agents
- [ ] **Subscription Management** - Recurring payments for ongoing access
- [ ] **Agent Categories** - Expand beyond current 8 categories
- [ ] **Platform Hosting** - Deploy and host agents directly on the platform
- [ ] **Advanced Search** - Semantic search, price filtering, sorting options

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🔗 Links

- [GitHub Repository](https://github.com/Elite-tch/amadeus-agent-marketplace)
- [Amadeus Network](https://ama.one)
- [Amadeus Explorer](https://explorer.ama.one)
- [MCP Documentation](https://modelcontextprotocol.io)

---

