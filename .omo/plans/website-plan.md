# Web-Visitenkarte Einwich & Lottes GmbH

## TL;DR
> **Quick Summary**: Create a 100% DSGVO-compliant (zero external dependencies) static web-visiting card for Einwich & Lottes GmbH (Memmelsdorf) to showcase services and provide direct contact.
>
> **Deliverables**:
> - `index.html` (One-Pager)
> - `impressum.html` (Legal)
> - `datenschutz.html` (Legal)
> - `css/style.css` (Flat Design)
> - Asset structure
>
> **Estimated Effort**: Short
> **Parallel Execution**: YES - 2 waves
> **Critical Path**: Scaffolding → Core Content → Legal → Verification

---

## Context

### Original Request
Requirements defined in `REQUIREMENTS.md`. Client: Einwich & Lottes GmbH (Memmelsdorf). Sanitär, Heizung, Solar, Wartung. Ziel: extrem schnelle, DSGVO-konforme, mobil-optimierte Web-Visitenkarte.

### Interview Summary
- **CI**: Provided colors/logo/company data (Patrick Einwich, Alexander Lottes, HRB 11512, HwK 3039281, USt-IdNr DE366642580).
- **Technical**: Static HTML/CSS, zero JS dependencies, performance-focused.
- **QA**: Agent-based verification (Playwright/Curl).

### Metis Review
- All critical requirements and guardrails identified and addressed (zero external dependencies, performance budget, agent-based QA).

---

## Work Objectives

### Core Objective
Create a static, high-performance, legally compliant web-visiting card.

### Definition of Done
- [ ] Lighthouse ≥ 98 (mobile/desktop).
- [ ] Zero external requests (verified via Playwright).
- [ ] All required legal data populated.
- [ ] Links clickable and working.
- [ ] No tracking/cookies.

### Must Have
- [x] Geschäftsführer names, HRB, USt-IdNr, HwK in Impressum.
- [x] Zero external dependencies.
- [x] Mobile-responsive design.

### Must NOT Have (Guardrails)
- [x] No CDNs (Google Fonts, etc.).
- [x] No Analytics/Tracking scripts.
- [x] No Cookie banner.
- [x] No CMS.

---

## Verification Strategy

### QA Policy
Every task MUST include agent-executed QA scenarios using Playwright (UI) or Curl/Bash (API/Links).
Evidence saved to `.omo/evidence/task-{N}-{scenario-slug}.{ext}`.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately - Foundation & Structure):
├── 1. Scaffolding & Setup (Dir structure + Basic HTML) [quick]
├── 2. Core Stylesheet (Flat Design + Colors) [visual-engineering]
├── 3. Hero Header & Contact Banner [visual-engineering]
├── 4. Floating Buttons (Pure CSS) [visual-engineering]

Wave 2 (After Wave 1 - Content & Legal):
├── 5. Content Section (Wer/Was/Bieten/Partner/Bewertungen) [unspecified-high]
├── 6. Impressum Page [writing]
├── 7. Datenschutz Page [writing]

Wave FINAL (After ALL tasks):
├── F1. Plan Compliance Audit (oracle)
├── F2. Code Quality Review (unspecified-high)
├── F3. Real Manual QA (unspecified-high)
└── F4. Scope Fidelity Check (deep)
-> Present results -> Get explicit user okay
```

---

## TODOs

- [ ] 1. Scaffolding & Setup

  **What to do**:
  - Create directory structure: `css/`, `assets/images/`, `assets/icons/`.
  - Create `index.html`, `impressum.html`, `datenschutz.html`.
  - Set up base `<head>` with requested meta tags (charset, viewport, SEO, JSON-LD).

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Trivial file creation.

  **QA Scenarios**:
  - Scenario 1: `curl -I localhost:PORT/index.html` → 200 OK
  - Scenario 2: Playwright verify `title` tag exists.

- [ ] 2. Core Stylesheet (Flat Design & Colors)

  **What to do**:
  - Implement `css/style.css` with requested color palette (Primary Blue, Accent Red, etc.).
  - Set up `system-ui` font stack.
  - Reset styles and global layout basics (container max-width 960px).

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`

  **QA Scenarios**:
  - Scenario 1: Verify `style.css` loaded (Network tab).
  - Scenario 2: Check CSS variables for color palette.

- [ ] 3. Hero Header & Contact Banner

  **What to do**:
  - Implement Sektion 1 (Hero) and Sektion 2 (Contact Banner).
  - Add hero image placeholder/alt text.
  - Implement tel link in banner.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`

  **QA Scenarios**:
  - Scenario 1: Verify `tel` link format `href="tel:095054503930"`.
  - Scenario 2: Verify alt text of hero image.

- [ ] 4. Floating Buttons

  **What to do**:
  - Implement floating mail/phone buttons using fixed positioning.
  - Use inlined SVG icons.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`

  **QA Scenarios**:
  - Scenario 1: Verify mail link `mailto:info@einwich-lottes.de`.
  - Scenario 2: Verify button positioning (CSS fixed).

- [ ] 5. Content Section

  **What to do**:
  - Implement Sections 4.1 to 4.5.
  - Use CSS Grid for cards and partner logos.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`

  **QA Scenarios**:
  - Scenario 1: Verify Grid layout (CSS Grid).
  - Scenario 2: Verify static reviews grid.

- [ ] 6. Impressum Page

  **What to do**:
  - Populate Impressum with provided client data (Geschäftsführer, HRB, USt-IdNr, etc.).

  **Recommended Agent Profile**:
  - **Category**: `writing`

  **QA Scenarios**:
  - Scenario 1: Verify all mandatory legal data present.
  - Scenario 2: Verify link back to start page.

- [ ] 7. Datenschutz Page

  **What to do**:
  - Populate Datenschutz (no cookies, no tracking).

  **Recommended Agent Profile**:
  - **Category**: `writing`

  **QA Scenarios**:
  - Scenario 1: Verify "Keine Cookies" text present.

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** — `oracle`
- [ ] F2. **Code Quality Review** — `unspecified-high`
- [ ] F3. **Real Manual QA** — `unspecified-high`
- [ ] F4. **Scope Fidelity Check** — `deep`

---

## Commit Strategy
- `feat(site): initial structure and base styles`
- `feat(site): content sections and legal pages`

---

## Success Criteria
- Lighthouse ≥ 98
- Zero external network calls
