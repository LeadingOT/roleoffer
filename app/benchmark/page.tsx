'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Options {
  roles: string[];
  locations: string[];
  stages: string[];
}

const LEVELS = [
  'IC1 (Junior)',
  'IC2',
  'IC3 (Mid-level)',
  'IC4 (Senior)',
  'IC5 (Staff)',
  'IC6 (Principal)',
  'M1 (Manager)',
  'M2 (Senior Manager)',
  'M3 (Director)',
];

export default function BenchmarkPage() {
  const router = useRouter();
  const [options, setOptions] = useState<Options>({ roles: [], locations: [], stages: [] });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    role: '',
    level: '',
    location: '',
    stage: '',
    email: '',
  });

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await fetch('/api/options');
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error('Failed to fetch options:', error);
      // Use fallback
      setOptions({
        roles: ['Software Engineer', 'Senior Software Engineer', 'Product Manager'],
        locations: ['San Francisco', 'New York', 'Seattle'],
        stages: ['Seed', 'Series A', 'Series B']
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would validate and process payment
    // For MVP, we'll just show the results
    const params = new URLSearchParams({
      role: formData.role,
      level: formData.level,
      location: formData.location,
      stage: formData.stage,
    });
    router.push(`/results?${params.toString()}`);
  };

  const isFormValid = formData.role && formData.level && formData.location && formData.stage && formData.email;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Get Your Compensation Benchmark</h1>
            <p className="text-lg text-muted-foreground">
              Enter your details to receive a comprehensive compensation report with P25/P50/P75 percentiles
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Benchmark Details</CardTitle>
              <CardDescription>Tell us about the role you're hiring for or evaluating</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="role">Role / Job Title</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level / Seniority</Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage">Company Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
                    <SelectTrigger id="stage">
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.stages.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    We'll send your comprehensive benchmark report to this email
                  </p>
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full" disabled={!isFormValid}>
                    Get Benchmark Report - $49
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Payment processing available soon. For now, view sample report.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Not ready to pay? Try our{' '}
              <a href="/calculator" className="text-primary hover:underline">
                free compensation calculator
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
