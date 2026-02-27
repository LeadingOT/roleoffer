-- Add company metadata table for enrichment
CREATE TABLE IF NOT EXISTS company_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL UNIQUE,
  
  -- Funding information
  funding_stage TEXT, -- 'Seed', 'Series A', 'Series B', etc.
  total_raised_m NUMERIC, -- Total raised in millions
  valuation_m NUMERIC, -- Valuation in millions
  last_round_date DATE,
  
  -- Company size
  headcount_range TEXT, -- '1-25', '25-100', '100-500', '500+', etc.
  headcount_estimate INTEGER, -- Best guess number
  
  -- Simplified classification (for our 4-stage system)
  simplified_stage TEXT, -- 'Early', 'Growth', 'Scale', 'Late'
  
  -- Metadata
  source TEXT, -- 'Crunchbase', 'Manual', 'LinkedIn', etc.
  last_updated TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Update benchmarks table to support company-specific data
ALTER TABLE benchmarks 
  ADD COLUMN IF NOT EXISTS company_stage TEXT, -- 'Early', 'Growth', 'Scale', 'Late'
  ADD COLUMN IF NOT EXISTS company_size_range TEXT, -- '1-25', '25-100', etc.
  ADD COLUMN IF NOT EXISTS data_source TEXT DEFAULT 'H1B'; -- 'H1B', 'Levels.fyi', 'User Submitted'

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_company_metadata_name ON company_metadata(company_name);
CREATE INDEX IF NOT EXISTS idx_benchmarks_stage_size ON benchmarks(company_stage, company_size_range);

-- Add comments
COMMENT ON TABLE company_metadata IS 'Enrichment data for companies (funding, headcount, valuation)';
COMMENT ON COLUMN benchmarks.company_stage IS 'Simplified stage: Early, Growth, Scale, Late';
COMMENT ON COLUMN benchmarks.company_size_range IS 'Employee count range';
