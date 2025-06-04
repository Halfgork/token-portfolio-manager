export interface Token {
  id: string;
  symbol: string;
  name: string;
  contractAddress: string;
  decimals: number;
  totalSupply: number;
  description?: string;
  logoUrl?: string;
  website?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenPrice {
  tokenId: string;
  price: number;
  change24h: number;
  changePercentage24h: number;
  volume24h: number;
  marketCap?: number;
  lastUpdated: Date;
}

export interface TokenBalance {
  tokenId: string;
  contractAddress: string;
  balance: number;
  decimals: number;
  lastUpdated: Date;
}

export interface TokenMetadata {
  name: string;
  symbol: string;
  decimals: number;
  description?: string;
  image?: string;
  external_url?: string;
  attributes?: TokenAttribute[];
}

export interface TokenAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

export interface TokenTransfer {
  id: string;
  tokenId: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  transactionHash: string;
  blockNumber: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface TokenStatistics {
  tokenId: string;
  holders: number;
  totalTransfers: number;
  dailyVolume: number;
  weeklyVolume: number;
  monthlyVolume: number;
  priceHistory: TokenPricePoint[];
  lastUpdated: Date;
}

export interface TokenPricePoint {
  timestamp: Date;
  price: number;
  volume: number;
}

export interface TokenSwap {
  id: string;
  fromTokenId: string;
  toTokenId: string;
  fromAmount: number;
  toAmount: number;
  exchangeRate: number;
  slippage: number;
  fee: number;
  transactionHash: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface TokenAllowance {
  tokenId: string;
  owner: string;
  spender: string;
  amount: number;
  lastUpdated: Date;
} 