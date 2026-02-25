# RoleOffer.com MVP

Startup compensation benchmarking tool built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

### 🎯 Core Features (MVP)

1. **Landing Page** - Hero section with value proposition and pricing comparison
2. **Compensation Benchmark Form** - Select role, level, location, and company stage
3. **Benchmark Results** - P25/P50/P75 percentile data with interactive charts and tables
4. **Free Calculator** - Quick compensation calculator for basic offer evaluation
5. **Offer Letter Template** - Customizable offer letter based on benchmark data

### 📊 Data & Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui (button, card, input, select, label)
- **Charts**: Recharts for data visualization
- **Data**: Mock data (ready for Supabase integration)
- **Validation**: Zod schemas (ready for form validation)

### ⚡ Performance

- TypeScript strict mode enabled
- Responsive design (mobile-first)
- Fast page loads (<2s)
- SEO meta tags included

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
cd /tmp/roleoffer-mvp
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run lint
```

## Project Structure

```
roleoffer-mvp/
├── app/
│   ├── page.tsx              # Landing page
│   ├── benchmark/page.tsx    # Benchmark form
│   ├── results/page.tsx      # Benchmark results with charts
│   ├── calculator/page.tsx   # Free calculator
│   ├── offer-letter/page.tsx # Offer letter template
│   ├── layout.tsx            # Root layout with nav & footer
│   └── globals.css           # Global styles
├── components/
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── mockData.ts           # Mock compensation data
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
└── package.json
```

## Pages Overview

### 1. Landing Page (`/`)
- Hero section with value proposition
- Feature highlights (Real Data, Precise Benchmarks, Instant Reports)
- Pricing comparison (Free Tools vs Benchmark Report $49)
- CTA buttons

### 2. Benchmark Form (`/benchmark`)
- Form inputs: Role, Level, Location, Company Stage, Email
- Validates all fields before submission
- Routes to results page with query params
- Note: Payment integration skipped for MVP

### 3. Benchmark Results (`/results`)
- Summary cards for P25/P50/P75 percentiles
- Interactive bar chart (Recharts)
- Detailed breakdown table (base salary, equity, bonus)
- Link to offer letter template
- All data comes from mock data with realistic values

### 4. Free Calculator (`/calculator`)
- Input: Base Salary, Equity Shares, Share Price, Bonus
- Output: Equity Value, Total Comp, Monthly Comp
- Upsell to paid benchmark report
- Additional free tools section (placeholders)

### 5. Offer Letter (`/offer-letter`)
- Fully formatted offer letter template
- Populated with benchmark data (P50 as default)
- Copy to clipboard functionality
- Download PDF button (placeholder for future)
- Customization tips

## Mock Data

Currently using mock compensation data (`lib/mockData.ts`):
- 5 sample data points covering common roles
- Fallback logic for unseen combinations
- Realistic salary ranges for SF/NYC tech roles
- Ready to swap with real Supabase queries

## What's NOT Included (MVP Phase)

- ❌ Real Supabase connection (mock data only)
- ❌ Payment integration (Airwallex/Stripe)
- ❌ PDF generation (text template only)
- ❌ pSEO pages (dynamic routes for SEO)
- ❌ Authentication
- ❌ Email delivery
- ❌ Analytics (GA4/Plausible)

## Next Steps (Post-MVP)

1. **Data Layer**
   - Set up Supabase database
   - Import H1B, Levels.fyi, BLS data
   - Create queries for benchmark lookups

2. **Payment**
   - Integrate Airwallex or Stripe
   - Add checkout flow
   - Email report delivery

3. **pSEO**
   - Generate pages for role × level × location × stage combinations
   - Implement ISR (Incremental Static Regeneration)
   - Add breadcrumbs and internal linking

4. **Features**
   - PDF generation with @react-pdf/renderer
   - More free tools (Equity Calculator, Is My Offer Fair?)
   - Blog/resources section

5. **Marketing**
   - SEO optimization (meta tags, schema markup)
   - Submit to Product Hunt, HN, Indie Hackers
   - IndexNow submission

## Environment Variables (Future)

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
AIRWALLEX_API_KEY=your-api-key
```

## Deployment

Ready to deploy to Vercel:

```bash
vercel deploy
```

Or push to GitHub and connect to Vercel dashboard.

## License

MIT

## Contact

For questions or feedback: [your-email@example.com]

---

**Built with ❤️ for startup employees navigating compensation negotiations.**
