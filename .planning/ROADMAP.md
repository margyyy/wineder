# Roadmap: VinoMatch Local MVP

**Project:** VinoMatch Local MVP
**Generated:** 2026-04-17
**Granularity:** Coarse
**Execution:** Parallel where safe

## Overview

- Total phases: 5
- Total mapped v1 requirements: 38
- Coverage: 100%

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Foundation and Local Data | Create modular app skeleton and reliable SQLite catalog | DATA-* | 5 |
| 2 | Questionnaire and Matching Core | Deliver short onboarding and deterministic ranking with feedback loop | MATCH-* | 5 |
| 3 | Discovery UX and Wine Detail | Show nearby results with filters, cards, maps, and detail flow | DISC-*, WINE-01..03 | 5 |
| 4 | Winery and Workshop Management | Add management routes, verification logic, production/additives visibility | MGMT-*, VERI-*, WINE-04..05 | 5 |
| 5 | Kiosk and Conversion Flow | Deliver kiosk mode with QR handoff to mobile and stability polish | KIOSK-* | 5 |

## Phase Details

## Phase 1: Foundation and Local Data

**Goal:** Build a clean modular Next.js + Tailwind + SQLite base with seeded winery/wine catalog.

**Requirements:**
DATA-01, DATA-02, DATA-03, DATA-04, DATA-05

**UI hint:** yes

**Success Criteria:**
1. App boots with modular folder boundaries (app, api, domain, data, ui).
2. Prisma schema/migrations run locally and produce SQLite DB file.
3. Seed inserts 5 target wineries with coordinates and max 3 wines each.
4. Wine records include all fields needed by matching and filters.
5. Additive table exists and can be queried, even if empty content.

## Phase 2: Questionnaire and Matching Core

**Goal:** Make questionnaire-first entry and produce ranked wines from profile, updated by feedback.

**Requirements:**
MATCH-01, MATCH-02, MATCH-03, MATCH-04, MATCH-05

**UI hint:** yes

**Success Criteria:**
1. First screen is always questionnaire for new session.
2. Questionnaire remains short, non-technical, and answer completion is smooth.
3. Matching service returns deterministic ranked list from questionnaire profile.
4. Drink feedback action persists and updates user preference weights.
5. Re-opened results reflect updated weights in ordering.

## Phase 3: Discovery UX and Wine Detail

**Goal:** Present nearby matched wines with practical filtering and detailed map-enabled wine pages.

**Requirements:**
DISC-01, DISC-02, DISC-03, DISC-04, DISC-05, DISC-06, DISC-07, DISC-08, WINE-01, WINE-02, WINE-03

**UI hint:** yes

**Success Criteria:**
1. Home results load nearby matched wines after onboarding completion.
2. Distance, winery, vintage, alcohol, color, and price filters work together.
3. Toggle to disable match filtering shows all wines in selected radius.
4. Wine cards display image fallback-safe and key wine metadata.
5. Wine detail map shows available points and seeded winery locations correctly.

## Phase 4: Winery and Workshop Management

**Goal:** Enable creation/management of wineries and businesses, catalog linkage, and verified transparency badges.

**Requirements:**
MGMT-01, MGMT-02, MGMT-03, MGMT-04, MGMT-05, MGMT-06, MGMT-07, VERI-01, VERI-02, VERI-03, WINE-04, WINE-05

**UI hint:** yes

**Success Criteria:**
1. `/add-workshop` supports category + coordinate creation.
2. Manage routes for cantina/azienda allow profile editing and catalog wine assignment.
3. Winery production description and additive associations can be saved per wine.
4. Verified badge appears only when verification condition is satisfied.
5. Additive boxes and modal description render from DB on wine detail.

## Phase 5: Kiosk and Conversion Flow

**Goal:** Ship kiosk mode optimized for tablets with QR handoff to mobile wine list.

**Requirements:**
KIOSK-01, KIOSK-02, KIOSK-03, KIOSK-04

**UI hint:** yes

**Success Criteria:**
1. Kiosk route runs full matching questionnaire in touch-friendly UI.
2. Completion screen shows result list clearly for in-venue usage.
3. QR code generation is stable and scannable under normal tablet conditions.
4. Mobile link restores kiosk result list without recomputing unexpectedly.
5. Flow includes basic retention instrumentation hooks for later analytics.

## Dependency Notes

- Phase 2 depends on Phase 1 data model and seed quality.
- Phase 3 depends on Phase 2 ranking APIs.
- Phase 4 depends on Phase 1 schema and Phase 3 detail pages.
- Phase 5 depends on Phase 2 matching output and Phase 3 rendering patterns.

---
*Last updated: 2026-04-17 after roadmap creation*
