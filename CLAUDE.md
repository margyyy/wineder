<!-- GSD:project-start source:PROJECT.md -->
## Project

**WINEDER**

WINEDER e una web app Next.js per aiutare utenti 18-35 a trovare vini vicini in base a un questionario iniziale e a un algoritmo di matching progressivo. L'app mostra risultati geolocalizzati, filtri semplici e schede vino con informazioni utili, mappa e dati verificati dalle cantine quando disponibili. Include anche una modalita kiosk web per tablet con conversione via QR code verso mobile.

**Core Value:** Con poche domande intelligenti, l'utente trova subito vini rilevanti vicino a lui e puo continuare a scoprire in modo semplice e trasparente.

### Constraints

- **Tech stack**: Next.js + React + Tailwind + SQLite locale - MVP KISS e sviluppo rapido
- **Architecture**: Modulare e separazione responsabilita - estendibilita trasparente
- **Data scope**: Max 3 vini per cantina inizialmente - solo dimostrazione matching
- **UX target**: 18-35 anni - UI moderna, semplice, mobile-first e kiosk-ready
- **External data**: Immagini vino da scraping web con fallback statico locale
- **Map**: Coordinate reali per cantine seedate nel DB e workshop inseriti via pannelli manage
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

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
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
