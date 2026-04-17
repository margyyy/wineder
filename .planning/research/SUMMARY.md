# Research Summary - Wine Matching MVP

## Stack

Next.js + React + Tailwind with Prisma + SQLite is the best KISS setup for fast MVP delivery and easy modular growth.

## Table Stakes

- Intelligent but short onboarding questionnaire
- Nearby matched wine list with practical filters
- Wine detail with map and profile feedback loop
- Basic management routes for wineries/businesses and catalog assignment

## Key Differentiators

- Verified badge tied to production notes + additives
- Kiosk mode and QR conversion to mobile

## Architecture Pattern

Single Next.js app with strict module separation (pages, APIs, domain services, repositories) and deterministic matching logic.

## Main Risks

- Over-engineering in v1
- Image scraping reliability
- Onboarding drop-off if questions are too technical

## Recommendation

Proceed with coarse roadmap in 5 phases, prioritize questionnaire -> matching -> browsing experience before management and kiosk extras.
