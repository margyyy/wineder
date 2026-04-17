# Phase 1: Foundation and Local Data - Context

**Gathered:** 2026-04-17
**Status:** Ready for planning
**Source:** Bootstrap from PROJECT.md and ROADMAP.md (no discuss-phase artifact)

<domain>
## Phase Boundary

Implement only the technical foundation required by DATA-01..DATA-05:

- Next.js + React + Tailwind app skeleton with modular separation of responsibilities.
- Local SQLite persistence via Prisma.
- Initial seed for 5 target wineries with real coordinates.
- Up to 3 wines per winery with matching-ready attributes.
- Additives table structure only (content will be provided later).

Do not include Phase 2+ features (questionnaire UX, ranking UI, filters, kiosk).

</domain>

<decisions>
## Implementation Decisions

### Locked Decisions

- D-01: Use Next.js with React components and Tailwind for frontend.
- D-02: Use local SQLite database for MVP.
- D-03: Keep architecture modular and responsibilities separated for transparent extensibility.
- D-04: Seed wineries: Pasqua Wine, Farina, Albino Armani, Ca' Rugate, Zyme.
- D-05: Limit initial data scope to maximum 3 wines per winery.
- D-06: Additives table must exist now with fields for additive name and additive description.
- D-07: MVP must stay KISS, no unnecessary complexity in phase implementation.

### Claude's Discretion

- Pick concrete folder structure and naming conventions aligned with Next.js App Router.
- Choose exact Prisma model shape as long as it satisfies DATA-01..DATA-05.
- Choose seed values for wine features when source data is incomplete.

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product and scope references

- .planning/PROJECT.md - Product framing, constraints, core value
- .planning/ROADMAP.md - Phase goal and success criteria
- .planning/REQUIREMENTS.md - Requirement IDs and traceability
- .planning/STATE.md - Current workflow state

### Research references

- .planning/research/STACK.md - MVP stack baseline
- .planning/research/ARCHITECTURE.md - Layer separation guidance
- .planning/research/SUMMARY.md - Constraints and risk summary

</canonical_refs>

<specifics>
## Specific Ideas

- Keep seed robust even if some wine descriptors are estimated.
- Ensure data model directly supports upcoming filters: color, alcohol, vintage, price range.
- Prepare additive structure now to avoid migration churn in later phase.

</specifics>

<deferred>
## Deferred Ideas

- Questionnaire and matching UX behavior (Phase 2)
- Discovery filters and map-heavy detail pages (Phase 3)
- Management routes and verified badges (Phase 4)
- Kiosk QR conversion flow (Phase 5)

</deferred>

---

_Phase: 01-foundation-and-local-data_
_Context gathered: 2026-04-17 via plan-phase bootstrap_
