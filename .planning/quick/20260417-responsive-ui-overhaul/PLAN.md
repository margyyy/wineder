---
id: 260417-hmj
slug: responsive-ui-overhaul
date: 2026-04-17
status: in-progress
---

# Quick Task: Mobile-First Responsive UI Overhaul

## Goal
Convert all inline styles to Tailwind utility classes with full responsive breakpoints. Ensure mobile-first design for phones (320px+), tablets/kiosk (768px+), and desktop (1024px+). All interactive elements must meet 44px minimum touch targets.

## Tasks

### T1 — Global NavBar component
- Create `src/components/NavBar.tsx` with mobile hamburger menu
- Add to `src/app/layout.tsx`
- Links: Home (/) , Scopri (/discover), Kiosk (/kiosk)
- Mobile: hamburger toggle → slide-down menu
- Desktop: horizontal link row

### T2 — Root layout & tokens
- Update `src/app/layout.tsx` to include NavBar and set body classes
- Ensure `src/styles/tokens.css` works alongside Tailwind classes

### T3 — Questionnaire pages
- Refactor `src/components/questionnaire/QuestionnaireFlow.tsx`
- Refactor `src/components/questionnaire/QuestionStepCard.tsx`
- Refactor `src/components/questionnaire/QuestionnaireProgress.tsx`
- Refactor `src/app/(public)/questionnaire/page.tsx`
- Refactor `src/app/(public)/kiosk/page.tsx`
- Touch targets ≥44px, responsive font sizes

### T4 — Discovery & filters
- Refactor `src/components/discovery/DiscoveryResultsGrid.tsx`
- Refactor `src/components/discovery/DiscoveryFiltersPanel.tsx`
- Collapsible filter drawer on mobile with "Filtri" toggle button
- Side-by-side layout on md+

### T5 — Wine cards & results
- Refactor `src/components/discovery/WineResultCard.tsx`
- Refactor `src/app/(public)/discover/page.tsx`
- CTA link min-h-[44px], responsive image

### T6 — Wine detail page
- Refactor `src/app/(public)/wine/[slug]/page.tsx`
- Refactor `src/components/wine/WineAdditiveChips.tsx`
- Refactor `src/components/wine/AdditiveModal.tsx`
- Refactor `src/components/wine/WineVerifiedBadge.tsx`
- Refactor `src/components/matching/WineFeedbackToggle.tsx`

### T7 — Kiosk results & mobile
- Refactor `src/components/kiosk/KioskResultsView.tsx`
- Refactor `src/app/(public)/kiosk/results/page.tsx`
- Refactor `src/app/(public)/kiosk/mobile/[code]/page.tsx`
- Responsive QR code, clamp font sizes

### T8 — Management forms
- Refactor `src/components/management/AziendaManager.tsx`
- Refactor `src/components/management/CantinaManager.tsx`
- Refactor `src/components/management/WorkshopCreateForm.tsx`
- Refactor `src/app/(public)/add-workshop/page.tsx`
- Refactor `src/app/(public)/manage-azienda/[slug]/page.tsx`
- Refactor `src/app/(public)/manage-cantina/[slug]/page.tsx`
- width:100% inputs, 44px buttons

### T9 — Cantina page
- Refactor `src/app/(public)/cantina/[slug]/page.tsx`

## Commit
Single atomic commit: `feat(ui): mobile-first responsive overhaul with Tailwind`
