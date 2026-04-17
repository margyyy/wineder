# Requirements: VinoMatch Local MVP

**Defined:** 2026-04-17
**Core Value:** Con poche domande intelligenti, l'utente trova subito vini rilevanti vicino a lui e puo continuare a scoprire in modo semplice e trasparente.

## v1 Requirements

### Data Foundation

- [ ] **DATA-01**: Admin can initialize SQLite locally with migration and seed commands
- [ ] **DATA-02**: System stores at least 5 wineries with real coordinates (pasqua wine, farina, albino armani, ca' rugale, zyme)
- [ ] **DATA-03**: System stores up to 3 wines per winery for initial demo catalog
- [ ] **DATA-04**: System stores wine features needed by matching (color, alcohol, vintage, body, aroma tags, price range)
- [ ] **DATA-05**: System includes additive table structure with additive name and description fields

### Matching Setup

- [ ] **MATCH-01**: User sees questionnaire as first screen before any wine list
- [ ] **MATCH-02**: Questionnaire uses few non-technical questions (target 5-7) with high matching signal
- [ ] **MATCH-03**: User profile from answers is saved and used to rank wines
- [ ] **MATCH-04**: User can mark wine as drunk/not drunk from wine detail
- [ ] **MATCH-05**: Drunk/not drunk feedback updates matching weights and changes future ranking

### Discovery and Filters

- [ ] **DISC-01**: User sees nearby matched wines after questionnaire completion
- [ ] **DISC-02**: User can adjust max distance using a slider/toggle control
- [ ] **DISC-03**: User can filter by winery
- [ ] **DISC-04**: User can filter by vintage
- [ ] **DISC-05**: User can filter by alcohol level
- [ ] **DISC-06**: User can filter by color (white/red)
- [ ] **DISC-07**: User can filter by price range
- [ ] **DISC-08**: User can disable match filter and browse all wines in area

### Wine Detail and Map

- [ ] **WINE-01**: Wine card shows wine image, name, and core features from DB
- [ ] **WINE-02**: Wine detail page shows map with where to find that wine
- [ ] **WINE-03**: Wine detail page shows winery locations from seeded coordinates
- [ ] **WINE-04**: If production description exists, it is shown below wine features
- [ ] **WINE-05**: If additives exist, each additive is shown as a clickable box opening modal with description from DB

### Workshop and Winery Management

- [ ] **MGMT-01**: `/add-workshop` can create an entity with coordinates and category (restaurant, bar, club, winery)
- [ ] **MGMT-02**: `/manage-cantina/[nome-cantina]` lets winery edit winery profile and history text
- [ ] **MGMT-03**: `/manage-azienda/[nome-azienda]` lets non-winery business manage own profile
- [ ] **MGMT-04**: Management pages can attach wines by selecting from central catalog
- [ ] **MGMT-05**: Winery can add optional production description for own wines
- [ ] **MGMT-06**: Winery can add additives used for own wines (from additive table)
- [ ] **MGMT-07**: User can open winery public profile page (winery category only)

### Verification

- [ ] **VERI-01**: Wine is marked verified only if winery added both production description and additive data
- [ ] **VERI-02**: Verified badge appears on wine card and wine detail when rule is satisfied
- [ ] **VERI-03**: No verified badge is shown when rule is not satisfied

### Kiosk Flow

- [ ] **KIOSK-01**: Web kiosk mode can run same questionnaire flow on tablet
- [ ] **KIOSK-02**: Kiosk completion page shows resulting wine list
- [ ] **KIOSK-03**: Kiosk completion page shows QR code to open same list on phone
- [ ] **KIOSK-04**: QR payload opens mobile page with persisted result set

## v2 Requirements

### Platform Enhancements

- **AUTH-01**: Users can create account and sync preferences across devices
- **SOC-01**: Users can save favorites and share tasting lists
- **ANL-01**: Admin dashboard tracks match conversion and kiosk retention funnel

## Out of Scope

| Feature                                    | Reason                                            |
| ------------------------------------------ | ------------------------------------------------- |
| Ecommerce checkout                         | Not needed to validate matching experience in MVP |
| Advanced AI personalization infrastructure | Too complex for first release                     |
| Native mobile apps                         | Web-first scope for hackathon delivery            |

## Traceability

| Requirement | Phase   | Status  |
| ----------- | ------- | ------- |
| DATA-01     | Phase 1 | Pending |
| DATA-02     | Phase 1 | Pending |
| DATA-03     | Phase 1 | Pending |
| DATA-04     | Phase 1 | Pending |
| DATA-05     | Phase 1 | Pending |
| MATCH-01    | Phase 2 | Pending |
| MATCH-02    | Phase 2 | Pending |
| MATCH-03    | Phase 2 | Pending |
| MATCH-04    | Phase 2 | Pending |
| MATCH-05    | Phase 2 | Pending |
| DISC-01     | Phase 3 | Pending |
| DISC-02     | Phase 3 | Pending |
| DISC-03     | Phase 3 | Pending |
| DISC-04     | Phase 3 | Pending |
| DISC-05     | Phase 3 | Pending |
| DISC-06     | Phase 3 | Pending |
| DISC-07     | Phase 3 | Pending |
| DISC-08     | Phase 3 | Pending |
| WINE-01     | Phase 3 | Pending |
| WINE-02     | Phase 3 | Pending |
| WINE-03     | Phase 3 | Pending |
| WINE-04     | Phase 4 | Pending |
| WINE-05     | Phase 4 | Pending |
| MGMT-01     | Phase 4 | Pending |
| MGMT-02     | Phase 4 | Pending |
| MGMT-03     | Phase 4 | Pending |
| MGMT-04     | Phase 4 | Pending |
| MGMT-05     | Phase 4 | Pending |
| MGMT-06     | Phase 4 | Pending |
| MGMT-07     | Phase 4 | Pending |
| VERI-01     | Phase 4 | Pending |
| VERI-02     | Phase 4 | Pending |
| VERI-03     | Phase 4 | Pending |
| KIOSK-01    | Phase 5 | Pending |
| KIOSK-02    | Phase 5 | Pending |
| KIOSK-03    | Phase 5 | Pending |
| KIOSK-04    | Phase 5 | Pending |

**Coverage:**

- v1 requirements: 38 total
- Mapped to phases: 38
- Unmapped: 0

---

_Requirements defined: 2026-04-17_
_Last updated: 2026-04-17 after initial definition_
