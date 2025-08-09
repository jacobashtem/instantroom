# InstantRoom (Nuxt 3)

AI-powered interior design web app built with Nuxt 3. Users upload a photo of a room and generate styled visualizations using Replicate. Authentication and storage are powered by Supabase, subscriptions and payments by Stripe. Content (blog) is managed with @nuxt/content. UI uses @nuxt/ui and Tailwind CSS.

- Tech stack: Nuxt 3, Nitro server routes, @nuxt/content, @nuxt/ui, Tailwind CSS, @nuxt/image, Supabase, Stripe, Replicate
- Production target: Node 20, Netlify/Vercel-compatible (serverless)

## Quick start

1) Prerequisites
- Node 20+
- pnpm (recommended) or npm/yarn/bun
- Accounts/keys: Replicate, Stripe, Supabase

2) Configure environment
- Copy the example env and fill in values:

```bash
cp .env.example .env
```

3) Install dependencies

```bash
pnpm install
```

4) Run the dev server

```bash
pnpm dev
```

App runs on http://localhost:3000

## Scripts

- `pnpm dev` – start dev server
- `pnpm build` – production build
- `pnpm preview` – preview production build
- `pnpm generate` – generate static site (SSG) when applicable
- `pnpm lint` / `pnpm lint:fix` – lint code

## Environment variables

Required
- REPLICATE_API_TOKEN: Replicate access token
- SUPABASE_URL: Supabase project URL
- SUPABASE_KEY: Supabase anon/public key
- STRIPE_SECRET: Stripe secret key (live or test, used server-side)
- NUXT_PUBLIC_STRIPE_KEY: Stripe publishable key (client)
- NUXT_STRIPE_WEBHOOK_SECRET: Stripe endpoint secret (for webhooks)

Optional / conditional
- STRIPE_TEST_SECRET: Optional separate test secret used by `verify-payment`
- NUXT_STRIPE_SECRET: Server key used by `@unlok-co/nuxt-stripe` (if you keep the plugin enabled)
- NUXT_PUBLIC_DEFAULT_LOCALE: Default locale for UI (defaults to `pl`)
- VERCEL_URL: Used to construct webhook host when deployed on Vercel
- NGROK_HOST: Used to construct webhook host for local development (e.g. `https://<id>.ngrok.io`)

Notes
- Public keys should be prefixed with `NUXT_PUBLIC_` to be exposed client-side.
- Configure all secrets in your hosting provider’s environment settings.

## Features overview

- Image generation: Replicate Predictions API, webhook-ready
- Auth & user state: Supabase Auth
- Payments & subscriptions: Stripe (checkout, subscription lifecycle, webhooks)
- Content/blog: Markdown via @nuxt/content
- UI & styling: @nuxt/ui, Tailwind CSS with custom color palette
- Media & performance: @nuxt/image(+edge), IPX
- SEO: Custom sitemap route, content head metadata

## Project structure (key paths)

- `pages/` – Nuxt pages and route components
- `components/` – UI components (forms, sections, galleries)
- `layouts/` – App shell and global styles (`global.css`)
- `middleware/` – Route middleware (`auth.js`)
- `server/api/` – Nitro API routes (Stripe, Replicate, projects)
- `server/routes/` – Custom server routes (e.g., `sitemap.xml.ts`)
- `server/services/` – Server-side service clients (Replicate)
- `content/` – Blog posts (Markdown)
- `configs/` – App-level configs (e.g., `i18n.js`)
- `nuxt.config.ts` – Nuxt modules and runtime config
- `tailwind.config.js` – Tailwind theme & plugins
- `app.config.ts` – @nuxt/ui theme configuration

## API

All endpoints live under `/api/*` and are server-side (Nitro).

Image generation
- POST `/api/predictions`
  - Body: `{ image: string, theme?: string, roomType?: string, prompt?: string }`
  - Uses Supabase table `sorted_prompts` to choose a prompt when `theme` and `roomType` are provided.
  - Creates a Replicate prediction and optionally registers a webhook if `VERCEL_URL` or `NGROK_HOST` is set.
  - Requires `REPLICATE_API_TOKEN`.
- GET `/api/predictions/:id`
  - Fetches a prediction by id with retry/backoff handling.
- POST `/api/custom-predictions`
  - Body: `{ image: string, prompt: string }`
  - Creates a Replicate prediction with your custom prompt.

Projects listing
- GET `/api/projects`
  - Scans `public/portfolio/*` for `.webp` images and returns `{ projects, categories }`.

Stripe subscriptions
- POST `/api/cancel-subscription` (auth required)
  - Cancels at period end based on the authenticated user’s `subscriptionId` (stored in Supabase user metadata).
- POST `/api/resume-subscription` (auth required)
  - Resumes a canceled subscription.
- POST `/api/verify-payment`
  - Validates a Checkout session by `session_id` using `STRIPE_TEST_SECRET`.

Stripe webhook
- POST `/api/webhooks/stripe`
  - Verifies requests using `NUXT_STRIPE_WEBHOOK_SECRET`.
  - Handles:
    - `checkout.session.completed` – stores `subscriptionId`, `tokens` and flags subscription active in Supabase user metadata
    - `invoice.payment_succeeded` – renews subscription and updates tokens
    - `invoice.payment_failed` – marks subscription inactive
    - `customer.subscription.updated` – writes `cancelled` and `subscriptionEnd`
    - `customer.subscription.deleted` – clears subscription metadata

Webhook host for Replicate
- The predictions endpoints set `options.webhook = <host>/api/webhooks` if host is available. Provide `VERCEL_URL` or `NGROK_HOST` to enable webhooks during development/deploys. Adjust the path to your actual webhook handler as needed.

## Auth & middleware

- Supabase auth is used throughout the app
- `middleware/auth.js` guards protected pages; it redirects unauthenticated users to `/` and refreshes user/tokens
- Composables like `useLoggedIn` and `useUserTokens` encapsulate user state and token logic

## Content authoring (@nuxt/content)

Add new blog posts under `content/blog/*.md`. Each file uses front matter; example:

```md
---
title: Salon w Stylu Japandi – Elegancja, Prostota i Naturalne Piękno w Jednym
description: Poznaj tajniki aranżacji salonu w stylu Japandi...
author: Jacob Ash
reading: 7
date: 2024-12-08 12:00
category: Inspiracje
tags:
  - japandi salon
image:
  src: /blog/salon-japandi.webp
  alt: Przytulny salon w stylu Japandi
head:
  meta:
    - name: keywords
      content: japandi salon, styl japandi
---
```

The sitemap route (`server/routes/sitemap.xml.ts`) automatically includes content paths and a few static routes.

## Styling & UI

- Tailwind CSS with `@tailwindcss/typography` plugin
- Custom color palette in `tailwind.config.js`
- @nuxt/ui theme tokens configured in `app.config.ts`
- Global CSS at `layouts/global.css`

## Images

- `@nuxt/image` and `@nuxt/image-edge` for optimized images
- `browser-image-compression` used client-side to compress uploads

## i18n

- UI copy lives in `configs/i18n.js` for Polish (`pl`) and English (`en`)
- Default locale can be set via `NUXT_PUBLIC_DEFAULT_LOCALE` (defaults to `pl`)

## Deployment

Netlify
- `netlify.toml` sets Node 20, build command `pnpm run build`, and publish dir `dist`
- Ensure all env vars are configured in Netlify
- Add Stripe webhook endpoint pointing to `/api/webhooks/stripe`

Vercel
- Set environment variables in Vercel dashboard
- `VERCEL_URL` is used to construct webhook host for Replicate

Local webhooks (Stripe & Replicate)
- Use `stripe listen` to forward events to your local `/api/webhooks/stripe`
- Use ngrok for Replicate webhooks; set `NGROK_HOST` to the secure URL

## Troubleshooting

- 401/redirects on protected pages: ensure Supabase keys are correct and the user is authenticated
- Replicate 401: check `REPLICATE_API_TOKEN`
- Webhook signature errors: verify `NUXT_STRIPE_WEBHOOK_SECRET`
- Images not listed in `/api/projects`: confirm files are in `public/portfolio/**` and are `.webp`

## License

Proprietary. All rights reserved, unless stated otherwise.
