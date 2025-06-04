'use client';

import { useEffect, useState } from 'react';
import { Wallet, RefreshCw, TrendingUp, TrendingDown, PieChart, BarChart3 } from 'lucide-react';
import { useWalletStore } from '@/stores/walletStore';
import { usePortfolioStore } from '@/stores/portfolioStore';

export default function DashboardPage() {
  const [secretKey, setSecretKey] = useState('');
  const [showSecretInput, setShowSecretInput] = useState(false);

  const {
    connection,
    account,
    isConnecting,
    error: walletError,
    connectWallet,
    disconnectWallet,
    clearError,
  } = useWalletStore();

  const {
    portfolio,
    tokens,
    isLoading: portfolioLoading,
    error: portfolioError,
    loadPortfolio,
    refreshPortfolio,
  } = usePortfolioStore();

  // Load portfolio when wallet connects
  useEffect(() => {
    if (connection.isConnected && connection.publicKey) {
      loadPortfolio(connection.publicKey);
    }
  }, [connection.isConnected, connection.publicKey, loadPortfolio]);

  const handleConnect = async () => {
    clearError();
    if (showSecretInput && secretKey) {
      await connectWallet(secretKey);
      setSecretKey('');
      setShowSecretInput(false);
    } else {
      await connectWallet();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  };

  const getPercentageClass = (percentage: number) => {
    if (percentage > 0) return 'profit-positive';
    if (percentage < 0) return 'profit-negative';
    return 'profit-neutral';
  };

  const getPercentageBadgeClass = (percentage: number) => {
    if (percentage > 0) return 'percentage-positive';
    if (percentage < 0) return 'percentage-negative';
    return 'percentage-neutral';
  };

  if (!connection.isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="financial-card max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Connect Your Wallet</h1>
            <p className="text-muted-foreground">
              Connect your Stellar wallet to start managing your token portfolio
            </p>
          </div>

          {walletError && (
            <div className="bg-danger-900/20 border border-danger-800/30 text-danger-400 p-3 rounded-lg mb-4 text-sm">
              {walletError}
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={() => handleConnect()}
              disabled={isConnecting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                'Connect Freighter Wallet'
              )}
            </button>

            <div className="text-center">
              <span className="text-sm text-muted-foreground">or</span>
            </div>

            <button
              onClick={() => setShowSecretInput(!showSecretInput)}
              className="btn-outline w-full"
            >
              Use Secret Key (Development)
            </button>

            {showSecretInput && (
              <div className="space-y-3">
                <input
                  type="password"
                  placeholder="Enter your secret key (S...)"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="form-input w-full"
                />
                <button
                  onClick={handleConnect}
                  disabled={!secretKey || isConnecting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    'Connect with Secret Key'
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 text-xs text-muted-foreground text-center">
            <p>Your keys never leave your browser</p>
            <p>Working on Stellar Testnet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container-responsive py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Portfolio Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                {connection.publicKey?.slice(0, 8)}...{connection.publicKey?.slice(-8)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={refreshPortfolio}
                disabled={portfolioLoading}
                className="btn-ghost"
              >
                <RefreshCw className={`w-4 h-4 ${portfolioLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={disconnectWallet}
                className="btn-outline"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-responsive py-8">
        {portfolioError && (
          <div className="bg-danger-900/20 border border-danger-800/30 text-danger-400 p-4 rounded-lg mb-6">
            {portfolioError}
          </div>
        )}

        {portfolioLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="financial-card">
                  <div className="skeleton h-4 w-24 mb-2" />
                  <div className="skeleton h-8 w-32 mb-2" />
                  <div className="skeleton h-4 w-16" />
                </div>
              ))}
            </div>
            <div className="skeleton h-64 rounded-lg" />
          </div>
        ) : portfolio ? (
          <div className="space-y-8">
            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="financial-card">
                <div className="financial-label">Total Portfolio Value</div>
                <div className="financial-metric-large">
                  {formatCurrency(portfolio.totalValue)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {portfolio.percentageReturn >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-success-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-danger-500" />
                  )}
                  <span className={`percentage-badge ${getPercentageBadgeClass(portfolio.percentageReturn)}`}>
                    {formatPercentage(portfolio.percentageReturn)}
                  </span>
                  <span className="text-sm text-muted-foreground">Total Return</span>
                </div>
              </div>

              <div className="financial-card">
                <div className="financial-label">Unrealized P&L</div>
                <div className={`financial-metric-large ${getPercentageClass(portfolio.unrealizedPnL)}`}>
                  {portfolio.unrealizedPnL >= 0 ? '+' : ''}{formatCurrency(portfolio.unrealizedPnL)}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Cost Basis: {formatCurrency(portfolio.totalCost)}
                </div>
              </div>

              <div className="financial-card">
                <div className="financial-label">Active Tokens</div>
                <div className="financial-metric-large">{tokens.length}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Across Stellar network
                </div>
              </div>
            </div>

            {/* Token Holdings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Token List */}
              <div className="financial-card">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Token Holdings
                </h2>
                <div className="space-y-4">
                  {tokens.length > 0 ? (
                    tokens.map((token) => (
                      <div key={token.tokenId} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary-800/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary-400">
                              {token.symbol.slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold">{token.symbol}</div>
                            <div className="text-sm text-muted-foreground">{token.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-semibold">
                            {token.balance.toFixed(4)} {token.symbol}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatCurrency(token.totalValue)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <PieChart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No token balances found</p>
                      <p className="text-sm">Make sure you have tokens in your wallet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Portfolio Allocation */}
              <div className="financial-card">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Asset Allocation
                </h2>
                <div className="space-y-4">
                  {tokens.length > 0 ? (
                    tokens.map((token) => (
                      <div key={token.tokenId} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-primary-500" />
                          <span className="font-medium">{token.symbol}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-semibold">
                            {formatCurrency(token.totalValue)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {token.allocation.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No allocation data available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <PieChart className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No Portfolio Data</h2>
            <p className="text-muted-foreground">
              Unable to load portfolio data. Please check your connection and try again.
            </p>
            <button
              onClick={refreshPortfolio}
              className="btn-primary mt-4"
            >
              Retry
            </button>
          </div>
        )}
      </main>
    </div>
  );
} 