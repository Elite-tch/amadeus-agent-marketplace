---
title: "FAQ"
order: 9
---

# Frequently Asked Questions

Common questions about the Amadeus Agent Marketplace.

## General

### What is the Amadeus Agent Marketplace?

A decentralized platform for discovering, purchasing, and publishing AI agents that use the Model Context Protocol (MCP). All transactions are recorded on the Amadeus blockchain using AMA tokens.

### What are MCP agents?

MCP (Model Context Protocol) agents are AI tools that can be integrated with AI assistants like Claude. They provide specialized capabilities like data analysis, trading signals, research assistance, and more.

### Do I need cryptocurrency experience?

Basic familiarity helps, but isn't required. You'll need to:
- Install the Amadeus Wallet extension
- Obtain AMA tokens
- Connect your wallet to the marketplace

Follow our [Quick Start Guide](./quickstart) for step-by-step instructions.

## Wallet & Payments

### How do I get AMA tokens?

**For Testnet** (practice):
- Use the Amadeus Faucet to get free tokens
- Request directly to your wallet address

**For Mainnet** (real money):
- Purchase from supported exchanges
- Send to your Amadeus wallet address

See the [Wallet Guide](./wallet-guide) for details.

### What if I lose my wallet/seed phrase?

**Without your seed phrase, funds are permanently lost.** There is no recovery mechanism. Always:
- Store your seed phrase offline
- Keep multiple secure backups
- Never share it with anyone

### Are there transaction fees?

Yes, two types of fees exist:

**Publishing Fee**: 1 AMA per agent submission (one-time)

**Network Gas Fees**: Small fee for blockchain transactions (typically < 0.01 AMA)

### Can I get a refund?

**No.** All purchases are final because:
- Payments go directly to creators (peer-to-peer)
- No escrow or intermediary
- Blockchain transactions are irreversible

Always review agents carefully before purchasing.

## Purchasing Agents

### How do I know if an agent is good?

Check these indicators:
- **Description** - Clear explanation of capabilities
- **Demo Video** - Shows the agent in action
- **Creator** - Established wallet address
- **Documentation** - GitHub/website links
- **Price** - Reasonable for the functionality

### Can I purchase the same agent twice?

No. The marketplace prevents duplicate purchases automatically. If you already own an agent, the button shows **Already Owned**.

### What do I get when I purchase?

- **Access** to the MCP server URL
- **On-chain proof** of ownership
- **Listing** in your "My Agents" collection
- **Updates** (if the creator provides them)

You do NOT own the source code unless explicitly stated.

### How do I use a purchased agent?

1. Go to **My Agents**
2. Find your purchased agent
3. Copy the MCP server URL
4. Add it to your MCP client (like Claude Desktop)

See the [Purchasing Guide](./purchasing-guide) for detailed instructions.

### What if the agent stops working?

Contact the agent creator directly:
- Check their GitHub repository
- Visit their website
- Message via their linked contact methods

The marketplace does not provide technical support for individual agents.

## Publishing Agents

### How much does it cost to publish?

**1 AMA** one-time publishing fee. This prevents spam and ensures quality submissions.

### Can I publish for free?

No, the 1 AMA fee is mandatory for all submissions. However, you can choose to offer your agent for **free** to users after it's published.

### How do I set my agent's price?

During publishing, choose:
- **Free** - No charge for users
- **Paid** - Set any price in AMA tokens (minimum 0.1 AMA)

### How do I receive payments?

Payments go directly to your wallet address automatically when someone purchases your agent. There's:
- No escrow delay
- No platform withdrawal process
- Instant settlement

### Can I update my published agent?

Currently, updates aren't supported through the UI. Options:
- Publish a new version with a different name
- Update your MCP server and keep the same URL
- Contact support for manual updates

### What if my MCP server goes down?

You're responsible for:
- Hosting uptime
- Server maintenance  
- User support

Consider using reliable hosting services like Vercel, Render, or Railway.

### Can I delete my agent?

Not currently supported. Once published and the fee is paid, the agent listing remains on the marketplace.

## Technical

### What is the Model Context Protocol?

MCP is an open standard that allows AI assistants to connect to external tools and data sources. It's like a universal plugin system for AI. Learn more in our [MCP Protocol Guide](./mcp-protocol).

### Do I need to know blockchain development?

Not for using the marketplace as a buyer. 

For publishers:
- Basic knowledge helps
- No smart contract coding required
- Just host a standard MCP server
- Handle AMA payments through the marketplace automatically

### What blockchain is this on?

The **Amadeus Network**, a high-performance blockchain designed for AI applications. It supports:
- BLS12-381 signatures
- Low transaction fees  
- Fast confirmation times
- Native AMA token

### Where can I view transactions?

Visit the [Amadeus Explorer](https://explorer.ama.one) to view:
- Transaction history
- Block details
- Wallet balances
- Network statistics

## Troubleshooting

### Wallet won't connect

Try these steps:
1. Refresh the page
2. Ensure the extension is installed and enabled
3. Check you're using a supported browser (Chrome, Edge, Brave)
4. Clear browser cache and retry

### Transaction is stuck

Usually resolves within 30 seconds. If not:
1. Check balance is sufficient
2. View transaction on the explorer
3. Wait 2-3 minutes for network confirmation
4. Try again if it failed

### Agent not appearing in "My Agents"

Wait 30 seconds for database sync, then:
1. Refresh the page
2. Verify transaction succeeded on explorer
3. Check the correct wallet is connected
4. Contact support with transaction hash

## Platform

### Is the platform open source?

Check our [GitHub repository](https://github.com/Elite-tch/amadeus-agent-marketplace) for the codebase.

### How does the marketplace make money?

Currently, the marketplace takes no commission. Revenue comes from:
- Publishing fees (1 AMA per agent)

Future monetization may include:
- Small platform fee on sales (e.g., 2.5%)
- Premium listings
- Hosted agent services

### Who reviews published agents?

Currently, agents are listed immediately after payment. Future plans include:
- Optional verification badges
- Community ratings
- Quality thresholds

### Can I report a malicious agent?

Yes, contact us via:
- Discord community
- GitHub issues
- Email support

Include:
- Agent name
- Issue description
- Evidence (screenshots, transaction hashes)

## Still Have Questions?

- Join our [Discord Community](#)
- Read the [Documentation](/)
- Check the [GitHub Repository](https://github.com/Elite-tch/amadeus-agent-marketplace)
- Contact support
