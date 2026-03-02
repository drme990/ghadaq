# Ghadaq Association — Islamic Services Platform

A modern, bilingual Next.js 16 web application for **Ghadaq Association**, providing Islamic religious and charitable services including Aqiqah, sacrifices, vows, charity, and well-drilling services. Built with a custom gold/green color scheme and full Arabic RTL support.

> **Architecture Note:** This is the **public-facing client app only**. All admin operations (product management, orders, users, settings) are handled by the separate **Admin Panel** (`admin_panel/`). Both apps share the same MongoDB database.

---

## 🌟 Features 

### Public-Facing

- **Bilingual** — Arabic (RTL) and English (LTR) support via `next-intl`
- **Product Catalog** — Browse and purchase Islamic services across multiple categories
- **Aqiqah Calculator** — Interactive calculator for estimating Aqiqah ceremony costs
- **Checkout Flow** — Full order flow with customer details, currency selection, and coupon support
- **Payment Gateway** — Supports **Paymob** (full checkout) and **EasyKash** (direct payment links), configurable per-project from the admin panel
- **Multi-Currency Pricing** — Real-time exchange rates, auto-pricing per country
- **Country-Based Routing** — Prices and visibility filtered by customer country
- **Testimonials Slider** — Marquee-based customer testimonial section
- **Referral System** — Referral codes tracked through the checkout and order flow
- **Our Works Gallery** — Two-row image slider showcasing completed works, managed from the admin panel
- **SEO Ready** — Dynamic `sitemap.xml`, `robots.txt`, Open Graph meta tags
- **Light / Dark Theme** — User-switchable via `next-themes`
- **PWA Support** — `site.webmanifest` for installable experience

### Design & Branding

- Custom gold gradient (`#ffa401 → #ffc001 → #ffd84d`) as the primary brand color
- Dark forest green dark mode background (`#134d37`)
- Navy blue light mode text (`#000f2f`)
- Satoshi (English) and Expo Arabic fonts

---

## 🛠️ Tech Stack

| Category             | Technology                                 |
| -------------------- | ------------------------------------------ |
| Framework            | Next.js 16.1.6 (App Router, Turbopack)     |
| Language             | TypeScript                                 |
| Database             | MongoDB + Mongoose v9                      |
| Styling              | Tailwind CSS v4 with CSS custom properties |
| Internationalization | next-intl v4.8.2                           |
| Image Upload         | Cloudinary v2                              |
| Payment              | Paymob / EasyKash (configurable)           |
| Icons                | Lucide React + React Icons                 |
| Theme                | next-themes v0.4.6                         |
| Marquee              | react-fast-marquee                         |
| Currency Flags       | country-flag-icons                         |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally or a cloud instance
- Cloudinary account (for image assets managed via admin)
- Paymob and/or EasyKash account (for payment processing)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env.local   # or create manually (see below)

# 3. Seed countries data (required for currency/country features)
npm run seed:countries

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Important:** The admin panel (`admin_panel/`) must be used to create products, manage orders, and configure settings. This app does not have its own admin interface.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
# ── Database ──────────────────────────────────────────────────────
DATA_BASE_URL=mongodb://localhost:27017/manasik

# ── Application ───────────────────────────────────────────────────
BASE_URL=http://localhost:3000
NODE_ENV=development

# ── Paymob Payment Gateway ────────────────────────────────────────
PAYMOB_SECRET_KEY=your-paymob-secret-key
PAYMOB_PUBLIC_KEY=your-paymob-public-key
PAYMOB_INTEGRATION_ID=your-integration-id
PAYMOB_HMAC_SECRET=your-hmac-secret
PAYMOB_BASE_URL=https://accept.paymob.com

> `DATA_BASE_URL` must point to **the same MongoDB database** used by the admin panel and the manasik-v2 app. All three apps share one database.

---

## 📁 Project Structure

```
ghadaq/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Homepage (landing page)
│   ├── layout.tsx              # Root layout with fonts, providers
│   ├── globals.css             # Global styles, CSS theme variables
│   ├── loading.tsx             # Global loading UI
│   ├── not-found.tsx           # 404 page
│   ├── robots.ts               # robots.txt generator
│   ├── sitemap.ts              # Dynamic sitemap generator
│   ├── products/               # Product listing & detail pages
│   ├── checkout/               # Checkout & order form
│   ├── payment/                # Payment success/failure status page
│   ├── calc-aqeqa/             # Aqiqah calculator page
│   ├── privacy/                # Privacy policy page
│   ├── terms/                  # Terms & conditions page
│   └── api/                    # Public API routes (no auth)
│       ├── appearance/         # GET works images (ghadaq-specific)
│       ├── countries/          # GET active countries
│       ├── coupons/validate    # POST validate coupon code
│       ├── currency/rates      # GET exchange rates
│       ├── payment-method/     # GET active payment method for ghadaq
│       ├── payment/checkout    # POST create payment order
│       ├── payment/webhook     # POST Paymob webhook handler
│       ├── payment/referral-info # GET referral info
│       └── products/           # GET products (public)
├── components/
│   ├── landing/                # Homepage sections (hero, works, testimonials, etc.)
│   ├── layout/                 # Header, footer, navigation
│   ├── shared/                 # Shared components (currency selector, etc.)
│   ├── providers/              # Context providers (theme, currency, cart)
│   └── ui/                     # Base UI components (Button, Input, etc.)
├── hooks/
│   └── currency-hook.tsx       # Currency context hook
├── i18n/
│   └── request.ts              # next-intl server config
├── lib/                        # Server utilities
│   ├── db.ts                   # MongoDB connection
│   ├── cloudinary.ts           # Cloudinary config
│   ├── countries.ts            # Country helpers
│   ├── coupon.ts               # Coupon validation logic
│   ├── currency.ts             # Currency conversion utilities
│   ├── paymob.ts               # Paymob API integration
│   ├── rate-limit.ts           # API rate limiting
│   └── utils.ts                # Shared utility functions
├── messages/
│   ├── ar.json                 # Arabic translations
│   └── en.json                 # English translations
├── models/                     # Mongoose models (shared DB schema)
│   ├── Appearance.ts           # Works images (per-project: 'ghadaq')
│   ├── Country.ts              # Countries & currencies
│   ├── Coupon.ts               # Discount coupons
│   ├── Order.ts                # Customer orders
│   ├── PaymentSettings.ts      # Payment method config (per-project)
│   ├── Product.ts              # Islamic service products
│   ├── Referral.ts             # Referral partners
│   └── User.ts                 # Admin users (read-only from client)
├── types/                      # TypeScript interfaces
├── public/                     # Static assets
│   ├── fonts/                  # Satoshi & Expo Arabic fonts
│   ├── icons/                  # App icons & PWA icons
│   ├── testimonials/           # Testimonial images
│   ├── works/                  # Fallback works images
│   └── site.webmanifest        # PWA manifest
├── scripts/
│   ├── seed-countries.ts       # Populate countries collection
│   └── migrate-product-v2.ts   # Data migration helper
└── docs/                       # Integration documentation
    ├── QUICK_START.md
    ├── ADMIN_SETUP.md
    ├── CLOUDINARY.md
    ├── PAYMOB.md
    ├── MULTI_CURRENCY_PRICING.md
    ├── PAYMENT_SYSTEM.md
    └── REFERRAL_SYSTEM.md
```

---

## 🔧 Available Scripts

```bash
npm run dev            # Start development server (port 3000, Turbopack)
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
npm run seed:countries # Seed countries & currencies into MongoDB
```

---

## 💳 Payment System

The active payment method is configured from the admin panel per-project. The app reads its setting from `/api/payment-method` at runtime.

| Method       | Description                                                          |
| ------------ | -------------------------------------------------------------------- |
| **Paymob**   | Full hosted checkout with quantity selection and card/wallet options |
| **EasyKash** | Direct payment link without a checkout page                          |

The checkout page (`/checkout`) dynamically renders the correct flow based on the active payment method.

---

## 🌍 Internationalization

- Supported locales: `ar` (Arabic, RTL) and `en` (English, LTR)
- Language detection via URL prefix (e.g. `/ar/products`, `/en/products`)
- Translations stored in `messages/ar.json` and `messages/en.json`
- Configured via `next-intl` with server-side locale resolution in `i18n/request.ts`

---

## 🖼️ Our Works Gallery

Images displayed in the homepage "Our Works" section are managed from:
**Admin Panel → Appearance → Ghadaq tab**

The homepage fetches `/api/appearance` which filters works images for the `ghadaq` project from MongoDB. Changes made in the admin panel reflect immediately after the next page load.

---

## 🔐 Security

- No admin authentication in this app — all write operations go through the admin panel
- Payment webhooks verified using Paymob HMAC signature
- API rate limiting on checkout and payment routes
- Input validation on all API endpoints

---

## 📄 License

Private and proprietary to **Ghadaq Association**.
