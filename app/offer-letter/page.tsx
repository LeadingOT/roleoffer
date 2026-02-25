'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCompData } from '@/lib/mockData';
import { CompData } from '@/lib/types';

function OfferLetterContent() {
  const searchParams = useSearchParams();
  const [compData, setCompData] = useState<CompData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const role = searchParams.get('role');
    const level = searchParams.get('level');
    const location = searchParams.get('location');
    const stage = searchParams.get('stage');

    if (role && level && location && stage) {
      const data = getCompData(role, level, location, stage);
      setCompData(data);
    }
  }, [searchParams]);

  if (!compData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading offer letter template...</p>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const baseSalary = Math.round(compData.p50 * 0.7);
  const equityValue = Math.round(compData.p50 * 0.2);
  const bonus = Math.round(compData.p50 * 0.1);
  const shares = Math.round(equityValue / 10); // Assuming $10/share

  const offerLetterText = `OFFER LETTER

Dear [Candidate Name],

We are pleased to offer you the position of ${compData.level} ${compData.role} at [Company Name].

COMPENSATION PACKAGE

Base Salary: ${formatCurrency(baseSalary)} per year
Equity: ${shares.toLocaleString()} stock options, vesting over 4 years with a 1-year cliff
Annual Bonus: Target ${formatCurrency(bonus)} based on performance
Total First-Year Compensation: ${formatCurrency(compData.p50)}

BENEFITS

• Health, dental, and vision insurance (100% coverage for employee)
• 401(k) with company match
• Unlimited PTO policy
• Remote work flexibility
• Professional development budget
• Latest equipment (MacBook Pro, monitor, etc.)

EQUITY DETAILS

Your equity grant of ${shares.toLocaleString()} stock options will vest over 4 years:
• 1-year cliff: 25% vests after 1 year
• Monthly vesting: Remaining 75% vests monthly over the next 3 years
• Strike price: Current fair market value
• 10-year exercise window post-employment

LOCATION

This is a ${compData.location === 'Remote' ? 'remote' : `hybrid/on-site position based in ${compData.location}`} position.

START DATE

We propose a start date of [Start Date], subject to your acceptance.

EMPLOYMENT TERMS

This offer is contingent upon:
• Successful background check
• Proof of eligibility to work in the United States
• Reference checks

This is an at-will employment relationship. Either party may terminate employment at any time.

ACCEPTANCE

To accept this offer, please sign and return this letter by [Deadline Date].

We're excited about the possibility of you joining our team and contributing to our mission.

Sincerely,

[Hiring Manager Name]
[Title]
[Company Name]


ACCEPTANCE

I, [Candidate Name], accept the terms of this offer.

Signature: _____________________ Date: _____________________


---

BENCHMARKING DATA (for your reference)

Based on our analysis of ${compData.role} positions at ${compData.stage} companies in ${compData.location}:

• 25th Percentile: ${formatCurrency(compData.p25)}
• 50th Percentile (Median): ${formatCurrency(compData.p50)}
• 75th Percentile: ${formatCurrency(compData.p75)}

This offer is positioned at the median (P50) of the market range, reflecting competitive compensation for this role and level.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(offerLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Offer Letter Template</h1>
            <p className="text-lg text-muted-foreground">
              Customized for {compData.role} • {compData.level} • {compData.location} • {compData.stage}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Offer Letter</CardTitle>
              <CardDescription>
                Copy and customize this template. In production, you can download as PDF.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-8 rounded-lg border mb-6 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{offerLetterText}</pre>
              </div>

              <div className="flex gap-4">
                <Button onClick={copyToClipboard} className="flex-1">
                  {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                </Button>
                <Button variant="outline" className="flex-1" disabled>
                  Download PDF (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Customization Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Replace [Company Name], [Candidate Name], and [Hiring Manager Name] with actual names</li>
                <li>• Adjust start date and acceptance deadline</li>
                <li>• Modify benefits package to match your company&apos;s offerings</li>
                <li>• Update equity strike price based on latest 409A valuation</li>
                <li>• Add or remove sections as needed (relocation, signing bonus, etc.)</li>
                <li>• Have your legal team review before sending</li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Link href={`/results?${searchParams.toString()}`}>
              <Button variant="outline">Back to Results</Button>
            </Link>
            <Link href="/benchmark">
              <Button variant="outline">Get Another Report</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OfferLetterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OfferLetterContent />
    </Suspense>
  );
}
