import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'RoleOffer - Startup Compensation Benchmarks',
  description: 'Get real-time startup compensation data. Compare offers, benchmark salaries, and negotiate with confidence.',
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Know Your Worth in Startup Compensation
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Get real-time compensation benchmarks for your role, level, location, and company stage. 
            Make informed decisions and negotiate with confidence.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/benchmark">
              <Button size="lg">Get Benchmark Report</Button>
            </Link>
            <Link href="/calculator">
              <Button size="lg" variant="outline">Free Calculator</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why RoleOffer?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>📊 Real Data</CardTitle>
                <CardDescription>
                  Compensation data from H1B filings, Levels.fyi, and verified offers
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>🎯 Precise Benchmarks</CardTitle>
                <CardDescription>
                  Filter by role, level, location, and funding stage for accurate comparisons
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>⚡ Instant Reports</CardTitle>
                <CardDescription>
                  Get P25/P50/P75 percentiles and downloadable offer letters in seconds
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Free Tools</CardTitle>
                <CardDescription className="text-lg">$0</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Basic compensation calculator</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Equity value estimator</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Is my offer fair? quick check</span>
                  </li>
                </ul>
                <Link href="/calculator">
                  <Button variant="outline" className="w-full mt-6">
                    Try Free Tools
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Benchmark Report */}
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-2xl">Benchmark Report</CardTitle>
                <CardDescription className="text-lg">$49 per report</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Full P25/P50/P75 percentile data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Role-specific compensation breakdown</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Customized offer letter template</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>PDF download included</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Market trends analysis</span>
                  </li>
                </ul>
                <Link href="/benchmark">
                  <Button className="w-full mt-6">Get Your Report</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to negotiate with confidence?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of startup employees who used RoleOffer to get fair compensation.
          </p>
          <Link href="/benchmark">
            <Button size="lg">Get Started Now</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
