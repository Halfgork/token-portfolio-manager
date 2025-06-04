'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, PieChart, Shield, BarChart3, Wallet, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container-responsive py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <PieChart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Portfolio Manager</span>
            </div>
            <Link 
              href="/dashboard" 
              className="btn-primary"
            >
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container-responsive">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Multi-Token Portfolio Manager
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Manage your Stellar token portfolio with professional-grade analytics, 
              real-time tracking, and advanced risk management tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard" 
                className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#features" 
                className="btn-outline text-lg px-8 py-4"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 lg:mt-24">
            <div className="financial-card max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Portfolio Value */}
                <div className="financial-card">
                  <div className="financial-label">Total Portfolio Value</div>
                  <div className="financial-metric-large profit-positive">$127,430.00</div>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="w-4 h-4 text-success-500" />
                    <span className="percentage-badge percentage-positive">+12.4%</span>
                    <span className="text-sm text-muted-foreground">24h</span>
                  </div>
                </div>

                {/* P&L */}
                <div className="financial-card">
                  <div className="financial-label">Unrealized P&L</div>
                  <div className="financial-metric-large profit-positive">+$15,230.50</div>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="w-4 h-4 text-success-500" />
                    <span className="percentage-badge percentage-positive">+13.6%</span>
                    <span className="text-sm text-muted-foreground">Since inception</span>
                  </div>
                </div>

                {/* Active Tokens */}
                <div className="financial-card">
                  <div className="financial-label">Active Tokens</div>
                  <div className="financial-metric-large">5</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Across Stellar network
                  </div>
                </div>
              </div>

              {/* Token Allocation Chart Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="financial-card">
                  <h3 className="chart-title">Asset Allocation</h3>
                  <div className="space-y-4">
                    {[
                      { token: 'USDC', percentage: 35, color: 'bg-primary-500', value: '$44,600' },
                      { token: 'XLM', percentage: 25, color: 'bg-success-500', value: '$31,850' },
                      { token: 'BTC', percentage: 20, color: 'bg-yellow-500', value: '$25,480' },
                      { token: 'ETH', percentage: 15, color: 'bg-purple-500', value: '$19,115' },
                      { token: 'SOL', percentage: 5, color: 'bg-pink-500', value: '$6,385' },
                    ].map((token) => (
                      <div key={token.token} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${token.color}`} />
                          <span className="font-medium">{token.token}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-semibold">{token.value}</div>
                          <div className="text-sm text-muted-foreground">{token.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Chart Preview */}
                <div className="financial-card">
                  <h3 className="chart-title">Performance (30D)</h3>
                  <div className="h-48 flex items-end gap-2">
                    {Array.from({ length: 30 }, (_, i) => (
                      <div 
                        key={i}
                        className="bg-primary-500/30 w-2 rounded-t"
                        style={{ 
                          height: `${Math.random() * 80 + 20}%`,
                          opacity: Math.random() * 0.5 + 0.5 
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>30 days ago</span>
                    <span>Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary-900/30">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Professional Portfolio Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to track, analyze, and optimize your Stellar token investments 
              with institutional-grade tools and real-time insights.
            </p>
          </div>

          <div className="grid-responsive">
            {[
              {
                icon: PieChart,
                title: 'Multi-Token Portfolio',
                description: 'Manage multiple Stellar token contracts from a single dashboard with unified portfolio view and real-time balance tracking.',
              },
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                description: 'Professional-grade analytics including P&L tracking, allocation analysis, risk metrics, and performance comparisons.',
              },
              {
                icon: TrendingUp,
                title: 'Real-time Tracking',
                description: 'Live portfolio updates with price feeds, transaction monitoring, and instant balance synchronization across all tokens.',
              },
              {
                icon: Shield,
                title: 'Risk Management',
                description: 'Comprehensive risk analysis with portfolio diversification metrics, correlation analysis, and rebalancing recommendations.',
              },
              {
                icon: Wallet,
                title: 'Soroban Integration',
                description: 'Native integration with Stellar Soroban smart contracts for seamless token interactions and transaction management.',
              },
              {
                icon: Zap,
                title: 'Batch Operations',
                description: 'Efficient multi-contract operations with batch calls for better performance and reduced transaction costs.',
              },
            ].map((feature, index) => (
              <div key={index} className="financial-card text-center">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-responsive">
          <div className="financial-card text-center max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Ready to Start Managing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Connect your Stellar wallet and start tracking your token portfolio with 
              professional-grade tools and real-time insights.
            </p>
            <Link 
              href="/dashboard" 
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              Launch Portfolio Manager
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Works with Freighter wallet • Stellar Testnet ready • No registration required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container-responsive">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded flex items-center justify-center">
                <PieChart className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Portfolio Manager</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Built for Stellar • Powered by Soroban
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
