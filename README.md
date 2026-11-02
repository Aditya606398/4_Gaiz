# Waste to Value

A React + Vite prototype for a seller-initiated B2B waste RFQ platform.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Seller | seller@demo.com | demo123 |
| Buyer | buyer@demo.com | demo123 |

You can also create new seller and buyer accounts from the sign-up screen. New buyer accounts are added to the curated buyer directory with all waste categories enabled as a demo default.

## Included

- Seller and buyer sign-up, sign-in, and role-specific navigation
- Seller dashboard with revenue, RFQ, completed-deal and waste-diversion KPIs
- Revenue trend area chart and RFQ status donut chart (Recharts)
- Create RFQ wizard with category-based buyer filtering
- Buyer directory search and category filters
- Buyer RFQ inbox and quote submission
- Seller quote acceptance or rejection
- Transaction creation and completion tracking
- RFQ list filters, buyer/seller company profiles, settings, and demo messaging
- Responsive desktop and mobile layouts
- Browser persistence using localStorage

## Important prototype notes

This is a front-end prototype with local demo persistence, not a production marketplace backend. Authentication is client-side demo authentication; passwords are stored in localStorage and must be replaced with secure server-side authentication before deployment. Data is isolated to the browser/device. The material-document upload area is a UI placeholder; connect object storage and an API to enable real uploads. Messaging is local demo state, and notifications are in-app demo behavior. Revenue and environmental impact figures are calculated from the transactions stored in the browser and are not independently verified.

For production, add a backend (for example, Node/Express or Spring Boot), database, secure authentication, authorization checks, file storage, email notifications, audit logs, and verified company onboarding.
