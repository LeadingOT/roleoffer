import { getBenchmark } from '@/lib/benchmarks';
import { Button } from '@/components/ui/button';
import Link from 'link';

export default async function CheckoutPage({
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

  if (!benchmark) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get Your Full Compensation Report</h1>
            <p className="text-xl text-gray-600">
              {role} - {level} at {stage} stage in {location}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* What You'll Get */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
              <h2 className="text-2xl font-bold mb-6">📊 What You'll Get</h2>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="font-semibold">Complete Compensation Breakdown</div>
                    <div className="text-sm text-gray-600">P10/P25/P50/P75/P90 percentiles for base salary and equity</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <div className="font-semibold">Professional Offer Letter Template</div>
                    <div className="text-sm text-gray-600">Pre-filled PDF ready to customize and send</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <div className="font-semibold">Equity Value Calculator</div>
                    <div className="text-sm text-gray-600">4-year projection with 3 exit scenarios</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <div className="font-semibold">Negotiation Messaging Templates</div>
                    <div className="text-sm text-gray-600">How to present the offer and handle questions</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔍</span>
                  <div>
                    <div className="font-semibold">Market Context & Insights</div>
                    <div className="text-sm text-gray-600">Based on {benchmark.sample_size} verified offers</div>
                  </div>
                </li>
              </ul>

              <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>Data source:</strong> Calibrated against Carta Total Compensation data. 
                  83% accuracy across 17 validation points.
                </p>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 shadow-2xl text-white">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                  🔥 Limited Time Offer
                </div>
                <div className="text-6xl font-black mb-2">$49</div>
                <div className="text-blue-100">One-time payment</div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-blue-50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Instant download (PDF + web access)
                </div>
                <div className="flex items-center gap-2 text-blue-50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  No subscription, no hidden fees
                </div>
                <div className="flex items-center gap-2 text-blue-50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Lifetime access to your report
                </div>
              </div>

              <form action="/api/checkout" method="POST">
                <input type="hidden" name="role" value={role} />
                <input type="hidden" name="level" value={level} />
                <input type="hidden" name="stage" value={stage} />
                <input type="hidden" name="location" value={location} />
                
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full bg-white text-indigo-600 hover:bg-blue-50 text-lg py-6 font-bold shadow-xl"
                >
                  Get Full Report Now →
                </Button>
              </form>

              <p className="text-center text-sm text-blue-100 mt-4">
                🔒 Secure payment via Airwallex
              </p>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-12 bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
            <h2 className="text-2xl font-bold mb-6 text-center">How We Compare</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4 text-indigo-600 font-bold">RoleOffer</th>
                    <th className="text-center py-3 px-4 text-gray-500">Pave</th>
                    <th className="text-center py-3 px-4 text-gray-500">Carta</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Price per offer</td>
                    <td className="text-center py-3 px-4 text-indigo-600 font-bold">$49</td>
                    <td className="text-center py-3 px-4 text-gray-500">$5,000+/year</td>
                    <td className="text-center py-3 px-4 text-gray-500">Enterprise only</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Data sharing required</td>
                    <td className="text-center py-3 px-4">❌ No</td>
                    <td className="text-center py-3 px-4">✅ Yes</td>
                    <td className="text-center py-3 px-4">✅ Yes</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4">Instant access</td>
                    <td className="text-center py-3 px-4">✅ Yes</td>
                    <td className="text-center py-3 px-4">❌ Demo required</td>
                    <td className="text-center py-3 px-4">❌ Demo required</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Offer letter template</td>
                    <td className="text-center py-3 px-4">✅ Included</td>
                    <td className="text-center py-3 px-4">➖ Add-on</td>
                    <td className="text-center py-3 px-4">➖ Add-on</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <details className="bg-white rounded-xl p-6 shadow-md">
                <summary className="font-semibold cursor-pointer">How accurate is your data?</summary>
                <p className="mt-3 text-gray-600">
                  Our benchmarks are calibrated against Carta Total Compensation data (the industry gold standard) 
                  and achieve 83% overall accuracy across 17 validation points. Base salary is 94% accurate (5.9% avg error).
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-md">
                <summary className="font-semibold cursor-pointer">Do I need to share my company data?</summary>
                <p className="mt-3 text-gray-600">
                  No! Unlike Pave or Carta, we don't require you to share any proprietary compensation data. 
                  Just pay $49 and get your report instantly.
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-md">
                <summary className="font-semibold cursor-pointer">What if I need multiple offers?</summary>
                <p className="mt-3 text-gray-600">
                  Each report is $49. For teams hiring frequently, we're building a subscription plan ($199/month for unlimited reports). 
                  Email us at hello@roleoffer.com to get early access.
                </p>
              </details>

              <details className="bg-white rounded-xl p-6 shadow-md">
                <summary className="font-semibold cursor-pointer">Can I get a refund?</summary>
                <p className="mt-3 text-gray-600">
                  Yes! If you're not satisfied with the report quality, email us within 7 days for a full refund, no questions asked.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
