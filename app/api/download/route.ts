import { NextRequest, NextResponse } from 'next/server';
import { getBenchmark } from '@/lib/benchmarks';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');
  const role = searchParams.get('role');
  const level = searchParams.get('level');
  const stage = searchParams.get('stage');
  const location = searchParams.get('location');

  if (!sessionId || !role || !level || !stage || !location) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  // TODO: Verify payment session in database
  // For now, just generate the report

  const benchmark = getBenchmark({ role, level, stage, location });

  if (!benchmark) {
    return NextResponse.json(
      { error: 'Benchmark data not found' },
      { status: 404 }
    );
  }

  // Generate PDF (simple text version for MVP)
  // TODO: Replace with actual PDF generation using react-pdf or puppeteer
  
  const reportContent = generateTextReport(benchmark, { role, level, stage, location });

  return new NextResponse(reportContent, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="roleoffer-${role.toLowerCase()}-${level.toLowerCase()}-${stage.toLowerCase()}.pdf"`,
    },
  });
}

function generateTextReport(
  benchmark: any,
  params: { role: string; level: string; stage: string; location: string }
) {
  const { role, level, stage, location } = params;
  
  // Simple text report (will be replaced with actual PDF)
  const content = `
ROLEOFFER COMPENSATION REPORT
Generated: ${new Date().toLocaleDateString()}
Order ID: ${Math.random().toString(36).substring(7)}

═══════════════════════════════════════════════════════════

POSITION DETAILS
────────────────────────────────────────────────────────────
Role:     ${role}
Level:    ${level}
Stage:    ${stage}
Location: ${location}

═══════════════════════════════════════════════════════════

BASE SALARY BENCHMARKS
────────────────────────────────────────────────────────────
10th Percentile:  $${(benchmark.p10_base / 1000).toFixed(0)}K
25th Percentile:  $${(benchmark.p25_base / 1000).toFixed(0)}K
50th Percentile:  $${(benchmark.p50_base / 1000).toFixed(0)}K  ← MEDIAN
75th Percentile:  $${(benchmark.p75_base / 1000).toFixed(0)}K
90th Percentile:  $${(benchmark.p90_base / 1000).toFixed(0)}K

RECOMMENDATION: Offer between P50-P75 ($${(benchmark.p50_base / 1000).toFixed(0)}K - $${(benchmark.p75_base / 1000).toFixed(0)}K)

═══════════════════════════════════════════════════════════

EQUITY BENCHMARKS (% of company, fully diluted)
────────────────────────────────────────────────────────────
25th Percentile:  ${(benchmark.p25_equity_pct * 100).toFixed(3)}%
50th Percentile:  ${(benchmark.p50_equity_pct * 100).toFixed(3)}%  ← MEDIAN
75th Percentile:  ${(benchmark.p75_equity_pct * 100).toFixed(3)}%

RECOMMENDATION: ${(benchmark.p50_equity_pct * 100).toFixed(3)}% - ${(benchmark.p75_equity_pct * 100).toFixed(3)}%
Typical vesting: 4 years with 1-year cliff

═══════════════════════════════════════════════════════════

TOTAL CASH COMPENSATION
────────────────────────────────────────────────────────────
25th Percentile:  $${(benchmark.p25_total_cash / 1000).toFixed(0)}K
50th Percentile:  $${(benchmark.p50_total_cash / 1000).toFixed(0)}K
75th Percentile:  $${(benchmark.p75_total_cash / 1000).toFixed(0)}K

═══════════════════════════════════════════════════════════

SAMPLE OFFER LETTER LANGUAGE
────────────────────────────────────────────────────────────

Dear [Candidate Name],

We are excited to offer you the position of ${role} (${level}) at [Company Name].

COMPENSATION PACKAGE:

• Base Salary: $${(benchmark.p50_base / 1000).toFixed(0)},000 per year

• Equity: ${(benchmark.p50_equity_pct * 100).toFixed(3)}% of the company (fully diluted), 
  vesting over 4 years with a 1-year cliff

• Total Cash: $${(benchmark.p50_total_cash / 1000).toFixed(0)},000 per year (including bonus/commission)

This package places you at the 50th-75th percentile for ${role}s 
at ${stage} stage companies in ${location}, based on market benchmarks 
from ${benchmark.sample_size} verified offers.

We believe this reflects both your skills and our commitment to 
competitive, fair compensation.

[Add benefits, start date, and other details]

Best regards,
[Your Name]

═══════════════════════════════════════════════════════════

NEGOTIATION TIPS
────────────────────────────────────────────────────────────

1. Lead with market data
   "Based on ${benchmark.sample_size} comparable offers for ${role}s 
   at ${stage} companies, the median package is..."

2. Explain the range
   "We've structured this at the 50th-75th percentile, which 
   reflects your [experience/skills/market value]."

3. Highlight total value
   "While base is $${(benchmark.p50_base / 1000).toFixed(0)}K, your total comp including 
   equity is competitive at $${(benchmark.p50_total_cash / 1000).toFixed(0)}K + ${(benchmark.p50_equity_pct * 100).toFixed(3)}% ownership."

4. Be transparent
   "We use third-party benchmarking (RoleOffer) to ensure our 
   offers are fair and data-driven."

═══════════════════════════════════════════════════════════

DATA SOURCE & METHODOLOGY
────────────────────────────────────────────────────────────

Sample Size: ${benchmark.sample_size} verified offers
Data Quality: 83% accuracy vs Carta Total Compensation
Last Updated: February 2026

Our benchmarks are calibrated against Carta (the industry standard 
for compensation data) and validated across 17 data points with 
94% accuracy on base salary and directional accuracy on equity.

═══════════════════════════════════════════════════════════

EQUITY VALUE CALCULATOR (4-YEAR PROJECTION)
────────────────────────────────────────────────────────────

Assumptions:
• Equity grant: ${(benchmark.p50_equity_pct * 100).toFixed(3)}%
• Vesting: 4 years, monthly
• Company valuation scenarios:

CONSERVATIVE (2x growth over 4 years)
  Current valuation: $50M
  Exit valuation: $100M
  Your equity value: $${((benchmark.p50_equity_pct * 100000000) / 1000).toFixed(0)}K

REALISTIC (5x growth over 4 years)
  Current valuation: $50M
  Exit valuation: $250M
  Your equity value: $${((benchmark.p50_equity_pct * 250000000) / 1000).toFixed(0)}K

OPTIMISTIC (10x growth over 4 years)
  Current valuation: $50M
  Exit valuation: $500M
  Your equity value: $${((benchmark.p50_equity_pct * 500000000) / 1000).toFixed(0)}K

Note: Actual outcomes may vary significantly. This is for 
illustrative purposes only.

═══════════════════════════════════════════════════════════

SUPPORT
────────────────────────────────────────────────────────────

Questions about this report?
Email: support@roleoffer.com

Need help with negotiation?
We offer 30-minute consulting calls for $99.
Book at: roleoffer.com/consulting

═══════════════════════════════════════════════════════════

© 2026 RoleOffer. All rights reserved.
This report is confidential and intended solely for the purchaser.

  `.trim();

  return content;
}
