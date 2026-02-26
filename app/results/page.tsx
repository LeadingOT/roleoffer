'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface BenchmarkData {
  base_salary_p25: number;
  base_salary_p50: number;
  base_salary_p75: number;
  equity_pct_p25: number;
  equity_pct_p50: number;
  equity_pct_p75: number;
  data_sources?: string[];
  sample_size?: number;
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const role = searchParams.get('role');
  const level = searchParams.get('level');
  const location = searchParams.get('location');
  const stage = searchParams.get('stage');

  useEffect(() => {
    if (role && location && stage) {
      fetchBenchmarkData();
    }
  }, [role, location, stage]);

  const fetchBenchmarkData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, location, stage })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch benchmark data');
      }

      const data = await response.json();
      setBenchmarkData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading benchmark data...</p>
      </div>
    );
  }

  if (error || !benchmarkData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-destructive">Error: {error || 'No data available'}</p>
      </div>
    );
  }

  const chartData = [
    { percentile: 'P25', salary: benchmarkData.base_salary_p25, equity: benchmarkData.equity_pct_p25 },
    { percentile: 'P50', salary: benchmarkData.base_salary_p50, equity: benchmarkData.equity_pct_p50 },
    { percentile: 'P75', salary: benchmarkData.base_salary_p75, equity: benchmarkData.equity_pct_p75 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Compensation Benchmark Report</h1>
            <p className="text-lg text-muted-foreground">
              {role} • {level || 'All Levels'} • {location} • {stage}
            </p>
            {benchmarkData.data_sources && (
              <p className="text-sm text-muted-foreground mt-2">
                Data sources: {benchmarkData.data_sources.join(', ')} • Sample size: {benchmarkData.sample_size || 'N/A'}
              </p>
            )}
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">25th Percentile</CardTitle>
                <CardDescription className="text-3xl font-bold text-foreground">
                  {formatCurrency(benchmarkData.base_salary_p25)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Base Salary</p>
                <p className="text-sm font-medium mt-1">Equity: {formatPercent(benchmarkData.equity_pct_p25)}</p>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">50th Percentile (Median)</CardTitle>
                <CardDescription className="text-3xl font-bold text-foreground">
                  {formatCurrency(benchmarkData.base_salary_p50)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Base Salary (Market Median)</p>
                <p className="text-sm font-medium mt-1">Equity: {formatPercent(benchmarkData.equity_pct_p50)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">75th Percentile</CardTitle>
                <CardDescription className="text-3xl font-bold text-foreground">
                  {formatCurrency(benchmarkData.base_salary_p75)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Base Salary</p>
                <p className="text-sm font-medium mt-1">Equity: {formatPercent(benchmarkData.equity_pct_p75)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Base Salary Distribution</CardTitle>
              <CardDescription>Annual base salary by percentile</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="percentile" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="salary" fill="hsl(var(--primary))" name="Base Salary" />
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
                      <th className="text-left py-3 px-4 font-medium">Equity %</th>
                      <th className="text-left py-3 px-4 font-medium">Est. Equity Value (4yr)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">P25</td>
                      <td className="py-3 px-4">{formatCurrency(benchmarkData.base_salary_p25)}</td>
                      <td className="py-3 px-4">{formatPercent(benchmarkData.equity_pct_p25)}</td>
                      <td className="py-3 px-4 text-muted-foreground">Varies by valuation</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">P50</td>
                      <td className="py-3 px-4">{formatCurrency(benchmarkData.base_salary_p50)}</td>
                      <td className="py-3 px-4">{formatPercent(benchmarkData.equity_pct_p50)}</td>
                      <td className="py-3 px-4 text-muted-foreground">Varies by valuation</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">P75</td>
                      <td className="py-3 px-4">{formatCurrency(benchmarkData.base_salary_p75)}</td>
                      <td className="py-3 px-4">{formatPercent(benchmarkData.equity_pct_p75)}</td>
                      <td className="py-3 px-4 text-muted-foreground">Varies by valuation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Note: Equity percentages represent ownership stake. Actual dollar value depends on company valuation.
              </p>
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
