'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Wizard steps
type Step = 'role' | 'level' | 'stage' | 'size' | 'location' | 'results';

const ROLES = [
  { id: 'Software Engineer', label: '👨‍💻 Software Engineer', desc: 'Backend, Frontend, Full-stack' },
  { id: 'Engineering Manager', label: '👔 Engineering Manager', desc: 'EM, Director, VP Engineering' },
  { id: 'Product Manager', label: '📊 Product Manager', desc: 'PM, Senior PM, Product Lead' },
  { id: 'Designer', label: '🎨 Designer', desc: 'Product Designer, UX/UI' },
  { id: 'Data Scientist', label: '📈 Data Scientist', desc: 'ML Engineer, Data Analyst' },
  { id: 'Marketing', label: '📢 Marketing', desc: 'Growth, Content, Brand' },
  { id: 'Sales', label: '💼 Sales', desc: 'AE, SDR, Enterprise' },
];

const LEVELS = [
  { id: 'Junior', label: '🌱 Junior', desc: '0-2 years experience' },
  { id: 'Mid', label: '📚 Mid-Level', desc: '3-5 years experience' },
  { id: 'Senior', label: '🎯 Senior', desc: '6-10 years experience' },
  { id: 'Staff', label: '⭐ Staff+', desc: '10+ years, tech lead' },
];

const STAGES = [
  { id: 'Early', label: '🌱 Early Stage', desc: 'Seed - Series A, <$5M raised, <25 people' },
  { id: 'Growth', label: '📈 Growth Stage', desc: 'Series A-B, $5M-$50M raised, 25-200 people' },
  { id: 'Scale', label: '🚀 Scale Stage', desc: 'Series C+, $50M-$200M raised, 200-1000 people' },
  { id: 'Late', label: '🏢 Late Stage', desc: '>$200M raised or unicorn, 1000+ people' },
];

const LOCATIONS = [
  { id: 'San Francisco', label: '🌉 San Francisco', desc: 'Bay Area' },
  { id: 'New York', label: '🗽 New York', desc: 'NYC metro' },
  { id: 'Austin', label: '🤠 Austin', desc: 'Texas' },
  { id: 'Remote', label: '🌍 Remote', desc: 'Anywhere' },
];

export default function BenchmarkWizard() {
  const [step, setStep] = useState<Step>('role');
  const [selections, setSelections] = useState({
    role: '',
    level: '',
    stage: '',
    location: '',
  });

  const handleSelect = (key: string, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    
    // Auto-advance to next step
    const stepOrder: Step[] = ['role', 'level', 'stage', 'location', 'results'];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex < stepOrder.length - 1) {
      setTimeout(() => setStep(stepOrder[currentIndex + 1]), 300);
    }
  };

  const progress = {
    role: 20,
    level: 40,
    stage: 60,
    location: 80,
    results: 100,
  }[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {stepOrder.indexOf(step) + 1} of 4
            </span>
            <span className="text-sm font-medium text-indigo-600">{progress}% complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Cards */}
        <div className="max-w-3xl mx-auto">
          {step === 'role' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-3">What role are you hiring for?</h1>
                <p className="text-xl text-gray-600">Select the position you want to benchmark</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {ROLES.map(role => (
                  <button
                    key={role.id}
                    onClick={() => handleSelect('role', role.id)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg hover:scale-105 ${
                      selections.role === role.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="text-2xl font-bold mb-2">{role.label}</div>
                    <div className="text-sm text-gray-600">{role.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'level' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-3">What's their experience level?</h1>
                <p className="text-xl text-gray-600">Choose the seniority level</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {LEVELS.map(level => (
                  <button
                    key={level.id}
                    onClick={() => handleSelect('level', level.id)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg hover:scale-105 ${
                      selections.level === level.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="text-2xl font-bold mb-2">{level.label}</div>
                    <div className="text-sm text-gray-600">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'stage' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-3">What's your company stage?</h1>
                <p className="text-xl text-gray-600">Based on funding and team size</p>
              </div>
              <div className="grid gap-4">
                {STAGES.map(stage => (
                  <button
                    key={stage.id}
                    onClick={() => handleSelect('stage', stage.id)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg hover:scale-105 ${
                      selections.stage === stage.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="text-2xl font-bold mb-2">{stage.label}</div>
                    <div className="text-sm text-gray-600">{stage.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'location' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-3">Where is the candidate located?</h1>
                <p className="text-xl text-gray-600">Location affects compensation ranges</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {LOCATIONS.map(loc => (
                  <button
                    key={loc.id}
                    onClick={() => handleSelect('location', loc.id)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg hover:scale-105 ${
                      selections.location === loc.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="text-2xl font-bold mb-2">{loc.label}</div>
                    <div className="text-sm text-gray-600">{loc.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'results' && (
            <div className="text-center">
              <div className="animate-pulse mb-8">
                <div className="text-6xl mb-4">📊</div>
                <h2 className="text-3xl font-bold mb-3">Generating your benchmark report...</h2>
                <p className="text-xl text-gray-600">Based on {selections.role} - {selections.level} at {selections.stage} stage in {selections.location}</p>
              </div>
              <div className="mt-12">
                <Button 
                  size="lg" 
                  onClick={() => window.location.href = `/results?role=${selections.role}&level=${selections.level}&stage=${selections.stage}&location=${selections.location}`}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-lg px-10 py-6"
                >
                  View Your Report →
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        {step !== 'role' && step !== 'results' && (
          <div className="max-w-3xl mx-auto mt-8">
            <button
              onClick={() => {
                const stepOrder: Step[] = ['role', 'level', 'stage', 'location'];
                const currentIndex = stepOrder.indexOf(step);
                if (currentIndex > 0) setStep(stepOrder[currentIndex - 1]);
              }}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const stepOrder: Step[] = ['role', 'level', 'stage', 'location', 'results'];
