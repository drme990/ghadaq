# ghadaq

Public storefront for Ghadaq Association.

## What This App Does

- Presents the Ghadaq brand landing and product catalog.
- Handles customer browsing, checkout, and payment status journey.
- Collects reservation/customization data per product schema.
- Supports referral attribution, coupons, and multi-currency display.
- Integrates tracking (Facebook Pixel + server-side CAPI).

## Architecture

- Next.js App Router storefront.
- Uses /api rewrites/proxy to apps_backend for all business operations.
- Keeps domain logic in backend and focuses on customer UX.

Flow:

- Browser -> ghadaq -> /api/\* -> apps_backend -> MongoDB + EasyKash

## Feature Inventory

### Landing and Content

- Hero sections and brand storytelling blocks.
- Dynamic sections driven by appearance settings.
- Works gallery and informational site sections.
- Arabic/English localized content with RTL/LTR support.

### Catalog and Product Experience

- Product listing pages and product details pages.
- Product media rendering (images + videos).
- Best-seller highlighting and stock-aware UX.
- Dynamic pricing display by selected/active currency.

### Checkout and Reservation

- Multi-step checkout flow.
- Billing/contact collection.
- Country and currency selection.
- Coupon validation and discount application.
- Reservation dynamic fields rendering:
- text, textarea, number, date, select, radio, picture.
- Multi-name support for eligible reservation fields.
- Blocked-date enforcement from backend booking config.
- Optional partial-payment path when enabled by product.
- Terms acceptance enforcement.

### Payments and Post-Payment

- EasyKash redirect flow.
- Payment status page with localized states.
- Retry behavior for incomplete/failed payment attempts.
- Pay-link and custom pay-link route handling.

### Referral and Tracking

- Referral capture from URL and session persistence.
- Referral assignment passed to checkout/order.
- Facebook Pixel client events.
- Facebook CAPI server events via backend endpoint.

### SEO and Technical

- robots.ts and sitemap.ts support.
- Loading and not-found routes.
- Internationalized routing.

## Main Routes

- /
- /products
- /products/[slug]
- /checkout
- /payment/status
- /payment/pay-link/[token]
- /payment/custom-pay-link/[token]
- /calc-aqeqa
- /privacy
- /terms
- /auth/login
- /auth/register
- /user

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS v4
- next-intl
- react-icons

## Environment Variables

Create ghadaq/.env.local:

```env
BACKEND_URL=http://localhost:3000
BASE_URL=http://localhost:3002

NEXT_PUBLIC_FB_PIXEL_ID=
FB_PIXEL_ID=
FB_TEST_EVENT_CODE=
API_TOKEN=
```

## Scripts

- npm run dev
- npm run build
- npm start
- npm run lint

## Local Development

```bash
cd ghadaq
npm install
npm run dev
```

Default local URL:

- http://localhost:3002

## Integration Notes

- Orders from this storefront are source-tagged as ghadaq in backend.
- Pricing, coupons, reservations, and payment truth come from apps_backend.
