
# Vypečená Kůrka – Full Application Specification

*(Brand‑site & E‑shop — MVP)*  
_Last updated: 27 Jun 2025_

---

## 0. At‑a‑Glance

| Attribute | Value |
|-----------|-------|
| **Framework** | **Next.js 15** (App Router, server components) |
| **Language** | TypeScript (strict) |
| **UI / Styling** | Radix UI primitives + Tailwind CSS |
| **Auth** | NextAuth v5 — Google & Facebook OAuth; guest checkout (e‑mail + phone) |
| **Payments** | Stripe Checkout (Session API) — CZK only |
| **Data Store** | **Firebase** – Cloud Firestore (NoSQL) for business data; Cloud Storage for images & assets |
| **Hosting / Functions** | **Firebase Hosting** + Cloud Functions (Node 20) for SSR & API |
| **Analytics / Monitoring** | Google Analytics 4 or Plausible; Sentry (FE & Functions) |
| **Locales** | Czech (default); i18n scaffold ready for future EN |
| **Fulfilment** | Local pick‑up only — **Kopretinova 17, Brno‑Jundrov**<br>Bake days **Tuesday & Friday** |

---

## 1. Information Architecture & Routing

```text
/
/home                 [GET /]
  ├─ Hero (bread_1.jpg, logo overlay)
  ├─ USP Tiles (“Kváskový chléb”, “Pečeno v úterý / pátek”)
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
/admin (protected by role === 'admin')
  ├─ /admin/stock     – “Bake‑Day Stock” board
  └─ /admin/orders    – Orders list (filter by date)
```

---

## 2. Core User Flows

### 2.1 Browsing & Adding to Cart
1. Visitor lands on **/shop**.  
2. Client‑side filters query `GET /api/products?date=YYYY‑MM‑DD` (defaults to next bake day).  
3. “**Přidat do košíku**” dispatches `{ productId, bakeDate }` into Zustand cart store.

### 2.2 Checkout
1. **Step 1** – Choose bake day (radio with next four Tue / Fri dates).  
2. **Step 2** – Auth selection:  
   * **OAuth** – Google / Facebook popup.  
   * **Guest** – enter email & phone (validated).  
3. **Step 3** – Stripe Checkout session (metadata includes `bakeDate`, `cartId`).  
4. Stripe sends `payment_intent.succeeded` → Cloud Function updates Firestore: creates `orders/<orderId>` doc, decrements `stockDays/<date>.remainingQty`.

### 2.3 Admin: Managing Stock
- `/admin/stock` table lists four upcoming bake days with editable “Loaves available”.  
- Submit triggers **Callable** `adminUpdateStockDay` which modifies `stockDays/{date}`.

### 2.4 Admin: Order Fulfilment
- `/admin/orders` date picker defaults to *today*.  
- Rows show customer contact, items, Stripe status badge.  
- “Mark picked‑up” button sets `status = 'FULFILLED'`.

---

## 3. Data Model (Firestore Collections)

| Collection | Doc ID | Key Fields |
|------------|--------|-----------|
| **products** | slug (e.g., `chleb-psenicno-zitny`) | `name`, `description`, `priceCents`, `imagePath`, `isActive`, `createdAt` |
| **stockDays** | ISO date `YYYY‑MM‑DD` | `totalQty`, `remainingQty`, `updatedAt` |
| **orders** | auto‑ID | `bakeDate`, `email`, `phone`, `userId?`, `stripeId`, `status`, `createdAt` |
| **orderLineItems** | auto‑ID | `orderId` (ref), `productId` (ref), `qty`, `priceCents` |

### Enum: `status`
`PENDING` · `PAID` · `FULFILLED` · `CANCELLED`

### Cloud Storage
```
gs://vypecena-kurka-assets/
  logo.jpg
  bread_1.jpg
  bread_2.jpg
  bread_3.jpg
  mikuska_1.jpg
  mikuska_2.jpg
```

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

## 5. API Surface (Cloud Functions)

| Function Type | Name / Path | Auth? | Purpose |
|---------------|-------------|-------|---------|
| HTTPS POST | `/createCheckoutSession` | Public | Builds Stripe session from cart & returns URL |
| HTTPS POST | `/stripeWebhook` | Stripe Sig | Handles Stripe events (payments, refunds) |
| Callable | `adminUpdateStockDay` | Admin | `{date, totalQty}` – update stock |
| Callable | `adminOrdersByDate` | Admin | `{date}` – fetch orders & line items |
| HTTPS GET | `/products` | Public | `?date=YYYY‑MM‑DD` → list products & remainingQty |

---

## 6. Non‑Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | Largest Contentful Paint ≤ 2.5 s on 4G (Lighthouse Mobile) |
| **Accessibility** | WCAG 2.2 AA; fully keyboard navigable |
| **Security** | Firestore rules, Auth token checks in Functions, CSRF defences on POST |
---

## 7. Dev & Ops Workflow

| Stage | Tooling |
|-------|---------|
| Local Dev | `firebase emulators:start` (Hosting, Functions, Firestore) |
| CI / CD | GitHub Actions: lint → type‑check → unit tests → Playwright smoke → `firebase deploy --only hosting,functions` (on `main`) |
| Preview Channels | `firebase hosting:channel:deploy pr‑<num>` for pull requests |
| Monitoring | Sentry, Firebase Performance + Cloud Logging |

---

## 8. Launch Checklist

- [ ] Firebase project **vypecena‑kurka‑prod** set up, billing enabled  
- [ ] Domain `vypecenakurka.cz` mapped to Firebase Hosting  
- [ ] Stripe live keys & webhook secret loaded via `functions:config:set`  
- [ ] Firestore composite index on `orders(status, bakeDate)`  
- [ ] Images optimised (< 200 kB) and uploaded to Cloud Storage bucket  
- [ ] GDPR‑compliant cookie banner (analytics only)  
- [ ] SEO meta tags & `robots.txt` added  

---

## 9. Future‑Proof Roadmap

| Phase | Features |
|-------|----------|
| **CMS** | Integrate Sanity or Storyblok for content pages & blog |
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

*Added: 27 Jun 2025 — Current implementation details for LLM/Agent reference*

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

#### 🔄 **IN PROGRESS / READY FOR INTEGRATION**
| Feature | Status | Required Work | Priority |
|---------|--------|---------------|----------|
| **Firebase Connection** | 🔧 Config Ready | Connect to real Firestore DB | HIGH |
| **Authentication** | 🔧 Config Ready | Implement NextAuth v5 flows | HIGH |
| **Stripe Integration** | 🔧 Config Ready | Add checkout + webhook handlers | HIGH |
| **Admin Panel** | ⏳ Not Started | Build `/admin/stock` and `/admin/orders` | MEDIUM |
| **Cart Checkout** | ⏳ Not Started | Create `/objednavka` multi-step wizard | HIGH |

#### ❌ **NOT IMPLEMENTED**
- Order confirmation page (`/objednavka/diky`)
- Cloud Functions for API endpoints
- Newsletter signup functionality
- Mobile cart drawer component
- Admin authentication and RBAC
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
│   ├── o-nas/page.tsx          # About page (story + values)
│   ├── faq/page.tsx            # FAQ with expandable cards
│   ├── kontakt/page.tsx        # Contact + pickup info
│   └── globals.css             # Tailwind + custom CSS variables
├── components/
│   ├── ui/                     # Base components (Radix UI)
│   │   ├── button.tsx          # Button with variants
│   │   ├── card.tsx            # Card layouts
│   │   └── badge.tsx           # Status badges
│   ├── navbar.tsx              # Main navigation
│   ├── hero.tsx                # Homepage hero section
│   ├── bread-card.tsx          # Product card component
│   └── date-radio-group.tsx    # Bake day selector
├── lib/
│   ├── firebase.ts             # Firebase config (ready)
│   └── utils.ts                # Utilities (formatPrice, dates)
├── store/
│   └── cart.ts                 # Zustand cart store
├── types/
│   └── index.ts                # TypeScript definitions
└── .env.example                # Environment variables template
```

#### **Key Dependencies Installed**
```json
{
  "dependencies": {
    "next": "15.3.4",
    "react": "^19.0.0",
    "firebase": "^10.x",
    "next-auth": "^5.x",
    "stripe": "^14.x",
    "zustand": "^4.x",
    "@radix-ui/react-*": "^1.x",
    "tailwindcss": "^4.x",
    "lucide-react": "^0.x",
    "clsx": "^2.x"
  }
}
```

### 11.3 Component API Reference

#### **`<BreadCard />` - Product Display**
```typescript
interface BreadCardProps {
  product: ProductWithStock;      // Product with remainingQty
  selectedBakeDate: string;       // ISO date string
}
// Features: Add to cart, quantity controls, stock indicators
```

#### **`<DateRadioGroup />` - Bake Day Selection**
```typescript
interface DateRadioGroupProps {
  selectedDate: string | null;
  onDateChange: (date: string) => void;
  stockData?: Record<string, { remainingQty: number; totalQty: number }>;
}
// Auto-generates next 4 Tuesday/Friday dates
```

#### **Cart Store (Zustand)**
```typescript
interface CartStore {
  items: CartItem[];              // { productId, qty, bakeDate }
  selectedBakeDate: string | null;
  addItem: (productId: string, bakeDate: string, qty?: number) => void;
  removeItem: (productId: string, bakeDate: string) => void;
  updateQty: (productId: string, bakeDate: string, qty: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}
// Persisted to localStorage automatically
```

### 11.4 Development Instructions for Future LLM/Agents

#### **Setting Up Development Environment**
1. **Prerequisites**: Node.js 18+, npm, Firebase CLI
2. **Installation**:
   ```bash
   cd kurka-bakery
   npm install
   cp .env.example .env.local  # Configure environment variables
   npm run dev                 # Start development server
   ```

#### **Mock Data Location & Structure**
- **Products**: Embedded in `src/app/page.tsx` and `src/app/shop/page.tsx`
- **Stock Data**: Mock object in `src/app/shop/page.tsx` as `mockStockData`
- **Product Schema**: Defined in `src/types/index.ts` as `ProductWithStock`

```typescript
// Current mock product structure
const mockProducts = [
  {
    id: '1',
    slug: 'chleb-psenicno-zitny',
    name: 'Chléb pšenično-žitný',
    description: '...',
    priceCents: 8500,           // 85.00 CZK
    imagePath: '/chleba.jpg',
    isActive: true,
    createdAt: new Date(),
    remainingQty: 12            // Stock for selected date
  }
];
```

#### **Adding New Products**
1. Add product data to mock arrays in relevant pages
2. Ensure image exists in `/public/` folder
3. Update product detail page routing in `/shop/[slug]/page.tsx`
4. Follow existing TypeScript interfaces in `src/types/index.ts`

#### **Styling Guidelines**
- **Primary Color**: Orange (`text-orange-600`, `bg-orange-600`)
- **Typography**: Inter font (`font-sans`)
- **Spacing**: Consistent padding/margins using Tailwind scale
- **Components**: Use Radix UI primitives for accessibility
- **Responsive**: Mobile-first approach (`md:`, `lg:` breakpoints)

### 11.5 Next Development Priorities

#### **Phase 1: Core E-commerce (Essential for Launch)**
1. **Checkout Flow** (`/objednavka`)
   - Multi-step wizard: Date → Auth → Payment
   - Guest checkout with email/phone validation
   - Integration with Zustand cart store

2. **Firebase Integration**
   - Connect to real Firestore database
   - Replace mock data with Firebase queries
   - Implement real-time stock updates

3. **Stripe Payment Processing**
   - Create checkout session API endpoint
   - Handle payment webhooks
   - Order confirmation flow

#### **Phase 2: Admin & Management**
1. **Admin Panel** (`/admin/stock`, `/admin/orders`)
   - Stock management interface
   - Order fulfillment dashboard
   - Admin authentication with role-based access

2. **Authentication System**
   - NextAuth v5 with Google/Facebook OAuth
   - User profile management
   - Guest vs. authenticated user flows

#### **Phase 3: Production Readiness**
1. **Email Notifications**
   - Order confirmations
   - Pickup reminders
   - Admin order notifications

2. **Analytics & Monitoring**
   - Google Analytics 4 integration
   - Error tracking with Sentry
   - Performance monitoring

### 11.6 Known Technical Debt & Issues

#### **Current Limitations**
- **No API Layer**: Currently using mock data, needs Firebase connection
- **Missing Checkout**: Cart functionality exists but no payment flow
- **No Admin Panel**: Management features not yet implemented
- **Static Images**: Product images are static, need Cloud Storage integration
- **No Email System**: Order confirmations missing

#### **Performance Considerations**
- **Image Optimization**: Use Next.js Image component (already implemented)
- **Bundle Size**: Consider code splitting for admin panel
- **State Persistence**: Cart store uses localStorage (good for MVP)

#### **Security TODOs**
- Implement Firestore security rules
- Add CSRF protection for API endpoints
- Validate all user inputs
- Implement rate limiting for orders

### 11.7 Environment Variables Required

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# NextAuth Configuration  
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# OAuth Provider Keys
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### 11.8 Testing Strategy

#### **Current Testing State**
- ❌ **No tests implemented yet**
- 🔧 **Testing framework needed**: Jest + React Testing Library
- 🔧 **E2E testing needed**: Playwright for user flows

#### **Recommended Test Coverage**
1. **Unit Tests**: Cart store, utility functions, component logic
2. **Integration Tests**: Product browsing, cart operations, date selection
3. **E2E Tests**: Complete user journey from browse → add to cart → checkout

---

*🤖 For LLM/Agents: This implementation guide should be updated whenever significant changes are made to the codebase. Always check the current file structure against this documentation before making changes.*
