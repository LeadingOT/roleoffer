import { Metadata } from 'next';
import Link from 'next/link';
import { PSEO_SLUGS } from '@/lib/pseo-slugs';

// Generate static params for top pages
export async function generateStaticParams() {
  return PSEO_SLUGS.map((slug) => ({
    slug,
  }));
}

// Force static generation
export const dynamic = 'force-static';
export const dynamicParams = false;

// Parse slug format: "software-engineer-senior-series-a-san-francisco"
// Format: {role}-{level}-{stage}-{location}
function parseSlug(slug: string) {
  const parts = slug.split('-');
  
  // Find level (junior, mid, senior, staff, principal, lead)
  const levels = ['junior', 'mid', 'senior', 'staff', 'principal', 'lead'];
  let levelIndex = -1;
  for (let i = 0; i < parts.length; i++) {
    if (levels.includes(parts[i])) {
      levelIndex = i;
      break;
    }
  }
  
  if (levelIndex === -1) return null;
  
  const level = parts[levelIndex];
  
  // Find stage (seed, series-a, series-b, series-c)
  let stageIndex = -1;
  const stages = ['seed', 'series', 'growth', 'late'];
  for (let i = levelIndex + 1; i < parts.length; i++) {
    if (stages.includes(parts[i])) {
      stageIndex = i;
      break;
    }
  }
  
  if (stageIndex === -1) return null;
  
  // Stage might be "series-a" or "series-b" etc
  let stage = parts[stageIndex];
  let stageEnd = stageIndex + 1;
  if (parts[stageIndex] === 'series' && stageIndex + 1 < parts.length) {
    stage = `series-${parts[stageIndex + 1]}`;
    stageEnd = stageIndex + 2;
  }
  
  // Role is everything before level
  const role = parts.slice(0, levelIndex).join('-');
  
  // Location is everything after stage
  const location = parts.slice(stageEnd).join('-');
  
  return { role, level, stage, location };
}

// Normalize for display
function normalize(str: string | undefined): string {
  if (!str || typeof str !== 'string') return '';
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) {
    return { title: 'Not Found' };
  }
  
  const { role, level, stage, location } = parsed;
  const title = `${normalize(level)} ${normalize(role)} Compensation at ${normalize(stage)} Startups in ${normalize(location)}`;
  const description = `Startup compensation benchmarks for ${normalize(level)} ${normalize(role)} at ${normalize(stage)} companies in ${normalize(location)}. Get P25/P50/P75 salary data, equity ranges, and offer letter templates.`;
  
  return {
    title,
    description,
  };
}

export default async function CompensationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  
  if (!parsed) {
    return <div>Not found</div>;
  }
  
  const { role, level, stage, location } = parsed;
  
  const roleTitle = normalize(role);
  const levelTitle = normalize(level);
  const stageTitle = normalize(stage);
  const locationTitle = normalize(location);
  
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            {levelTitle} {roleTitle} Compensation
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {stageTitle} Stage Startups in {locationTitle}
          </p>
          
          <div className="my-8 p-6 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">
              We're collecting data for this specific combination. Get a custom benchmark report with our calculator below.
            </p>
          </div>
          
          <div className="my-12 p-6 border rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Get Your Full Compensation Report</h2>
            <p className="text-muted-foreground mb-6">
              Detailed breakdown including equity, bonus, and negotiation talk points
            </p>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>P25/P50/P75 percentiles for base, equity, and bonus</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Customized offer letter template (PDF)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Equity value projection across 3 scenarios</span>
              </li>
            </ul>
            
            <div className="flex gap-4">
              <Link href="/benchmark" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Get Report - $49
              </Link>
              <Link href="/calculator" className="inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium hover:bg-accent">
                Try Free Calculator
              </Link>
            </div>
          </div>
          
          <div className="my-12 prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">About {roleTitle} Compensation</h2>
            <p>
              {levelTitle} {roleTitle} roles at {stageTitle} stage startups in {locationTitle} typically include 
              a combination of base salary, equity compensation, and performance bonuses.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Factors Affecting Compensation</h3>
            <ul>
              <li><strong>Company Stage:</strong> {stageTitle} companies typically have different cash vs. equity mixes</li>
              <li><strong>Location:</strong> {locationTitle} market rates vary based on local cost of living and competition</li>
              <li><strong>Experience Level:</strong> {levelTitle} roles command different compensation ranges</li>
            </ul>
          </div>
          
          <div className="my-12 p-8 bg-primary/5 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to benchmark your offer?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Get precise compensation data and negotiation guidance in seconds
            </p>
            <Link href="/benchmark" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Get Your Report
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
