import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil" as any,
});

// Plan to Stripe Price ID mapping — configure in Stripe Dashboard
export const PLAN_PRICE_IDS: Record<string, { monthly: string; yearly: string }> = {
  basic: {
    monthly: process.env.STRIPE_BASIC_MONTHLY_PRICE_ID!,
    yearly: process.env.STRIPE_BASIC_YEARLY_PRICE_ID!,
  },
  pro: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
    yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
  },
  ultimate: {
    monthly: process.env.STRIPE_ULTIMATE_MONTHLY_PRICE_ID!,
    yearly: process.env.STRIPE_ULTIMATE_YEARLY_PRICE_ID!,
  },
};
