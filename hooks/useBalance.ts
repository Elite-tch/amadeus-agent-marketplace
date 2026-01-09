import { useState, useEffect } from 'react';
import { AmadeusSDK } from '@amadeus-protocol/sdk';

const nodeUrl = process.env.DEFAULT_NODE_URL;

interface BalanceResult {
  balance: number | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to fetch AMA token balance for a wallet address
 * Automatically refetches when address changes
 */
export function useBalance(walletAddress: string | null): BalanceResult {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

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
          baseUrl: nodeUrl
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

  return { balance, loading, error, refetch };
}
