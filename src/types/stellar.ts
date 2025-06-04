import { Networks } from '@stellar/stellar-sdk';

export interface StellarConfig {
  network: Networks;
  rpcUrl: string;
  networkPassphrase: string;
}

export interface ContractInfo {
  contractAddress: string;
  tokenSymbol: string;
  tokenName: string;
  decimals: number;
}

export interface StellarAccount {
  publicKey: string;
  secretKey?: string;
  balance: string;
  sequence: string;
  isConnected: boolean;
}

export interface ContractCallParams {
  contractAddress: string;
  method: string;
  args: any[];
  signer?: string;
}

export interface ContractCallResult {
  success: boolean;
  result?: any;
  error?: string;
  transactionHash?: string;
}

export interface SorobanTokenBalance {
  contractAddress: string;
  balance: string;
  decimals: number;
}

export interface SorobanTokenTransfer {
  contractAddress: string;
  from: string;
  to: string;
  amount: string;
}

export interface SorobanTokenApproval {
  contractAddress: string;
  spender: string;
  amount: string;
}

export interface StellarTransaction {
  hash: string;
  ledger: number;
  createdAt: string;
  sourceAccount: string;
  successful: boolean;
  operationCount: number;
  feeCharged: string;
}

export interface WalletConnection {
  isConnected: boolean;
  publicKey?: string;
  walletType?: 'freighter' | 'albedo' | 'ledger' | 'custom';
}

export interface NetworkStatus {
  isConnected: boolean;
  latestLedger: number;
  networkPassphrase: string;
  rpcUrl: string;
}

export const STELLAR_NETWORKS = {
  TESTNET: {
    network: Networks.TESTNET,
    rpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: Networks.TESTNET,
  },
  MAINNET: {
    network: Networks.PUBLIC,
    rpcUrl: 'https://soroban-rpc.stellar.org',
    networkPassphrase: Networks.PUBLIC,
  },
  FUTURENET: {
    network: Networks.FUTURENET,
    rpcUrl: 'https://rpc-futurenet.stellar.org',
    networkPassphrase: Networks.FUTURENET,
  },
} as const;

export type StellarNetworkType = keyof typeof STELLAR_NETWORKS; 