# Pitfalls Research - Wine Matching MVP

## Pitfall 1: Too many technical questions in onboarding

- Warning signs: users abandon questionnaire early
- Prevention: keep 5-7 plain-language questions with visual options
- Phase mapping: Phase 2

## Pitfall 2: Match score becomes opaque or unstable

- Warning signs: same profile gives inconsistent ordering
- Prevention: deterministic scoring formula + logged weight updates
- Phase mapping: Phase 3

## Pitfall 3: Distance filters feel inaccurate

- Warning signs: complaints about nearby results missing
- Prevention: normalize coordinates, use Haversine, show current distance radius clearly
- Phase mapping: Phase 3

## Pitfall 4: Scraped wine images are missing or wrong

- Warning signs: broken thumbnails or unrelated labels
- Prevention: fallback local placeholder and optional manual image override
- Phase mapping: Phase 2 and 4

## Pitfall 5: Management UX too complex for wineries

- Warning signs: winery cannot complete verification flow
- Prevention: simple forms, progressive disclosure, required fields only
- Phase mapping: Phase 4

## Pitfall 6: Kiosk-to-mobile handoff drops users

- Warning signs: low QR scans after questionnaire completion
- Prevention: high-contrast QR, short CTA, store token for quick open
- Phase mapping: Phase 5
