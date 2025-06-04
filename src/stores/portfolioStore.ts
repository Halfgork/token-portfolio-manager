import { create } from 'zustand';
import { Portfolio, PortfolioToken, Transaction, PerformanceMetrics } from '@/types/portfolio';
import { portfolioOperations } from '@/lib/stellar/portfolioOperations';

interface PortfolioState {
  // State
  portfolio: Portfolio | null;
  tokens: PortfolioToken[];
  transactions: Transaction[];
  performance: PerformanceMetrics | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadPortfolio: (userAddress: string) => Promise<void>;
  refreshPortfolio: () => Promise<void>;
  updateTokenBalance: (tokenId: string, balance: number) => void;
  addTransaction: (transaction: Transaction) => void;
  setTokens: (tokens: PortfolioToken[]) => void;
  setPerformance: (performance: PerformanceMetrics) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  calculateTotals: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  // Initial state
  portfolio: null,
  tokens: [],
  transactions: [],
  performance: null,
  isLoading: false,
  error: null,

  // Load portfolio data for a user
  loadPortfolio: async (userAddress: string) => {
    set({ isLoading: true, error: null });

    try {
      // Get token balances from all contracts
      const tokens = await portfolioOperations.getPortfolioBalances(userAddress);
      
      // Calculate portfolio totals
      const portfolioData = portfolioOperations.calculatePortfolioTotals(tokens);
      
      // Create portfolio object
      const portfolio: Portfolio = {
        id: `portfolio-${userAddress}`,
        name: 'My Portfolio',
        totalValue: portfolioData.totalValue,
        totalCost: portfolioData.totalCost,
        unrealizedPnL: portfolioData.unrealizedPnL,
        realizedPnL: portfolioData.realizedPnL,
        totalPnL: portfolioData.totalPnL,
        percentageReturn: portfolioData.percentageReturn,
        tokens: portfolioData.tokens,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock performance metrics (in production, calculate from historical data)
      const performance: PerformanceMetrics = {
        totalReturn: portfolioData.totalPnL,
        totalReturnPercentage: portfolioData.percentageReturn,
        dayChange: 0,
        dayChangePercentage: 0,
        weekChange: 0,
        weekChangePercentage: 0,
        monthChange: 0,
        monthChangePercentage: 0,
        yearChange: 0,
        yearChangePercentage: 0,
        volatility: 0,
        sharpeRatio: 0,
        maxDrawdown: 0,
      };

      set({
        portfolio,
        tokens: portfolioData.tokens,
        performance,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load portfolio',
      });
    }
  },

  // Refresh portfolio data
  refreshPortfolio: async () => {
    const { portfolio } = get();
    
    if (!portfolio) {
      return;
    }

    // Extract user address from portfolio ID or use current connected wallet
    const userAddress = portfolio.id.replace('portfolio-', '');
    await get().loadPortfolio(userAddress);
  },

  // Update individual token balance
  updateTokenBalance: (tokenId: string, balance: number) => {
    const { tokens } = get();
    
    const updatedTokens = tokens.map(token => {
      if (token.tokenId === tokenId) {
        const totalValue = balance * token.currentPrice;
        const unrealizedPnL = totalValue - token.totalCost;
        const percentageReturn = token.totalCost > 0 ? (unrealizedPnL / token.totalCost) * 100 : 0;
        
        return {
          ...token,
          balance,
          totalValue,
          unrealizedPnL,
          percentageReturn,
          lastUpdated: new Date(),
        };
      }
      return token;
    });

    set({ tokens: updatedTokens });
    get().calculateTotals();
  },

  // Add a new transaction
  addTransaction: (transaction: Transaction) => {
    const { transactions } = get();
    set({ transactions: [transaction, ...transactions] });
  },

  // Set tokens array
  setTokens: (tokens: PortfolioToken[]) => {
    set({ tokens });
  },

  // Set performance metrics
  setPerformance: (performance: PerformanceMetrics) => {
    set({ performance });
  },

  // Set loading state
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  // Set error
  setError: (error: string | null) => {
    set({ error });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Recalculate portfolio totals
  calculateTotals: () => {
    const { tokens, portfolio } = get();
    
    if (!portfolio) return;

    const totals = portfolioOperations.calculatePortfolioTotals(tokens);
    
    const updatedPortfolio: Portfolio = {
      ...portfolio,
      totalValue: totals.totalValue,
      totalCost: totals.totalCost,
      unrealizedPnL: totals.unrealizedPnL,
      realizedPnL: totals.realizedPnL,
      totalPnL: totals.totalPnL,
      percentageReturn: totals.percentageReturn,
      tokens: totals.tokens,
      updatedAt: new Date(),
    };

    set({
      portfolio: updatedPortfolio,
      tokens: totals.tokens,
    });
  },
}));

// Selector hooks for better performance
export const usePortfolioTokens = () => usePortfolioStore(state => state.tokens);
export const usePortfolioValue = () => usePortfolioStore(state => state.portfolio?.totalValue ?? 0);
export const usePortfolioPnL = () => usePortfolioStore(state => state.portfolio?.totalPnL ?? 0);
export const usePortfolioLoading = () => usePortfolioStore(state => state.isLoading);
export const usePortfolioError = () => usePortfolioStore(state => state.error); 