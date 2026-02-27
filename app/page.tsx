import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'RoleOffer - Startup Compensation Benchmarks',
  description: 'Get real-time startup compensation data. Compare offers, benchmark salaries, and negotiate with confidence.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Hero Section with Gradient */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-medium mb-8 shadow-lg hover:shadow-xl transition-shadow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>Real-time compensation data from 500+ startups</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              Know Your Worth in
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Startup Compensation
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Get real-time compensation benchmarks for your role, level, location, and company stage. 
              <span className="font-semibold text-gray-900"> Make informed decisions</span> and negotiate with confidence.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/benchmark">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                  <span className="flex items-center gap-2">
                    <span>Get Benchmark Report</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Button>
              </Link>
              <Link href="/calculator">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-slate-50">
                  Try Free Calculator
                </Button>
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="mt-12 flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-white"></div>
                  ))}
                </div>
                <span className="font-medium">2,400+ users</span>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-2 font-medium">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with Cards */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why RoleOffer?</h2>
            <p className="text-xl text-gray-600">Everything you need to negotiate with confidence</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-slate-200">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-bl-3xl"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                  📊
                </div>
                <h3 className="text-2xl font-bold mb-3">Real Data</h3>
                <p className="text-gray-600 leading-relaxed">
                  Compensation data from H1B filings, Levels.fyi, and verified offers across 500+ startups
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-slate-200">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-bl-3xl"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                  🎯
                </div>
                <h3 className="text-2xl font-bold mb-3">Precise Benchmarks</h3>
                <p className="text-gray-600 leading-relaxed">
                  Filter by role, level, location, and funding stage for accurate, relevant comparisons
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-slate-200">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-bl-3xl"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-3xl mb-4 shadow-lg">
                  ⚡
                </div>
                <h3 className="text-2xl font-bold mb-3">Instant Reports</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get P25/P50/P75 percentiles and downloadable offer letters in under 30 seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with 3D Cards */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the option that works for you</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tools */}
            <div className="relative bg-white rounded-3xl p-8 shadow-lg border-2 border-slate-200 hover:shadow-xl transition-all">
              <div className="absolute top-6 right-6 px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                FREE
              </div>
              <h3 className="text-3xl font-bold mb-2">Free Tools</h3>
              <div className="text-5xl font-black mb-6 text-gray-900">$0</div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Basic compensation calculator</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Equity value estimator</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Is my offer fair? quick check</span>
                </li>
              </ul>
              
              <Link href="/calculator">
                <Button variant="outline" size="lg" className="w-full text-lg border-2">
                  Try Free Tools
                </Button>
              </Link>
            </div>

            {/* Benchmark Report - Featured */}
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 text-white">
              <div className="absolute top-6 right-6 px-3 py-1 bg-yellow-400 rounded-full text-xs font-bold text-purple-900">
                POPULAR
              </div>
              <h3 className="text-3xl font-bold mb-2">Benchmark Report</h3>
              <div className="text-5xl font-black mb-2">$49</div>
              <div className="text-blue-100 mb-6">per report</div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Full P25/P50/P75 percentile data</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Role-specific compensation breakdown</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Customized offer letter template</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">PDF download included</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Market trends analysis</span>
                </li>
              </ul>
              
              <Link href="/benchmark">
                <Button size="lg" className="w-full text-lg bg-white text-indigo-600 hover:bg-slate-50 shadow-xl">
                  Get Your Report →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with Gradient */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to negotiate with confidence?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 leading-relaxed">
              Join <span className="font-bold text-white">2,400+ startup employees</span> who used RoleOffer to get fair compensation.
            </p>
            <Link href="/benchmark">
              <Button size="lg" className="text-lg px-10 py-6 bg-white text-indigo-600 hover:bg-slate-50 shadow-2xl hover:scale-105 transition-all">
                <span className="flex items-center gap-2">
                  <span>Get Started Now</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
