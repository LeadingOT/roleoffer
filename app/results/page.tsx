'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCompData } from '@/lib/mockData';
import { CompData } from '@/lib/types';

function ResultsContent() {
  const searchParams = useSearchParams();
  const [compData, setCompData] = useState<CompData | null>(null);

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
        <p className="text-lg text-muted-foreground">Loading benchmark data...</p>
      </div>
    );
  }

  const chartData = [
    { percentile: 'P25', value: compData.p25, label: '25th Percentile' },
    { percentile: 'P50', value: compData.p50, label: '50th Percentile (Median)' },
    { percentile: 'P75', value: compData.p75, label: '75th Percentile' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Compensation Benchmark Report</h1>
            <p className="text-lg text-muted-foreground">
              {compData.role} • {compData.level} • {compData.location} • {compData.stage}
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">25th Percentile</CardTitle>
                <CardDescription className="text-3xl font-bold text-foreground">
                  {formatCurrency(compData.p25)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Entry-level competitive range</p>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">50th Percentile (Median)</CardTitle>
                <CardDescription className="text-3xl font-bold text-foreground">
                  {formatCurrency(compData.p50)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Market median compensation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">75th Percentile</CardTitle>
                <CardDescription className="text-3xl font-bold text-foreground">
                  {formatCurrency(compData.p75)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Top-tier competitive range</p>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Compensation Distribution</CardTitle>
              <CardDescription>Total compensation by percentile</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="percentile" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="value" fill="hsl(var(--primary))" name="Total Compensation" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Breakdown Table */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Detailed Breakdown</CardTitle>
              <CardDescription>Compensation components by percentile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Percentile</th>
                      <th className="text-left py-3 px-4 font-medium">Base Salary</th>
                      <th className="text-left py-3 px-4 font-medium">Equity (4yr)</th>
                      <th className="text-left py-3 px-4 font-medium">Bonus</th>
                      <th className="text-left py-3 px-4 font-medium">Total Comp</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">P25</td>
                      <td className="py-3 px-4">{formatCurrency(compData.p25 * 0.7)}</td>
                      <td className="py-3 px-4">{formatCurrency(compData.p25 * 0.2)}</td>
                      <td className="py-3 px-4">{formatCurrency(compData.p25 * 0.1)}</td>
                      <td className="py-3 px-4 font-medium">{formatCurrency(compData.p25)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">P50</td>
                      <td className="py-3 px-4">{formatCurrency(compData.p50 * 0.7)}</td>
                      <td className="py-3 px-4">{formatCurrency(compData.p50 * 0.2)}</td>
                      <td className="py-3 px-4">{formatCurrency(compData.p50 * 0.1)}</td>
                      <td className="py-3 px-4 font-medium">{formatCurrency(compData.p50)}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">P75</td>
                      <td className="py-3 px-4">{formatCurrency(compData.p75 * 0.7)}</td>
                      <td className="py-3 px-4">{formatCurrency(compData.p75 * 0.2)}</td>
                      <td className="py-3 px-4">{formatCurrency(compData.p75 * 0.1)}</td>
                      <td className="py-3 px-4 font-medium">{formatCurrency(compData.p75)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Offer Letter Preview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Sample Offer Letter</CardTitle>
              <CardDescription>Customizable template based on your benchmark</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/offer-letter?${searchParams.toString()}`}>
                <Button size="lg" className="w-full">View & Customize Offer Letter</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Link href="/calculator">
              <Button variant="outline">Try Free Calculator</Button>
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

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
