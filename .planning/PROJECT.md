# VinoMatch Local MVP

## What This Is

VinoMatch Local MVP e una web app Next.js per aiutare utenti 18-35 a trovare vini vicini in base a un questionario iniziale e a un algoritmo di matching progressivo. L'app mostra risultati geolocalizzati, filtri semplici e schede vino con informazioni utili, mappa e dati verificati dalle cantine quando disponibili. Include anche una modalita kiosk web per tablet con conversione via QR code verso mobile.

## Core Value

Con poche domande intelligenti, l'utente trova subito vini rilevanti vicino a lui e puo continuare a scoprire in modo semplice e trasparente.

## Requirements

### Validated

(None yet - ship to validate)

### Active

- [ ] Questionario iniziale breve e non tecnico per inizializzare il matching
- [ ] Home con risultati vicini + filtri (distanza, cantina, annata, gradazione, colore)
- [ ] Toggle per disattivare il filtro matching e vedere tutti i vini in zona
- [ ] Scheda vino con immagine, caratteristiche, mappa e stato bevuto/non bevuto che aggiorna pesi
- [ ] Gestione cantine/aziende con endpoint di amministrazione e assegnazione vini da catalogo
- [ ] Supporto descrizione lavorazione vino + additivi con badge verificato
- [ ] Modalita kiosk con matching e QR code per apertura lista su telefono

### Out of Scope

- Pagamenti e checkout ecommerce - non necessari per validare matching MVP
- Sistema social/comunita - rinviato dopo validazione uso reale
- Autenticazione complessa enterprise - non prioritaria per demo funzionale

## Context

- MVP richiesto con stack semplice: Next.js + React components + Tailwind + SQLite locale.
- Architettura modulare con responsabilita separate per facilitare estensioni future.
- Dataset iniziale minimo (max 3 vini per cantina) per dimostrare matching:
  - pasqua wine
  - farina
  - albino armani
  - ca' rugale
  - zyme
- Prima esperienza utente: schermata domande per profilazione matching.
- Filtri principali richiesti: distanza (toggle bar), cantina, annata, gradazione alcolica, bianco/rosso, con opzione extra utile (fascia prezzo).
- Cantine con coordinate reali in mappa; endpoint /add-workshop per aggiunta punti (ristorante, bar, discoteca, cantina).
- Struttura additivi da predisporre ora; dati additivi verranno completati in seguito.

## Constraints

- **Tech stack**: Next.js + React + Tailwind + SQLite locale - MVP KISS e sviluppo rapido
- **Architecture**: Modulare e separazione responsabilita - estendibilita trasparente
- **Data scope**: Max 3 vini per cantina inizialmente - solo dimostrazione matching
- **UX target**: 18-35 anni - UI moderna, semplice, mobile-first e kiosk-ready
- **External data**: Immagini vino da scraping web con fallback statico locale
- **Map**: Coordinate reali per cantine seedate nel DB e workshop inseriti via pannelli manage

## Key Decisions

| Decision                                                     | Rationale                                              | Outcome   |
| ------------------------------------------------------------ | ------------------------------------------------------ | --------- |
| Prima schermata = questionario matching                      | Richiesta esplicita e impatto diretto su core value    | - Pending |
| SQLite locale per tutto il MVP                               | Setup semplice, zero complessita di connessione remota | - Pending |
| Catalogo vini centralizzato + associazione per azienda       | Evita duplicazioni e semplifica gestione da /manage-\* | - Pending |
| Badge verificato solo con descrizione lavorazione + additivi | Trasparenza dati e trust verso utenti                  | - Pending |
| Kiosk web con output QR code                                 | Conversione/retention tra tablet e telefono            | - Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition**:

1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone**:

1. Full review of all sections
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state

---

_Last updated: 2026-04-17 after initialization_
