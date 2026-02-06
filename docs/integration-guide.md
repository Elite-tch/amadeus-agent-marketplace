---
title: "Integration Guide"
order: 8
---

# Integration Patterns

This guide details how to integrate Amadeus Wallet connections into your React application using the **Amadeus Wallet Extension**.

## Core Concepts

The integration relies on the `window.amadeus` provider injected by the browser extension.

### Provider Interface

The provider exposes methods to connect, get accounts, and sign transactions.

```typescript
interface AmadeusProvider {
  isAmadeus: boolean;
  isConnected(): Promise<boolean>;
  getAccount(): Promise<string | null>;
  requestAccounts(): Promise<string[]>;
  signTransaction(params: SignParams): Promise<SignResult>;
  on(event: string, callback: any): void;
}
```

## Setup via Hooks

We recommend creating a custom hook to manage the provider state.

### `useAmadeus` Hook

```typescript
import { useState, useEffect } from 'react'

export function useAmadeus() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  useEffect(() => {
    // Check if provider is already injected
    if (window.amadeus) {
      setProvider(window.amadeus)
    }

    // Listen for injection event
    const onReady = () => setProvider(window.amadeus)
    window.addEventListener('amadeus#initialized', onReady)
    
    return () => window.removeEventListener('amadeus#initialized', onReady)
  }, [])

  const connect = async () => {
    if (!provider) return
    const accounts = await provider.requestAccounts()
    setAccount(accounts[0])
  }

  return { provider, account, connect }
}
```

## Signing Transactions

Transactions are built by your application but **must be signed by the user's wallet**.

1.  **Construct Transaction**: Define contract, method, and arguments.
2.  **Request Signature**: Call `provider.signTransaction`.
3.  **Broadcast**: Send the signed payload to an Amadeus node.

### Example: Transfer AMA

```typescript
const handleTransfer = async () => {
  if (!provider) return

  // 1. Request Signature
  const result = await provider.signTransaction({
    contract: 'Coin',
    method: 'transfer',
    args: [
      'Recipient_Address_Base58',
      '1000000000', // 1 AMA in atomic units
      'AMA'
    ],
    description: 'Transfer 1 AMA to Bob'
  })

  // 2. Broadcast (using your API or SDK)
  await fetch('/api/submit-transaction', {
    method: 'POST',
    body: JSON.stringify({ txPacked: result.txPacked })
  })
}
```
