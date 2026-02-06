---
title: "Publishing Guide"
order: 5
---

# Publishing Your Agent

Learn how to list your AI agent on the marketplace and start monetizing.

## Prerequisites

Before publishing, ensure you have:
- ✅ A working MCP (Model Context Protocol) server
- ✅ At least **1 AMA** for the publishing fee
- ✅ Amadeus Wallet connected
- ✅ Agent logo image (PNG/JPG, recommended 512x512px)
- ✅ Agent description and documentation

## Publishing Fee

All agent submissions require a **1 AMA publishing fee**.

**Why the fee?**
- Prevents spam and low-quality submissions
- Supports platform maintenance
- Ensures creator commitment

**Payment Process**:
1. You'll be prompted to pay when submitting
2. Transaction is signed through your wallet
3. Agent is published after payment confirmation

## Publishing Workflow

### Step 1: Navigate to Publish Page

1. Click **Publish** in the navbar
2. Ensure your wallet is connected
3. Verify you have at least 1 AMA

### Step 2: Agent Information

Fill in the basic details:

**Agent Name** (required)
- Keep it concise and descriptive
- Example: "Whale Tracker Pro"

**Category** (required)
- Select from available categories:
  - Trading & DeFi
  - Data Analysis
  - Development Tools
  - Research & Education
  - Gaming & Entertainment
  - Other

**Description** (required)
- Explain what your agent does
- Highlight key features
- Mention use cases
- Minimum 50 characters recommended

**Logo Upload** (required)
- PNG or JPG format
- Recommended size: 512x512px
- Clear, professional design

### Step 3: MCP Configuration & Pricing

**MCP Server URL** (required)
- The endpoint where your agent is hosted
- Must be publicly accessible
- Example: `https://my-agent.example.com/mcp`
- Supports both HTTP and HTTPS

**Protocol** (required)
- Select `SSE` (Server-Sent Events) or `stdio`
- Most web-hosted agents use SSE

**Pricing Model** (required)

Choose one of:
- **Free** - No charge for users
- **Paid** - Set a price in AMA tokens

**Price** (if Paid)
- Enter amount in AMA
- Minimum: 0.1 AMA
- Examples: 5 AMA, 10 AMA, 50 AMA

### Step 4: Additional Information

**Demo Video** (optional but recommended)
- Upload a video showing your agent in action
- MP4 format
- Max 50 MB
- 30-90 seconds recommended

**Screenshots** (optional)
- Upload up to 5 screenshots
- Show different features/use cases
- PNG or JPG format

**GitHub URL** (optional)
- Link to your agent's repository
- Helps build trust
- Users can view source code

**Website URL** (optional)
- Link to documentation or landing page
- Provide setup instructions

### Step 5: Review & Submit

1. Review all information carefully
2. Click **Pay 1 AMA & Submit**
3. A transaction modal will appear
4. Confirm the 1 AMA payment in your wallet
5. Wait for transaction confirmation
6. Success modal appears with agent details

## After Publishing

### Agent Review (Optional)

Some agents may undergo review:
- Verification of MCP server functionality
- Content moderation
- Quality check

Most agents are listed immediately after payment.

### Agent Appears in Marketplace

Once published:
- Your agent appears in the **Explore** page
- Users can search and discover it
- Your wallet address is shown as the creator
- Purchase transactions go directly to your wallet

### Receiving Payments

When someone purchases your agent:
1. Payment is sent directly to your wallet
2. No escrow or platform holding
3. You receive funds immediately
4. Transaction is recorded on-chain

## Updating Your Agent

Currently, agent updates are not supported through the UI. 

**To update**:
- Publish a new version with a different name
- Or contact platform support for assistance

## Best Practices

### Naming
- Be specific and descriptive
- Avoid generic names
- Include the main function (e.g., "DeFi Yield Tracker")

### Description
- Start with what problem it solves
- List 3-5 key features
- Mention required inputs/outputs
- Include example use cases

### Pricing Strategy
- Research similar agents
- Consider your target audience
- Free agents get more downloads
- Paid agents can monetize expertise

**Suggested Pricing**:
- Simple tools: **Free** or 1-5 AMA
- Specialized agents: **10-50 AMA**
- Advanced/premium: **50-200 AMA**

### MCP Server Hosting

**Self-Hosting Requirements**:
- 99%+ uptime
- HTTPS endpoint (recommended)
- Handle concurrent requests
- Monitor for errors

**Hosting Options**:
- **Vercel** - Free tier available
- **Render** - Simple deployment
- **Railway** - Easy scaling
- **Your own VPS** - Full control

### Demo Video Tips

- Show the agent solving a real problem
- Keep it under 60 seconds
- Add text overlays for key features
- Use screen recording tools (OBS, Loom)

## Monetization Examples

### Free Agent Strategy

**Goals**:
- Build reputation
- Gather users
- Get feedback

**Upsell Later**:
- Offer premium version
- Add paid features
- Charge for support

### Paid Agent Strategy

**Pricing Examples**:
- Research assistant: 10 AMA
- Trading bot: 50 AMA
- Data analysis tool: 25 AMA
- Code auditor: 30 AMA

**Value Justification**:
- Saves users time
- Provides unique data
- Automates complex tasks
- Offers specialized knowledge

## Troubleshooting

### Publishing Fee Transaction Failed

**Insufficient Balance**
- Ensure you have at least 1 AMA
- Account for small gas fees
- Top up your wallet

**Wallet Not Connected**
- Click "Connect Wallet"
- Refresh and try again

### Upload Failures

**File Too Large**
- Compress images/videos
- Use online compression tools
- Stay under 50 MB for videos

**Invalid Format**
- Use PNG/JPG for images
- Use MP4 for videos

### MCP Server Issues

**URL Not Accessible**
- Test URL in browser first
- Check firewall settings
- Ensure CORS is configured
- Verify SSL certificate

## Example Agent Listing

Here's a well-structured agent:

**Name**: "Whale Alert Tracker"

**Category**: Trading & DeFi

**Description**:
"Real-time whale movement detection for Ethereum and BSC. Tracks large transactions (>$100k) across major DEXs and CEXs. Get instant alerts, historical analysis, and wallet clustering. Perfect for traders who want to follow smart money."

**Pricing**: 15 AMA (one-time)

**MCP URL**: `https://whale-tracker.example.com/mcp`

**Demo Video**: 45-second screen recording showing alerts

**Screenshots**: Dashboard, alerts panel, whale wallet view

## Next Steps

- Read the [MCP Protocol Guide](./mcp-protocol) to learn more
- Check the [FAQ](./faq) for common questions
- Join our Discord for publisher support
