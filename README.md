# 🤖 Amadeus Agent Marketplace

<div align="center">

**Decentralized MCP Agent Marketplace on Amadeus Blockchain**  
*Discover, purchase, and monetize AI agents powered by the Model Context Protocol*

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📖 Overview

**Amadeus Agent Marketplace** is a decentralized platform for discovering, publishing, and purchasing MCP (Model Context Protocol) Agents on the **Amadeus Blockchain**. Developers can list their self-hosted MCP servers, while users can discover and purchase agent access using AMA tokens with complete on-chain transactions.

This project demonstrates a production-ready marketplace built on Amadeus, featuring real token transfers, ownership tracking, and a complete purchase flow from wallet signing to blockchain confirmation.

---

## 🎯 Concept Deck

### Problem Statement

**The AI Agent Economy is Fragmented**

As AI agents become more sophisticated, developers lack a unified marketplace to:
- **Monetize** their MCP-compatible agents
- **Reach users** who need specialized AI capabilities
- **Prove ownership** and prevent unauthorized usage
- **Receive payments** in a decentralized, trustless manner

Current solutions either:
1. Rely on centralized platforms with high fees
2. Require manual payment coordination
3. Lack proper ownership verification
4. Don't support the emerging MCP standard

### Our Solution

**A Decentralized Marketplace on Amadeus Blockchain**

Amadeus Agent Marketplace provides:
- ✅ **Blockchain-based ownership** - Every purchase recorded on-chain
- ✅ **AMA token payments** - Direct peer-to-peer transactions
- ✅ **MCP standard support** - Works with any MCP-compatible agent
- ✅ **Self-hosted flexibility** - Developers control their infrastructure
- ✅ **Discovery platform** - A discovery platform for decentralized AI Agents

### Use Cases

**For AI Agent Developers:**
1. **Trading Bot Creator** - List a DeFi trading agent, charge 50 AMA/month or more
2. **Data Analysis Provider** - Offer specialized market analysis MCP server
3. **Research Assistant Developer** - Monetize academic research agent
4. **Custom Tool Builder** - Sell niche automation agents

**For Users:**
1. **Crypto Trader** - Purchase whale tracking agent for portfolio management
2. **Developer** - Buy code analysis agent for project auditing
3. **Researcher** - Access specialized data aggregation agents
4. **Business Analyst** - Use market intelligence agents

### Key Metrics

- **100% On-Chain** - All purchases are verified on **Amadeus blockchain**
- **Zero Platform Lock-in** - Agents self-hosted by developers
- **Sub-second Transactions** - Fast purchase confirmations
- **Atomic Ownership** - Duplicate purchase prevention via database constraints

---

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Explore │  │  Publish │  │ My Agents│  │   Docs   │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER (Next.js)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ WalletContext│  │  usePurchase │  │  useBalance  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└──────┬────────────────────┬────────────────────┬────────────────┘
       │                    │                    │
       ↓                    ↓                    ↓
┌─────────────┐    ┌──────────────────┐    ┌────────────────┐
│   Amadeus   │    │   API Routes     │    │   MongoDB      │
│   Wallet    │    │  (Serverless)    │    │   Database     │
│  Extension  │    └────────┬─────────┘    └────────┬───────┘
└──────┬──────┘             │                       │
       │                    │                       │
       │  ┌─────────────────┼───────────────────────┤
       │  │                 │                       │
       ↓  ↓                 ↓                       ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BLOCKCHAIN LAYER                             │
│                                                                 │
│  ┌─────────────────┐         ┌─────────────────┐              │
│  │ Amadeus Network │ ←─────→ │  Amadeus SDK    │              │
│  │  (Testnet/Main) │         │ TransactionBuilder              │
│  └─────────────────┘         └─────────────────┘              │
│                                                                 │
│  • Coin.transfer contract                                      │
│  • BLS12-381 signatures                                        │
│  • Transaction submission                                      │
└─────────────────────────────────────────────────────────────────┘
```

### Purchase Flow

```
User clicks "Get for X AMA"
    ↓
Backend builds transaction → { contract: 'Coin', method: 'transfer', args }
    ↓
Wallet signs transaction → { txHash, txPacked }
    ↓
Submit to Amadeus blockchain
    ↓
Record ownership in database
    ↓
Display success notification
```

## Features

### For Users
- **Agent Discovery** - Browse marketplace with real-time search and category filtering
- **Wallet Integration** - Connect **Amadeus wallet** with automatic balance tracking
- **Secure Purchases** - Complete on-chain payment flow:
  1. Build transaction with proper binary encoding
  2. Sign transaction with wallet extension
  3. Submit signed transaction to blockchain
  4. Record ownership in database after confirmation
- **Ownership Management** - View all purchased agents in "My Agents" collection
- **Purchase Notifications** - Success/error modals with transaction hashes
- **Explorer Links** - Direct links to view transactions on Amadeus Explorer
- **Owned Agent Display** - Agents you own show "Already Owned" status

### For Developers
- **Easy Publishing** - 3-step agent registration workflow:
  1. Agent Info (name, category, description, logo)
  2. MCP & Pricing (server URL, protocol, pricing model)
  3. Additional Info (demo video, GitHub, website)
- **Flexible Pricing** - Set free or paid access with custom AMA token pricing
- **Self-Hosted Infrastructure** - Full control over agent deployment
- **File Uploads** - Media storage uploads (logos, videos, screenshots)
- **Success Confirmation** - Styled modal with agent registration confirmation
- **DAO Review** - Optional review process before marketplace listing

### Platform Features
- **Real-time Balance Updates** - Live AMA token balance in wallet dropdown
- **Responsive Cyberpunk UI** - Terminal-inspired design with smooth animations
- **Auto-Registration** - Users created automatically on first wallet connection  
- **Skeleton Loaders** - Professional loading states during data fetching
- **Mobile-First Design** - Fully responsive across all devices
- **Transaction History** - View purchase details with transaction hashes
- **Ownership Filtering** - Agents marked as owned across all marketplace views

---

## How Amadeus Is Used

### Integration Points

#### 1. **AMA Token Payments**
**Contract**: `Coin.transfer`

```typescript
const transaction = {
  contract: 'Coin',
  method: 'transfer',
  args: [recipient, amount, 'AMA'],
  description: `Transfer ${displayAmount} AMA for agent purchase`
};
```

- **Purpose**: Peer-to-peer payments for agent purchases
- **Implementation**: Direct token transfers from buyer to agent creator
- **Verification**: Transaction hash stored with ownership record

#### 2. **Wallet Integration & Identity** 
**Technology**: BLS12-381 signatures via Amadeus Wallet Extension

- **Agent Identity**: Each creator identified by wallet address
- **User Identity**: Buyers authenticated via wallet connection
- **Signature Verification**: All transactions signed with BLS12-381
- **automatic Registration**: Users auto-created on first connection

```typescript
const signResult = await wallet.provider.signTransaction(transaction);
// Returns: { txHash, txPacked, signature }
```

#### 3. **Transaction Building & Submission** ✅ Implemented
**SDK**: `@amadeus-protocol/sdk`
Uses the Amadeus SDK to build and submit transactions on the blockchain.

```typescript
// Building transactions
const builder = new TransactionBuilder();
const transaction = builder.buildTransfer({
  recipient, amount, symbol: 'AMA'
});

// Submitting to network
const sdk = new AmadeusSDK({ baseUrl: nodeUrl });
const result = await sdk.transaction.submit(txPacked);
```

#### 4. **Balance Tracking** 
**SDK Method**: `sdk.wallet.getBalance()`

```typescript
const result = await sdk.wallet.getBalance(walletAddress, 'AMA');
const balance = result.balance.float; // Human-readable format
```

- Real-time balance display in wallet dropdown
- Pre-purchase balance validation
- Support for atomic units (1 AMA = 1e9)

### Future  Features on Amadeus Blockchain

#### **uPoW (Useful Proof of Work)**
- Agent creators could stake uPoW for verification
- Reputation system based on uPoW contribution
- Priority listing for high-uPoW agents

#### **WASM Runtime**
- Host lightweight agent logic on-chain
- Verifiable computation for agent operations
- Smart contract-based access control

#### **State Proofs**
- Cryptographic proof of ownership  
- Verify agent access without database queries
- Cross-chain ownership verification

#### **Oracle Streams**
- Real-time agent usage metrics
- Performance monitoring on-chain
- Automated revenue distribution

#### **Swarm Coordination**
- Multi-agent collaboration marketplace
- Coordinated task execution
- Agent-to-agent payments

---

## Current Revenue Model

**Marketplace Commission (Future)**
- 2.5% platform fee on paid agent sales
- Fee deducted automatically from transfers
- Funds platform development and hosting

### Example Economics

**Agent Creator**:
- Lists agent at 100 AMA
- Receives 97.5 AMA per sale (after 2.5% fee)
- 100 sales = 9,750 AMA revenue

**Platform**:
- 2.5 AMA per 100 AMA purchase
- 100,000 total sales = 250,000 AMA platform revenue
- Funds development, infrastructure, DAO operations

### Additional Revenue Streams

1. **Premium Listings** (10 AMA/month)
   - Featured placement on homepage
   - Verified badge
   - Analytics dashboard

2. **Platform-Hosted Agents** (20% revenue share)
   - Managed infrastructure
   - Auto-scaling
   - Monitoring included

3. **Developer Subscription** (50 AMA/month)
   - Unlimited agent listings
   - Advanced analytics
   - Priority support

4. **Enterprise Solutions**
   - Private marketplaces
   - Custom integrations
   - White-label options

### Sustainability Model

- **Bootstrap Phase**: Free marketplace, no fees
- **Growth Phase**: Introduce small platform fee (1-2.5%)
- **Mature Phase**: DAO governance determines fee structure
- **Long-term**: Transition to community-owned protocol

---

## Key Architectural Decisions

#### ✅ **Hybrid Storage (Off-chain + On-chain)**

**Decision**: Store agent metadata in MongoDB, record ownership on blockchain for 
- Fast agent discovery and search
- Rich filtering and sorting capabilities
- Lower costs than full on-chain storage
- Transaction hashes provide blockchain proof

---

#### ✅ **Self-Hosted Agents**

**Decision**: Developers host their own MCP servers
- No platform infrastructure costs
- Developers control scaling
- Flexible deployment options
- Lower barrier to entry


---

#### ✅ **Direct P2P Payments**

**Decision**: Payments go directly from buyer to creator

- No escrow complexity
- Immediate creator payouts
- Trustless transactions
- Lower fees
---

### Technical Challenges Overcome

1. **✅ Binary Encoding** - Amadeus transactions require binary-encoded arguments
   - **Solution**: Use SDK's TransactionBuilder with proper string conversion
   
2. **✅ Wallet Integration** - Browser extension communication
   - **Solution**: Amadeus provider detection with event listeners
   
3. **✅ Atomic Units** - AMA uses 9 decimal places
   - **Solution**: Consistent conversion (1 AMA = 1e9 atomic units)
   
4. **✅ Transaction Submission** - Multi-step process
   - **Solution**: Separate build, sign, and submit API endpoints
---



## 🛠 Technology Stack

### Frontend
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling with custom cyberpunk theme
- **Framer Motion 12** - Advanced animations and page transitions
- **Lucide React** - Comprehensive icon library

### Backend & Blockchain
- **Amadeus SDK** (`@amadeus-protocol/sdk ^1.0.2`) 
  - Complete blockchain integration
  - Transaction building with `TransactionBuilder`
  - Wallet balance fetching
  - Transaction submission to nodes
- **MongoDB + Mongoose** - Database for agents, users, and ownership
- **Vercel Blob** - Scalable file storage for media uploads
- **Next.js API Routes** - Serverless API endpoints

### Wallet & Payments
- **Amadeus Wallet Extension** - BLS12-381 signature support
- **On-Chain Transactions** - Real AMA token transfers via `Coin.transfer`
- **Balance Tracking** - Real-time balance updates in atomic units
- **Transaction Verification** - Ownership recorded with transaction hashes

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+**
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Amadeus Wallet Extension** - [Install from Chrome Web Store](https://chromewebstore.google.com/detail/amadeus-wallet/gigmkdnbhopbandngplohmilogilbkjn)
- **Vercel Blob Account** - For file uploads (optional for testing)

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
   NEXT_PUBLIC_TESTNET_NODE_URL=http://testnet.ama.one/api

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
│   │   ├── build-transaction/  # Build unsigned transaction for wallet signing
│   │   ├── submit-transaction/ # Submit signed transaction to blockchain
│   │   ├── purchase/       # Record agent purchase with ownership
│   │   ├── my-agents/      # Fetch user's owned agents
│   │   └── user/           # User registration & retrieval
│   ├── explore/            # Agent marketplace page
│   ├── publish/            # Agent publishing page
│   ├── my-agents/          # User's purchased agents collection
│   ├── docs/               # Documentation
│   ├── layout.tsx          # Root layout with Navbar
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles

├── components/              # React components
│   ├── AgentCard.tsx       # Agent card with purchase integration
│   ├── PurchaseModal.tsx   # Agent purchase flow modal
│   ├── PurchaseNotification.tsx  # Success/error notifications
│   ├── OwnedAgentCard.tsx  # Card for owned agents
│   ├── MyAgentsPage.tsx    # Purchased agents collection view
│   ├── ConnectWallet.tsx   # Wallet connection with balance dropdown
│   ├── Explore.tsx         # Marketplace with search & filters
│   ├── Navbar.tsx          # Navigation with wallet integration
│   ├── Publish.tsx         # Multi-step publish form
│   └── ui/                 # Reusable UI components

├── contexts/               # React contexts
│   └── WalletContext.tsx   # Global Amadeus wallet state

├── hooks/                  # Custom React hooks
│   ├── useAmadeus.ts      # Wallet provider detection & connection
│   ├── useBalance.ts      # AMA balance fetching
│   ├── useWallet.ts       # Wallet state consumer hook
│   ├── usePurchase.ts     # Complete purchase flow orchestration
│   ├── useMyAgents.ts     # Fetch user's owned agents
│   └── useUserRegistration.ts  # Auto user registration

├── lib/                    # Utilities and configurations
│   ├── models/            # MongoDB schemas
│   │   ├── Agent.ts       # Agent model with MCP config
│   │   ├── User.ts        # User model
│   │   └── UserOwnedAgent.ts  # Agent ownership records
│   ├── connectDb.ts       # Database connection utility
│   └── validation.ts      # Form validation logic

├── types/                  # TypeScript definitions
│   └── amadeus.d.ts       # Amadeus wallet provider types

```

---

## 🧪 Testing the Purchase Flow

1. **Connect Wallet** - Install Amadeus Wallet Extension and connect
2. **Fund Wallet** - Get testnet AMA tokens
3. **Browse Agents** - Navigate to `/explore`
4. **Purchase Agent** - Click "Get for X AMA" on a paid agent
5. **Approve Transaction** - Confirm in wallet popup
6. **View Collection** - Go to `/my-agents` to see your purchased agent
7. **Check Explorer** - Click transaction hash to view on blockchain

---

## 🔒 Security Features

- **Duplicate Purchase Prevention** - Database constraint on userId + agentId
- **Balance Validation** - Frontend checks before allowing purchase
- **Transaction Verification** - Only records purchases with valid transaction hashes
- **Wallet-Only Actions** - Purchase and publish require connected wallet
- **Atomic Units** - All amounts handled in atomic units (1 AMA = 1e9)
- **MongoDB Indexes** - Optimized queries for userId and agentId lookups

---

## 🚀 Future Enhancements


- [ ] **Subscription Management** - Recurring payments for ongoing access
- [ ] **Rating System** - Fully functional user reviews and ratings
- [ ] **Agent Analytics** - Dashboard for developers to track revenue
- [ ] **Advanced Search** - Semantic search, price filtering, sorting
- [ ] **Platform Hosting** - Deploy and host agents on platform infrastructure
- [ ] **Marketplace Fees** - Optional commission system for platform sustainability

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

### Project & Platform
- [GitHub Repository](https://github.com/Elite-tch/amadeus-agent-marketplace)
- [Amadeus Network](https://ama.one)
- [Amadeus Explorer](https://explorer.ama.one)
- [Amadeus Wallet Extension](https://chromewebstore.google.com/detail/amadeus-wallet/gigmkdnbhopbandngplohmilogilbkjn)

### Developer Resources
- [MCP Documentation](https://modelcontextprotocol.io)
- [Amadeus SDK](https://github.com/amadeusprotocol/amadeus-typescript-sdk)
- [Amadeus SDK - Transaction Building](https://docs.ama.one/sdk/4.-transaction-building)
- [Amadeus Wallet Extension React Demo](https://github.com/amadeusprotocol/amadeus-wallet-extension-react-demo)

---
