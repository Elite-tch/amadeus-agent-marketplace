"use client";

import { useAmadeus, type ProviderStatus } from '@/hooks/useAmadeus';
import { useUserRegistration } from '@/hooks/useUserRegistration';
import { createContext, type ReactNode } from 'react';

interface WalletContextValue {
  provider: AmadeusProvider | null;
  account: string | null;
  status: ProviderStatus;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  isWalletUnlocked: boolean;
  isConnected: boolean;
  isProviderAvailable: boolean;
}

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const wallet = useAmadeus();
  const isConnected = Boolean(wallet.account);
  const isProviderAvailable = wallet.status === 'available';

  // Automatically register user when wallet connects
  useUserRegistration(wallet.account, isConnected);

  return (
    <WalletContext.Provider
      value={{
        ...wallet,
        isConnected,
        isProviderAvailable
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { WalletContext };
