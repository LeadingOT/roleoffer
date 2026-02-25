import { CompData } from './types';

export const MOCK_COMP_DATA: CompData[] = [
  {
    role: 'Software Engineer',
    level: 'Senior',
    location: 'San Francisco',
    stage: 'Series B',
    p25: 180000,
    p50: 220000,
    p75: 280000,
  },
  {
    role: 'Software Engineer',
    level: 'Mid-level',
    location: 'San Francisco',
    stage: 'Series B',
    p25: 140000,
    p50: 170000,
    p75: 210000,
  },
  {
    role: 'Product Manager',
    level: 'Senior',
    location: 'San Francisco',
    stage: 'Series B',
    p25: 170000,
    p50: 200000,
    p75: 250000,
  },
  {
    role: 'Product Manager',
    level: 'Mid-level',
    location: 'San Francisco',
    stage: 'Series A',
    p25: 130000,
    p50: 160000,
    p75: 190000,
  },
  {
    role: 'Software Engineer',
    level: 'Senior',
    location: 'New York',
    stage: 'Series C',
    p25: 190000,
    p50: 230000,
    p75: 290000,
  },
];

export const ROLES = ['Software Engineer', 'Product Manager', 'Designer', 'Data Scientist', 'Engineering Manager'];
export const LEVELS = ['Junior', 'Mid-level', 'Senior', 'Staff', 'Principal'];
export const LOCATIONS = ['San Francisco', 'New York', 'Seattle', 'Austin', 'Remote'];
export const STAGES = ['Seed', 'Series A', 'Series B', 'Series C', 'Series D+'];

export function getCompData(role: string, level: string, location: string, stage: string): CompData | null {
  const found = MOCK_COMP_DATA.find(
    (d) => d.role === role && d.level === level && d.location === location && d.stage === stage
  );
  
  if (found) return found;
  
  // Fallback: return similar data with some randomization
  const baseData = MOCK_COMP_DATA[0];
  const multiplier = 0.8 + Math.random() * 0.4; // 0.8 - 1.2
  
  return {
    role,
    level,
    location,
    stage,
    p25: Math.round(baseData.p25 * multiplier),
    p50: Math.round(baseData.p50 * multiplier),
    p75: Math.round(baseData.p75 * multiplier),
  };
}
