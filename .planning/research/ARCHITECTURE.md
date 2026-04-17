# Architecture Research - Wine Matching MVP

## High-Level Modules

1. Web App Layer (Next.js App Router)

- Public pages: questionnaire, home results, wine detail, winery profile
- Management pages: `/add-workshop`, `/manage-cantina/[slug]`, `/manage-azienda/[slug]`
- Kiosk pages: `/kiosk/*`

2. API Layer (Route Handlers)

- Matching API: initialize profile, compute ranked list, update weights after feedback
- Catalog API: wines, wineries, workshops, filters
- Management API: create/update workshop/winery, attach wines, add production info
- Kiosk API: generate session result + QR payload token

3. Domain Layer (services)

- Matching service (scoring, weights, re-ranking)
- Filter service (distance and metadata filters)
- Verification service (badge logic)
- Geolocation service (distance calc + map payload)

4. Data Layer

- Prisma schema + SQLite file
- Seed scripts for wineries and wines
- Repositories per aggregate (wine, winery, workshop, additive, user-profile)

## Data Flow

- Questionnaire -> Profile answers -> Matching service -> ranked wine IDs
- Home filters -> Filter service -> final cards
- Card interaction (drunk/not drunk) -> feedback endpoint -> weight update -> refreshed ranking
- Winery management updates production/additives -> verification recomputed -> badge propagated
- Kiosk run -> result token -> QR -> mobile opens tokenized list

## Build Order Implications

1. DB schema + seeds
2. Matching and query APIs
3. Questionnaire + home + detail pages
4. Management routes and verified logic
5. Kiosk + QR handoff
