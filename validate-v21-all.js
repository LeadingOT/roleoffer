// Validate V2.1 against ALL 17 Carta data points

const v2Data = require('./data/benchmarks-generated.json');

// All 17 Carta validation points
const allCartaData = [
  // Original 9 points
  { role: 'Software Engineer', level: 'Mid', stage: 'Late', location: 'San Francisco', base: 123, equity: 0.0160, source: 'Screenshot 1' },
  { role: 'Software Engineer', level: 'Senior', stage: 'Scale', location: 'New York', base: 156, equity: 0.0636, source: 'Screenshot 2' },
  { role: 'Designer', level: 'Senior', stage: 'Scale', location: 'San Francisco', base: 141, equity: 0.0208, source: 'Screenshot 3' },
  { role: 'Designer', level: 'Mid', stage: 'Late', location: 'San Francisco', base: 114, equity: 0.0112, source: 'CSV 1' },
  { role: 'Software Engineer', level: 'Mid', stage: 'Growth', location: 'San Francisco', base: 126, equity: 0.0252, source: 'CSV 2' },
  { role: 'Software Engineer', level: 'Senior', stage: 'Growth', location: 'San Francisco', base: 167, equity: 0.0352, source: 'CSV 2' },
  { role: 'Data Scientist', level: 'Mid', stage: 'Late', location: 'Austin', base: 102, equity: 0.0056, source: 'CSV 3' },
  { role: 'Software Engineer', level: 'Mid', stage: 'Growth', location: 'New York', base: 119, equity: 0.0916, source: 'CSV 4' },
  { role: 'Software Engineer', level: 'Senior', stage: 'Growth', location: 'New York', base: 160, equity: 0.1428, source: 'CSV 4' },
  
  // New 8 points
  { role: 'Software Engineer', level: 'Mid', stage: 'Early', location: 'San Francisco', base: 120, equity: 0.0680, source: 'CSV 5' },
  { role: 'Software Engineer', level: 'Senior', stage: 'Early', location: 'San Francisco', base: 148, equity: 0.0856, source: 'CSV 5' },
  { role: 'Marketing', level: 'Mid', stage: 'Late', location: 'San Francisco', base: 95, equity: 0.0024, source: 'CSV 6' },
  { role: 'Marketing', level: 'Senior', stage: 'Late', location: 'San Francisco', base: 139, equity: 0.0044, source: 'CSV 6' },
  { role: 'Sales', level: 'Mid', stage: 'Late', location: 'New York', base: 73, equity: 0.0092, source: 'CSV 7' },
  { role: 'Sales', level: 'Senior', stage: 'Late', location: 'New York', base: 122, equity: 0.0124, source: 'CSV 7' },
  { role: 'Sales', level: 'Mid', stage: 'Late', location: 'San Francisco', base: 73, equity: 0.0092, source: 'CSV 8' },
  { role: 'Sales', level: 'Senior', stage: 'Late', location: 'San Francisco', base: 122, equity: 0.0124, source: 'CSV 8' },
];

console.log('╔' + '═'.repeat(98) + '╗');
console.log('║' + ' V2.1 COMPLETE VALIDATION - All 17 Carta Data Points'.padEnd(98) + '║');
console.log('╚' + '═'.repeat(98) + '╝');
console.log('\n');

let totalBaseError = 0;
let totalEquityError = 0;
let count = 0;

let baseErrors = [];
let equityErrors = [];

allCartaData.forEach((carta, i) => {
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
  baseErrors.push(baseError);
  equityErrors.push(equityError);
  count++;
  
  const baseStatus = baseError < 10 ? '✅' : baseError < 20 ? '⚠️' : '❌';
  const equityStatus = equityError < 30 ? '✅' : equityError < 50 ? '⚠️' : '❌';
  
  console.log(`${String(i+1).padStart(2)}. ${carta.role} ${carta.level} ${carta.stage} ${carta.location}`);
  console.log(`    ${baseStatus} Base:   Carta $${carta.base}K → V2.1 $${(our.p50_base/1000).toFixed(0)}K (${baseError.toFixed(1)}% error)`);
  console.log(`    ${equityStatus} Equity: Carta ${carta.equity.toFixed(4)}% → V2.1 ${(our.p50_equity_pct*100).toFixed(4)}% (${equityError.toFixed(1)}% error)`);
});

const avgBaseError = totalBaseError / count;
const avgEquityError = totalEquityError / count;

console.log('\n' + '═'.repeat(100));
console.log('V2.1 FINAL RESULTS');
console.log('═'.repeat(100));
console.log('');
console.log(`Total data points: ${count}`);
console.log(`Average base error: ${avgBaseError.toFixed(1)}%`);
console.log(`Average equity error: ${avgEquityError.toFixed(1)}%`);
console.log('');

// Calculate improvement
console.log('📊 IMPROVEMENT vs V2.0:');
console.log('  V2.0: Base 7.5%, Equity 90.5%');
console.log(`  V2.1: Base ${avgBaseError.toFixed(1)}%, Equity ${avgEquityError.toFixed(1)}%`);
console.log(`  Change: Base ${(avgBaseError - 7.5).toFixed(1)}pp, Equity ${(avgEquityError - 90.5).toFixed(1)}pp`);
console.log('');

if (avgBaseError < 10) {
  console.log('✅ BASE SALARY: Excellent (< 10%)');
} else {
  console.log('⚠️  BASE SALARY: Needs work (> 10%)');
}

if (avgEquityError < 70) {
  console.log('✅ EQUITY: Acceptable (< 70%)');
} else {
  console.log('⚠️  EQUITY: High variance (> 70%)');
}

const overallAccuracy = 100 - ((avgBaseError * 0.6 + avgEquityError * 0.4) / 2);
console.log('');
console.log(`📈 Overall Estimated Accuracy: ${overallAccuracy.toFixed(1)}%`);
console.log('');

if (overallAccuracy >= 85) {
  console.log('🎉 VERDICT: Production ready! Ship it.');
} else if (overallAccuracy >= 80) {
  console.log('✅ VERDICT: Good enough for MVP.');
} else {
  console.log('⚠️  VERDICT: More work needed.');
}
console.log('');
