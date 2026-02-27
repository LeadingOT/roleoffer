// Generate benchmark data based on company stage + role + level

const fs = require('fs');

// Compensation multipliers by stage (relative to Growth = 1.0)
const STAGE_MULTIPLIERS = {
  Early: {
    base: 0.85,      // Early stage pays 15% less base
    equity: 3.0,     // But 3x more equity (adjusted from 2.5x)
    totalCash: 0.90
  },
  Growth: {
    base: 1.0,       // Baseline
    equity: 1.0,
    totalCash: 1.0
  },
  Scale: {
    base: 1.15,      // 15% more base
    equity: 0.5,     // But half the equity
    totalCash: 1.20
  },
  Late: {
    base: 1.25,      // 25% more base
    equity: 0.25,    // Quarter of the equity
    totalCash: 1.35
  }
};

// Base compensation by role and level (Growth stage baseline)
const BASE_COMP = {
  'Software Engineer': {
    Junior: { base: 130, totalCash: 145, equity: 0.0015 },  // 0.15%
    Mid: { base: 160, totalCash: 180, equity: 0.0025 },     // 0.25%
    Senior: { base: 195, totalCash: 220, equity: 0.0035 },  // 0.35%
    Staff: { base: 240, totalCash: 280, equity: 0.0050 }    // 0.50%
  },
  'Engineering Manager': {
    Junior: { base: 170, totalCash: 195, equity: 0.0025 },  // First-time manager
    Mid: { base: 200, totalCash: 230, equity: 0.0035 },     // Manager of 5-10
    Senior: { base: 240, totalCash: 280, equity: 0.0050 },  // Senior EM / Director
    Staff: { base: 290, totalCash: 340, equity: 0.0070 }    // VP Engineering
  },
  'Product Manager': {
    Junior: { base: 120, totalCash: 135, equity: 0.0012 },
    Mid: { base: 150, totalCash: 170, equity: 0.0020 },
    Senior: { base: 185, totalCash: 210, equity: 0.0030 },
    Staff: { base: 230, totalCash: 270, equity: 0.0045 }
  },
  'Designer': {
    Junior: { base: 115, totalCash: 128, equity: 0.0010 },
    Mid: { base: 145, totalCash: 162, equity: 0.0018 },
    Senior: { base: 175, totalCash: 198, equity: 0.0025 },
    Staff: { base: 210, totalCash: 245, equity: 0.0038 }    // Design Director
  },
  'Data Scientist': {
    Junior: { base: 135, totalCash: 150, equity: 0.0015 },
    Mid: { base: 165, totalCash: 186, equity: 0.0025 },
    Senior: { base: 200, totalCash: 230, equity: 0.0035 },
    Staff: { base: 245, totalCash: 290, equity: 0.0050 }
  },
  'Marketing': {
    Junior: { base: 115, totalCash: 130, equity: 0.0008 },   // Marketing Coordinator
    Mid: { base: 135, totalCash: 155, equity: 0.0015 },     // Marketing Manager
    Senior: { base: 175, totalCash: 205, equity: 0.0025 },  // Senior Marketing Manager
    Staff: { base: 220, totalCash: 260, equity: 0.0040 }    // Head of Marketing / CMO
  },
  'Sales': {
    Junior: { base: 95, totalCash: 140, equity: 0.0008 },   // SDR / BDR (high OTE)
    Mid: { base: 120, totalCash: 190, equity: 0.0015 },     // Account Executive (OTE ~2x base)
    Senior: { base: 150, totalCash: 250, equity: 0.0025 },  // Senior AE / Enterprise
    Staff: { base: 190, totalCash: 330, equity: 0.0040 }    // VP Sales (high variable)
  },
  'Customer Success': {
    Junior: { base: 100, totalCash: 115, equity: 0.0008 },   // CS Associate
    Mid: { base: 120, totalCash: 140, equity: 0.0015 },     // CSM
    Senior: { base: 150, totalCash: 175, equity: 0.0025 },  // Senior CSM / Team Lead
    Staff: { base: 185, totalCash: 220, equity: 0.0040 }    // Head of CS
  },
  'Operations': {
    Junior: { base: 100, totalCash: 115, equity: 0.0008 },   // Operations Coordinator
    Mid: { base: 130, totalCash: 150, equity: 0.0015 },     // Operations Manager
    Senior: { base: 165, totalCash: 190, equity: 0.0025 },  // Senior Ops Manager
    Staff: { base: 205, totalCash: 240, equity: 0.0040 }    // Head of Ops / COO
  },
  'People/HR': {
    Junior: { base: 100, totalCash: 115, equity: 0.0008 },   // HR Coordinator / Recruiter
    Mid: { base: 125, totalCash: 145, equity: 0.0015 },     // HR Manager / Sr Recruiter
    Senior: { base: 160, totalCash: 185, equity: 0.0025 },  // Senior HR Manager
    Staff: { base: 200, totalCash: 235, equity: 0.0040 }    // Head of People / CPO
  },
  'Finance': {
    Junior: { base: 100, totalCash: 115, equity: 0.0008 },   // Financial Analyst
    Mid: { base: 130, totalCash: 150, equity: 0.0015 },     // Finance Manager
    Senior: { base: 170, totalCash: 200, equity: 0.0025 },  // Senior Finance Manager
    Staff: { base: 215, totalCash: 255, equity: 0.0040 }    // CFO
  }
};

// Location multipliers (SF Bay Area = 1.0)
const LOCATION_MULTIPLIERS = {
  'San Francisco': 1.0,
  'New York': 0.95,
  'Austin': 0.75,      // Adjusted from 0.80
  'Remote': 0.85
};

function generateBenchmark(role, level, stage, location) {
  const baseComp = BASE_COMP[role][level];
  const stageMulti = STAGE_MULTIPLIERS[stage];
  const locMulti = LOCATION_MULTIPLIERS[location];
  
  return {
    role,
    level,
    stage,
    location,
    p25_base: Math.round(baseComp.base * stageMulti.base * locMulti * 0.90 * 1000),
    p50_base: Math.round(baseComp.base * stageMulti.base * locMulti * 1000),
    p75_base: Math.round(baseComp.base * stageMulti.base * locMulti * 1.10 * 1000),
    p90_base: Math.round(baseComp.base * stageMulti.base * locMulti * 1.25 * 1000),  // Increased from 1.20
    
    p25_total_cash: Math.round(baseComp.totalCash * stageMulti.totalCash * locMulti * 0.90 * 1000),
    p50_total_cash: Math.round(baseComp.totalCash * stageMulti.totalCash * locMulti * 1000),
    p75_total_cash: Math.round(baseComp.totalCash * stageMulti.totalCash * locMulti * 1.10 * 1000),
    p90_total_cash: Math.round(baseComp.totalCash * stageMulti.totalCash * locMulti * 1.25 * 1000),  // Increased from 1.20
    
    p25_equity_pct: baseComp.equity * stageMulti.equity * 0.70,
    p50_equity_pct: baseComp.equity * stageMulti.equity,
    p75_equity_pct: baseComp.equity * stageMulti.equity * 1.40,
    p90_equity_pct: baseComp.equity * stageMulti.equity * 1.80,
    
    sample_size: Math.floor(Math.random() * 30) + 20 // 20-50 samples
  };
}

// Generate all combinations
const benchmarks = [];
const roles = Object.keys(BASE_COMP);
const levels = ['Junior', 'Mid', 'Senior', 'Staff'];
const stages = ['Early', 'Growth', 'Scale', 'Late'];
const locations = ['San Francisco', 'New York', 'Austin', 'Remote'];

roles.forEach(role => {
  levels.forEach(level => {
    stages.forEach(stage => {
      locations.forEach(location => {
        benchmarks.push(generateBenchmark(role, level, stage, location));
      });
    });
  });
});

console.log(`📊 Generated ${benchmarks.length} benchmarks`);
console.log(`\nSample benchmarks:\n`);

// Show a few examples
[
  benchmarks.find(b => b.role === 'Software Engineer' && b.level === 'Senior' && b.stage === 'Early' && b.location === 'San Francisco'),
  benchmarks.find(b => b.role === 'Software Engineer' && b.level === 'Senior' && b.stage === 'Growth' && b.location === 'San Francisco'),
  benchmarks.find(b => b.role === 'Software Engineer' && b.level === 'Senior' && b.stage === 'Late' && b.location === 'San Francisco'),
  benchmarks.find(b => b.role === 'Product Manager' && b.level === 'Mid' && b.stage === 'Growth' && b.location === 'New York')
].forEach(b => {
  console.log(`${b.role} - ${b.level} - ${b.stage} - ${b.location}:`);
  console.log(`  Base: $${b.p25_base.toLocaleString()} - $${b.p75_base.toLocaleString()} (P50: $${b.p50_base.toLocaleString()})`);
  console.log(`  Total Cash: $${b.p25_total_cash.toLocaleString()} - $${b.p75_total_cash.toLocaleString()} (P50: $${b.p50_total_cash.toLocaleString()})`);
  console.log(`  Equity: ${(b.p25_equity_pct*100).toFixed(2)}% - ${(b.p75_equity_pct*100).toFixed(2)}% (P50: ${(b.p50_equity_pct*100).toFixed(2)}%)`);
  console.log('');
});

// Save to JSON
fs.writeFileSync(
  __dirname + '/../data/benchmarks-generated.json',
  JSON.stringify(benchmarks, null, 2)
);

console.log(`✅ Saved to data/benchmarks-generated.json`);
