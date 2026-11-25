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

## V3 — Foto soti nan galri / Photo picker

- `/dashboard`: choose an image from your phone gallery or computer using the photo upload field, review its preview, and publish a demo product. Product images are saved as `Blob`s in **IndexedDB**, while product metadata is kept in localStorage.
- `/services`: optional photo picker for new service listings; the original example image is used when no photo is provided.
- `src/components/uploads/ImageUpload.tsx`: reusable file-selection, preview, replace and remove control, including file type validation and an 8 MB size limit.
- `src/components/uploads/StoredImage.tsx`: loads IndexedDB photos into product cards, details pages, service cards and seller profiles, including after a page refresh.
- `src/lib/imageStore.ts`: the photo storage boundary; swap it for your FastAPI/S3/Supabase upload integration later.
- The dashboard now displays demo listing totals and allows users to remove locally created products.

**Important:** this is still frontend-only. Photos and listings are **not uploaded to a server**, synchronized to other devices, backed up, moderated, or accessible to other customers. Clearing browser site data removes the demo data. Avoid using sensitive/private photos. In private browsing, local storage may not persist.

### Install

```powershell
npm install
npm run dev
npm run build
```

Keep the Vercel root directory set to the folder containing `package.json` and `vercel.json`.

### Readable source formatting

```powershell
npm install
npm run format
```

`npm run format` formats **every** existing legacy TSX page and component with Prettier, not only the new pages. The V3 upload components are already written as readable multiline code.
