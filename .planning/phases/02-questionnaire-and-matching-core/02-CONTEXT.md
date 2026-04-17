# Phase 2: Questionnaire and Matching Core - Context

**Gathered:** 2026-04-17
**Status:** Ready for planning
**Source:** User directives + wine-matcher-algorithm.md

<domain>
## Phase Boundary

Deliver questionnaire-first flow and deterministic matching core for MATCH-01..MATCH-05.
Implementation must follow the algorithm contract exactly:

- Survey answers map to hidden feature weights.
- User preference vector is built by averaging contributions per feature with clamp [0,1].
- Ranking uses cosine similarity over the same feature space used by wines.
- Feedback like/dislike updates ranking with learning rate from the original survey vector baseline.

This phase includes DB restructuring required to support the algorithm's feature vectors.

</domain>

<decisions>
## Implementation Decisions

### Locked Decisions

- D-01: First screen for user sessions must be questionnaire (MATCH-01).
- D-02: Questionnaire must be short, non-technical, with 5-7 intelligent questions (MATCH-02).
- D-03: Matching engine must use cosine similarity and output score in [0,1].
- D-04: Feature space must include these 12 normalized features shared by wine and user vectors: dolcezza, acidita, tannini, corpo, alcol, effervescenza, fruttato, floreale, speziato, terroso, legnoso, minerale.
- D-05: Survey options store hidden weights; user vector is computed as average contribution per feature and clamped to [0,1].
- D-06: Feedback loop must apply learning rate (default 0.25) from original survey vector, not recursively from already-updated vectors.
- D-07: DB structure must be adjusted to persist survey sessions, response weights, user vectors, wine vectors, and feedback events.
- D-08: Keep KISS MVP: deterministic logic, no black-box ML service.

### Claude's Discretion

- Choose concrete API route names and service module boundaries.
- Choose whether to store vectors as explicit columns or normalized child table, as long as 12-feature contract remains queryable and consistent.
- Choose exact question wording while preserving non-technical style and feature coverage constraints.

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product and roadmap

- .planning/PROJECT.md - core value and user expectations
- .planning/ROADMAP.md - phase goal and success criteria
- .planning/REQUIREMENTS.md - MATCH-01..MATCH-05 requirement contract
- .planning/STATE.md - execution status and previous phase outputs

### Existing implementation baseline

- prisma/schema.prisma - current DB baseline from phase 1
- prisma/seed.ts - seed baseline to extend with algorithmic features
- src/lib/data/repositories/wineRepository.ts - existing wine data access pattern

### Algorithm specification

- /home/margy/Downloads/wine-matcher-algorithm.md - mandatory algorithm behavior

</canonical_refs>

<specifics>
## Specific Ideas

- Ensure each of the 12 features is touched by at least 2 survey questions in total mapping matrix.
- Keep question language experiential (coffee, sparkling water, fruit/smell preferences).
- Ranking should be recomputed after each feedback event.

</specifics>

<deferred>
## Deferred Ideas

- Advanced personalization model beyond deterministic vectors.
- Discovery page full filtering and map-heavy browsing (Phase 3 scope).

</deferred>

---

_Phase: 02-questionnaire-and-matching-core_
_Context gathered: 2026-04-17 via algorithm-aligned planning input_
