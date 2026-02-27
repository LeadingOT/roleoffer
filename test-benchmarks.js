// Test benchmark queries

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

// Test queries
const testCases = [
  { role: 'Software Engineer', level: 'Senior', stage: 'Early', location: 'San Francisco' },
  { role: 'Software Engineer', level: 'Senior', stage: 'Growth', location: 'San Francisco' },
  { role: 'Software Engineer', level: 'Senior', stage: 'Late', location: 'San Francisco' },
  { role: 'Product Manager', level: 'Mid', stage: 'Growth', location: 'New York' },
  { role: 'Designer', level: 'Senior', stage: 'Scale', location: 'Remote' }
];

console.log('🧪 Testing Benchmark Queries:\n');

testCases.forEach((query, i) => {
  console.log(`Test ${i + 1}: ${query.role} - ${query.level} - ${query.stage} - ${query.location}`);
  const result = getBenchmark(query);
  
  if (result) {
    console.log(`  ✅ Base: $${(result.p50_base/1000).toFixed(0)}K (range: $${(result.p25_base/1000).toFixed(0)}K - $${(result.p75_base/1000).toFixed(0)}K)`);
    console.log(`  ✅ Equity: ${(result.p50_equity_pct*100).toFixed(2)}% (range: ${(result.p25_equity_pct*100).toFixed(2)}% - ${(result.p75_equity_pct*100).toFixed(2)}%)`);
    console.log(`  ✅ Sample size: ${result.sample_size} offers`);
  } else {
    console.log('  ❌ No data found');
  }
  console.log('');
});

console.log(`📊 Total benchmarks in database: ${benchmarksData.length}`);
