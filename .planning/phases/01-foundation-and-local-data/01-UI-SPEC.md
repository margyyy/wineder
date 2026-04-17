---
phase: 01-foundation-and-local-data
artifact: ui-spec
status: approved
updated: 2026-04-17
---

# UI Design Contract - Phase 1 Foundation and Local Data

## Scope

This contract applies only to foundation UI needed in Phase 1:

- App shell baseline
- Typography and spacing tokens
- Basic reusable primitives needed by subsequent phases

No questionnaire, discovery cards, or kiosk layouts in this phase.

## Visual Direction

- Tone: modern, clean, youthful, approachable
- Style: bright and minimal with warm accents inspired by wine labels
- Primary background: soft neutral
- Accent: deep red and olive tones

## Design Tokens

### Typography

- Heading font: "Space Grotesk", sans-serif
- Body font: "Manrope", sans-serif
- Base size: 16px
- Scale: 14 / 16 / 18 / 24 / 32

### Spacing

- 4px base grid
- Token scale: 4, 8, 12, 16, 24, 32, 48

### Color Tokens

- `--vm-bg`: #f7f3ec
- `--vm-surface`: #fffdf9
- `--vm-ink`: #1f1a17
- `--vm-muted`: #6f665f
- `--vm-accent`: #8f1f2e
- `--vm-accent-2`: #7d8d3f
- `--vm-border`: #e6d8c9

### Radius and Shadows

- Radius: 12px default, 20px large
- Shadow: soft y-offset shadow for cards and panels

## Components Required in Phase 1

- `AppShell`: root page scaffold with container and header region
- `Card`: neutral container primitive
- `Tag`: small semantic label primitive
- `SectionTitle`: heading primitive

## Accessibility Baseline

- Text contrast AA minimum for body text
- Visible focus ring on keyboard navigation
- Minimum tap target 40x40 for interactive controls

## Interaction and Motion

- No complex motion in phase 1
- Allowed: 120-180ms fade/translate for primitive appearance only

## Responsive Rules

- Mobile-first layout
- Max content width on desktop: 1120px
- Keep paddings consistent using spacing tokens

## Copy Style

- Plain language, no technical jargon
- Short labels and concise microcopy

## Verification Checklist

- CSS token file exists and exports listed variables
- Base layout renders with heading + container primitives
- App uses declared font stack
- Primitives are reusable and imported from shared UI layer
