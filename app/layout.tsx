import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RoleOffer - Startup Compensation Benchmarks',
  description: 'Get real-time startup compensation data. Compare offers, benchmark salaries, and negotiate with confidence.',
  keywords: 'startup compensation, salary benchmarks, offer negotiation, equity calculator, startup salaries',
  verification: {
    google: 'g7skDGzGBxCiXQyRz-5Syib9RUqTDDhbzeH5GQuw3HQ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold">
                💰 RoleOffer
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/calculator" className="text-sm font-medium hover:underline">
                  Free Tools
                </Link>
                <Link href="/benchmark" className="text-sm font-medium hover:underline">
                  Benchmark
                </Link>
                <Link href="/benchmark">
                  <Button size="sm">Get Report - $49</Button>
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">RoleOffer</h3>
                <p className="text-sm text-muted-foreground">
                  Startup compensation benchmarks to help you negotiate with confidence.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/benchmark" className="hover:underline">
                      Benchmark Reports
                    </Link>
                  </li>
                  <li>
                    <Link href="/calculator" className="hover:underline">
                      Free Calculator
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:underline">
                      Negotiation Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Equity 101
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:underline">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 RoleOffer. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
