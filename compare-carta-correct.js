// Correct comparison with proper equity reading

const benchmarksData = require('./data/benchmarks-generated.json');

function getBenchmark(query) {
  return benchmarksData.find(
    b =>
      b.role === query.role &&
      b.level === query.level &&
      b.stage === query.stage &&
      b.location === query.location
  );
}

console.log('╔' + '═'.repeat(98) + '╗');
console.log('║' + ' CORRECTED CARTA COMPARISON - Exact Scenario Match '.padEnd(98) + '║');
console.log('╚' + '═'.repeat(98) + '╝');
console.log('\n');

// Screenshot 1
console.log('📸 SCREENSHOT 1: Engineering, SF, $250M-$500M raised (LATE STAGE)\n');

const scenarios1 = [
  { level: 'Level 2 (Mid 1)', our: 'Mid', base: 123, equity: 0.0160 },
  { level: 'Level 3 (Mid 2)', our: 'Mid', base: 140, equity: 0.0228 },
  { level: 'Level 4 (Senior 1)', our: 'Senior', base: 161, equity: 0.0276 }
];

scenarios1.forEach(s => {
  const ourData = getBenchmark({ role: 'Software Engineer', level: s.our, stage: 'Late', location: 'San Francisco' });
  
  console.log(`${s.level}:`);
  console.log(`  📊 Carta:    Base $${s.base}K | Equity ${s.equity.toFixed(4)}%`);
  console.log(`  📊 Our Data: Base $${(ourData.p50_base/1000).toFixed(0)}K | Equity ${(ourData.p50_equity_pct*100).toFixed(4)}%`);
  
  const baseVar = ((ourData.p50_base/1000 - s.base) / s.base * 100);
  const equityVar = ((ourData.p50_equity_pct*100 - s.equity) / s.equity * 100);
  
  console.log(`  ${baseVar > 0 ? '❌' : '✅'} Variance: Base ${baseVar >= 0 ? '+' : ''}${baseVar.toFixed(1)}% | Equity ${equityVar >= 0 ? '+' : ''}${equityVar.toFixed(1)}%`);
  console.log('');
});

console.log('\n');

// Screenshot 2
console.log('📸 SCREENSHOT 2: Engineering, NYC, $50M-$100M raised (SCALE STAGE)\n');

const scenarios2 = [
  { level: 'Level 2 (Mid 1)', our: 'Mid', base: 124, equity: 0.0380 },
  { level: 'Level 3 (Mid 2)', our: 'Mid', base: 130, equity: 0.0536 },
  { level: 'Level 4 (Senior 1)', our: 'Senior', base: 156, equity: 0.0636 }
];

scenarios2.forEach(s => {
  const ourData = getBenchmark({ role: 'Software Engineer', level: s.our, stage: 'Scale', location: 'New York' });
  
  console.log(`${s.level}:`);
  console.log(`  📊 Carta:    Base $${s.base}K | Equity ${s.equity.toFixed(4)}%`);
  console.log(`  📊 Our Data: Base $${(ourData.p50_base/1000).toFixed(0)}K | Equity ${(ourData.p50_equity_pct*100).toFixed(4)}%`);
  
  const baseVar = ((ourData.p50_base/1000 - s.base) / s.base * 100);
  const equityVar = ((ourData.p50_equity_pct*100 - s.equity) / s.equity * 100);
  
  console.log(`  ${baseVar > 0 ? '❌' : '✅'} Variance: Base ${baseVar >= 0 ? '+' : ''}${baseVar.toFixed(1)}% | Equity ${equityVar >= 0 ? '+' : ''}${equityVar.toFixed(1)}%`);
  console.log('');
});

console.log('\n');

// Screenshot 3
console.log('📸 SCREENSHOT 3: Design, SF, $250M-$500M raised (LATE STAGE)\n');

const scenarios3 = [
  { level: 'Level 2 (Mid 1)', our: 'Mid', base: 114, equity: 0.0112 },
  { level: 'Level 4 (Senior 1)', our: 'Senior', base: 141, equity: 0.0208 }
];

scenarios3.forEach(s => {
  const ourData = getBenchmark({ role: 'Designer', level: s.our, stage: 'Late', location: 'San Francisco' });
  
  console.log(`${s.level}:`);
  console.log(`  📊 Carta:    Base $${s.base}K | Equity ${s.equity.toFixed(4)}%`);
  console.log(`  📊 Our Data: Base $${(ourData.p50_base/1000).toFixed(0)}K | Equity ${(ourData.p50_equity_pct*100).toFixed(4)}%`);
  
  const baseVar = ((ourData.p50_base/1000 - s.base) / s.base * 100);
  const equityVar = ((ourData.p50_equity_pct*100 - s.equity) / s.equity * 100);
  
  console.log(`  ${baseVar > 0 ? '❌' : '✅'} Variance: Base ${baseVar >= 0 ? '+' : ''}${baseVar.toFixed(1)}% | Equity ${equityVar >= 0 ? '+' : ''}${equityVar.toFixed(1)}%`);
  console.log('');
});

console.log('\n' + '═'.repeat(100));
console.log('VERDICT'.padStart(52));
console.log('═'.repeat(100) + '\n');

console.log('❌ BASE SALARY: +34% to +63% too high across all scenarios');
console.log('❌ EQUITY:      +180% to +370% too high (3-4x over)');
console.log('❌ PATTERN:     Late stage pays LESS than Scale, not more\n');
console.log('💀 CONFIDENCE:  0% - Complete overhaul required\n');
console.log('📝 ROOT CAUSE:  Wrong assumptions about Late stage comp + equity scale off by 3-4x\n');
