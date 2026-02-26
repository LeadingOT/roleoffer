import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, email, metadata } = body

    const airwallexApiKey = process.env.AIRWALLEX_API_KEY

    if (!airwallexApiKey) {
      return NextResponse.json({ error: 'Payment not configured' }, { status: 503 })
    }

    // Create payment intent with Airwallex
    const paymentIntent = await fetch('https://api.airwallex.com/api/v1/pa/payment_intents/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${airwallexApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'USD',
        merchant_order_id: `roleoffer_${Date.now()}`,
        request_id: `req_${Date.now()}`,
        metadata: {
          email,
          ...metadata
        }
      })
    })

    const data = await paymentIntent.json()

    if (!paymentIntent.ok) {
      console.error('Airwallex error:', data)
      return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 })
    }

    return NextResponse.json({
      payment_intent_id: data.id,
      client_secret: data.client_secret,
      amount: data.amount,
      currency: data.currency
    })
  } catch (error) {
    console.error('Payment API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
