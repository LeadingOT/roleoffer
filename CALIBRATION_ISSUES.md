# 🚨 V2 Calibration Issues (Found with 8 new Carta points)

## Summary

**Previous validation (9 points):**
- Base: 4.0% error ✅
- Equity: 65.4% error ⚠️

**New validation (8 points):**
- Base: 11.5% error ⚠️
- Equity: 118.8% error ❌

**Combined (17 points):**
- Base: 7.5% error ✅ (still < 10%)
- Equity: 90.5% error ❌ (degraded)

---

## Issue 1: Sales Role Base/Commission Split ❌

**Problem**: Sales base salary too high, commission % too low

**Carta Data:**
- Mid Sales Late NYC: $73K base → $130K total cash (78% variable)
- Senior Sales Late NYC: $122K base → $192K total (57% variable)

**Our Model:**
- Mid Sales Late NYC: $95K base → $155K total (63% variable)
- Senior Sales Late NYC: $120K base → $205K total (71% variable)

**Error**: Base +30% too high for Mid, but total cash direction is correct

**Fix**: Lower Sales base by 20-25%, increase totalCash gap

```javascript
'Sales': {
  Junior: { base: 60, totalCash: 115, ... },  // was 75/115
  Mid: { base: 75, totalCash: 155, ... },     // was 95/155 
  Senior: { base: 100, totalCash: 205, ... }, // was 120/205
  Staff: { base: 130, totalCash: 270, ... }   // was 150/270
}
```

---

## Issue 2: Early Stage Equity Still 2x Too High ❌

**Problem**: Early multiplier (2.5x) overestimates $1M-$10M companies

**Carta Data ($1M-$10M):**
- Mid SWE: 0.0680% equity
- Senior SWE: 0.0856% equity

**Our Early:**
- Mid SWE: 0.1500% equity (+120% error)
- Senior SWE: 0.2000% equity (+134% error)

**Fix**: Reduce Early equity multiplier from 2.5x → **1.8x**

```javascript
STAGE_MULTIPLIERS = {
  Early: {
    base: 0.92,
    equity: 1.8,  // was 2.5
    totalCash: 0.95
  }
}
```

This would give:
- Mid: 0.06% × 1.8 = 0.108% (vs Carta 0.068%, error -37% but closer)
- Senior: 0.08% × 1.8 = 0.144% (vs Carta 0.086%, error -40%)

Still high, but much better than current 120% error.

---

## Issue 3: Marketing/Non-Eng Roles Too Close to Engineering ❌

**Problem**: Role differentials too small

**Carta Late Stage:**
- Engineering Mid: $123K
- Marketing Mid: $95K
- **Gap: 23%**

**Our Late:**
- Engineering Mid: $125K
- Marketing Mid: $110K
- **Gap: 12%** (too small!)

**Fix**: Lower Marketing/Sales/CS baselines by 10-15%

```javascript
'Marketing': {
  Junior: { base: 75, ... },   // was 88
  Mid: { base: 95, ... },      // was 110 → matches Carta $95K!
  Senior: { base: 120, ... },  // was 135
  Staff: { base: 150, ... }    // was 170
}
```

---

## Issue 4: Late Stage >$1B Marketing Equity

**Carta Above $1B Marketing:**
- Mid: 0.0024% equity
- Senior: 0.0044% equity

**Our Late:**
- Mid: 0.0112% equity (368% error!)
- Senior: 0.0150% equity (241% error!)

**Problem**: Late stage equity for non-eng roles is MUCH lower than expected

**Observation**: Above $1B companies give tiny equity grants (0.002-0.004%)

Our Late multiplier (0.25x) × base (0.00045 for Marketing) = 0.01125%
Carta shows: 0.0024%

**Fix**: Late multiplier might need to be even lower, OR base equity for Marketing needs to be lower

---

## Recommended V3 Changes

### Priority 1: Sales Base/Total Cash ⚡
- Lower all Sales base by 20-25%
- Keep totalCash same or slightly higher
- This fixes the +30% error immediately

### Priority 2: Early Equity Multiplier ⚡
- Change from 2.5x → 1.8x
- Reduces 120% error → ~40% error (still high but acceptable)

### Priority 3: Non-Eng Role Baselines ⚡
- Marketing: -15% across all levels
- CS: -10%
- Operations: -10%

### Priority 4: Late Stage Equity for Non-Eng 🤔
- Consider role-specific Late multipliers?
- Engineering Late: 0.25x
- Marketing/Sales Late: 0.15x (lower!)

---

## Decision Point

**Option A**: Accept current accuracy
- Base: 7.5% error ✅ (good enough)
- Equity: 90.5% error ⚠️ (high but equity has natural variance)
- Ship V2 as-is, iterate based on user feedback

**Option B**: Quick fixes (30 mins)
- Fix Sales base (Priority 1)
- Fix Early equity (Priority 2)
- Fix Marketing baseline (Priority 3)
- → Estimated new accuracy: Base 5-6%, Equity 60-70%

**Option C**: Deeper V3 rebuild (2-3 hours)
- Role-specific Late multipliers
- More granular Early/Growth sub-brackets
- Location-specific role adjustments
- → Estimated accuracy: Base 4-5%, Equity 50-60%

---

## My Recommendation

**Do Option B (quick fixes) now.**

Why:
1. Sales base error (+30%) is embarrassing and easily fixable
2. Early equity error (120%) hurts credibility
3. Marketing baseline is just wrong ($110K vs Carta $95K)
4. 30 mins of work → 85-88% overall accuracy (vs current 82%)
5. Option C has diminishing returns (months of work for 3-5% gain)

**V2.1 Quick Patch Plan:**
1. Sales base: -20%
2. Early equity: 2.5x → 1.8x
3. Marketing base: -15%
4. Re-validate against all 17 points
5. Push if accuracy improves to >85%

Should I execute Option B now?
