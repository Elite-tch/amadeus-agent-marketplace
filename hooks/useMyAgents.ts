import { useState, useEffect, useCallback } from 'react';
import { Agent } from '@/components/AgentCard';

interface PurchaseInfo {
  _id: string;
  purchaseDate: string;
  purchasePrice: number;
  transactionHash?: string;
}

interface OwnedAgent {
  purchase: PurchaseInfo;
  agent: Agent;
}

interface UseMyAgentsResult {
  ownedAgents: OwnedAgent[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMyAgents(userAddress: string | null): UseMyAgentsResult {
  const [ownedAgents, setOwnedAgents] = useState<OwnedAgent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOwnedAgents = useCallback(async () => {
    if (!userAddress) {
      setOwnedAgents([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/my-agents?userAddress=${encodeURIComponent(userAddress)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch owned agents');
      }

      setOwnedAgents(data.data || []);
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to load owned agents';
      setError(errorMsg);
      console.error('Error fetching owned agents:', err);
    } finally {
      setIsLoading(false);
    }
  }, [userAddress]);

  useEffect(() => {
    void fetchOwnedAgents();
  }, [fetchOwnedAgents]);

  return {
    ownedAgents,
    isLoading,
    error,
    refetch: fetchOwnedAgents,
  };
}
