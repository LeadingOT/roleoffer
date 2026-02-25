'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CalculatorPage() {
  const [inputs, setInputs] = useState({
    baseSalary: '',
    equityShares: '',
    sharePrice: '',
    bonus: '',
  });

  const [results, setResults] = useState({
    equityValue: 0,
    totalComp: 0,
    monthlyComp: 0,
  });

  const calculate = () => {
    const base = parseFloat(inputs.baseSalary) || 0;
    const shares = parseFloat(inputs.equityShares) || 0;
    const price = parseFloat(inputs.sharePrice) || 0;
    const bonus = parseFloat(inputs.bonus) || 0;

    const equityValue = shares * price;
    const totalComp = base + equityValue + bonus;
    const monthlyComp = totalComp / 12;

    setResults({
      equityValue,
      totalComp,
      monthlyComp,
    });
  };

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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Free Compensation Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate your total compensation including equity and bonuses
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Card */}
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Offer Details</CardTitle>
                <CardDescription>Fill in the components of your compensation package</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="baseSalary">Base Salary (Annual)</Label>
                  <Input
                    id="baseSalary"
                    type="number"
                    placeholder="150000"
                    value={inputs.baseSalary}
                    onChange={(e) => setInputs({ ...inputs, baseSalary: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equityShares">Equity Shares (4-year vest)</Label>
                  <Input
                    id="equityShares"
                    type="number"
                    placeholder="10000"
                    value={inputs.equityShares}
                    onChange={(e) => setInputs({ ...inputs, equityShares: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sharePrice">Share Price / Strike Price</Label>
                  <Input
                    id="sharePrice"
                    type="number"
                    placeholder="5.00"
                    step="0.01"
                    value={inputs.sharePrice}
                    onChange={(e) => setInputs({ ...inputs, sharePrice: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bonus">Annual Bonus / Target</Label>
                  <Input
                    id="bonus"
                    type="number"
                    placeholder="20000"
                    value={inputs.bonus}
                    onChange={(e) => setInputs({ ...inputs, bonus: e.target.value })}
                  />
                </div>

                <Button onClick={calculate} className="w-full" size="lg">
                  Calculate Total Comp
                </Button>
              </CardContent>
            </Card>

            {/* Results Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Total Compensation</CardTitle>
                <CardDescription>Breakdown of your offer package</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-muted-foreground">Base Salary</span>
                    <span className="font-medium">{formatCurrency(parseFloat(inputs.baseSalary) || 0)}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-muted-foreground">Equity Value (4yr)</span>
                    <span className="font-medium">{formatCurrency(results.equityValue)}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-muted-foreground">Annual Bonus</span>
                    <span className="font-medium">{formatCurrency(parseFloat(inputs.bonus) || 0)}</span>
                  </div>

                  <div className="flex justify-between items-center py-4 bg-primary/10 px-4 rounded-lg">
                    <span className="font-semibold text-lg">Total Annual Comp</span>
                    <span className="font-bold text-2xl">{formatCurrency(results.totalComp)}</span>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Monthly (before tax)</span>
                    <span className="font-medium">{formatCurrency(results.monthlyComp)}</span>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">💡 Want detailed benchmarks?</p>
                    <p className="text-sm mb-4">
                      See how your offer compares to P25/P50/P75 percentiles for your role and location
                    </p>
                    <Link href="/benchmark">
                      <Button variant="outline" className="w-full">
                        Get Benchmark Report - $49
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Tools */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">More Free Tools</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Equity Calculator</CardTitle>
                  <CardDescription>Calculate equity value and dilution</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is My Offer Fair?</CardTitle>
                  <CardDescription>Quick fairness check</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Negotiation Tips</CardTitle>
                  <CardDescription>Expert advice for negotiations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
