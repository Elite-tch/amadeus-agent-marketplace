import { useState, useContext } from 'react';
import { WalletContext } from '@/contexts/WalletContext';

interface PurchaseOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface UsePurchaseResult {
  purchaseAgent: (agentId: string, price: number, ownerAddress: string) => Promise<void>;
  isPurchasing: boolean;
  error: string | null;
}

export function usePurchase(options?: PurchaseOptions): UsePurchaseResult {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wallet = useContext(WalletContext);

  const purchaseAgent = async (
    agentId: string,
    price: number,
    ownerAddress: string
  ) => {
    if (!wallet) {
      const errorMsg = 'Wallet context not available';
      setError(errorMsg);
      options?.onError?.(errorMsg);
      return;
    }

    if (!wallet.account) {
      const errorMsg = 'Please connect your wallet first';
      setError(errorMsg);
      options?.onError?.(errorMsg);
      return;
    }

    if (!wallet.provider) {
      const errorMsg = 'Amadeus provider not available';
      setError(errorMsg);
      options?.onError?.(errorMsg);
      return;
    }

    setIsPurchasing(true);
    setError(null);

    try {
      let transactionHash: string | undefined;

      // Only create a transaction if the price is greater than 0
      if (price > 0) {
        try {
          // Step 1: Build unsigned transaction via API
          const buildResponse = await fetch('/api/build-transaction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipient: ownerAddress,
              amount: price, // Amount in atomic units
            }),
          });

          const buildData = await buildResponse.json();

          if (!buildResponse.ok) {
            throw new Error(buildData.error || 'Failed to build transaction');
          }

          const transaction = buildData.transaction;

          // Step 2: Sign transaction with Amadeus Wallet extension
          // Wallet expects: { contract, method, args[], description }
          console.log('Requesting wallet to sign transaction...');
          const signResult = await wallet.provider.signTransaction(transaction);

          console.log('Transaction signed:', signResult.txHash);

          // Step 3: Submit the signed transaction to the blockchain
          console.log('Submitting transaction to blockchain...');
          const submitResponse = await fetch('/api/submit-transaction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              txPacked: signResult.txPacked,
            }),
          });

          const submitData = await submitResponse.json();

          if (!submitResponse.ok) {
            throw new Error(submitData.error || 'Failed to submit transaction');
          }

          console.log('Transaction submitted successfully:', submitData.txHash);
          transactionHash = submitData.txHash;

        } catch (txError: any) {
          throw new Error(`Transaction failed: ${txError.message || 'Unknown error'}`);
        }
      }

      // Step 3: Record the purchase on the backend
      console.log('Recording purchase:', { agentId, buyerAddress: wallet.account, transactionHash });

      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId,
          buyerAddress: wallet.account,
          transactionHash,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Purchase failed:', data);
        throw new Error(data.error || 'Failed to record purchase');
      }

      options?.onSuccess?.();
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to purchase agent';
      setError(errorMsg);
      options?.onError?.(errorMsg);
    } finally {
      setIsPurchasing(false);
    }
  };

  return {
    purchaseAgent,
    isPurchasing,
    error,
  };
}
