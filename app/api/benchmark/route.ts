import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { role, location, stage } = body

    const { data: compData, error } = await supabase
      .from('comp_data')
      .select(\`
        *,
        roles!inner(title),
        locations!inner(city),
        stages!inner(name)
      \`)
      .eq('roles.title', role)
      .eq('locations.city', location)
      .eq('stages.name', stage)
      .maybeSingle()

    if (error || !compData) {
      return NextResponse.json({
        base_salary_p25: 150000,
        base_salary_p50: 180000,
        base_salary_p75: 220000,
        equity_pct_p25: 0.05,
        equity_pct_p50: 0.10,
        equity_pct_p75: 0.20
      })
    }

    return NextResponse.json({
      base_salary_p25: compData.base_salary_p25,
      base_salary_p50: compData.base_salary_p50,
      base_salary_p75: compData.base_salary_p75,
      equity_pct_p25: compData.equity_pct_p25,
      equity_pct_p50: compData.equity_pct_p50,
      equity_pct_p75: compData.equity_pct_p75,
      data_sources: compData.data_sources,
      sample_size: compData.sample_size
    })
  } catch (error) {
    console.error('Benchmark API error:', error)
    return NextResponse.json({ error: 'Failed to fetch benchmark data' }, { status: 500 })
  }
}
