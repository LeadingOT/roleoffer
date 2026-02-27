// Validate V2 against 4 new Carta exports

const v2Data = require('./data/benchmarks-generated.json');

// Extract key data from new CSVs (manual)
const newCartaData = [
  // File 1: Engineering, SF, $1M-$10M (Early)
  { role: 'Software Engineer', level: 'Mid', stage: 'Early', location: 'San Francisco', 
    base: 120, equity: 0.0680, peerGroup: '$1M-$10M', notes: 'IC2 Mid 1' },
  { role: 'Software Engineer', level: 'Senior', stage: 'Early', location: 'San Francisco', 
    base: 148, equity: 0.0856, peerGroup: '$1M-$10M', notes: 'IC4 Senior 1' },
  
  // File 2: Marketing, SF, Above $1B (Late)
  { role: 'Marketing', level: 'Mid', stage: 'Late', location: 'San Francisco', 
    base: 95, equity: 0.0024, peerGroup: 'Above $1B', notes: 'IC2 Mid 1' },
  { role: 'Marketing', level: 'Senior', stage: 'Late', location: 'San Francisco', 
    base: 139, equity: 0.0044, peerGroup: 'Above $1B', notes: 'IC4 Senior 1' },
  
  // File 3: Sales, NYC, $250M-$500M (Late)
  { role: 'Sales', level: 'Mid', stage: 'Late', location: 'New York', 
    base: 73, totalCash: 130, equity: 0.0092, peerGroup: '$250M-$500M', notes: 'IC2 Mid 1, OTE $130K' },
  { role: 'Sales', level: 'Senior', stage: 'Late', location: 'New York', 
    base: 122, totalCash: 192, equity: 0.0124, peerGroup: '$250M-$500M', notes: 'IC4 Senior 1, OTE $192K' },
  
  // File 4: Sales, SF, $250M-$500M (Late) - same as NYC
  { role: 'Sales', level: 'Mid', stage: 'Late', location: 'San Francisco', 
    base: 73, totalCash: 130, equity: 0.0092, peerGroup: '$250M-$500M', notes: 'IC2 Mid 1, OTE $130K' },
  { role: 'Sales', level: 'Senior', stage: 'Late', location: 'San Francisco', 
    base: 122, totalCash: 192, equity: 0.0124, peerGroup: '$250M-$500M', notes: 'IC4 Senior 1, OTE $192K' },
];

console.log('╔' + '═'.repeat(98) + '╗');
console.log('║' + ' V2 VALIDATION - 4 New Carta Exports (8 data points)'.padEnd(98) + '║');
console.log('╚' + '═'.repeat(98) + '╝');
console.log('\n');

let totalBaseError = 0;
let totalEquityError = 0;
let count = 0;

newCartaData.forEach((carta, i) => {
  const our = v2Data.find(b =>
    b.role === carta.role &&
    b.level === carta.level &&
    b.stage === carta.stage &&
    b.location === carta.location
  );
  
  if (!our) {
    console.log(`⚠️  No match for ${carta.role} ${carta.level} ${carta.stage} ${carta.location}`);
    return;
  }
  
  const baseError = Math.abs((our.p50_base/1000 - carta.base) / carta.base * 100);
  const equityError = Math.abs((our.p50_equity_pct*100 - carta.equity) / carta.equity * 100);
  
  totalBaseError += baseError;
  totalEquityError += equityError;
  count++;
  
  const baseStatus = baseError < 10 ? '✅' : baseError < 20 ? '⚠️' : '❌';
  const equityStatus = equityError < 30 ? '✅' : equityError < 50 ? '⚠️' : '❌';
  
  console.log(`${i+1}. ${carta.role} ${carta.level} ${carta.stage} ${carta.location}`);
  console.log(`   Peer Group: ${carta.peerGroup} | ${carta.notes}`);
  console.log(`   ${baseStatus} Base:   Carta $${carta.base}K → Our $${(our.p50_base/1000).toFixed(0)}K (${baseError.toFixed(1)}% error)`);
  console.log(`   ${equityStatus} Equity: Carta ${carta.equity.toFixed(4)}% → Our ${(our.p50_equity_pct*100).toFixed(4)}% (${equityError.toFixed(1)}% error)`);
  if (carta.totalCash) {
    console.log(`   💰 Total Cash: Carta $${carta.totalCash}K (OTE) | Our $${(our.p50_total_cash/1000).toFixed(0)}K`);
  }
  console.log('');
});

const avgBaseError = totalBaseError / count;
const avgEquityError = totalEquityError / count;

console.log('═'.repeat(100));
console.log('NEW DATA VALIDATION SUMMARY');
console.log('═'.repeat(100));
console.log('');
console.log(`New data points validated: ${count}`);
console.log(`Average base salary error: ${avgBaseError.toFixed(1)}%`);
console.log(`Average equity error: ${avgEquityError.toFixed(1)}%`);
console.log('');

// Compare with previous 9 points
console.log('📊 OVERALL V2 PERFORMANCE (Combined):');
console.log('');
console.log('Previous 9 points:');
console.log('  - Base error: 4.0%');
console.log('  - Equity error: 65.4%');
console.log('');
console.log('New 8 points:');
console.log(`  - Base error: ${avgBaseError.toFixed(1)}%`);
console.log(`  - Equity error: ${avgEquityError.toFixed(1)}%`);
console.log('');

const combinedBase = (4.0 * 9 + avgBaseError * count) / (9 + count);
const combinedEquity = (65.4 * 9 + avgEquityError * count) / (9 + count);

console.log(`Combined (17 data points):`);
console.log(`  - Base error: ${combinedBase.toFixed(1)}%`);
console.log(`  - Equity error: ${combinedEquity.toFixed(1)}%`);
console.log('');

if (combinedBase < 10) {
  console.log('✅ BASE SALARY: Still excellent (< 10%)');
} else {
  console.log('⚠️  BASE SALARY: Needs attention (> 10%)');
}

if (combinedEquity < 70) {
  console.log('✅ EQUITY: Still acceptable (< 70%)');
} else {
  console.log('⚠️  EQUITY: Degraded accuracy');
}

console.log('');
