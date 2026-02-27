// Import company enrichment data and show distribution

const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../data/company-enrichment-diverse.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.trim().split('\n');

// Skip header
const companies = lines.slice(1).map(line => {
  const [name, funding_stage, total_raised_m, headcount_range, valuation_m, last_round_date, source, simplified_stage] = line.split(',');
  return {
    name,
    funding_stage,
    total_raised_m: parseFloat(total_raised_m),
    headcount_range,
    simplified_stage
  };
});

// Group by stage
const byStage = {
  Early: [],
  Growth: [],
  Scale: [],
  Late: []
};

companies.forEach(c => {
  byStage[c.simplified_stage].push(c);
});

console.log('📊 Company Distribution by Stage:\n');

Object.entries(byStage).forEach(([stage, companies]) => {
  console.log(`\n${stage} Stage (${companies.length} companies):`);
  console.log('─'.repeat(60));
  companies.forEach(c => {
    console.log(`  • ${c.name.padEnd(20)} ${c.funding_stage.padEnd(12)} $${c.total_raised_m}M`);
  });
});

console.log('\n\n📈 Summary:');
console.log(`Total companies: ${companies.length}`);
console.log(`Early: ${byStage.Early.length} (${Math.round(byStage.Early.length/companies.length*100)}%)`);
console.log(`Growth: ${byStage.Growth.length} (${Math.round(byStage.Growth.length/companies.length*100)}%)`);
console.log(`Scale: ${byStage.Scale.length} (${Math.round(byStage.Scale.length/companies.length*100)}%)`);
console.log(`Late: ${byStage.Late.length} (${Math.round(byStage.Late.length/companies.length*100)}%)`);
