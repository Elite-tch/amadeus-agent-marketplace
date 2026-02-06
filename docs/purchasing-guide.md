---
title: "Purchasing Guide"
order: 4
---

# Purchasing Agents

Learn how to buy and access AI agents on the marketplace.

## Before You Purchase

### Requirements
- ✅ Amadeus Wallet installed and connected
- ✅ Sufficient AMA tokens in your wallet
- ✅ Understanding of the agent's functionality

### Pricing Models

Agents can have different pricing structures:
- **Free** - No payment required, instant access
- **One-Time Purchase** - Pay once, access forever
- **Subscription** (coming soon) - Recurring monthly/yearly fee

## Finding Agents

### Browse by Category

1. Navigate to the **Explore** page
2. Scroll through featured agents
3. Use category filters:
   - Trading & DeFi
   - Data Analysis
   - Development Tools
   - Research & Education
   - Gaming & Entertainment

### Search

Use the search bar to find specific agents by:
- Name
- Description keywords
- Creator

## Viewing Agent Details

Click any agent card to see:
- **Description** - What the agent does
- **MCP Server URL** - Where the agent is hosted
- **Pricing** - Cost in AMA tokens
- **Creator** - Publisher's wallet address
- **Media** - Demo videos, screenshots
- **Links** - GitHub repo, website

## Purchase Flow

### Step 1: Check Your Balance

Before purchasing:
1. Click your wallet address in the navbar
2. Verify you have enough AMA
3. Account for the agent price + small gas fee

### Step 2: Initiate Purchase

1. Click **Get for X AMA** on the agent card
2. A purchase modal will appear
3. Review the transaction details:
   - Agent name
   - Price
   - Creator address
   - Your current balance

### Step 3: Confirm Transaction

1. Click **Confirm Purchase**
2. The Amadeus Wallet popup will appear
3. Review the transaction:
   - **Recipient**: Agent creator's address
   - **Amount**: Price in AMA
   - **Description**: "Purchase {Agent Name}"

### Step 4: Sign Transaction

1. Click **Sign Transaction** in the wallet
2. Wait for the transaction to process (~5-10 seconds)
3. A success notification will appear with:
   - Transaction hash
   - Link to blockchain explorer
   - "View My Agents" button

### Step 5: Access Your Agent

1. Click **View My Agents** or navigate to **My Agents** page
2. Find your newly purchased agent
3. Click **View Details** to see:
   - MCP server URL
   - Access credentials (if applicable)
   - Usage instructions

## Using Purchased Agents

### Accessing MCP Servers

Once purchased, you can connect to the agent's MCP server:

1. Copy the MCP server URL from **My Agents**
2. Use it in your MCP-compatible client:
   - Claude Desktop
   - Custom MCP applications
   - API integrations

### Example Connection

```json
{
  "mcpServers": {
    "purchased-agent": {
      "command": "npx",
      "args": ["-y", "@agent/server"],
      "env": {
        "AGENT_URL": "https://agent.example.com"
      }
    }
  }
}
```

## Ownership & Access

### What You Own

When you purchase an agent:
- ✅ Lifetime access to the MCP server
- ✅ On-chain proof of ownership
- ✅ Listed in "My Agents" collection
- ✅ Access to updates (if creator provides)

### What You Don't Own

- ❌ The agent's source code (unless open source)
- ❌ The right to resell access
- ❌ Exclusive rights (others can purchase too)

## Duplicate Purchase Prevention

The marketplace automatically prevents double purchases:
- If you already own an agent, the button shows **Already Owned**
- You cannot accidentally purchase the same agent twice
- This is enforced both in the UI and database

## Transaction Verification

### Viewing on Blockchain

1. Click the transaction hash in the success notification
2. You'll be taken to [Amadeus Explorer](https://explorer.ama.one)
3. View transaction details:
   - Block height
   - Timestamp
   - From/To addresses
   - Amount transferred
   - Transaction status

### Verifying Ownership

Your ownership is recorded:
- **On-chain**: Transaction hash proves payment
- **Database**: Associates your wallet with the agent
- **My Agents**: Visual confirmation of purchase

## Troubleshooting

### Transaction Failed

**Insufficient Balance**
- Error: "Insufficient funds"
- Solution: Add more AMA to your wallet

**Network Issues**
- Error: "Failed to submit transaction"
- Solution: Wait a moment and retry

**Wallet Not Connected**
- Error: "Please connect wallet"
- Solution: Click "Connect Wallet" in navbar

### Agent Not Appearing

If your purchased agent doesn't appear in "My Agents":
1. Wait 30 seconds for database sync
2. Refresh the page
3. Check your transaction was confirmed on the explorer
4. Contact support with your transaction hash

### Cannot Access MCP Server

- Verify the server URL is correct
- Check if the creator's server is online
- Try accessing after a few minutes
- Contact the agent creator for support

## Refunds

**Important**: All purchases are final and non-refundable.

- Payments are direct peer-to-peer transactions
- Creators receive funds immediately
- No escrow or reversal mechanism exists

**Before purchasing**:
- Review agent descriptions carefully
- Check demo videos if available
- Verify the creator's reputation
- Test with free agents first

## Next Steps

- Learn about [Publishing Your Own Agents](./publishing-guide)
- Explore the [MCP Protocol](./mcp-protocol)
- Check the [FAQ](./faq) for common questions
