# Phase 2 Research - Questionnaire and Matching Core

## Standard Approach

- Use deterministic domain services (no external AI) for vector assembly, cosine ranking, and feedback adjustment.
- Persist survey inputs and derived vectors for reproducibility and debugging.
- Keep feature contract centralized in one constants module to avoid drift.

## DB Implications

- Wine feature vectors and user vectors must share identical keys.
- Add survey question and option weight maps as DB-backed configuration for future tuning.
- Add feedback event table to recalculate ranking from immutable baseline vector.

## Key Pitfalls

- Feature mismatch between wine and user vectors breaks cosine consistency.
- Cascading feedback updates cause score drift; always rebase on original vector.
- Overly technical questionnaire language harms completion rates.

## Recommendation

- Split implementation into: data/domain contracts, questionnaire+profile capture, ranking+feedback integration.
- Include mandatory schema push after schema edits.
