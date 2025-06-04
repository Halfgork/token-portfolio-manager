import { create } from 'zustand';
import { WalletConnection, StellarAccount } from '@/types/stellar';
import { stellarClient } from '@/lib/stellar/client';

interface WalletState {
  // State
  connection: WalletConnection;
  account: StellarAccount | null;
  isConnecting: boolean;
  error: string | null;

  // Actions
  connectWallet: (secretKey?: string) => Promise<void>;
  disconnectWallet: () => void;
  setConnection: (connection: WalletConnection) => void;
  setAccount: (account: StellarAccount | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  refreshAccount: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  // Initial state
  connection: {
    isConnected: false,
    walletType: undefined,
  },
  account: null,
  isConnecting: false,
  error: null,

  // Connect wallet with secret key (for development/testing)
  connectWallet: async (secretKey?: string) => {
    set({ isConnecting: true, error: null });
    
    try {
      if (secretKey) {
        // Direct connection with secret key (for development)
        stellarClient.setSigner(secretKey);
        
        // Generate public key from secret
        const { Keypair } = await import('@stellar/stellar-sdk');
        const keypair = Keypair.fromSecret(secretKey);
        const publicKey = keypair.publicKey();
        
        // Get account info
        const accountInfo = await stellarClient.getAccount(publicKey);
        
        set({
          connection: {
            isConnected: true,
            publicKey,
            walletType: 'custom',
          },
          account: accountInfo,
          isConnecting: false,
        });
      } else {
        // Try to connect with browser wallet (Freighter)
        if (typeof window !== 'undefined' && window.freighter) {
          const { requestAccess, getPublicKey } = window.freighter;
          
          await requestAccess();
          const publicKey = await getPublicKey();
          
          const accountInfo = await stellarClient.getAccount(publicKey);
          
          set({
            connection: {
              isConnected: true,
              publicKey,
              walletType: 'freighter',
            },
            account: accountInfo,
            isConnecting: false,
          });
        } else {
          throw new Error('No wallet available. Please install Freighter or provide a secret key.');
        }
      }
    } catch (error) {
      set({
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
      });
    }
  },

  // Disconnect wallet
  disconnectWallet: () => {
    set({
      connection: {
        isConnected: false,
        publicKey: undefined,
        walletType: undefined,
      },
      account: null,
      error: null,
    });
  },

  // Set connection state
  setConnection: (connection) => {
    set({ connection });
  },

  // Set account info
  setAccount: (account) => {
    set({ account });
  },

  // Set error
  setError: (error) => {
    set({ error });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Refresh account information
  refreshAccount: async () => {
    const { connection } = get();
    
    if (!connection.isConnected || !connection.publicKey) {
      return;
    }

    try {
      const accountInfo = await stellarClient.getAccount(connection.publicKey);
      set({ account: accountInfo });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to refresh account',
      });
    }
  },
}));

// Extend window type for Freighter
declare global {
  interface Window {
    freighter?: {
      requestAccess: () => Promise<void>;
      getPublicKey: () => Promise<string>;
      signTransaction: (xdr: string) => Promise<string>;
      signAuthEntry: (entryXdr: string) => Promise<string>;
    };
  }
} 