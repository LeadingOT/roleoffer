# Quick Setup Guide

## 🚀 Start Development Server

```bash
cd /tmp/roleoffer-mvp
npm run dev
```

Visit: http://localhost:3000

## 📱 Test the MVP

### 1. Landing Page (/)
- View hero section and pricing comparison
- Click "Get Benchmark Report" or "Free Calculator"

### 2. Benchmark Flow
- Go to `/benchmark`
- Fill form: Software Engineer → Senior → San Francisco → Series B
- Enter any email
- Click "Get Report for $49"
- View results with charts and data table
- Click "View & Customize Offer Letter"
- Copy offer letter template

### 3. Free Calculator
- Go to `/calculator`
- Enter: Base $150,000 | Equity 10,000 shares | $5/share | Bonus $20,000
- Click "Calculate Total Comp"
- See breakdown and total

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📦 Deploy to Vercel

### Option 1: CLI
```bash
npm install -g vercel
vercel deploy
```

### Option 2: GitHub
1. Push to GitHub: `git remote add origin <your-repo>`
2. `git push -u origin main`
3. Import to Vercel dashboard
4. Auto-deploy on push

## 🔧 Tech Stack

- **Framework**: Next.js 14.2+ (App Router, React Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI**: shadcn/ui components
- **Charts**: Recharts
- **Data**: Mock data (ready for Supabase)

## 📊 Current Status

✅ **Working**
- All 5 core pages functional
- TypeScript strict mode (no errors)
- Responsive design
- Fast builds (<3s)
- SEO meta tags

❌ **Not Implemented (By Design)**
- Payment integration
- Supabase connection
- PDF generation
- pSEO pages
- Authentication

## 🎯 Next Steps

1. **Data**: Set up Supabase + import compensation data
2. **Payment**: Integrate Airwallex/Stripe checkout
3. **PDF**: Enable @react-pdf/renderer for downloads
4. **pSEO**: Generate role-location-stage pages
5. **Analytics**: Add GA4/Plausible tracking
6. **Marketing**: Submit to Product Hunt, HN

## 🐛 Troubleshooting

### Build fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Port 3000 in use
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### TypeScript errors
```bash
npm run lint
```

## 📝 File Structure

```
app/
├── page.tsx              # Landing page
├── layout.tsx            # Nav + footer
├── benchmark/page.tsx    # Form
├── results/page.tsx      # Charts + data
├── calculator/page.tsx   # Free tool
└── offer-letter/page.tsx # Template

lib/
├── types.ts              # Type definitions
├── mockData.ts           # Sample data
└── utils.ts              # Helpers

components/ui/            # shadcn components
```

## 🎨 Customization

### Update Branding
- Change `💰 RoleOffer` in `app/layout.tsx`
- Update meta tags in each page
- Modify color scheme in `globals.css`

### Add More Roles/Locations
- Edit `lib/mockData.ts` → `ROLES`, `LEVELS`, `LOCATIONS`, `STAGES`
- Add more sample data to `MOCK_COMP_DATA`

### Modify Pricing
- Edit landing page pricing cards
- Update benchmark form CTA text

---

**Ready to launch!** 🚀
