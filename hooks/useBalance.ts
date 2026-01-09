import { useState, useEffect } from 'react';
import { AmadeusSDK } from '@amadeus-protocol/sdk';

const nodeUrl = process.env.NEXT_PUBLIC_DEFAULT_NODE_URL;
const testnetNodeUrl = process.env.NEXT_PUBLIC_TESTNET_NODE_URL;

interface BalanceResult {
  balance: number | null;
  loading: boolean;
  error: string | null;
  network: 'testnet' | 'mainnet' | 'unknown';
  refetch: () => void;
}

/**
 * Helper function to determine network
 * @param url string | undefined
 * @returns 'testnet' | 'mainnet' | 'unknown'
 */
const getNetwork = (url: string | undefined): 'testnet' | 'mainnet' | 'unknown' => {
  if (!url) return 'unknown';
  if (url.includes('testnet')) return 'testnet';
  return 'mainnet';
};

/**
 * Hook to fetch AMA token balance for a wallet address
 * Automatically refetches when address changes
 */
export function useBalance(walletAddress: string | null): BalanceResult {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  // Track which URL is actually being used
  const activeUrl = testnetNodeUrl; // Change this to testnetNodeUrl or nodeUrl when needed
  const network = getNetwork(activeUrl);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  useEffect(() => {
    if (!walletAddress) {
      setBalance(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchBalance = async () => {
      setLoading(true);
      setError(null);

      try {
        const sdk = new AmadeusSDK({
          baseUrl: activeUrl
        });

        const result = await sdk.wallet.getBalance(walletAddress, 'AMA');

        if (!cancelled) {
          setBalance(result.balance.float);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch balance');
          setBalance(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchBalance();

    return () => {
      cancelled = true;
    };
  }, [walletAddress, refetchTrigger]);

  return { balance, loading, error, network, refetch };
}
