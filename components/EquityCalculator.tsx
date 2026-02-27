'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EquityCalculatorProps {
  equityPct: number; // e.g., 0.0006 for 0.06%
  role: string;
  level: string;
  stage: string;
}

interface Scenario {
  name: string;
  multiplier: number;
  color: string;
  description: string;
}

const scenarios: Scenario[] = [
  {
    name: 'Conservative',
    multiplier: 2,
    color: 'blue',
    description: '2x growth over 4 years'
  },
  {
    name: 'Realistic',
    multiplier: 5,
    color: 'indigo',
    description: '5x growth over 4 years'
  },
  {
    name: 'Optimistic',
    multiplier: 10,
    color: 'purple',
    description: '10x growth over 4 years'
  },
];

const stageValuations: Record<string, number> = {
  'Early': 10_000_000,    // $10M
  'Growth': 50_000_000,   // $50M
  'Scale': 200_000_000,   // $200M
  'Late': 1_000_000_000,  // $1B
};

export default function EquityCalculator({ 
  equityPct, 
  role, 
  level, 
  stage 
}: EquityCalculatorProps) {
  const [currentValuation, setCurrentValuation] = useState(
    stageValuations[stage] || 50_000_000
  );
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[1]); // Realistic as default

  const calculateEquityValue = (scenario: Scenario) => {
    const exitValuation = currentValuation * scenario.multiplier;
    const yourEquityValue = exitValuation * equityPct;
    return yourEquityValue;
  };

  const formatCurrency = (value: number) => {
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const formatPct = (value: number) => {
    return `${(value * 100).toFixed(3)}%`;
  };

  // Calculate vesting schedule (monthly over 4 years)
  const months = 48;
  const monthlyVestingPct = equityPct / months;
  
  // Simulate equity value growth over time
  const vestingTimeline = Array.from({ length: 13 }, (_, i) => {
    const year = i;
    const vestedPct = Math.min(equityPct, (year * 12 * monthlyVestingPct));
    const value = currentValuation * selectedScenario.multiplier * vestedPct;
    return {
      year,
      vestedPct,
      value,
    };
  }).filter((_, i) => i % 1 === 0); // Every year

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3">
          📈 Equity Value Calculator
        </h2>
        <p className="text-lg text-gray-600">
          Your {formatPct(equityPct)} equity could be worth:
        </p>
      </div>

      {/* Current Setup */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h3 className="font-semibold mb-4">Your Grant Details</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Equity Grant</div>
            <div className="text-2xl font-bold text-indigo-600">
              {formatPct(equityPct)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Current Valuation</div>
            <div className="text-2xl font-bold">
              {formatCurrency(currentValuation)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Vesting Schedule</div>
            <div className="text-lg font-semibold">4 years, monthly</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Cliff Period</div>
            <div className="text-lg font-semibold">1 year</div>
          </div>
        </div>
      </div>

      {/* Scenario Selector */}
      <div>
        <h3 className="font-semibold mb-4">Select Exit Scenario</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((scenario) => {
            const value = calculateEquityValue(scenario);
            const isSelected = selectedScenario.name === scenario.name;
            
            return (
              <button
                key={scenario.name}
                onClick={() => setSelectedScenario(scenario)}
                className={`p-6 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? `border-${scenario.color}-600 bg-${scenario.color}-50 shadow-lg`
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="text-sm text-gray-600 mb-1">{scenario.name}</div>
                <div className="text-3xl font-bold mb-2">
                  {formatCurrency(value)}
                </div>
                <div className="text-sm text-gray-600">{scenario.description}</div>
                <div className="text-xs text-gray-500 mt-2">
                  Exit: {formatCurrency(currentValuation * scenario.multiplier)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vesting Timeline */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Vesting Timeline ({selectedScenario.name} Scenario)</h3>
        
        <div className="space-y-3">
          {vestingTimeline.map((point, i) => {
            if (point.year > 4) return null; // Only show first 4 years
            
            const isCliff = point.year === 1;
            const width = (point.vestedPct / equityPct) * 100;
            
            return (
              <div key={i} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium">
                    Year {point.year}
                    {isCliff && <span className="ml-2 text-xs text-orange-600">(Cliff)</span>}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(point.value)}
                  </div>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatPct(point.vestedPct)} vested
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Total After 4 Years</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(calculateEquityValue(selectedScenario))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Monthly Vesting</div>
              <div className="text-lg font-semibold">
                {formatCurrency(
                  (currentValuation * selectedScenario.multiplier * monthlyVestingPct)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h3 className="font-semibold mb-4">All Scenarios Comparison</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4">Scenario</th>
                <th className="text-right py-3 px-4">Exit Valuation</th>
                <th className="text-right py-3 px-4">Your Equity Value</th>
                <th className="text-right py-3 px-4">Annual Gain</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((scenario) => {
                const value = calculateEquityValue(scenario);
                const exitVal = currentValuation * scenario.multiplier;
                const annualGain = (value - currentValuation * equityPct) / 4;
                
                return (
                  <tr key={scenario.name} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">{scenario.name}</td>
                    <td className="text-right py-3 px-4">{formatCurrency(exitVal)}</td>
                    <td className="text-right py-3 px-4 font-bold text-green-600">
                      {formatCurrency(value)}
                    </td>
                    <td className="text-right py-3 px-4 text-gray-600">
                      +{formatCurrency(annualGain)}/yr
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span>⚠️</span>
          Important Disclaimers
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• These are illustrative projections, not guarantees</li>
          <li>• Actual outcomes may vary significantly based on company performance</li>
          <li>• Equity value depends on future funding rounds, dilution, and exit events</li>
          <li>• Tax implications (AMT, capital gains) not included in calculations</li>
          <li>• Always consult with a financial advisor before making decisions</li>
        </ul>
      </div>
    </div>
  );
}
