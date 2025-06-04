export interface AnalyticsData {
  portfolioId: string;
  dateRange: DateRange;
  performance: PerformanceAnalytics;
  allocation: AllocationAnalytics;
  risk: RiskAnalytics;
  comparison: ComparisonAnalytics;
}

export interface DateRange {
  start: Date;
  end: Date;
  period: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'all';
}

export interface PerformanceAnalytics {
  totalReturn: number;
  totalReturnPercentage: number;
  annualizedReturn: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  bestDay: DayPerformance;
  worstDay: DayPerformance;
  winRate: number;
  profitFactor: number;
  averageReturn: number;
  returnsDistribution: ReturnsDistribution;
}

export interface DayPerformance {
  date: Date;
  return: number;
  returnPercentage: number;
}

export interface ReturnsDistribution {
  positive: number;
  negative: number;
  neutral: number;
  bins: DistributionBin[];
}

export interface DistributionBin {
  range: [number, number];
  count: number;
  percentage: number;
}

export interface AllocationAnalytics {
  current: TokenAllocation[];
  target: TokenAllocation[];
  drift: AllocationDrift[];
  concentration: ConcentrationMetrics;
  diversification: DiversificationMetrics;
}

export interface TokenAllocation {
  tokenId: string;
  symbol: string;
  percentage: number;
  value: number;
}

export interface AllocationDrift {
  tokenId: string;
  symbol: string;
  currentPercentage: number;
  targetPercentage: number;
  drift: number;
  action: 'rebalance' | 'hold';
}

export interface ConcentrationMetrics {
  herfindahlIndex: number;
  topThreeConcentration: number;
  maxAllocation: number;
  minAllocation: number;
}

export interface DiversificationMetrics {
  effectiveNumberOfAssets: number;
  diversificationRatio: number;
  correlationMatrix: TokenCorrelation[];
}

export interface TokenCorrelation {
  token1: string;
  token2: string;
  correlation: number;
}

export interface RiskAnalytics {
  portfolioRisk: PortfolioRisk;
  tokenRisks: TokenRisk[];
  riskAdjustedReturns: RiskAdjustedReturns;
  riskContribution: RiskContribution[];
}

export interface PortfolioRisk {
  volatility: number;
  valueAtRisk: number; // 95% VaR
  conditionalValueAtRisk: number; // Expected Shortfall
  beta: number;
  alpha: number;
  informationRatio: number;
}

export interface TokenRisk {
  tokenId: string;
  symbol: string;
  volatility: number;
  beta: number;
  correlation: number;
  contribution: number;
}

export interface RiskAdjustedReturns {
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  treynorRatio: number;
}

export interface RiskContribution {
  tokenId: string;
  symbol: string;
  marginalContribution: number;
  componentContribution: number;
  percentage: number;
}

export interface ComparisonAnalytics {
  benchmarks: BenchmarkComparison[];
  periods: PeriodComparison[];
  rankings: PerformanceRanking[];
}

export interface BenchmarkComparison {
  name: string;
  portfolioReturn: number;
  benchmarkReturn: number;
  excessReturn: number;
  trackingError: number;
  informationRatio: number;
}

export interface PeriodComparison {
  period: string;
  portfolioReturn: number;
  bestPerformer: TokenPerformance;
  worstPerformer: TokenPerformance;
}

export interface TokenPerformance {
  tokenId: string;
  symbol: string;
  return: number;
  returnPercentage: number;
}

export interface PerformanceRanking {
  period: string;
  rank: number;
  percentile: number;
  universe: string;
}

export interface AnalyticsChart {
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  title: string;
  data: ChartDataPoint[];
  xAxis: string;
  yAxis: string;
  series?: ChartSeries[];
}

export interface ChartDataPoint {
  x: string | number | Date;
  y: number;
  label?: string;
  color?: string;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color: string;
} 