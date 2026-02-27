// Generate test samples for Carta comparison

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

// Test cases for Carta verification
const testCases = [
  // Software Engineers
  { role: 'Software Engineer', level: 'Mid', stage: 'Growth', location: 'San Francisco', notes: 'Series B, ~100 people' },
  { role: 'Software Engineer', level: 'Senior', stage: 'Early', location: 'New York', notes: 'Series A, ~30 people' },
  { role: 'Software Engineer', level: 'Staff', stage: 'Late', location: 'San Francisco', notes: 'Series D+, ~1000 people' },
  
  // Product Managers
  { role: 'Product Manager', level: 'Mid', stage: 'Growth', location: 'San Francisco', notes: 'Series B, ~100 people' },
  { role: 'Product Manager', level: 'Senior', stage: 'Scale', location: 'New York', notes: 'Series C, ~500 people' },
  { role: 'Product Manager', level: 'Junior', stage: 'Early', location: 'San Francisco', notes: 'Seed-Series A, ~20 people' },
  
  // Designers
  { role: 'Designer', level: 'Senior', stage: 'Growth', location: 'San Francisco', notes: 'Series B, ~100 people' },
  { role: 'Designer', level: 'Mid', stage: 'Early', location: 'Remote', notes: 'Series A, ~25 people' },
  
  // Data Scientists
  { role: 'Data Scientist', level: 'Senior', stage: 'Scale', location: 'San Francisco', notes: 'Series C-D, ~500 people' },
  { role: 'Data Scientist', level: 'Mid', stage: 'Growth', location: 'Austin', notes: 'Series B, ~100 people' },
];

console.log('📋 Sample Data for Carta Verification\n');
console.log('=' .repeat(80));
console.log('\n');

testCases.forEach((query, i) => {
  const result = getBenchmark(query);
  
  console.log(`Sample ${i + 1}: ${query.role} - ${query.level}`);
  console.log(`Stage: ${query.stage} | Location: ${query.location}`);
  console.log(`Context: ${query.notes}`);
  console.log('');
  
  if (result) {
    console.log('Our Data:');
    console.log(`  Base Salary:`);
    console.log(`    • P25: $${result.p25_base.toLocaleString()}`);
    console.log(`    • P50: $${result.p50_base.toLocaleString()}`);
    console.log(`    • P75: $${result.p75_base.toLocaleString()}`);
    console.log(`    • P90: $${result.p90_base.toLocaleString()}`);
    console.log('');
    console.log(`  Total Cash:`);
    console.log(`    • P25: $${result.p25_total_cash.toLocaleString()}`);
    console.log(`    • P50: $${result.p50_total_cash.toLocaleString()}`);
    console.log(`    • P75: $${result.p75_total_cash.toLocaleString()}`);
    console.log('');
    console.log(`  Equity (%):`);
    console.log(`    • P25: ${(result.p25_equity_pct * 100).toFixed(3)}%`);
    console.log(`    • P50: ${(result.p50_equity_pct * 100).toFixed(3)}%`);
    console.log(`    • P75: ${(result.p75_equity_pct * 100).toFixed(3)}%`);
    console.log(`    • P90: ${(result.p90_equity_pct * 100).toFixed(3)}%`);
    console.log('');
    console.log(`  Sample Size: ${result.sample_size} offers`);
  } else {
    console.log('  ❌ No data found');
  }
  
  console.log('\n' + '-'.repeat(80) + '\n');
});

// Also generate CSV for easy copy-paste
console.log('\n\n📊 CSV Format (easy to copy):\n');
console.log('Role,Level,Stage,Location,P50_Base,P50_Equity,Notes');

testCases.forEach(query => {
  const result = getBenchmark(query);
  if (result) {
    console.log(
      `${query.role},${query.level},${query.stage},${query.location},$${result.p50_base},${(result.p50_equity_pct * 100).toFixed(2)}%,"${query.notes}"`
    );
  }
});
