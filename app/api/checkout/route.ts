import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const role = formData.get('role') as string;
    const level = formData.get('level') as string;
    const stage = formData.get('stage') as string;
    const location = formData.get('location') as string;

    if (!role || !level || !stage || !location) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual Airwallex API integration
    // For now, create a mock checkout session
    
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // Mock payment intent (replace with Airwallex API call)
    const paymentIntent = {
      id: `pi_mock_${Date.now()}`,
      amount: 4900, // $49.00 in cents
      currency: 'USD',
      metadata: {
        role,
        level,
        stage,
        location,
      },
    };

    // In production, you would:
    // 1. Call Airwallex API to create payment intent
    // 2. Return checkout URL or client secret
    // 3. Redirect user to Airwallex hosted checkout page

    // For MVP: Redirect to success page (simulate payment)
    const successUrl = new URL('/checkout/success', appUrl);
    successUrl.searchParams.set('session_id', paymentIntent.id);
    successUrl.searchParams.set('role', role);
    successUrl.searchParams.set('level', level);
    successUrl.searchParams.set('stage', stage);
    successUrl.searchParams.set('location', location);

    return NextResponse.redirect(successUrl);

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

// Airwallex integration helper (implement later)
async function createAirwallexPaymentIntent(params: {
  amount: number;
  currency: string;
  metadata: Record<string, string>;
}) {
  const AIRWALLEX_API_KEY = process.env.AIRWALLEX_API_KEY;
  const AIRWALLEX_CLIENT_ID = process.env.AIRWALLEX_CLIENT_ID;
  const AIRWALLEX_ENV = process.env.AIRWALLEX_ENV || 'demo';

  if (!AIRWALLEX_API_KEY || !AIRWALLEX_CLIENT_ID) {
    throw new Error('Airwallex credentials not configured');
  }

  const baseUrl = AIRWALLEX_ENV === 'prod' 
    ? 'https://api.airwallex.com' 
    : 'https://api-demo.airwallex.com';

  // Airwallex API call
  const response = await fetch(`${baseUrl}/api/v1/pa/payment_intents/create`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIRWALLEX_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      request_id: `req_${Date.now()}`,
      amount: params.amount / 100, // Convert cents to dollars
      currency: params.currency,
      merchant_order_id: `order_${Date.now()}`,
      metadata: params.metadata,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Airwallex API error: ${response.statusText}`);
  }

  return response.json();
}
