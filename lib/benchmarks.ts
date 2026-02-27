// Benchmark data query interface

import benchmarksData from '../data/benchmarks-generated.json';

export interface Benchmark {
  role: string;
  level: string;
  stage: string;
  location: string;
  p25_base: number;
  p50_base: number;
  p75_base: number;
  p90_base: number;
  p25_total_cash: number;
  p50_total_cash: number;
  p75_total_cash: number;
  p90_total_cash: number;
  p25_equity_pct: number;
  p50_equity_pct: number;
  p75_equity_pct: number;
  p90_equity_pct: number;
  sample_size: number;
}

export interface BenchmarkQuery {
  role: string;
  level: string;
  stage: string;
  location: string;
}

/**
 * Get benchmark for specific criteria
 */
export function getBenchmark(query: BenchmarkQuery): Benchmark | null {
  const benchmarks = benchmarksData as Benchmark[];
  
  const match = benchmarks.find(
    b =>
      b.role === query.role &&
      b.level === query.level &&
      b.stage === query.stage &&
      b.location === query.location
  );
  
  return match || null;
}

/**
 * Get all benchmarks for a role/level across different stages
 */
export function getBenchmarksByRoleLevel(role: string, level: string): Benchmark[] {
  const benchmarks = benchmarksData as Benchmark[];
  return benchmarks.filter(b => b.role === role && b.level === level);
}

/**
 * Get summary statistics
 */
export function getBenchmarkSummary(query: BenchmarkQuery): {
  baseRange: string;
  totalCashRange: string;
  equityRange: string;
  p50Summary: string;
} | null {
  const benchmark = getBenchmark(query);
  if (!benchmark) return null;
  
  return {
    baseRange: `$${(benchmark.p25_base / 1000).toFixed(0)}K - $${(benchmark.p75_base / 1000).toFixed(0)}K`,
    totalCashRange: `$${(benchmark.p25_total_cash / 1000).toFixed(0)}K - $${(benchmark.p75_total_cash / 1000).toFixed(0)}K`,
    equityRange: `${(benchmark.p25_equity_pct * 100).toFixed(2)}% - ${(benchmark.p75_equity_pct * 100).toFixed(2)}%`,
    p50Summary: `$${(benchmark.p50_base / 1000).toFixed(0)}K base + ${(benchmark.p50_equity_pct * 100).toFixed(2)}% equity`
  };
}

/**
 * Get offer messaging template
 */
export function getOfferMessaging(query: BenchmarkQuery, offerDetails: {
  baseSalary: number;
  equityPct: number;
}): string {
  const benchmark = getBenchmark(query);
  if (!benchmark) return '';
  
  const percentile = offerDetails.baseSalary >= benchmark.p75_base ? 'P75' :
                     offerDetails.baseSalary >= benchmark.p50_base ? 'P50-P75' :
                     offerDetails.baseSalary >= benchmark.p25_base ? 'P25-P50' : 'below P25';
  
  return `Based on our benchmark data (${benchmark.sample_size} ${query.stage} stage companies), this offer is at the ${percentile} percentile for ${query.role} - ${query.level} in ${query.location}.

**Your Offer:**
• Base Salary: $${(offerDetails.baseSalary / 1000).toFixed(0)}K
• Equity: ${(offerDetails.equityPct * 100).toFixed(2)}%

**Market Benchmark:**
• Base: $${(benchmark.p50_base / 1000).toFixed(0)}K (P50)
• Equity: ${(benchmark.p50_equity_pct * 100).toFixed(2)}% (P50)
• Total Cash: $${(benchmark.p50_total_cash / 1000).toFixed(0)}K (P50)

This puts you ${percentile === 'P75' ? 'above' : 'at'} market rate for similar roles.`;
}

// Available options for filters
export const ROLES = ['Software Engineer', 'Product Manager', 'Designer', 'Data Scientist'];
export const LEVELS = ['Junior', 'Mid', 'Senior', 'Staff'];
export const STAGES = ['Early', 'Growth', 'Scale', 'Late'];
export const LOCATIONS = ['San Francisco', 'New York', 'Austin', 'Remote'];
