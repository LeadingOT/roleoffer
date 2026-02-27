// Map detailed funding info to simplified 4-stage classification

/**
 * Classify company into simplified stage based on funding and headcount
 * 
 * Stages:
 * - Early: Seed/Pre-seed, <$5M raised, <25 people
 * - Growth: Series A/B, $5M-$50M, 25-200 people
 * - Scale: Series C+, $50M-$200M, 200-1000 people
 * - Late: >$200M or unicorn (>$1B valuation), 1000+ people
 */
function mapToSimplifiedStage(company) {
  const { funding_stage, total_raised_m, headcount_range, valuation_m } = company;
  
  // Extract headcount number from range (e.g., "500-1000" -> 750)
  const headcount = parseHeadcount(headcount_range);
  
  // Late Stage indicators
  if (
    total_raised_m >= 200 ||
    valuation_m >= 1000 ||
    headcount >= 1000 ||
    funding_stage === 'Public' ||
    funding_stage === 'Late Stage' ||
    funding_stage === 'Acquired'
  ) {
    return 'Late';
  }
  
  // Scale Stage indicators
  if (
    (total_raised_m >= 50 && total_raised_m < 200) ||
    (headcount >= 200 && headcount < 1000) ||
    funding_stage === 'Series C' ||
    funding_stage === 'Series D' ||
    funding_stage === 'Series E' ||
    funding_stage === 'Series F' ||
    funding_stage === 'Series G'
  ) {
    return 'Scale';
  }
  
  // Growth Stage indicators
  if (
    (total_raised_m >= 5 && total_raised_m < 50) ||
    (headcount >= 25 && headcount < 200) ||
    funding_stage === 'Series A' ||
    funding_stage === 'Series B'
  ) {
    return 'Growth';
  }
  
  // Early Stage (default)
  return 'Early';
}

function parseHeadcount(range) {
  if (!range) return 0;
  
  // Handle "7000+", "1000+", etc.
  if (range.includes('+')) {
    return parseInt(range.replace('+', ''));
  }
  
  // Handle "500-1000", "25-100", etc.
  if (range.includes('-')) {
    const [min, max] = range.split('-').map(n => parseInt(n.replace(/,/g, '')));
    return (min + max) / 2; // Use midpoint
  }
  
  // Single number
  return parseInt(range.replace(/,/g, ''));
}

// Test with our data
const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../data/company-enrichment.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.trim().split('\n');
const headers = lines[0].split(',');

console.log('🏢 Company Stage Classification:\n');
console.log('Company'.padEnd(25) + 'Funding'.padEnd(15) + 'Raised'.padEnd(12) + 'Headcount'.padEnd(15) + '→ Stage');
console.log('─'.repeat(80));

lines.slice(1).forEach(line => {
  const values = line.split(',');
  const company = {
    company_name: values[0],
    funding_stage: values[1],
    total_raised_m: parseFloat(values[2]),
    headcount_range: values[3],
    valuation_m: parseFloat(values[4])
  };
  
  const stage = mapToSimplifiedStage(company);
  
  console.log(
    company.company_name.padEnd(25) +
    company.funding_stage.padEnd(15) +
    `$${company.total_raised_m}M`.padEnd(12) +
    company.headcount_range.padEnd(15) +
    `→ ${stage}`
  );
});

module.exports = { mapToSimplifiedStage, parseHeadcount };
