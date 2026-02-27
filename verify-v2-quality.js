// Comprehensive validation of V2 data

const v2Data = require('./data/benchmarks-v2.json');

// All Carta data points we have
const cartaData = [
  // From screenshots
  { role: 'Software Engineer', level: 'Mid', stage: 'Scale', location: 'San Francisco', base: 123, equity: 0.0160, peerGroup: '$250M-$500M' },
  { role: 'Software Engineer', level: 'Senior', stage: 'Scale', location: 'New York', base: 156, equity: 0.0636, peerGroup: '$50M-$100M' },
  { role: 'Designer', level: 'Senior', stage: 'Scale', location: 'San Francisco', base: 141, equity: 0.0208, peerGroup: '$250M-$500M' },
  
  // From CSV exports
  { role: 'Designer', level: 'Mid', stage: 'Late', location: 'San Francisco', base: 114, equity: 0.0112, peerGroup: '$250M-$500M' },
  { role: 'Software Engineer', level: 'Mid', stage: 'Growth', location: 'San Francisco', base: 126, equity: 0.0252, peerGroup: '$25M-$50M' },
  { role: 'Software Engineer', level: 'Senior', stage: 'Growth', location: 'San Francisco', base: 167, equity: 0.0352, peerGroup: '$25M-$50M' },
  { role: 'Data Scientist', level: 'Mid', stage: 'Late', location: 'Austin', base: 102, equity: 0.0056, peerGroup: '$500M-$1B' },
  { role: 'Software Engineer', level: 'Mid', stage: 'Growth', location: 'New York', base: 119, equity: 0.0916, peerGroup: '$10M-$25M' },
  { role: 'Software Engineer', level: 'Senior', stage: 'Growth', location: 'New York', base: 160, equity: 0.1428, peerGroup: '$10M-$25M' }
];

console.log('═'.repeat(100));
console.log('V2 DATA QUALITY VALIDATION - Against All Carta Data Points');
console.log('═'.repeat(100));
console.log('\n');

let totalBaseError = 0;
let totalEquityError = 0;
let count = 0;

cartaData.forEach((carta, i) => {
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
  console.log(`   Peer Group: ${carta.peerGroup}`);
  console.log(`   ${baseStatus} Base:   Carta $${carta.base}K → Our $${(our.p50_base/1000).toFixed(0)}K (${baseError.toFixed(1)}% error)`);
  console.log(`   ${equityStatus} Equity: Carta ${carta.equity.toFixed(4)}% → Our ${(our.p50_equity_pct*100).toFixed(4)}% (${equityError.toFixed(1)}% error)`);
  console.log('');
});

const avgBaseError = totalBaseError / count;
const avgEquityError = totalEquityError / count;

console.log('═'.repeat(100));
console.log('SUMMARY STATISTICS');
console.log('═'.repeat(100));
console.log('');
console.log(`Data points validated: ${count}`);
console.log(`Average base salary error: ${avgBaseError.toFixed(1)}%`);
console.log(`Average equity error: ${avgEquityError.toFixed(1)}%`);
console.log('');

if (avgBaseError < 10) {
  console.log('✅ BASE SALARY: Excellent accuracy (< 10% average error)');
} else if (avgBaseError < 15) {
  console.log('⚠️  BASE SALARY: Good accuracy (< 15% average error)');
} else {
  console.log('❌ BASE SALARY: Needs improvement (> 15% average error)');
}

if (avgEquityError < 30) {
  console.log('✅ EQUITY: Good accuracy (< 30% average error)');
} else if (avgEquityError < 50) {
  console.log('⚠️  EQUITY: Acceptable (< 50% average error)');
} else {
  console.log('❌ EQUITY: Needs improvement (> 50% average error)');
}

const overallAccuracy = 100 - ((avgBaseError * 0.6 + avgEquityError * 0.4) / 2);
console.log('');
console.log(`📊 Overall Estimated Accuracy: ${overallAccuracy.toFixed(0)}%`);

if (overallAccuracy >= 85) {
  console.log('🎉 VERDICT: Production ready!');
} else if (overallAccuracy >= 75) {
  console.log('✅ VERDICT: MVP acceptable, continue refinement');
} else {
  console.log('❌ VERDICT: Needs more calibration');
}
console.log('');
