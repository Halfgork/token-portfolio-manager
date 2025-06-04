export interface Portfolio {
  id: string;
  name: string;
  totalValue: number;
  totalCost: number;
  unrealizedPnL: number;
  realizedPnL: number;
  totalPnL: number;
  percentageReturn: number;
  tokens: PortfolioToken[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioToken {
  tokenId: string;
  symbol: string;
  name: string;
  contractAddress: string;
  balance: number;
  avgCost: number;
  currentPrice: number;
  totalValue: number;
  totalCost: number;
  unrealizedPnL: number;
  percentageReturn: number;
  allocation: number; // percentage of total portfolio
  lastUpdated: Date;
}

export interface Transaction {
  id: string;
  portfolioId: string;
  tokenId: string;
  type: 'buy' | 'sell' | 'transfer_in' | 'transfer_out' | 'swap';
  amount: number;
  price: number;
  value: number;
  fee: number;
  fromAddress?: string;
  toAddress?: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface PortfolioAllocation {
  tokenId: string;
  symbol: string;
  percentage: number;
  value: number;
  color: string;
}

export interface PerformanceMetrics {
  totalReturn: number;
  totalReturnPercentage: number;
  dayChange: number;
  dayChangePercentage: number;
  weekChange: number;
  weekChangePercentage: number;
  monthChange: number;
  monthChangePercentage: number;
  yearChange: number;
  yearChangePercentage: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
}

export interface PriceHistory {
  timestamp: Date;
  price: number;
  volume?: number;
}

export interface PortfolioPriceHistory {
  timestamp: Date;
  totalValue: number;
  tokens: Record<string, number>; // tokenId -> value
}

export interface RebalanceRecommendation {
  tokenId: string;
  symbol: string;
  currentAllocation: number;
  targetAllocation: number;
  recommendedAction: 'buy' | 'sell' | 'hold';
  amount: number;
  value: number;
  reason: string;
}

export interface PortfolioSettings {
  id: string;
  portfolioId: string;
  autoRebalance: boolean;
  rebalanceThreshold: number; // percentage
  targetAllocations: Record<string, number>; // tokenId -> target percentage
  priceAlerts: PriceAlert[];
  notifications: NotificationSettings;
}

export interface PriceAlert {
  id: string;
  tokenId: string;
  type: 'above' | 'below' | 'percentage_change';
  value: number;
  isActive: boolean;
  createdAt: Date;
}

export interface NotificationSettings {
  email: boolean;
  browser: boolean;
  priceAlerts: boolean;
  portfolioUpdates: boolean;
  transactionConfirmations: boolean;
}

export interface ExportOptions {
  format: 'csv' | 'pdf' | 'json';
  dateRange: {
    start: Date;
    end: Date;
  };
  includeTransactions: boolean;
  includePerformance: boolean;
  includeAllocations: boolean;
} 