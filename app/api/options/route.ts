import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      // Fallback to hardcoded options
      return NextResponse.json({
        roles: ['Software Engineer', 'Senior Software Engineer', 'Product Manager'],
        locations: ['San Francisco', 'New York', 'Seattle'],
        stages: ['Seed', 'Series A', 'Series B']
      })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Fetch all options in parallel
    const [rolesRes, locationsRes, stagesRes] = await Promise.all([
      supabase.from('roles').select('title').order('title'),
      supabase.from('locations').select('city').order('city'),
      supabase.from('stages').select('name').order('order_num')
    ])

    // Extract unique values
    const roles = [...new Set((rolesRes.data || []).map(r => r.title))]
    const locations = (locationsRes.data || []).map(l => l.city)
    const stages = (stagesRes.data || []).map(s => s.name)

    return NextResponse.json({ roles, locations, stages })
  } catch (error) {
    console.error('Options API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch options' },
      { status: 500 }
    )
  }
}
