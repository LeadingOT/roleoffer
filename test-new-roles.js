// Test samples for new roles

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

// New role samples
const newRoleSamples = [
  // Engineering Manager
  { role: 'Engineering Manager', level: 'Mid', stage: 'Growth', location: 'San Francisco', notes: 'EM managing 8 engineers, Series B' },
  { role: 'Engineering Manager', level: 'Senior', stage: 'Scale', location: 'New York', notes: 'Director of Engineering, Series C' },
  { role: 'Engineering Manager', level: 'Staff', stage: 'Late', location: 'San Francisco', notes: 'VP Engineering, Series D+' },
  
  // Marketing
  { role: 'Marketing', level: 'Mid', stage: 'Growth', location: 'San Francisco', notes: 'Marketing Manager, Series B' },
  { role: 'Marketing', level: 'Senior', stage: 'Scale', location: 'Remote', notes: 'Head of Growth, Series C' },
  { role: 'Marketing', level: 'Junior', stage: 'Early', location: 'Austin', notes: 'Marketing Coordinator, Series A' },
  
  // Sales
  { role: 'Sales', level: 'Mid', stage: 'Growth', location: 'San Francisco', notes: 'Account Executive, Series B' },
  { role: 'Sales', level: 'Senior', stage: 'Scale', location: 'New York', notes: 'Enterprise AE, Series C' },
  { role: 'Sales', level: 'Staff', stage: 'Late', location: 'San Francisco', notes: 'VP Sales, Series D+' },
  
  // Customer Success
  { role: 'Customer Success', level: 'Mid', stage: 'Growth', location: 'Remote', notes: 'CSM, Series B' },
  { role: 'Customer Success', level: 'Senior', stage: 'Scale', location: 'San Francisco', notes: 'Senior CSM, Series C' },
  
  // Operations
  { role: 'Operations', level: 'Mid', stage: 'Growth', location: 'San Francisco', notes: 'Operations Manager, Series B' },
  { role: 'Operations', level: 'Senior', stage: 'Scale', location: 'New York', notes: 'Head of Operations, Series C' },
  
  // People/HR
  { role: 'People/HR', level: 'Mid', stage: 'Growth', location: 'San Francisco', notes: 'HR Manager, Series B' },
  { role: 'People/HR', level: 'Staff', stage: 'Late', location: 'San Francisco', notes: 'Head of People, Series D+' },
  
  // Finance
  { role: 'Finance', level: 'Mid', stage: 'Growth', location: 'San Francisco', notes: 'Finance Manager, Series B' },
  { role: 'Finance', level: 'Staff', stage: 'Late', location: 'New York', notes: 'CFO, Series D+' },
];

console.log('📋 NEW ROLES - Sample Data for Carta Verification\n');
console.log('=' .repeat(90));
console.log('\n');

newRoleSamples.forEach((query, i) => {
  const result = getBenchmark(query);
  
  console.log(`Sample ${i + 1}: ${query.role} - ${query.level}`);
  console.log(`Stage: ${query.stage} | Location: ${query.location}`);
  console.log(`Context: ${query.notes}`);
  console.log('');
  
  if (result) {
    console.log('Our Data:');
    console.log(`  Base: $${result.p50_base.toLocaleString()} (P25-P75: $${result.p25_base.toLocaleString()} - $${result.p75_base.toLocaleString()})`);
    console.log(`  Total Cash: $${result.p50_total_cash.toLocaleString()} (includes bonus/commission)`);
    console.log(`  Equity: ${(result.p50_equity_pct * 100).toFixed(2)}% (P25-P75: ${(result.p25_equity_pct * 100).toFixed(2)}% - ${(result.p75_equity_pct * 100).toFixed(2)}%)`);
  } else {
    console.log('  ❌ No data found');
  }
  
  console.log('\n' + '-'.repeat(90) + '\n');
});

// CSV for new roles
console.log('\n\n📊 NEW ROLES CSV:\n');
console.log('Role,Level,Stage,Location,P50_Base,P50_Total_Cash,P50_Equity,Notes');

newRoleSamples.forEach(query => {
  const result = getBenchmark(query);
  if (result) {
    console.log(
      `${query.role},${query.level},${query.stage},${query.location},$${result.p50_base},$${result.p50_total_cash},${(result.p50_equity_pct * 100).toFixed(2)}%,"${query.notes}"`
    );
  }
});

console.log('\n');
console.log('📈 Summary:');
console.log(`Total roles now: 11 (was 4)`);
console.log(`Total benchmarks: ${benchmarksData.length} (was 256)`);
console.log(`New roles added: Engineering Manager, Marketing, Sales, Customer Success, Operations, People/HR, Finance`);
