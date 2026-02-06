---
title: "MCP Protocol"
order: 6
---

# Model Context Protocol (MCP)

Understanding the protocol that powers marketplace agents.

## What is MCP?

The **Model Context Protocol** is an open standard for connecting AI assistants to external data sources and tools. It enables AI agents to:
- Access live data
- Execute actions in external systems
- Maintain context across sessions
- Provide specialized capabilities

Think of MCP as a **universal plugin system for AI**.

## How MCP Works

### Client-Server Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   MCP Client    │ ◄─────► │   MCP Server    │
│ (Claude, Apps)  │   MCP   │  (Your Agent)   │
└─────────────────┘         └─────────────────┘
```

**MCP Client**:
- AI assistant (e.g., Claude Desktop)
- Sends requests to the server
- Receives structured responses

**MCP Server**:
- Your AI agent
- Exposes tools and resources
- Processes requests and returns data

## MCP Capabilities

### 1. Tools (Functions)

Agents can expose executable functions:

```typescript
{
  "tools": [
    {
      "name": "get_whale_transactions",
      "description": "Fetch large crypto transactions",
      "parameters": {
        "min_amount": "number",
        "chain": "string"
      }
    }
  ]
}
```

**Examples**:
- Fetch stock prices
- Execute database queries
- Send notifications
- Analyze data

### 2. Resources (Data)

Provide access to dynamic content:

```typescript
{
  "resources": [
    {
      "uri": "whale://transactions/latest",
      "name": "Latest Whale Movements",
      "mimeType": "application/json"
    }
  ]
}
```

**Examples**:
- Real-time market data
- Research papers
- Code repositories
- Database records

### 3. Prompts (Templates)

Pre-built conversation starters:

```typescript
{
  "prompts": [
    {
      "name": "analyze_wallet",
      "description": "Analyze a crypto wallet's activity",
      "arguments": ["wallet_address"]
    }
  ]
}
```

## Transport Protocols

MCP supports two transport methods:

### Server-Sent Events (SSE)

**Best for**: Web-hosted agents

```typescript
// Server endpoint
const server = new Server({
  name: "my-agent",
  version: "1.0.0"
});

app.post('/mcp', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  
  // Handle MCP requests
  server.connect(req, res);
});
```

**Characteristics**:
- HTTP-based
- Works over the web
- Easy to deploy
- Firewall-friendly

### Standard I/O (stdio)

**Best for**: Local CLI tools

```typescript
const server = new Server({
  name: "my-local-agent",
  version: "1.0.0"
});

// Connect via stdin/stdout
server.connect(process.stdin, process.stdout);
```

**Characteristics**:
- Process-to-process
- No network required
- Higher performance
- Local execution

## Building an MCP Agent

### Minimal Example

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Define your agent
const server = new Server(
  {
    name: 'example-agent',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register a tool
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'get_data',
        description: 'Fetch some data',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string' }
          }
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'get_data') {
    const data = await fetchData(request.params.arguments.query);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(data)
        }
      ]
    };
  }
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Using MCP Agents

### In Claude Desktop

Add to your Claude configuration:

```json
{
  "mcpServers": {
    "whale-tracker": {
      "command": "node",
      "args": ["/path/to/whale-tracker/server.js"]
    }
  }
}
```

### In Custom Applications

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

const client = new Client({
  name: 'my-app',
  version: '1.0.0'
});

// Connect to MCP server
await client.connect(serverUrl);

// List available tools
const tools = await client.request({ method: 'tools/list' });

// Call a tool
const result = await client.request({
  method: 'tools/call',
  params: {
    name: 'get_whale_transactions',
    arguments: { min_amount: 100000 }
  }
});
```

## MCP vs API

| Feature | Traditional API | MCP |
|---------|----------------|-----|
| **Discovery** | Manual docs | Auto-discovery |
| **Context** | Stateless | Maintains context |
| **Integration** | Custom per API | Standardized |
| **AI-Native** | No | Yes |
| **Flexibility** | Fixed endpoints | Dynamic tools |

## Best Practices

### For Agent Developers

**Tool Design**:
- Keep tools focused on single tasks
- Provide clear descriptions
- Use JSON Schema for parameters
- Return structured data

**Error Handling**:
- Return descriptive error messages
- Use appropriate HTTP status codes
- Log errors for debugging

**Performance**:
- Optimize slow operations
- Cache when possible
- Set reasonable timeouts
- Handle rate limiting

### For Users

**Security**:
- Only connect to trusted agents
- Review tool permissions
- Monitor agent actions
- Revoke access if suspicious

**Usage**:
- Read agent documentation  
- Understand tool capabilities
- Provide valid parameters
- Handle errors gracefully

## Example Use Cases

### Trading Agent

Tools offered:
- `get_market_data` - Real-time prices
- `analyze_indicators` - Technical analysis
- `get_whale_alerts` - Large transactions

### Research Agent

Resources provided:
- Latest papers from arXiv
- Summarized research findings
- Citation graphs

### Development Agent

Tools offered:
- `analyze_code` - Code quality checks
- `find_bugs` - Static analysis
- `generate_tests` - Test generation

## Further Reading

- [Official MCP Specification](https://modelcontextprotocol.io)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)
- [Building MCP Servers](https://modelcontextprotocol.io/docs/building-servers)
- [MCP Client Integration](https://modelcontextprotocol.io/docs/clients)

## Next Steps

- Learn how to [Publish Your Agent](./publishing-guide)
- Explore [Integration Patterns](./integration-guide)
- Check the [SDK Guide](./sdk-guide) for blockchain integration
