'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, PieChart, Shield, BarChart3, Wallet, Zap } from 'lucide-react';

// Inline styles to ensure they always work
const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#111827',
    color: '#f9fafb',
    fontFamily: "'Inter', system-ui, sans-serif"
  },
  header: {
    borderBottom: '1px solid #374151',
    padding: '1rem 0'
  },
  financialCard: {
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    color: '#f9fafb',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.2s ease-in-out'
  },
  financialMetricLarge: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '2.25rem',
    fontWeight: '700',
    letterSpacing: '0.05em',
    color: '#f9fafb'
  },
  financialLabel: {
    fontSize: '0.875rem',
    fontWeight: '500',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: '#9ca3af',
    marginBottom: '0.5rem'
  },
  profitPositive: {
    color: '#10b981'
  },
  percentageBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.125rem 0.625rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500'
  },
  percentagePositive: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    color: '#34d399',
    border: '1px solid rgba(16, 185, 129, 0.3)'
  },
  btnPrimary: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    gap: '0.5rem'
  },
  btnOutline: {
    backgroundColor: 'transparent',
    color: '#f9fafb',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: '1px solid #374151',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none'
  }
};

export default function LandingPage() {
  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div className="container-responsive">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PieChart style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f9fafb' }}>
                Portfolio Manager
              </span>
            </div>
            <Link href="/dashboard" style={styles.btnPrimary}>
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container-responsive">
          <div style={{ textAlign: 'center', maxWidth: '64rem', margin: '0 auto' }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#f9fafb'
            }}>
              <span style={{
                background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Multi-Token Portfolio Manager
              </span>
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#9ca3af',
              marginBottom: '2rem',
              lineHeight: '1.7',
              maxWidth: '48rem',
              margin: '0 auto 2rem auto'
            }}>
              Manage your Stellar token portfolio with professional-grade analytics, 
              real-time tracking, and advanced risk management tools.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Link href="/dashboard" style={{ ...styles.btnPrimary, fontSize: '1.125rem', padding: '1rem 2rem' }}>
                Get Started
                <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </Link>
              <Link href="#features" style={{ ...styles.btnOutline, fontSize: '1.125rem', padding: '1rem 2rem' }}>
                Learn More
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div style={{ marginTop: '4rem' }}>
            <div style={{ ...styles.financialCard, maxWidth: '72rem', margin: '0 auto' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                {/* Portfolio Value */}
                <div style={styles.financialCard}>
                  <div style={styles.financialLabel}>Total Portfolio Value</div>
                  <div style={{ ...styles.financialMetricLarge, ...styles.profitPositive }}>
                    $127,430.00
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <TrendingUp style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                    <span style={{ ...styles.percentageBadge, ...styles.percentagePositive }}>
                      +12.4%
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>24h</span>
                  </div>
                </div>

                {/* P&L */}
                <div style={styles.financialCard}>
                  <div style={styles.financialLabel}>Unrealized P&L</div>
                  <div style={{ ...styles.financialMetricLarge, ...styles.profitPositive }}>
                    +$15,230.50
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <TrendingUp style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
                    <span style={{ ...styles.percentageBadge, ...styles.percentagePositive }}>
                      +13.6%
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Since inception</span>
                  </div>
                </div>

                {/* Active Tokens */}
                <div style={styles.financialCard}>
                  <div style={styles.financialLabel}>Active Tokens</div>
                  <div style={styles.financialMetricLarge}>5</div>
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                    Across Stellar network
                  </div>
                </div>
              </div>

              {/* Token Allocation Chart Preview */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '1.5rem'
              }}>
                <div style={styles.financialCard}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#f9fafb'
                  }}>
                    Asset Allocation
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { token: 'USDC', percentage: 35, color: '#3b82f6', value: '$44,600' },
                      { token: 'XLM', percentage: 25, color: '#10b981', value: '$31,850' },
                      { token: 'BTC', percentage: 20, color: '#f59e0b', value: '$25,480' },
                      { token: 'ETH', percentage: 15, color: '#8b5cf6', value: '$19,115' },
                      { token: 'SOL', percentage: 5, color: '#ec4899', value: '$6,385' },
                    ].map((token) => (
                      <div key={token.token} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '0.75rem',
                            height: '0.75rem',
                            borderRadius: '50%',
                            backgroundColor: token.color
                          }} />
                          <span style={{ fontWeight: '500', color: '#f9fafb' }}>{token.token}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: '600',
                            color: '#f9fafb'
                          }}>
                            {token.value}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                            {token.percentage}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Chart Preview */}
                <div style={styles.financialCard}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#f9fafb'
                  }}>
                    Performance (30D)
                  </h3>
                  <div style={{
                    height: '12rem',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '0.125rem'
                  }}>
                    {Array.from({ length: 30 }, (_, i) => (
                      <div 
                        key={i}
                        style={{
                          backgroundColor: 'rgba(59, 130, 246, 0.3)',
                          width: '0.5rem',
                          borderRadius: '0.125rem 0.125rem 0 0',
                          height: `${Math.random() * 80 + 20}%`,
                          opacity: Math.random() * 0.5 + 0.5
                        }}
                      />
                    ))}
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.875rem',
                    color: '#9ca3af',
                    marginTop: '0.5rem'
                  }}>
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
      <section style={{ padding: '5rem 0', backgroundColor: 'rgba(31, 41, 55, 0.3)' }}>
        <div className="container-responsive">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#f9fafb'
            }}>
              Professional Portfolio Management
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#9ca3af',
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
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
              <div key={index} style={{ ...styles.financialCard, textAlign: 'center' }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <feature.icon style={{ width: '1.5rem', height: '1.5rem', color: '#3b82f6' }} />
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: '#f9fafb'
                }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container-responsive">
          <div style={{ ...styles.financialCard, textAlign: 'center', maxWidth: '64rem', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#f9fafb'
            }}>
              Ready to Start Managing?
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#9ca3af',
              marginBottom: '2rem'
            }}>
              Connect your Stellar wallet and start tracking your token portfolio with 
              professional-grade tools and real-time insights.
            </p>
            <Link href="/dashboard" style={{ ...styles.btnPrimary, fontSize: '1.125rem', padding: '1rem 2rem' }}>
              Launch Portfolio Manager
              <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
            </Link>
            <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#9ca3af' }}>
              <p>Works with Freighter wallet • Stellar Testnet ready • No registration required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #374151', padding: '2rem 0' }}>
        <div className="container-responsive">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '1.5rem',
                height: '1.5rem',
                background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                borderRadius: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PieChart style={{ width: '1rem', height: '1rem', color: 'white' }} />
              </div>
              <span style={{ fontWeight: '600', color: '#f9fafb' }}>Portfolio Manager</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
              Built for Stellar • Powered by Soroban
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
