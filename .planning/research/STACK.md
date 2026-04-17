# Stack Research - Wine Discovery MVP

## Recommendation

- Frontend: Next.js 15 (App Router) + React 19 + TypeScript
- UI: Tailwind CSS + headless components + lucide icons
- Database: SQLite (local file) via Prisma ORM
- APIs: Next.js Route Handlers (`/app/api/*`)
- Maps: Leaflet + OpenStreetMap tiles
- Geolocation math: simple Haversine utility in domain layer
- Image fetch/scrape helper: server-side fetch + metadata extraction + fallback asset
- QR generation: `qrcode` package (server side PNG/SVG)
- Form validation: Zod + lightweight server actions

## Why This Stack

- Simple and fast setup for hackathon MVP
- Monorepo single app, no distributed infra complexity
- SQLite keeps data local and portable
- Next.js route handlers provide clean modular boundaries
- Prisma gives schema migrations and seed flow with minimal boilerplate

## Versions to Start

- next: ^15
- react/react-dom: ^19
- tailwindcss: ^4 or stable project default
- prisma: ^6
- @prisma/client: ^6
- leaflet: ^1.9
- qrcode: ^1.5
- zod: ^3

## What Not To Use For v1

- Microservices or separate backend framework
- Remote DB (Supabase/Postgres cloud) for first release
- Complex auth providers and role matrix
- Heavy search engines (Elasticsearch/Meilisearch)

## Confidence

- Overall confidence: High
- Main risk: scraping image quality can be inconsistent; keep local fallback
