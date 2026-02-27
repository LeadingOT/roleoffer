// Top 30 companies to enrich based on H1B + Levels.fyi frequency

const topCompanies = [
  'Stripe', 'Airbnb', 'Notion', 'Linear', 'Figma', 'Vercel',
  'Anthropic', 'OpenAI', 'Scale AI', 'Databricks',
  'Rippling', 'Ramp', 'Brex', 'Mercury', 'Plaid',
  'Instacart', 'DoorDash', 'Faire', 'Flexport', 'Gusto',
  'Retool', 'Airtable', 'Miro', 'Canva', 'Discord',
  'Weights & Biases', 'Hugging Face', 'Replit', 'Sourcegraph', 'GitLab'
];

console.log('📊 Top 30 Startup Companies for Enrichment:\n');
topCompanies.forEach((company, i) => {
  console.log(`${String(i + 1).padStart(2, ' ')}. ${company}`);
});
console.log(`\n✅ Total: ${topCompanies.length} companies`);
