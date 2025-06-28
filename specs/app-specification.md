# Vypečená Kůrka – Full Application Specification

*(Brand‑site & E‑shop — MVP)*  
_Last updated: 27 Jun 2025_

---

## 0. At‑a‑Glance

| Attribute | Value |
|-----------|-------|
| **Framework** | **Next.js 15** (App Router, server components) |
| **Language** | TypeScript (strict) |
| **UI / Styling** | Radix UI primitives + Tailwind CSS |
| **Auth** | NextAuth v5 — Google & Facebook OAuth; guest checkout (e‑mail + phone) |
| **Payments** | Stripe Checkout (Session API) — CZK only |
| **Data Store** | **Vercel Postgres** or **PlanetScale** for relational data; **Vercel Blob** for images & assets |
| **Hosting / Functions** | **Vercel** — Edge Functions for API endpoints and serverless functions |
| **Analytics / Monitoring** | Vercel Analytics + Speed Insights; Sentry for error tracking |
| **Locales** | Czech (default); i18n scaffold ready for future EN |
| **Fulfilment** | Local pick‑up only — **Kopretinova 17, Brno‑Jundrov**<br>Bake days **Tuesday & Friday** |

---

## 1. Information Architecture & Routing

```text
/
/home                 [GET /]
  ├─ Hero (bread_1.jpg, logo overlay)
  ├─ USP Tiles ("Kváskový chléb", "Pečeno v úterý / pátek")
  ├─ Featured Products (first 4 active stock items)
  └─ Newsletter CTA
/shop
  ├─ Catalog (grid, filters: category, availability)
  └─ /shop/[slug]      – Product Details Page (PDP)
/objednavka           – Cart & Checkout Wizard
  └─ /objednavka/diky – Order Confirmation
/o-nas                – Story page (portrait mikuska_2.jpg)
/faq
/kontakt              – Map embed & pick‑up details
/admin (protected by role === 'admin') — **✅ IMPLEMENTED**
  ├─ /admin/stock     – "Bake‑Day Stock" board ✅
  └─ /admin/orders    – Orders list (filter by date) ✅
  
  📋 **Admin Features**: See [admin-implementation.md](./admin-implementation.md) for complete documentation
```

---

## 2. Core User Flows

### 2.1 Browsing & Adding to Cart
1. Visitor lands on **/shop**.  
2. Client‑side filters query `GET /api/products?date=YYYY‑MM‑DD` (defaults to next bake day).  
3. "**Přidat do košíku**" dispatches `{ productId, bakeDate }` into Zustand cart store.

### 2.2 Checkout
1. **Step 1** – Choose bake day (radio with next four Tue / Fri dates).  
2. **Step 2** – Auth selection:  
   * **OAuth** – Google / Facebook popup.  
   * **Guest** – enter email & phone (validated).  
3. **Step 3** – Stripe Checkout session (metadata includes `bakeDate`, `cartId`).  
4. Stripe sends `payment_intent.succeeded` → Vercel Function updates database: creates order record, decrements stock quantities.

### 2.3 Admin: Managing Stock
- `/admin/stock` table lists four upcoming bake days with editable "Loaves available".  
- Submit triggers **API call** to `/api/admin/stock` which modifies stock records.

### 2.4 Admin: Order Fulfilment
- `/admin/orders` date picker defaults to *today*.  
- Rows show customer contact, items, Stripe status badge.  
- "Mark picked‑up" button sets `status = 'FULFILLED'`.

---

## 3. Data Model (Vercel Postgres / PlanetScale)

| Table | Primary Key | Key Fields |
|-------|-------------|-----------|
| **products** | `id` (UUID) | `slug`, `name`, `description`, `price_cents`, `image_path`, `is_active`, `created_at` |
| **stock_days** | `date` (DATE) | `total_qty`, `remaining_qty`, `updated_at` |
| **orders** | `id` (UUID) | `bake_date`, `email`, `phone`, `user_id`, `stripe_session_id`, `status`, `created_at` |
| **order_line_items** | `id` (UUID) | `order_id` (FK), `product_id` (FK), `qty`, `price_cents` |
| **users** | `id` (UUID) | `email`, `name`, `role`, `created_at` |

### Enum: `status`
`PENDING` · `PAID` · `FULFILLED` · `CANCELLED`

### Image Storage
- **Vercel Blob** for product images and assets
- CDN-optimized URLs with automatic compression
- Next.js Image optimization

---

## 4. Component Inventory

| Component | Description |
|-----------|-------------|
| **`<Navbar />`** | Sticky nav, links + cart badge |
| **`<Hero />`** | Full‑bleed image with overlay text |
| **`<BreadCard />`** | Product card (photo, name, price, add button) |
| **`<DateRadioGroup />`** | Shows next 4 Tue/Fri dates (disabled when sold‑out) |
| **`<CartDrawer />`** | Slide‑over panel summarising cart |
| **`<CheckoutWizard />`** | Multi‑step checkout UI |
| **`<AdminTable />`** | Generic table for stock & orders |
| **`<StockEditorModal />`** | Adjust quantity for a bake day |

---

## 5. API Surface (Vercel Functions)

| Endpoint | Method | Auth? | Purpose |
|----------|--------|-------|---------|
| `/api/products` | GET | Public | `?date=YYYY‑MM‑DD` → list products & remainingQty |
| `/api/checkout` | POST | Public | Creates Stripe session from cart & returns URL |
| `/api/webhooks/stripe` | POST | Stripe Sig | Handles Stripe events (payments, refunds) |
| `/api/admin/stock` | PUT | Admin | `{date, totalQty}` – update stock |
| `/api/admin/orders` | GET | Admin | `?date=YYYY‑MM‑DD` – fetch orders & line items |
| `/api/auth/[...nextauth]` | * | NextAuth | OAuth & session management |

---

## 6. Non‑Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | Largest Contentful Paint ≤ 2.5 s on 4G (Lighthouse Mobile) |
| **Accessibility** | WCAG 2.2 AA; fully keyboard navigable |
| **Security** | Database connection pooling, parameterized queries, rate limiting |
---

## 7. Dev & Ops Workflow

| Stage | Tooling |
|-------|---------|
| Local Dev | `npm run dev` with local PostgreSQL or PlanetScale dev branch |
| CI / CD | Vercel automatic deployments from GitHub: lint → type‑check → build → deploy (on `main`) |
| Preview Environments | Automatic preview deployments for pull requests |
| Database Migrations | Drizzle ORM or Prisma for schema management |
| Monitoring | Vercel Analytics, Speed Insights, and Sentry integration |

---

## 8. Launch Checklist

- [ ] Vercel project connected to GitHub repository  
- [ ] Custom domain `vypecenakurka.cz` configured in Vercel  
- [ ] Database (Vercel Postgres or PlanetScale) provisioned and connected
- [ ] Stripe live keys configured in Vercel environment variables  
- [ ] Images uploaded to Vercel Blob storage
- [ ] Database schema migrated to production
- [ ] GDPR‑compliant cookie banner (analytics only)  
- [ ] SEO meta tags & `robots.txt` added  

---

## 9. Future‑Proof Roadmap

| Phase | Features |
|-------|----------|
| **CMS** | Integrate Sanity or Contentful for content pages & blog |
| **Delivery** | Add shipping options & calculators |
| **Marketing** | Coupons, gift cards, abandoned‑cart emails |
| **Subscriptions** | Weekly bread box subscription (Stripe recurring) |
| **Multi‑Lang** | Enable EN locale (`/en/...`) |

---

## 10. Outstanding Clarifications

1. **Order cut‑off time** — Close orders at 20:00 previous day?  
2. **Min/Max loaves per order** — Limit to avoid one user buying full batch?  
3. **Receipts** — Stripe default email OK or need PDF invoice?  
4. **Admin roles** — Only owner or multiple staff accounts?  

*Let me know so we can lock the scope & start sprint planning.*

---

## 11. IMPLEMENTATION STATUS & TECHNICAL GUIDE

*Updated: 27 Jun 2025 — Migrated from Firebase to Vercel hosting*

### 11.1 Implementation Completion Status

#### ✅ **COMPLETED (MVP Ready)**
| Feature | Status | Files | Notes |
|---------|--------|-------|-------|
| **Core Pages** | ✅ Complete | `src/app/page.tsx`, `src/app/shop/`, `src/app/o-nas/`, `src/app/faq/`, `src/app/kontakt/` | All main content pages implemented |
| **Navigation** | ✅ Complete | `src/components/navbar.tsx` | Responsive navbar with cart badge |
| **Product Display** | ✅ Complete | `src/components/bread-card.tsx` | Interactive product cards with cart integration |
| **Cart Management** | ✅ Complete | `src/store/cart.ts` | Zustand store with persistence |
| **Date Selection** | ✅ Complete | `src/components/date-radio-group.tsx` | Tuesday/Friday bake day selector |
| **UI System** | ✅ Complete | `src/components/ui/` | Radix UI + Tailwind components |
| **Typography & Styling** | ✅ Complete | `src/app/globals.css`, `tailwind.config.js` | Orange brand theme implemented |
| **Mock Data** | ✅ Complete | Embedded in pages | Product catalog with sample data |
| **Deployment** | ✅ Complete | Vercel hosting | Live at kurka-bakery-co9chu21h-gzhytars-projects.vercel.app |
| **Admin Panel** | ✅ Complete | `src/app/admin/` | Full admin interface - see [admin-implementation.md](./admin-implementation.md) |

#### 🔄 **IN PROGRESS / READY FOR INTEGRATION**
| Feature | Status | Required Work | Priority |
|---------|--------|---------------|----------|
| **Database Integration** | 🔧 Ready | Set up Vercel Postgres + schema | HIGH |
| **Authentication** | 🔧 Config Ready | Implement NextAuth v5 flows | HIGH |
| **Stripe Integration** | 🔧 Config Ready | Add checkout + webhook handlers | HIGH |
| **Cart Checkout** | ⏳ Not Started | Create `/objednavka` multi-step wizard | HIGH |

#### ❌ **NOT IMPLEMENTED**
- Order confirmation page (`/objednavka/diky`)
- Vercel Functions for API endpoints (except admin mock APIs)
- Newsletter signup functionality
- Mobile cart drawer component
- Email confirmations
- Analytics integration

### 11.2 Technical Architecture (As Built)

#### **Project Structure**
```
src/
├── app/                          # Next.js 15 App Router
│   ├── layout.tsx               # Root layout with Navbar
│   ├── page.tsx                 # Homepage (Hero + USP + Products)
│   ├── shop/
│   │   ├── page.tsx            # Product catalog with filters
│   │   └── [slug]/page.tsx     # Product detail pages
│   ├── admin/                   # Admin panel (protected routes)
│   │   ├── layout.tsx          # Admin layout with sidebar navigation
│   │   ├── page.tsx            # Admin dashboard (redirects to stock)
│   │   ├── stock/page.tsx      # Stock management interface
│   │   └── orders/page.tsx     # Orders management interface
│   ├── api/
│   │   └── admin/              # Admin API endpoints
│   │       ├── stock/route.ts  # Stock management API
│   │       └── orders/route.ts # Orders management API
│   ├── o-nas/page.tsx          # About page (story + values)
│   ├── faq/page.tsx            # FAQ with expandable cards
│   ├── kontakt/page.tsx        # Contact + pickup info
│   └── globals.css             # Tailwind + custom CSS variables
├── components/
│   ├── ui/                     # Base components (Radix UI)
│   │   ├── button.tsx          # Button with variants
│   │   ├── card.tsx            # Card layouts
│   │   ├── badge.tsx           # Status badges
│   │   ├── input.tsx           # Form input component
│   │   └── select.tsx          # Dropdown select component
│   ├── navbar.tsx              # Main navigation (includes admin link)
│   ├── hero.tsx                # Homepage hero section
│   ├── bread-card.tsx          # Product card component
│   └── date-radio-group.tsx    # Bake day selector
├── lib/
│   └── utils.ts                # Utilities (formatPrice, dates)
├── store/
│   └── cart.ts                 # Zustand cart store
├── types/
│   └── index.ts                # TypeScript definitions
└── .env.example                # Environment variables template
```

#### **Key Dependencies**
```json
{
  "dependencies": {
    "next": "15.3.4",
    "react": "^19.0.0",
    "next-auth": "^4.24.0",
    "stripe": "^14.25.0",
    "zustand": "^4.5.2",
    "@radix-ui/react-*": "^1.x",
    "tailwindcss": "^3.4.0",
    "lucide-react": "^0.460.0",
    "clsx": "^2.1.1"
  }
}
```

### 11.3 Database Schema (Recommended)

#### **Using Drizzle ORM + Vercel Postgres**
```typescript
// lib/db/schema.ts
export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 100 }).unique().notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  priceCents: integer('price_cents').notNull(),
  imagePath: varchar('image_path', { length: 500 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const stockDays = pgTable('stock_days', {
  date: date('date').primaryKey(),
  totalQty: integer('total_qty').notNull(),
  remainingQty: integer('remaining_qty').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  bakeDate: date('bake_date').notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  userId: uuid('user_id').references(() => users.id),
  stripeSessionId: varchar('stripe_session_id', { length: 200 }),
  status: varchar('status', { length: 20 }).default('PENDING'),
  createdAt: timestamp('created_at').defaultNow(),
});
```

### 11.4 Environment Variables Required

```bash
# Database (Vercel Postgres)
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=

# NextAuth Configuration  
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=

# OAuth Provider Keys
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_FACEBOOK_ID=
AUTH_FACEBOOK_SECRET=

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Vercel Blob (Image Storage)
BLOB_READ_WRITE_TOKEN=
```

### 11.5 Migration from Firebase Complete

#### **✅ Removed**
- Firebase SDK and all dependencies
- Firebase configuration files (`firebase.ts`, `storage.rules`)
- Firebase Storage hostname from Next.js config

#### **✅ Updated Architecture**
- **Hosting**: Vercel (instead of Firebase Hosting)
- **Database**: Vercel Postgres/PlanetScale (instead of Firestore)
- **Functions**: Vercel Functions (instead of Cloud Functions)
- **Storage**: Vercel Blob (instead of Cloud Storage)
- **Auth**: NextAuth on Vercel (instead of Firebase Auth)

#### **✅ Benefits of Vercel Stack**
- **Simpler deployment**: Git-based deployments
- **Better performance**: Edge functions and CDN
- **SQL database**: Better for e-commerce with relationships
- **Integrated analytics**: Vercel Analytics built-in
- **Cost-effective**: More predictable pricing

### 11.6 Next Development Priorities

#### **Phase 1: Database Setup (Essential for Launch)**
1. **Set up Vercel Postgres**
   - Create database instance
   - Define schema with Drizzle ORM
   - Migrate sample data from mock arrays

2. **API Endpoints**
   - `/api/products` - Product catalog with stock
   - `/api/checkout` - Stripe session creation
   - `/api/webhooks/stripe` - Payment processing

3. **Database Integration**
   - Replace all mock data with real database queries
   - Implement real-time stock management
   - Add database migrations

#### **Phase 2: Payment & Orders**
1. **Stripe Integration**
   - Checkout session creation
   - Webhook handling for payments
   - Order creation flow

2. **Order Management**
   - Order confirmation pages
   - Email notifications
   - Admin order dashboard

### 11.7 Deployment Status

#### **✅ Current Deployment**
- **Live URL**: https://kurka-bakery-co9chu21h-gzhytars-projects.vercel.app
- **Status**: MVP frontend deployed and functional
- **Features**: All static pages, cart functionality, responsive design

#### **🔧 Next Steps for Production**
1. Configure custom domain (`vypecenakurka.cz`)
2. Set up Vercel Postgres database
3. Implement API endpoints for dynamic data
4. Configure production environment variables
5. Set up monitoring and analytics

---

*🤖 For LLM/Agents: The application has been successfully migrated from Firebase to Vercel hosting. All Firebase dependencies have been removed and the architecture updated for Vercel's serverless platform.*
