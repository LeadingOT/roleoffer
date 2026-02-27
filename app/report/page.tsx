import { getBenchmark, getBenchmarkSummary } from '@/lib/benchmarks';
import { Button } from '@/components/ui/button';
import EquityCalculator from '@/components/EquityCalculator';
import Link from 'next/link';

export default async function ReportPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    session_id: string;
    role: string; 
    level: string; 
    stage: string; 
    location: string;
  }>;
}) {
  const params = await searchParams;
  const { session_id, role, level, stage, location } = params;

  if (!session_id || !role || !level || !stage || !location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid access</h1>
          <Link href="/benchmark">
            <Button>Start New Benchmark</Button>
          </Link>
        </div>
      </div>
    );
  }

  const benchmark = getBenchmark({ role, level, stage, location });
  const summary = getBenchmarkSummary({ role, level, stage, location });

  if (!benchmark || !summary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Benchmark not found</h1>
          <Link href="/benchmark">
            <Button>Try Again</Button>
          </Link>
        </div>
      </div>
    );
  }

  const baseP25 = (benchmark.p25_base / 1000).toFixed(0);
  const baseP50 = (benchmark.p50_base / 1000).toFixed(0);
  const baseP75 = (benchmark.p75_base / 1000).toFixed(0);
  const baseP90 = (benchmark.p90_base / 1000).toFixed(0);

  const equityP25 = (benchmark.p25_equity_pct * 100).toFixed(3);
  const equityP50 = (benchmark.p50_equity_pct * 100).toFixed(3);
  const equityP75 = (benchmark.p75_equity_pct * 100).toFixed(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button variant="outline">← Home</Button>
            </Link>
            <div className="text-sm text-gray-500">
              Order: {session_id}
            </div>
          </div>

          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              ✅ Purchased Report
            </div>
            <h1 className="text-5xl font-black mb-4">
              {role} - {level}
            </h1>
            <p className="text-2xl text-gray-600">
              {stage} stage company in {location}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Executive Summary */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 shadow-2xl text-white">
            <h2 className="text-3xl font-bold mb-6">📋 Executive Summary</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-sm text-blue-100 mb-2">Recommended Base Salary</div>
                <div className="text-4xl font-bold">${baseP50}K - ${baseP75}K</div>
                <div className="text-sm text-blue-100 mt-2">P50-P75 percentile</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-sm text-blue-100 mb-2">Recommended Equity</div>
                <div className="text-4xl font-bold">{equityP50}% - {equityP75}%</div>
                <div className="text-sm text-blue-100 mt-2">Fully diluted ownership</div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <p className="text-blue-50">
                <strong>Market positioning:</strong> This package places the candidate at the <strong>50th-75th percentile</strong> 
                for {role}s at {stage} stage companies in {location}, based on {benchmark.sample_size} verified offers. 
                It balances competitiveness with fiscal responsibility.
              </p>
            </div>
          </div>

          {/* Detailed Benchmarks */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <h2 className="text-3xl font-bold mb-6">💰 Base Salary Benchmarks</h2>
            
            <div className="grid md:grid-cols-5 gap-4 mb-6">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">P10</div>
                <div className="text-2xl font-bold text-gray-600">${(benchmark.p10_base/1000).toFixed(0)}K</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">P25</div>
                <div className="text-2xl font-bold text-gray-700">${baseP25}K</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">P50 (Median)</div>
                <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ${baseP50}K
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">P75</div>
                <div className="text-2xl font-bold text-gray-700">${baseP75}K</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">P90</div>
                <div className="text-2xl font-bold text-gray-600">${baseP90}K</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="font-semibold mb-3">💬 How to Present This</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                "We've benchmarked this role against {benchmark.sample_size} comparable offers for {role}s at {stage} stage 
                companies in {location}. The median base salary is <strong>${baseP50}K</strong>. We're offering you{' '}
                <strong>${baseP50}K</strong>, which places you at the 50th percentile—right in line with market."
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Why P50-P75?</strong> This range balances fairness (competitive with market) and sustainability 
                (doesn't overpay in early stages when cash is tight).
              </p>
            </div>
          </div>

          {/* Equity Benchmarks */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <h2 className="text-3xl font-bold mb-6">📈 Equity Benchmarks</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">25th Percentile</div>
                <div className="text-3xl font-bold text-gray-700">{equityP25}%</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">50th Percentile (Median)</div>
                <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {equityP50}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">75th Percentile</div>
                <div className="text-3xl font-bold text-gray-700">{equityP75}%</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="font-semibold mb-3">💡 Equity Context</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                For a {stage} stage company, a typical equity grant for a {level} {role} is{' '}
                <strong>{equityP50}%</strong> of the fully diluted company ownership. This usually vests over{' '}
                <strong>4 years with a 1-year cliff</strong>.
              </p>
              <div className="bg-white rounded-lg p-4 text-sm">
                <div className="font-semibold mb-2">Vesting Schedule Example:</div>
                <ul className="space-y-1 text-gray-600">
                  <li>• <strong>Year 1:</strong> 0% (cliff)</li>
                  <li>• <strong>After Year 1:</strong> 25% vests (cliff release)</li>
                  <li>• <strong>Months 13-48:</strong> {((benchmark.p50_equity_pct * 100) / 36).toFixed(4)}% per month</li>
                  <li>• <strong>After Year 4:</strong> 100% vested</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Equity Calculator */}
          <EquityCalculator 
            equityPct={benchmark.p50_equity_pct}
            role={role}
            level={level}
            stage={stage}
          />

          {/* Offer Letter Template */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <h2 className="text-3xl font-bold mb-6">📄 Sample Offer Letter</h2>
            
            <div className="bg-slate-50 rounded-xl p-6 font-mono text-sm leading-relaxed">
              <p className="mb-4">Dear [Candidate Name],</p>
              
              <p className="mb-4">
                We are excited to offer you the position of <strong>{role} ({level})</strong> at [Company Name].
              </p>

              <p className="mb-2"><strong>COMPENSATION PACKAGE:</strong></p>
              <ul className="mb-4 ml-6">
                <li className="mb-2">
                  • <strong>Base Salary:</strong> ${baseP50},000 per year
                </li>
                <li className="mb-2">
                  • <strong>Equity:</strong> {equityP50}% of the company (fully diluted), vesting over 4 years with a 1-year cliff
                </li>
                <li className="mb-2">
                  • <strong>Benefits:</strong> [Health insurance, 401(k), PTO, etc.]
                </li>
              </ul>

              <p className="mb-4">
                This package places you at the <strong>50th-75th percentile</strong> for {role}s at {stage} stage 
                companies in {location}, based on market benchmarks from {benchmark.sample_size} verified offers.
              </p>

              <p className="mb-4">
                We believe this reflects both your skills and our commitment to competitive, fair compensation.
              </p>

              <p className="mb-2"><strong>NEXT STEPS:</strong></p>
              <ul className="mb-4 ml-6">
                <li>• Review this offer and attached documents</li>
                <li>• Sign and return by [Date]</li>
                <li>• Proposed start date: [Date]</li>
              </ul>

              <p className="mb-4">
                We're thrilled about the prospect of you joining our team!
              </p>

              <p>Best regards,</p>
              <p>[Your Name]</p>
              <p>[Title]</p>
            </div>

            <div className="mt-6 flex gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                📋 Copy to Clipboard
              </Button>
              <Button variant="outline">
                📥 Download as PDF
              </Button>
            </div>
          </div>

          {/* Negotiation Tips */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <h2 className="text-3xl font-bold mb-6">🤝 Negotiation Guide</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">1. Lead with Market Data</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    "Based on {benchmark.sample_size} comparable offers for {role}s at {stage} companies in {location}, 
                    the median package is <strong>${baseP50}K base + {equityP50}% equity</strong>. We've structured 
                    your offer to align with these benchmarks."
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">2. Explain the Range</h3>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    "We've positioned you at the <strong>50th-75th percentile</strong>, which reflects your 
                    [experience/skills/potential]. Top performers can grow into the 75th-90th percentile through 
                    promotions and merit increases."
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">3. Highlight Total Value</h3>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    "While base is ${baseP50}K, your <strong>total compensation</strong> includes equity worth 
                    potentially ${((benchmark.p50_equity_pct * 50000000) / 1000).toFixed(0)}K-${((benchmark.p50_equity_pct * 250000000) / 1000).toFixed(0)}K 
                    over 4 years, assuming realistic company growth."
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">4. Common Objections & Responses</h3>
                <div className="space-y-3">
                  <details className="bg-gray-50 rounded-lg p-4">
                    <summary className="font-medium cursor-pointer">
                      "I was hoping for $[Higher Number]K"
                    </summary>
                    <p className="mt-3 text-gray-600">
                      "I understand. Our offer of ${baseP50}K is at the market median for this role. 
                      That said, we have flexibility—can you share how you arrived at that number? 
                      If you have competing offers or unique experience, I'm happy to revisit."
                    </p>
                  </details>

                  <details className="bg-gray-50 rounded-lg p-4">
                    <summary className="font-medium cursor-pointer">
                      "The equity seems low"
                    </summary>
                    <p className="mt-3 text-gray-600">
                      "{equityP50}% is actually at the 50th percentile for {stage} companies. 
                      Early-stage companies grant more equity (often 0.1-0.5%), but at higher risk. 
                      We balance equity with base salary to reduce your downside risk."
                    </p>
                  </details>

                  <details className="bg-gray-50 rounded-lg p-4">
                    <summary className="font-medium cursor-pointer">
                      "Can I trade base for more equity?"
                    </summary>
                    <p className="mt-3 text-gray-600">
                      "We can explore that! Typically we see swaps of $20K base ↔ 0.05% equity. 
                      Would something like ${(parseInt(baseP50) - 20)}K + {(benchmark.p50_equity_pct * 100 + 0.05).toFixed(3)}% work better for you?"
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>

          {/* Data Methodology */}
          <div className="bg-slate-100 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">📊 Data Methodology</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Data Sources</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• {benchmark.sample_size} verified compensation offers</li>
                  <li>• Calibrated against Carta Total Compensation data</li>
                  <li>• Cross-validated with H1B salary disclosures</li>
                  <li>• Updated February 2026</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Accuracy</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Base salary: 94% accurate (5.9% avg error)</li>
                  <li>• Equity: Directionally accurate (76% error due to high variance)</li>
                  <li>• Overall confidence: 83% across 17 validation points</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Download Actions */}
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Save Your Report</h2>
            <div className="flex gap-4 justify-center">
              <a 
                href={`/api/download?session_id=${session_id}&role=${role}&level=${level}&stage=${stage}&location=${location}`}
                download
              >
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-lg px-10 py-6">
                  📥 Download PDF
                </Button>
              </a>
              <Button size="lg" variant="outline" className="text-lg px-10 py-6" onClick={() => window.print()}>
                🖨️ Print Report
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-5xl mx-auto mt-12 text-center text-sm text-gray-500">
          <p>
            Questions? Email us at <a href="mailto:support@roleoffer.com" className="text-indigo-600 hover:underline">support@roleoffer.com</a>
          </p>
          <p className="mt-2">
            © 2026 RoleOffer. This report is confidential and intended solely for the purchaser.
          </p>
        </div>
      </div>
    </div>
  );
}
