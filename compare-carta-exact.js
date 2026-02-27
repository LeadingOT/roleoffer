// Compare our data vs Carta screenshots

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

console.log('=' .repeat(100));
console.log('CARTA COMPARISON - Our Data vs Real Carta Data');
console.log('=' .repeat(100));
console.log('\n');

// Screenshot 1: Engineering, SF, $250M-$500M (Late Stage)
console.log('📸 SCREENSHOT 1: Engineering, SF, $250M-$500M raised (LATE STAGE)');
console.log('-'.repeat(100));

const levels1 = [
  { carta: 'Level 2 (Mid 1)', our: 'Mid', cartaBase50: 123, cartaTotal50: 136, cartaEquity50: 0.0160 },
  { carta: 'Level 3 (Mid 2)', our: 'Mid', cartaBase50: 140, cartaTotal50: 159, cartaEquity50: 0.0228 },
  { carta: 'Level 4 (Senior 1)', our: 'Senior', cartaBase50: 161, cartaTotal50: 182, cartaEquity50: 0.0276 }
];

levels1.forEach(level => {
  const ourData = getBenchmark({ role: 'Software Engineer', level: level.our, stage: 'Late', location: 'San Francisco' });
  
  console.log(`\n${level.carta}:`);
  console.log(`  Carta P50:  Base $${level.cartaBase50}K | Total $${level.cartaTotal50}K | Equity ${(level.cartaEquity50*100).toFixed(2)}%`);
  
  if (ourData) {
    console.log(`  Our P50:    Base $${(ourData.p50_base/1000).toFixed(0)}K | Total $${(ourData.p50_total_cash/1000).toFixed(0)}K | Equity ${(ourData.p50_equity_pct*100).toFixed(2)}%`);
    console.log(`  Variance:   Base ${((ourData.p50_base/1000 - level.cartaBase50)/level.cartaBase50*100).toFixed(0)}% | Total ${((ourData.p50_total_cash/1000 - level.cartaTotal50)/level.cartaTotal50*100).toFixed(0)}% | Equity ${((ourData.p50_equity_pct - level.cartaEquity50)/level.cartaEquity50*100).toFixed(0)}%`);
    
    console.log('\n  Full Distribution:');
    console.log(`    Carta:  P25=$${level.cartaBase50*0.82}K | P50=$${level.cartaBase50}K | P75=$${level.cartaBase50*1.14}K (estimated)`);
    console.log(`    Our:    P25=$${(ourData.p25_base/1000).toFixed(0)}K | P50=$${(ourData.p50_base/1000).toFixed(0)}K | P75=$${(ourData.p75_base/1000).toFixed(0)}K | P90=$${(ourData.p90_base/1000).toFixed(0)}K`);
  }
});

console.log('\n\n');

// Screenshot 2: Engineering, NYC, $50M-$100M (Scale Stage)
console.log('📸 SCREENSHOT 2: Engineering, NYC, $50M-$100M raised (SCALE STAGE)');
console.log('-'.repeat(100));

const levels2 = [
  { carta: 'Level 2 (Mid 1)', our: 'Mid', cartaBase50: 124, cartaTotal50: 132, cartaEquity50: 0.0380 },
  { carta: 'Level 3 (Mid 2)', our: 'Mid', cartaBase50: 130, cartaTotal50: 144, cartaEquity50: 0.0536 },
  { carta: 'Level 4 (Senior 1)', our: 'Senior', cartaBase50: 156, cartaTotal50: 172, cartaEquity50: 0.0636 }
];

levels2.forEach(level => {
  const ourData = getBenchmark({ role: 'Software Engineer', level: level.our, stage: 'Scale', location: 'New York' });
  
  console.log(`\n${level.carta}:`);
  console.log(`  Carta P50:  Base $${level.cartaBase50}K | Total $${level.cartaTotal50}K | Equity ${(level.cartaEquity50*100).toFixed(2)}%`);
  
  if (ourData) {
    console.log(`  Our P50:    Base $${(ourData.p50_base/1000).toFixed(0)}K | Total $${(ourData.p50_total_cash/1000).toFixed(0)}K | Equity ${(ourData.p50_equity_pct*100).toFixed(2)}%`);
    console.log(`  Variance:   Base ${((ourData.p50_base/1000 - level.cartaBase50)/level.cartaBase50*100).toFixed(0)}% | Total ${((ourData.p50_total_cash/1000 - level.cartaTotal50)/level.cartaTotal50*100).toFixed(0)}% | Equity ${((ourData.p50_equity_pct - level.cartaEquity50)/level.cartaEquity50*100).toFixed(0)}%`);
    
    console.log('\n  Full Distribution:');
    console.log(`    Our:    P25=$${(ourData.p25_base/1000).toFixed(0)}K | P50=$${(ourData.p50_base/1000).toFixed(0)}K | P75=$${(ourData.p75_base/1000).toFixed(0)}K | P90=$${(ourData.p90_base/1000).toFixed(0)}K`);
    console.log(`    Equity: P25=${(ourData.p25_equity_pct*100).toFixed(2)}% | P50=${(ourData.p50_equity_pct*100).toFixed(2)}% | P75=${(ourData.p75_equity_pct*100).toFixed(2)}% | P90=${(ourData.p90_equity_pct*100).toFixed(2)}%`);
  }
});

console.log('\n\n');

// Screenshot 3: Design, SF, $250M-$500M (Late Stage)
console.log('📸 SCREENSHOT 3: Design, SF, $250M-$500M raised (LATE STAGE)');
console.log('-'.repeat(100));

const levels3 = [
  { carta: 'Level 2 (Mid 1)', our: 'Mid', cartaBase50: 114, cartaTotal50: 124, cartaEquity50: 0.0112 },
  { carta: 'Level 4 (Senior 1)', our: 'Senior', cartaBase50: 141, cartaTotal50: 160, cartaEquity50: 0.0208 }
];

levels3.forEach(level => {
  const ourData = getBenchmark({ role: 'Designer', level: level.our, stage: 'Late', location: 'San Francisco' });
  
  console.log(`\n${level.carta}:`);
  console.log(`  Carta P50:  Base $${level.cartaBase50}K | Total $${level.cartaTotal50}K | Equity ${(level.cartaEquity50*100).toFixed(2)}%`);
  
  if (ourData) {
    console.log(`  Our P50:    Base $${(ourData.p50_base/1000).toFixed(0)}K | Total $${(ourData.p50_total_cash/1000).toFixed(0)}K | Equity ${(ourData.p50_equity_pct*100).toFixed(2)}%`);
    console.log(`  Variance:   Base ${((ourData.p50_base/1000 - level.cartaBase50)/level.cartaBase50*100).toFixed(0)}% | Total ${((ourData.p50_total_cash/1000 - level.cartaTotal50)/level.cartaTotal50*100).toFixed(0)}% | Equity ${((ourData.p50_equity_pct - level.cartaEquity50)/level.cartaEquity50*100).toFixed(0)}%`);
    
    console.log('\n  Full Distribution:');
    console.log(`    Our:    P25=$${(ourData.p25_base/1000).toFixed(0)}K | P50=$${(ourData.p50_base/1000).toFixed(0)}K | P75=$${(ourData.p75_base/1000).toFixed(0)}K | P90=$${(ourData.p90_base/1000).toFixed(0)}K`);
    console.log(`    Equity: P25=${(ourData.p25_equity_pct*100).toFixed(2)}% | P50=${(ourData.p50_equity_pct*100).toFixed(2)}% | P75=${(ourData.p75_equity_pct*100).toFixed(2)}% | P90=${(ourData.p90_equity_pct*100).toFixed(2)}%`);
  }
});

console.log('\n\n');
console.log('=' .repeat(100));
console.log('SUMMARY');
console.log('=' .repeat(100));
console.log('\n❌ BASE SALARY: Consistently 40-100% TOO HIGH');
console.log('❌ EQUITY: Consistently 200-600% TOO HIGH (2-6x over)');
console.log('❌ LATE STAGE LOGIC: Completely backwards (should pay LESS, not more)');
console.log('\n✅ CONFIDENCE LEVEL: 0% - Data needs complete overhaul\n');
