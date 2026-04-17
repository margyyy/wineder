---
phase: 02-questionnaire-and-matching-core
artifact: ui-spec
status: approved
updated: 2026-04-17
---

# UI Design Contract - Phase 2 Questionnaire and Matching Core

## Scope

This contract applies to:

- Questionnaire-first entry screen
- Question progression UI (5-7 questions)
- Initial matching result summary state immediately after submit

## UX Intent

- Non-technical language for users 18-35.
- Fast completion: one question per screen, low cognitive load.
- Strong clarity on answer selection and progress.

## Visual Direction

- Keep foundation tokens and typography from phase 1.
- Highlight selected options with clear accent contrast.
- Progress indicator always visible.

## Components Required

- `QuestionStepCard`
- `AnswerOptionButton`
- `QuestionnaireProgress`
- `SubmitAndComputeButton`
- `InitialMatchPreview`

## Interaction Rules

- Single answer per question for MVP.
- Next action enabled only after answer selection.
- Submit triggers matching compute and transitions to initial results.

## Accessibility Baseline

- Keyboard navigation for options and next/submit actions.
- Focus ring visible on option and button controls.
- AA contrast for text and selected states.

## Copy Constraints

- Avoid feature names like tannini/minerale in UI copy.
- Use experiential prompts (coffee style, sparkling preference, aroma mood).

## Responsive Rules

- Mobile-first one-column flow.
- Desktop max width 760px for questionnaire card.

## Verification Checklist

- Questionnaire is first route for new session.
- Exactly 5-7 questions rendered from data source.
- Progress indicator updates each step.
- Submit computes and displays initial ranked result preview.
