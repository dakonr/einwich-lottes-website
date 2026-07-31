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
> **Actual Asset Inventory (verified on disk)**:
> - `assets/images/logo.png.avif` (AVIF, 8.6 KB) — reference this exact filename.
> - `assets/images/hero_banner_placeholder.png` (PNG, 1278×832, **1.9 MB — MUST be optimized**).
> - No partner logo files present → render partners as styled brand-name text tiles.
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

**Standard local server (fixed):** serve the repo root with `python3 -m http.server 8000` → base URL `http://localhost:8000`. All QA URLs use this base (no `PORT` placeholders).
**Assertion rule:** every QA scenario states (a) exact tool + command/selector, (b) concrete expected result (string/status/pixel/computed-style), (c) saved evidence path. No "Network tab"/"verify X renders" without a machine-checkable assertion.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately - Foundation & Structure):
├── 1. Scaffolding & Setup (Dir structure + Basic HTML) [quick]
├── 2. Core Stylesheet (Flat Design + Colors) [visual-engineering]
├── 3. Hero Header & Contact Banner [visual-engineering]
├── 8. Hero Image Optimization (runs right after 3) [visual-engineering]
├── 4. Floating Buttons (Pure CSS) [visual-engineering]

Wave 2 (After Wave 1 - Content & Legal):
├── 5. Content Section + Footer (Wer/Was/Bieten/Partner/Bewertungen/Footer) [unspecified-high]
├── 6. Impressum Page [writing]
├── 7. Datenschutz Page [writing]

Wave FINAL (After ALL tasks - Task 8 MUST be done before any Lighthouse run):
├── F1. Plan Compliance Audit (oracle)
├── F2. Code Quality Review (unspecified-high)
├── F3. Agent-Executed Browser QA + Lighthouse (unspecified-high)
├── F4. Scope Fidelity Check (deep)
└── F5. Acceptance Criteria Audit — §7 (unspecified-high)
-> Present results -> Get explicit user okay
```

---

## TODOs

- [x] 1. Scaffolding & Setup

  **What to do**:
  - Create directory structure: `css/`, `assets/icons/` (`assets/images/` already exists).
  - Create `index.html`, `impressum.html`, `datenschutz.html`.
  - Set up base `<head>` with requested meta tags (charset, viewport, SEO, JSON-LD).
  - JSON-LD `image` field → `https://www.einwich-lottes.de/assets/images/logo.png.avif`.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Trivial file creation.

  **QA Scenarios**:
  - Scenario 1: `curl -sI http://localhost:8000/index.html` → first line contains `200`. Save headers to `.omo/evidence/task-1-http-status.txt`.
  - Scenario 2: `curl -s http://localhost:8000/index.html` piped to grep — assert ALL present: `<meta charset="UTF-8">`, `name="viewport"` with `width=device-width`, `<title>Einwich & Lottes GmbH`, `name="description"`, `name="keywords"`, `rel="canonical"`, `application/ld+json`. Save to `.omo/evidence/task-1-meta.txt`.
  - Scenario 3: Extract JSON-LD block and assert keys/values: `"@type":"HVACBusiness"`, `"name":"Einwich & Lottes GmbH"`, `"image"` ends `logo.png.avif`, `"telephone":"+49-9505-4503930"`, `"email":"info@einwich-lottes.de"`, `postalCode` `96117`, `"areaServed":"Landkreis Bamberg"`. Save to `.omo/evidence/task-1-jsonld.txt`.

- [x] 2. Core Stylesheet (Flat Design & Colors)

  **What to do**:
  - Implement `css/style.css` with requested color palette (Primary Blue, Accent Red, etc.).
  - Set up `system-ui` font stack.
  - Reset styles and global layout basics (container max-width 960px).

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`

  **QA Scenarios**:
  - Scenario 1: `curl -sI http://localhost:8000/css/style.css` → `200`, `Content-Type` contains `text/css`. Save to `.omo/evidence/task-2-css-status.txt`.
  - Scenario 2: `grep` the CSS for each palette hex — assert all present: `#0055A5`, `#E30613`, `#FBC02D`, `#16A34A`, `#0F172A`, `#1E293B`, `#F8FAFC`, `#FFFFFF`, and `system-ui` in the font stack. Save to `.omo/evidence/task-2-palette.txt`.
  - Scenario 3: Playwright — `document.querySelector('.container')` computed `max-width` == `960px`. Save to `.omo/evidence/task-2-container.txt`.

- [x] 3. Hero Header & Contact Banner

  **What to do**:
  - Implement Sektion 1 (Hero) and Sektion 2 (Contact Banner).
  - Hero `<img src="assets/images/hero_banner_placeholder.png">` with `width:100%; max-height:480px; object-fit:cover`, plus `width`/`height` attributes and `loading="eager"`/`fetchpriority="high"` for LCP.
  - Add alt text: "Einwich & Lottes GmbH - Geschäftsführer und Fuhrpark in Memmelsdorf Landkreis Bamberg".
  - Implement tel link in banner.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`

  **QA Scenarios**:
  - Scenario 1: Playwright — assert `a[href="tel:095054503930"]` exists in the contact banner (exact match). Save to `.omo/evidence/task-3-tel.txt`.
  - Scenario 2: Playwright — assert `img[src="assets/images/hero_banner_placeholder.png"]` with `alt` == "Einwich & Lottes GmbH - Geschäftsführer und Fuhrpark in Memmelsdorf Landkreis Bamberg". Save to `.omo/evidence/task-3-hero-alt.txt`.
  - Scenario 3: `curl -sI http://localhost:8000/assets/images/hero_banner_placeholder.png` → `200` (no dead image link). Save to `.omo/evidence/task-3-hero-status.txt`.

- [x] 8. Hero Image Optimization (Performance)

  **What to do**:
  - `hero_banner_placeholder.png` is 1.9 MB — too heavy for PageSpeed ≥98.
  - Losslessly/lossily compress + resize to display size (≤1600px wide) so file ≤ ~200 KB, keeping the same filename (or add an optimized derivative referenced by HTML). Zero external tools/CDN — use local image tooling only.
  - Verify hero still renders and object-fit crop looks correct.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`

  **QA Scenarios**:
  - Scenario 1: `stat -f%z assets/images/hero_banner_placeholder.png` (or the optimized derivative referenced by HTML) → ≤ 200000 bytes. Save to `.omo/evidence/task-8-size.txt`.
  - Scenario 2: `curl -sI http://localhost:8000/<hero-path>` → `200`. Save to `.omo/evidence/task-8-status.txt`.
  - Scenario 3: Playwright screenshot of hero region at 1440px width, saved to `.omo/evidence/task-8-hero.png`; assert `<img>` `naturalWidth > 0` (renders, not broken).

- [x] 4. Floating Buttons

  **What to do**:
  - Implement floating mail/phone buttons using fixed positioning.
  - Use inlined SVG icons.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`

  **QA Scenarios**:
  - Scenario 1: Playwright — assert an `<a href="mailto:info@einwich-lottes.de">` exists (exact match). Save to `.omo/evidence/task-4-mailto.txt`.
  - Scenario 2: Playwright — `.floating-btn` container computed style: `position == fixed`, `right == 16px`, `bottom == 20px`, `z-index == 9999`. Save to `.omo/evidence/task-4-position.txt`.
  - Scenario 3: Playwright — both floating anchors have non-empty `aria-label`. Save to `.omo/evidence/task-4-aria.txt`.

- [x] 5. Content Section + Footer

  **What to do**:
  - Implement REQUIREMENTS Sections 4.1–4.5 AND Sektion 5 (Footer).
  - 4.1 "Wer sind wir?" (h2, border-bottom `3px solid #E30613`) + intro text.
  - 4.2 "Was machen wir?" — CSS Grid `repeat(auto-fit, minmax(220px,1fr))`, 4 flat cards (Heizung, Sanitär, Solar, Wartung).
  - 4.3 "Was bieten wir an?" — 3 service points with checkmark SVG (Vor-Ort-Beratung, Notdienst, Meisterqualität).
  - 4.4 "Partner" — intro text + Viessmann, Buderus, Vaillant, Geberit, Grohe as styled brand-name text tiles (NO trademarked logo images — none on disk).
  - 4.5 "Google Bewertungen" — 2 static review cards, 5-star row `color:#FBC02D`, placeholder quotes + authors per REQUIREMENTS §4.5.
  - Sektion 5 Footer — bg `#0F172A`, text `#94A3B8`, centered: address line (Einwich & Lottes GmbH | Lange Straße 34 | 96117 Memmelsdorf (OT Kremmeldorf)), contact line (Tel + E-Mail), and links `<a href="impressum.html">Impressum</a>` | `<a href="datenschutz.html">Datenschutzerklärung</a>`.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`

  **QA Scenarios**:
  - Scenario 1: Playwright — assert exactly 4 service cards under "Was machen wir?" and their grid container `display == grid`. Save to `.omo/evidence/task-5-cards.txt`.
  - Scenario 2: Playwright — assert 2 review cards each containing 5 star glyphs. Save to `.omo/evidence/task-5-reviews.txt`.
  - Scenario 3: Playwright — assert 5 partner tiles with texts Viessmann/Buderus/Vaillant/Geberit/Grohe. Save to `.omo/evidence/task-5-partners.txt`.
  - Scenario 4: Playwright — footer contains `Lange Straße 34`, `info@einwich-lottes.de`, and BOTH links `impressum.html` + `datenschutz.html`; click each → resolves 200 (not dead). Save to `.omo/evidence/task-5-footer-links.txt`.

- [x] 6. Impressum Page

  **What to do**:
  - `<title>Impressum | Einwich & Lottes GmbH</title>` + backlink `<a href="index.html">← Zurück zur Startseite</a>`.
  - Populate ALL § 5 DDG mandatory fields (exact values):
    - Diensteanbieter: Einwich & Lottes GmbH
    - Adresse: Lange Straße 34, 96117 Memmelsdorf (OT Kremmeldorf)
    - Geschäftsführer: Patrick Einwich, Alexander Lottes
    - Kontakt: Telefon 09505 4503930, E-Mail info@einwich-lottes.de
    - Registergericht: Amtsgericht Bamberg, HRB 11512
    - Zuständige Kammer: Handwerkskammer Oberfranken (Betriebsnummer 3039281)
    - Berufsbezeichnung: Installateur- und Heizungsbauermeister (verliehen in Deutschland)
    - USt-IdNr.: DE366642580

  **Recommended Agent Profile**:
  - **Category**: `writing`

  **QA Scenarios**:
  - Scenario 1: `curl -s http://localhost:8000/impressum.html` — grep-assert ALL present: `Einwich & Lottes GmbH`, `Lange Straße 34`, `96117 Memmelsdorf`, `09505 4503930`, `info@einwich-lottes.de`, `Patrick Einwich`, `Alexander Lottes`, `HRB 11512`, `Amtsgericht Bamberg`, `Handwerkskammer Oberfranken`, `3039281`, `DE366642580`, `Installateur- und Heizungsbauermeister`. Save to `.omo/evidence/task-6-legal-fields.txt`.
  - Scenario 2: Playwright — backlink `href="index.html"` exists and click resolves 200. Save to `.omo/evidence/task-6-backlink.txt`.

- [x] 7. Datenschutz Page

  **What to do**:
  - `<title>Datenschutzerklärung | Einwich & Lottes GmbH</title>` + backlink to `index.html`.
  - Content bullets per REQUIREMENTS §5.2:
    - Verantwortliche Stelle: Einwich & Lottes GmbH (+ address/contact).
    - Rein informatorische Nutzung, keine Server-Log-Files, kein Web-Analytics.
    - Kontaktaufnahme via E-Mail/Telefon, Verarbeitung gem. Art. 6 Abs. 1 lit. b DSGVO.
    - Ausdrücklich: keine Cookies, keine Tracking-Dienste, keine externen CDN-Ressourcen (z.B. Google Fonts).
    - Rechte der betroffenen Personen (Auskunft, Berichtigung, Löschung).

  **Recommended Agent Profile**:
  - **Category**: `writing`

  **QA Scenarios**:
  - Scenario 1: `curl -s http://localhost:8000/datenschutz.html` — grep-assert ALL present: `Verantwortliche`, `rein informatorische`/`informatorischen Nutzung`, `keine Server-Log`/`Server-Log-Files`, `kein Web-Analytics`/`keine Web-Analyse`, `Art. 6 Abs. 1 lit. b`, `keine Cookies`/`Keine Cookies`, `keine Tracking`, `keine externen CDN`/`Google Fonts`, `Auskunft`, `Berichtigung`, `Löschung`. Save to `.omo/evidence/task-7-content.txt`.
  - Scenario 2: Playwright — backlink `href="index.html"` exists and click resolves 200. Save to `.omo/evidence/task-7-backlink.txt`.

---

## Final Verification Wave

> Precondition: Task 8 (hero optimization) DONE and wired into HTML before any Lighthouse run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  - Audit deliverables against this plan's Definition of Done + Must/Must-NOT lists. Output PASS/FAIL per item.

- [ ] F2. **Code Quality Review** — `unspecified-high`
  - Review HTML/CSS for semantics, duplication, dead code, a11y attributes. Save findings to `.omo/evidence/F2-code-review.md`.

- [ ] F3. **Agent-Executed Browser QA + Lighthouse** — `unspecified-high` (uses Playwright)
  - Zero external requests: load all 3 pages, capture network log, assert NO request to any non-`localhost` host. Save `.omo/evidence/F3-network-{page}.txt`.
  - Lighthouse (mobile + desktop) on `index.html` → Performance ≥ 98. Save reports to `.omo/evidence/F3-lighthouse-{mobile,desktop}.json`.
  - Responsive matrix — screenshots at 375px, 768px, 1440px; assert 1-col <600px, 2-col 600–1024px, centered ≤960px >1024px. Save to `.omo/evidence/F3-responsive-{w}.png`.
  - Link audit — crawl every `<a href>`; tel/mailto match exact schemas, internal links resolve 200 (no dead links). Save to `.omo/evidence/F3-links.txt`.

- [ ] F4. **Scope Fidelity Check** — `deep`
  - Verify no scope creep / no forbidden additions (no CDN, no cookie banner, no JS trackers). Save to `.omo/evidence/F4-scope.md`.

- [ ] F5. **Acceptance Criteria Audit (§7)** — `unspecified-high`
  - W3C validation via local Nu validator (`vnu`/offline) for all 3 pages → 0 errors. Save `.omo/evidence/F5-w3c-{page}.txt`.
  - Click-to-call: every tel link == `tel:095054503930`. Mailto: every == `mailto:info@einwich-lottes.de`.
  - a11y/WCAG AA: every interactive element has label/aria; run axe-core (local) → no serious/critical contrast violations. Save `.omo/evidence/F5-axe.json`.

---

## Commit Strategy
- `feat(site): initial structure and base styles`
- `feat(site): content sections and legal pages`

---

## Success Criteria
- Lighthouse ≥ 98
- Zero external network calls
