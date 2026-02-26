// Top 225 high-priority compensation page slugs
// Format: {role}-{level}-{stage}-{location}

export const TOP_ROLES = [
  'software-engineer',
  'product-manager',
  'data-scientist',
  'designer',
  'sales',
  'marketing-manager',
  'engineering-manager',
  'devops-engineer',
  'data-engineer',
];

export const LEVELS = [
  'senior',
  'staff',
  'principal',
];

export const STAGES = [
  'seed',
  'series-a',
];

export const TOP_LOCATIONS = [
  'san-francisco',
  'new-york',
  'austin',
];

// Generate top 162 combinations (9 roles × 3 levels × 2 stages × 3 locations)
export function generateTopSlugs(): string[] {
  const slugs: string[] = [];
  
  for (const stage of STAGES) {
    for (const role of TOP_ROLES) {
      for (const level of LEVELS) {
        for (const location of TOP_LOCATIONS) {
          slugs.push(`${role}-${level}-${stage}-${location}`);
        }
      }
    }
  }
  
  return slugs;
}

export const PSEO_SLUGS = generateTopSlugs();
