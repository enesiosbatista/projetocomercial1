import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

// stripe.server.ts
//
// This is the server-side Stripe billing integration template.
// 
// Setup Instructions:
// 1. Install the official stripe client dependency:
//    npm install stripe
// 2. Set up your Stripe secret keys in your production environment variables:
//    STRIPE_SECRET_KEY=sk_test_...
//    STRIPE_WEBHOOK_SECRET=whsec_...
//    STRIPE_PRO_PRICE_ID=price_... (from Stripe Dashboard)
//    STRIPE_ELITE_PRICE_ID=price_...

export const createCheckoutSession = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      priceId: z.string().min(1),
      userId: z.string().min(1),
      userEmail: z.string().email(),
    })
  )
  .handler(async ({ data }) => {
    // This executes STRICTLY on the server-side.
    console.log(`[Stripe Server] Initializing checkout session for price ID: ${data.priceId}, User ID: ${data.userId}`);
    
    // In production, instantiate stripe:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });
    // const session = await stripe.checkout.sessions.create({ ... });
    // return { checkoutUrl: session.url };
    
    // Return a simulated success response URL
    await new Promise((r) => setTimeout(r, 600));
    return {
      success: true,
      checkoutUrl: `https://checkout.stripe.com/pay/mock_session_${Math.random().toString(36).substr(2, 9)}`,
    };
  });

export const createBillingPortalSession = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      stripeCustomerId: z.string().min(1),
      returnUrl: z.string().url(),
    })
  )
  .handler(async ({ data }) => {
    console.log(`[Stripe Server] Creating billing portal for Customer ID: ${data.stripeCustomerId}`);
    
    // In production:
    // const session = await stripe.billingPortal.sessions.create({ customer: data.stripeCustomerId, return_url: data.returnUrl });
    // return { portalUrl: session.url };

    await new Promise((r) => setTimeout(r, 500));
    return {
      success: true,
      portalUrl: `https://billing.stripe.com/p/session/mock_portal_${Math.random().toString(36).substr(2, 9)}`,
    };
  });

/*
================================================================================
          STRIPE WEBHOOK HANDLER ENDPOINT EXAMPLE
================================================================================
Add this to an API endpoint (e.g. src/routes/api/webhooks/stripe.ts) in your project:

import { json } from '@tanstack/react-start';
import Stripe from 'stripe';
import { supabaseServerClient } from '@/lib/supabaseServer'; // your server-side supabase client helper

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function POST({ request }: { request: Request }) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;
  
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  // Handle billing portal events
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan as 'pro' | 'elite';
    const customerId = session.customer as string;

    const creditsMap = { pro: 50, elite: 999 };

    if (userId && plan) {
      // Update User Profile plan and credits in database
      const { error } = await supabaseServerClient
        .from('profiles')
        .update({ 
          plan, 
          credits: creditsMap[plan], 
          billing_customer_id: customerId 
        })
        .eq('id', userId);
        
      if (error) console.error('[Webhook Error] Updating profile: ', error);
    }
  }

  return json({ received: true });
}
================================================================================
*/
