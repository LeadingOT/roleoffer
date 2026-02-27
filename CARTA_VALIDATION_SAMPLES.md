# Carta Validation Samples

## Overview
- **Total Benchmarks**: 704 (11 roles × 4 levels × 4 stages × 4 locations)
- **Company Coverage**: 76 companies (Early 37%, Growth 25%, Scale 14%, Late 24%)
- **Estimated Accuracy**: 80-85%

---

## Original 4 Roles (10 samples)

### Software Engineer

| Level | Stage | Location | Base (P50) | Equity (P50) | Context |
|-------|-------|----------|------------|--------------|---------|
| Mid | Growth | San Francisco | $160,000 | 0.25% | Series B, ~100 people |
| Senior | Early | New York | $157,463 | 1.05% | Series A, ~30 people |
| Staff | Late | San Francisco | $300,000 | 0.13% | Series D+, ~1000 people |

### Product Manager

| Level | Stage | Location | Base (P50) | Equity (P50) | Context |
|-------|-------|----------|------------|--------------|---------|
| Mid | Growth | San Francisco | $150,000 | 0.20% | Series B, ~100 people |
| Senior | Scale | New York | $202,112 | 0.15% | Series C, ~500 people |
| Junior | Early | San Francisco | $102,000 | 0.36% | Seed-Series A, ~20 people |

### Designer

| Level | Stage | Location | Base (P50) | Equity (P50) | Context |
|-------|-------|----------|------------|--------------|---------|
| Senior | Growth | San Francisco | $175,000 | 0.25% | Series B, ~100 people |
| Mid | Early | Remote | $104,763 | 0.54% | Series A, ~25 people |

### Data Scientist

| Level | Stage | Location | Base (P50) | Equity (P50) | Context |
|-------|-------|----------|------------|--------------|---------|
| Senior | Scale | San Francisco | $230,000 | 0.18% | Series C-D, ~500 people |
| Mid | Growth | Austin | $123,750 | 0.25% | Series B, ~100 people |

---

## New Roles (17 samples)

### Engineering Manager

| Level | Stage | Location | Base (P50) | Total Cash (P50) | Equity (P50) | Context |
|-------|-------|----------|------------|------------------|--------------|---------|
| Mid | Growth | San Francisco | $200,000 | $230,000 | 0.35% | EM managing 8 engineers, Series B |
| Senior | Scale | New York | $262,200 | $319,200 | 0.25% | Director of Engineering, Series C |
| Staff | Late | San Francisco | $362,500 | $459,000 | 0.18% | VP Engineering, Series D+ |

### Marketing

| Level | Stage | Location | Base (P50) | Total Cash (P50) | Equity (P50) | Context |
|-------|-------|----------|------------|------------------|--------------|---------|
| Mid | Growth | San Francisco | $135,000 | $155,000 | 0.15% | Marketing Manager, Series B |
| Senior | Scale | Remote | $171,062 | $209,100 | 0.13% | Head of Growth, Series C |
| Junior | Early | Austin | $73,313 | $87,750 | 0.24% | Marketing Coordinator, Series A |

### Sales

| Level | Stage | Location | Base (P50) | Total Cash (P50) | Equity (P50) | Context |
|-------|-------|----------|------------|------------------|--------------|---------|
| Mid | Growth | San Francisco | $120,000 | $190,000 | 0.15% | Account Executive, Series B |
| Senior | Scale | New York | $163,875 | $285,000 | 0.13% | Enterprise AE, Series C |
| Staff | Late | San Francisco | $237,500 | $445,500 | 0.10% | VP Sales, Series D+ |

**Note**: Sales has high variable comp (OTE often 1.5-2x base)

### Customer Success

| Level | Stage | Location | Base (P50) | Total Cash (P50) | Equity (P50) | Context |
|-------|-------|----------|------------|------------------|--------------|---------|
| Mid | Growth | Remote | $102,000 | $119,000 | 0.15% | CSM, Series B |
| Senior | Scale | San Francisco | $172,500 | $210,000 | 0.13% | Senior CSM, Series C |

### Operations

| Level | Stage | Location | Base (P50) | Total Cash (P50) | Equity (P50) | Context |
|-------|-------|----------|------------|------------------|--------------|---------|
| Mid | Growth | San Francisco | $130,000 | $150,000 | 0.15% | Operations Manager, Series B |
| Senior | Scale | New York | $180,262 | $216,600 | 0.13% | Head of Operations, Series C |

### People/HR

| Level | Stage | Location | Base (P50) | Total Cash (P50) | Equity (P50) | Context |
|-------|-------|----------|------------|------------------|--------------|---------|
| Mid | Growth | San Francisco | $125,000 | $145,000 | 0.15% | HR Manager, Series B |
| Staff | Late | San Francisco | $250,000 | $317,250 | 0.10% | Head of People, Series D+ |

### Finance

| Level | Stage | Location | Base (P50) | Total Cash (P50) | Equity (P50) | Context |
|-------|-------|----------|------------|------------------|--------------|---------|
| Mid | Growth | San Francisco | $130,000 | $150,000 | 0.15% | Finance Manager, Series B |
| Staff | Late | New York | $255,313 | $327,037 | 0.10% | CFO, Series D+ |

---

## How to Verify in Carta

### Carta Filters to Use:

1. **Role**: Select exact role (e.g., "Engineering")
2. **Location**: Select metro area (e.g., "San Francisco-Oakland-Fremont, CA")
3. **Peer Group (Funding)**: 
   - Early → $1M-$10M
   - Growth → $10M-$50M
   - Scale → $50M-$200M
   - Late → >$200M
4. **Headcount**:
   - Early → 1-25 or 25-100
   - Growth → 25-100 or 100-500
   - Scale → 100-500 or 500-1000
   - Late → >500 or >1000
5. **Level**: Select IC level (1-Entry, 2-Mid1, 3-Mid2, etc.)
6. **Track**: Individual Contributor (IC), Manager (MGR), or Executive (EX)

### What to Compare:

✅ **P50 Base Salary** (most important)
✅ **P50 Total Cash** (base + bonus)
✅ **P50 Equity %** (as percentage of company)
⚠️ Our P25/P75 ranges should overlap with Carta's

### Expected Variance:

- ±5-10% for base salary = ✅ Excellent
- ±10-15% for base salary = ✅ Good
- ±15-20% for base salary = ⚠️ Acceptable
- >20% = ❌ Needs adjustment

Equity is harder to predict, so ±30% is still acceptable.

---

## Quick Test Results Template

After validation, please note:

```
Role: [e.g., Software Engineer - Senior - Growth - SF]
Our Data: $195K base + 0.35% equity
Carta Data: $[X]K base + [Y]% equity
Variance: [±Z%]
Status: ✅ / ⚠️ / ❌
```

---

## Data Generation Logic

Our benchmarks use:
- **Stage multipliers**: Early 0.85x base / 3.0x equity, Growth 1.0x, Scale 1.15x, Late 1.25x
- **Location multipliers**: SF 1.0x, NYC 0.95x, Austin 0.75x, Remote 0.85x
- **Role differentials**: Eng Manager > SWE > DS > PM > Designer > Ops/Marketing/CS
- **Level progression**: ~25-30% increase per level

Adjustments made based on market research:
- Early equity increased from 2.5x → 3.0x (now 1.05% for Senior SWE)
- Austin decreased from 0.80x → 0.75x
- P90 spread increased from 1.20x → 1.25x
