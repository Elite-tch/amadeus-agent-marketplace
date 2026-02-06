---
title: "SDK Guide"
order: 7
---

# Amadeus SDK Integration Guide

This guide covers how to integrate the Amadeus TypeScript SDK to interact with the blockchain, manage wallets, and fetch data.

## Installation

```bash
npm install @amadeus-protocol/sdk
```

## Initialization

Initialize the SDK with your preferred node endpoint.

```typescript
import { AmadeusSDK } from '@amadeus-protocol/sdk'

const sdk = new AmadeusSDK({
  baseUrl: 'https://nodes.amadeus.bot/api', // Mainnet
  timeout: 30000 // 30s timeout
})
```

## Wallet Management

### Fetching Balances

Get the balance of a specific token (e.g., AMA) for a wallet address.

```typescript
// Get AMA token balance
const balance = await sdk.wallet.getBalance(
  '5Kd3N...publicKey',  // Base58 encoded wallet address
  'AMA'                  // Token symbol
)

console.log(balance.balance.float)    // Human-readable (e.g., 10.5)
console.log(balance.balance.atomic)   // Atomic units (e.g., 10500000000)
```

### Generating Keys

```typescript
import { generateKeypair } from '@amadeus-protocol/sdk'

const keypair = generateKeypair()

console.log(keypair.publicKey)   // Base58 public key
console.log(keypair.privateKey)  // Base58 private key (seed)
```

## Transaction Submission

Submit a signed transaction to the network.

```typescript
// txPacked is the signed transaction bytes array from the wallet
const result = await sdk.transaction.submitAndWait(txPacked)

console.log('Transaction Hash:', result.hash)
console.log('Confirmed:', result.confirmed)
```

## Utilities

### Token Conversion

Helper functions to handle atomic units (9 decimals).

```typescript
import { toAtomicAma, fromAtomicAma } from '@amadeus-protocol/sdk'

// Convert to atomic units (for sending)
const atomic = toAtomicAma(10.5)  // 10500000000

// Convert from atomic units (for display)
const float = fromAtomicAma(10500000000) // 10.5
```
