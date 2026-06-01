# Widgetly Clone

A full-stack clone of [Widgetly.co](https://widgetly.co) — a widget marketplace SaaS for Notion pages.

## Features

- **Widget Marketplace** — Browse and search widgets by category (Counters, Buttons, Weather, Productivity, Business)
- **Widget Detail Pages** — View widget features, configuration options, and FAQs
- **SaaS Pricing** — 4-tier pricing (Free, Basic $3/mo, Pro $5/mo, Ultimate $7/mo) with monthly/yearly billing
- **Auth System** — Google OAuth + Email magic link authentication (Supabase Auth)
- **Dashboard** — Manage widgets, view analytics, billing management
- **PageVault** — Turn Notion pages into gated/sellable digital products
- **Blog** — Content marketing with SEO-optimized articles
- **Free Tools** — Focus Timer, Pomodoro Timer, Days Calculator, unit converters
- **Widget Embed Engine** — Server-rendered widgets served as embeddable iframes

## Tech Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS v4
- **Backend:** Supabase (Auth, PostgreSQL, Storage)
- **Payments:** Stripe Checkout + Webhooks
- **Deployment:** Vercel

## Getting Started

1. Clone the repo
2. Copy `.env.local.example` to `.env.local` and fill in your Supabase and Stripe keys
3. Run `npm install`
4. Run `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/               # Next.js App Router pages
│   ├── page.tsx       # Homepage
│   ├── pricing/       # Pricing page
│   ├── widget/[slug]/ # Widget detail pages
│   ├── embed/[slug]/  # Widget iframe embed routes
│   ├── auth/          # Login/Signup pages
│   ├── dashboard/     # User dashboard
│   ├── blog/          # Blog listing + posts
│   ├── page-vault/    # PageVault feature
│   ├── time/          # Free tools
│   └── free-widgets/  # Free widget tools
├── components/
│   ├── layout/        # Header, Footer
│   ├── widgets/       # WidgetCard, widget components
│   └── ui/            # Shared UI components
├── lib/               # Utilities, data, API clients
└── types/             # TypeScript type definitions
```

## Environment Variables

See `.env.local.example` for all required environment variables.

## License

MIT
