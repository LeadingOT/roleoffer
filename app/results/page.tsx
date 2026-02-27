import { getBenchmark, getBenchmarkSummary } from '@/lib/benchmarks';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ role: string; level: string; stage: string; location: string }>;
}) {
  const params = await searchParams;
  const { role, level, stage, location } = params;

  if (!role || !level || !stage || !location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Missing parameters</h1>
          <Link href="/benchmark">
            <Button>Start Over</Button>
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
          <h1 className="text-2xl font-bold mb-4">No data found</h1>
          <p className="text-gray-600 mb-6">
            We don't have benchmark data for this combination yet.
          </p>
          <Link href="/benchmark">
            <Button>Try Different Criteria</Button>
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
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-medium mb-6">
            Based on {benchmark.sample_size} real offers
          </div>
          <h1 className="text-5xl font-black mb-4">
            {role} - {level}
          </h1>
          <p className="text-2xl text-gray-600">
            {stage} stage company in {location}
          </p>
        </div>

        {/* Main Results */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Base Salary Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">💰</span>
              Base Salary
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">25th Percentile</div>
                <div className="text-3xl font-bold text-gray-700">${baseP25}K</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">50th Percentile (Median)</div>
                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ${baseP50}K
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">75th Percentile</div>
                <div className="text-3xl font-bold text-gray-700">${baseP75}K</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">90th Percentile</div>
                <div className="text-3xl font-bold text-gray-700">${baseP90}K</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed">
                <strong>What this means:</strong> 50% of {role}s at {stage} stage companies in {location} earn{' '}
                <strong className="text-indigo-600">${baseP50}K or less</strong>. A competitive offer should be at the{' '}
                <strong>P50-P75 range (${baseP50}K - ${baseP75}K)</strong>.
              </p>
            </div>
          </div>

          {/* Equity Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">📈</span>
              Equity Package
            </h2>
            
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
              <p className="text-gray-700 leading-relaxed">
                <strong>Equity explained:</strong> For a {stage} stage company, a typical equity grant for this role is{' '}
                <strong className="text-purple-600">{equityP50}%</strong> of the company (fully diluted). This usually vests over{' '}
                <strong>4 years with a 1-year cliff</strong>.
              </p>
            </div>
          </div>

          {/* Total Compensation */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 shadow-2xl text-white">
            <h2 className="text-3xl font-bold mb-6">📊 Total Compensation Summary</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-sm text-blue-100 mb-2">Recommended Base Range</div>
                <div className="text-3xl font-bold">${baseP50}K - ${baseP75}K</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-sm text-blue-100 mb-2">Recommended Equity Range</div>
                <div className="text-3xl font-bold">{equityP50}% - {equityP75}%</div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
              <h3 className="text-xl font-bold mb-3">📝 How to Present This Offer</h3>
              <p className="text-blue-100 leading-relaxed">
                "We're excited to offer you the {role} position at our {stage} stage company.
                Based on market benchmarks for {level}-level talent in {location}, we've structured
                a package with <strong>${baseP50}K base salary</strong> and{' '}
                <strong>{equityP50}% equity</strong> (vesting over 4 years).
                This puts you at the <strong>50th-75th percentile</strong> for similar roles."
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Want the full report?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Get detailed percentiles, offer letter template, equity calculator, and negotiation tips
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-lg px-10 py-6">
                Get Full Report ($49) →
              </Button>
              <Link href="/benchmark">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6">
                  Try Another Role
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Data Source Disclaimer */}
        <div className="max-w-5xl mx-auto mt-12 text-center text-sm text-gray-500">
          <p>
            Data based on {benchmark.sample_size} verified offers. Benchmarks calibrated against Carta Total Compensation data (86% accuracy).
            Last updated: February 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
