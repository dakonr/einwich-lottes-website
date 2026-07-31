# F2 Code Quality Review

Reviewed: 2026-07-31
Files: index.html, impressum.html, datenschutz.html, css/style.css

---

## index.html

### Issues Found:

- [PASS] `lang="de"` on `<html>` element
- [PASS] `<meta charset="UTF-8">` and `<meta name="viewport">` present
- [PASS] Semantic structure: `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<nav>` all used appropriately
- [PASS] Hero image has descriptive, non-empty alt text
- [PASS] Floating action buttons have `aria-label` ("E-Mail schreiben", "Jetzt anrufen")
- [PASS] SVG icons carry `aria-hidden="true"` — correctly hidden from screen readers
- [PASS] Footer `<nav>` has `aria-label="Rechtliche Links"`
- [PASS] Star rating `<div>` elements carry `aria-label="5 von 5 Sternen"`
- [PASS] No inline styles, no `<style>` blocks
- [PASS] No deprecated elements (`<center>`, `<font>`, etc.)
- [PASS] No `target="_blank"` without `rel="noopener"`
- [PASS] No stray placeholder comments or TODO markers
- [**ISSUE — HIGH**] **Missing `<h1>`**: The page has no `<h1>` element. All content sections open directly with `<h2>`. This is a significant accessibility and SEO regression — screen readers and search engines rely on `<h1>` as the primary page heading. Suggested fix: add an `<h1>` inside `<main>` (e.g., as a visually-hidden or visible heading identifying the business and page purpose).
- [**ISSUE — MEDIUM**] **`tel:` links not in E.164 format**: `href="tel:095054503930"` uses the local German format. Per RFC 3966, international format `tel:+4995054503930` is required for reliable cross-device dialling (especially outside Germany). Affected: lines 50, 61, 143.
- [**ISSUE — LOW**] **`<section class="contact-banner">` has no heading**: HTML5 spec and ARIA best practices state that `<section>` elements should have an associated heading (`<h2>`–`<h6>`). The phone strip has only a `<p>` and an `<a>`. Consider using `<div>` instead, or add a visually-hidden heading.
- [**ISSUE — LOW**] **`<div class="floating-container">` should be `<nav>`**: The floating container holds two contact navigation links. Wrapping them in `<nav aria-label="Direktkontakt">` would make keyboard navigation and landmark discovery more precise for assistive technologies.
- [**ISSUE — LOW**] **`<cite>` outside `<blockquote>`**: In the review cards (lines 127–128, 132–133), `<cite>` is a sibling of `<blockquote>`, not nested inside it. Per HTML spec, attribution for a `<blockquote>` should appear inside a `<footer>` within the blockquote, or be wrapped in a `<figure>/<figcaption>` pair. Current markup associates the citation loosely.

---

## impressum.html

### Issues Found:

- [PASS] `lang="de"` on `<html>` element
- [PASS] `<meta charset="UTF-8">` and `<meta name="viewport">` present
- [PASS] `<main>` present with correct `<h1>Impressum</h1>`
- [PASS] `<section>` elements used for each legal block
- [PASS] All links have visible text (telephone and email)
- [PASS] No inline styles, no `<style>` blocks
- [PASS] No deprecated elements
- [PASS] No `target="_blank"` without `rel="noopener"`
- [**ISSUE — MEDIUM**] **Missing `<header>` and `<footer>`**: The back-link sits bare inside a `<div class="container">`. No `<footer>` exists on this page. Consistent page structure requires a `<header>` wrapping the back-navigation and a `<footer>` with links to Impressum/Datenschutz matching the main page — otherwise users land on a dead end with no footer navigation.
- [**ISSUE — LOW**] **Missing `<meta name="description">` and `<link rel="canonical">`**: Legal pages benefit from canonical declarations to prevent duplicate-content issues, and a description tag for completeness.

---

## datenschutz.html

### Issues Found:

- [PASS] `lang="de"` on `<html>` element
- [PASS] `<meta charset="UTF-8">` and `<meta name="viewport">` present
- [PASS] `<main>` present with correct `<h1>Datenschutzerklärung</h1>`
- [PASS] `<section>` elements used for each content block
- [PASS] All links have visible text
- [PASS] No inline styles, no `<style>` blocks
- [PASS] No deprecated elements
- [PASS] No `target="_blank"` without `rel="noopener"` — the external `lda.bayern.de` link opens in the same tab (no `target="_blank"`), which is intentional
- [**ISSUE — MEDIUM**] **Missing `<header>` and `<footer>`**: Same structural gap as impressum.html — back-link in a bare `<div>`, no footer landmark.
- [**ISSUE — LOW**] **Redundant `rel="noopener"` without `target="_blank"`** (line 54): The `lda.bayern.de` link carries `rel="noopener"` but has no `target="_blank"`. Without a blank target, `rel="noopener"` has no effect and is dead markup. Either add `target="_blank"` (and keep `rel="noopener noreferrer"`) or remove the attribute.
- [**ISSUE — LOW**] **Missing `<meta name="description">` and `<link rel="canonical">`**: Same as impressum.html.

---

## css/style.css

### Issues Found:

- [PASS] Zero `!important` declarations (0 occurrences)
- [PASS] CSS custom properties (`--color-*`, `--space-*`, `--radius-*`, `--shadow-*`) defined in `:root` and used throughout
- [PASS] No `@import` of external resources — all assets self-hosted
- [PASS] Mobile-first responsive breakpoints at `600px` and `1024px`
- [PASS] No unused `@keyframes`
- [PASS] No hardcoded fixed widths that break responsiveness; grid uses `auto-fit` + `minmax()`
- [PASS] `:focus-visible` styles applied consistently on interactive elements
- [PASS] `.visually-hidden` utility class correctly implemented
- [**ISSUE — HIGH**] **Dead code: `.card` class (lines 255–261)**: A `.card` rule block defines `background`, `border`, `border-radius`, `padding`, and `box-shadow` — but no element in any HTML file uses `class="card"`. The class is never referenced. This is dead CSS that duplicates the structure of `.service-card`. Should be removed or consolidated.
- [**ISSUE — MEDIUM**] **`border-radius` variable bypassed in 5+ places**: `--radius-md: 8px` and `--radius-sm: 6px` are declared in `:root` but `border-radius: 8px` is hardcoded directly in `.floating-btn` (line 224), `.card` (line 258), `.service-card` (line 275), `.partner-tile` (line 328), `.review-card` (line 355). Inconsistent: a future token change would miss all these instances.
- [**ISSUE — MEDIUM**] **`--shadow-float` variable bypassed**: `--shadow-float: 0 4px 12px rgba(0, 0, 0, 0.2)` is declared (line 39) but `.floating-btn` on line 225 duplicates the identical value as a hardcoded literal instead of `var(--shadow-float)`.
- [**ISSUE — MEDIUM**] **Spacing variables inconsistently applied**: `--space-4` (16px), `--space-5` (20px), `--space-6` (24px), `--space-8` (32px) are defined but bypassed in favor of raw `px` values in: `.contact-banner` padding (16px/20px), `.container` padding (20px), `.floating-container` gap/position (10px/16px/20px), `.cards-grid` gap (20px), `.partner-grid` gap (16px), `.partner-tile` padding (16px/24px), `.review-grid` gap (20px), `.review-card` padding (20px), `footer` padding (30px/20px). The token system is partially undermined.
- [**ISSUE — LOW**] **Redundant dual selector on `.review-card cite, .review-card .review-author`** (lines 371–372): The HTML markup uses `<cite class="review-author">`, which is matched by both the element selector and the class selector simultaneously. One selector is sufficient — the class selector `.review-card .review-author` is the more robust choice since it doesn't rely on element type.

---

## Verdict

**REJECT**

**Reason:**

Two blocking issues prevent approval:

1. **Missing `<h1>` on index.html** — the primary page has no top-level heading. This breaks the accessibility heading hierarchy and harms SEO directly. Every HTML page must have exactly one `<h1>`.

2. **Dead CSS `.card` rule** — a rule block that is defined but never used is dead code. On a deliberately lean, zero-dependency stylesheet this is particularly notable.

Supporting issues that must also be addressed before re-review:

- `tel:` URIs must be E.164 format (`tel:+4995054503930`) across all three HTML files.
- impressum.html and datenschutz.html need `<header>` / `<footer>` landmarks to match the structural pattern of index.html.
- CSS variable bypass (border-radius, shadow, spacing tokens) should be made consistent so the design token system is reliable.

Non-blocking (address in follow-up):

- `<section class="contact-banner">` missing heading or element swap to `<div>`
- `<div class="floating-container">` → `<nav aria-label="Direktkontakt">`
- `<cite>` placement inside `<blockquote>` per HTML spec
- Redundant `rel="noopener"` in datenschutz.html
- Dual selector cleanup in CSS
