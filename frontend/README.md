# KONEKTA 🇭🇹

**Ayiti ak mond lan, yon sèl mache!**

A modern, responsive React + TypeScript + Tailwind CSS frontend prototype for a Haitian marketplace connecting local entrepreneurs, merchants, farmers, producers, artisans, and service providers with buyers in Haiti and the Haitian diaspora.

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173`).

```bash
npm run build
npm run preview
```

## What is included

- **Home:** editorial landing page, category directory, products, services, featured sellers, and diaspora feature
- **Marketplace:** product search, category filters, sorting, favorites, and product details
- **Services:** standalone service directory with filters and demo service listing form
- **Sellers:** searchable seller discovery and storefront details
- **Diaspora:** a dedicated path for overseas visitors to discover Haitian sellers and products
- **Seller demo dashboard:** create a sample product listing with business information and WhatsApp contact
- **Roadmap:** clearly indicates what is currently implemented versus what is planned for later
- **About, How It Works, and Favorites**

## Code organization

```text
src/
  components/
    layout/          Header, Footer, Layout
    marketplace/     ProductCard, SellerCard
    services/        ServiceCard
    ui/              Reusable buttons/headings
  context/           MarketplaceContext.tsx
  data/              catalog.ts, services.ts
  lib/               utils.ts
  pages/             Independent routed pages
  types/             Product, seller types
  App.tsx            Route definitions
  styles.css         Tailwind layers and global styles
```

## Important demo limitations

- Sample vendors, product reviews, and badges are **placeholder data**, not verified marketplace activity.
- Newly created product/service listings and favorites are stored in **localStorage only**. They do not sync across users, devices, or browsers.
- WhatsApp inquiry links are live. Demo records with no seller phone number open a prefilled message that the visitor can share manually.
- **No** real user accounts, seller verification, payment holding, checkout, order management, or delivery integration exists in this frontend.
- **No** claim of shipping internationally is made. Actual exporting requires real shipping partners and compliance checks.
- Prices for sample products are illustrative and displayed in USD. These are not real marketplace offers.
- Photos reference remote Unsplash URLs and require network access to load.

## Next recommended backend phase

1. FastAPI + PostgreSQL API, seller and buyer accounts with proper access controls.
2. Product/service CRUD tied to authenticated seller identities.
3. Image uploads to a storage provider, content moderation and reporting.
4. Seller verification and trust workflows.
5. Research local payment providers, fulfillment and compliance before adding payment or international shipping features.

This frontend prioritizes the competition pitch: start with visibility and WhatsApp-based connection, then grow in phases toward a marketplace serving Haiti and the diaspora.
