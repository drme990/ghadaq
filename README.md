# ghadaq

Public storefront for the Ghadaq platform.

## Latest Updates (April 2026)

- Product requests now call backend with explicit platform context:
  - `platform=ghadaq`
- Product media now follows the unified backend schema (`media[]`) and supports:
  - images
  - videos
  - shared/platform visibility filtering handled by backend
- Checkout and payment status flows received reliability updates:
  - retry handling
  - pay-link/custom-pay-link behavior
  - cleaner payment status UX

## What This App Does

- Delivers the Ghadaq customer website and catalog.
- Handles product discovery, checkout, and payment status.
- Captures reservation fields and referral context.
- Supports multi-currency display and coupon flows.

## Architecture

- Next.js App Router storefront.
- Calls backend APIs via `/api/*` rewrite/proxy.
- Business logic remains centralized in `backend`.

Request flow:

- Browser -> ghadaq -> backend APIs -> MongoDB + services

## Main Functional Areas

- Landing and static pages (localized Arabic/English).
- Product listing and product details with mixed media gallery.
- Multi-step checkout with reservation field rendering.
- EasyKash payment integration and status recovery.
- Referral tracking and analytics hooks.
- SEO files (`robots.ts`, `sitemap.ts`) and metadata support.

## Main Routes

- `/`
- `/products`
- `/products/[slug]`
- `/checkout`
- `/payment/status`
- `/payment/pay-link/[token]`
- `/payment/custom-pay-link/[token]`
- `/calc-aqeqa`
- `/privacy`
- `/terms`
- `/auth/login`
- `/auth/register`
- `/user`

## Environment

Create `ghadaq/.env.local`:

```env
BACKEND_URL=http://localhost:3000
BASE_URL=http://localhost:3002

NEXT_PUBLIC_FB_PIXEL_ID=
FB_PIXEL_ID=
FB_TEST_EVENT_CODE=
API_TOKEN=
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm start`
- `npm run lint`

## Local Run

```bash
cd ghadaq
npm install
npm run dev
```

Default URL: `http://localhost:3002`

## Integration Notes

- Orders are source-tagged as `ghadaq`.
- Pricing, media filtering, coupon validation, reservation rules, and payment state are backend-owned.
