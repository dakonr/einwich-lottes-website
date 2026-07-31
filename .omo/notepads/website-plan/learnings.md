# Learnings

## Asset filenames (verified on disk)
- Logo: `assets/images/logo.png.avif` (AVIF, 8.6 KB) — NOT logo.png
- Hero: `assets/images/hero_banner_placeholder.png` (PNG 1278×832, 1.9 MB) — NOT hero-placeholder.jpg
- No partner logo files exist → partners rendered as styled text tiles

## Legal data (confirmed by user)
- Geschäftsführer: Patrick Einwich, Alexander Lottes
- HRB: HRB 11512 (Amtsgericht Bamberg)
- HwK Betriebsnr: 3039281 (Handwerkskammer Oberfranken)
- USt-IdNr: DE366642580
- Berufsbezeichnung: Installateur- und Heizungsbauermeister (verliehen in Deutschland)

## Technical constraints
- ZERO external network requests (no CDN, no fonts, no analytics, no maps)
- No cookies, no cookie banner
- PageSpeed ≥ 98 mobile + desktop
- system-ui font stack only
- Static HTML/CSS, no JS frameworks
- Local server for QA: `python3 -m http.server 8000` → http://localhost:8000

## Color palette
- Primary Blue: #0055A5
- Accent Red: #E30613
- Solar Yellow: #FBC02D
- Phone Green: #16A34A
- Dark Slate: #0F172A / #1E293B
- Background Light: #F8FAFC
- Card Surface: #FFFFFF

## JSON-LD metadata
- absolute URLs in canonical/JSON-LD image do NOT cause runtime network requests → no constraint violation

## Task 1 scaffold
- Foundation HTML skeletons created for `index.html`, `impressum.html`, and `datenschutz.html`
- `css/style.css` added as the local stylesheet target for all pages
- `assets/icons/` materialized with `.gitkeep` so later icon assets can be added without touching `assets/images/`

## Task 2 — CSS design system
- `css/style.css` written (9.8 KB) — Flat Design system with palette CSS custom properties, mobile-first responsive layout
- All 10 palette colors defined as `--color-*` tokens under `:root` (blue/red/yellow/green/dark-900/dark-800/bg/card/border/muted)
- 8px-based spacing scale (`--space-1` … `--space-12`) and shared radii/shadows tokens established for downstream tasks
- `system-ui` font stack applied globally, no @import / no external fonts
- Container: `max-width:960px; margin:0 auto; padding:0 20px;` — verified 960px computed on both `index.html` (injected) and `impressum.html` (real markup) via Playwright chromium
- Section `h2` gets `border-bottom:3px solid var(--color-red)` accent per brand system
- Breakpoints: mobile-first, `.cards-grid` upgrades at ≥600px (2 cols) and ≥1024px (4 cols); `.review-grid` stays `auto-fit minmax(280px,1fr)` (fluid)
- Components implemented: `.card`, `.service-card` + `.service-list` (green checkmark ::before), `.partner-tile`, `.review-card` + `.stars`, `.contact-banner`, `.phone-link`, `.floating-container` + `.floating-btn` (+ `.mail-btn` blue, `.phone-btn` green), `.hero-section img`, `footer`
- `index.html` currently has no `.container` in markup — later index-building task will need to add it. `impressum.html` and `datenschutz.html` already use it.
- Playwright MCP requires `/Applications/Google Chrome.app` which is NOT installed. Workaround: `npx playwright install chromium` populates `~/Library/Caches/ms-playwright`, then run node script pointing at `~/.npm/_npx/<hash>/node_modules/playwright/index.mjs` to launch chromium directly. Useful for all future browser QA.
- QA server pattern for this repo: `python3 -m http.server 8000` at repo root → `http://localhost:8000/<file>.html`. `curl -sI` returns `Content-type: text/css` for `/css/style.css`.

## Task 8 — Hero image compression
- Tool used: `sips` (macOS built-in)
- Strategy: PNG→JPEG conversion; q80=248KB, q70=214KB, q60=162KB ✓
- Final file: `assets/images/hero_banner.jpg` — 162,912 bytes (162 KB)
- Original preserved: `assets/images/hero_banner_placeholder.png` (1,914,758 bytes)
- `index.html` src updated from `hero_banner_placeholder.png` → `hero_banner.jpg`
- HTTP 200 confirmed via curl; Playwright naturalWidth=1278 (hero renders correctly)
- Evidence: `.omo/evidence/task-8-size.txt`, `task-8-status.txt`, `task-8-hero.png`

## Task 3 — Hero Header + Contact Banner
- `index.html` body now contains `<header class="hero-section">` (hero img with `loading="eager"` + `fetchpriority="high"` for LCP) and `<section class="contact-banner">` (tel link exactly `tel:095054503930`)
- Hero img HTML source uses `&amp;` entity; browser decodes to `&` — DOM `.alt` returns `Einwich & Lottes GmbH - Geschäftsführer und Fuhrpark in Memmelsdorf Landkreis Bamberg`
- Playwright MCP is pinned to system Chrome path (`/Applications/Google Chrome.app`) and cannot install without sudo. Workaround for DOM assertions: install `playwright` locally via npm in `/tmp` and drive `chromium.launch()` from a small node script. Chromium binary was already cached at `~/Library/Caches/ms-playwright/chromium-1234`
- QA server pattern verified: `python3 -m http.server 8000 &` → assertions → `pkill -f "python3 -m http.server 8000"`
- Evidence written to `.omo/evidence/task-3-{tel,hero-alt,hero-status}.txt`

## Task 4 — Floating quick-contact buttons
- `<!-- SECTION: floating-buttons -->` in `index.html` replaced with `<div class="floating-container">` holding two `<a class="floating-btn">` links (mail-btn + phone-btn), each with inlined 24×24 SVG icon (envelope / phone) and `aria-label` (`E-Mail schreiben` / `Jetzt anrufen`)
- SVG uses `stroke="#ffffff"` + `aria-hidden="true"` on the icon; anchor tags carry the semantic label. No JS, no external icon lib.
- Hrefs match exact spec: `mailto:info@einwich-lottes.de`, `tel:095054503930` (no `+49`, no `target="_blank"`)
- Computed style at http://localhost:8000/index.html: `position=fixed right=16px bottom=20px z-index=9999` — CSS from Task 2 already applied unchanged
- Playwright QA lives at `/tmp/playwright-qa/node_modules/playwright` (locally installed) — reusable for later tasks without re-install
- Evidence written to `.omo/evidence/task-4-{mailto,position,aria}.txt`

## Task 5 — Main content area and footer
- Both `<!-- SECTION: main-content -->` and `<!-- SECTION: footer -->` replaced in a single edit; `index.html` is now complete with all body sections filled
- `<main class="container">` wraps 5 sections (ids: ueber-uns, leistungen, angebot, partner, bewertungen)
- `.cards-grid` holds 4 `<article class="service-card">` elements (Heizung, Sanitär, Solar, Wartung); `gridDisplay=grid` confirmed via Playwright computed style
- `.service-list` has 3 `<li>` items with `<strong>` lead-in text; `&amp;` used for `&` per HTML spec
- `.partner-grid` has 5 `<span class="partner-tile">` text tiles (Viessmann, Buderus, Vaillant, Geberit, Grohe) — no images (none exist on disk)
- `.review-grid` has 2 `<article class="review-card">` each with `.stars` (★★★★★), `<blockquote>`, and `<cite class="review-author">`; static HTML, no external widget (DSGVO)
- `<footer>` contains address paragraph, tel/email paragraph, and `<nav aria-label="Rechtliche Links">` with `impressum.html` + `datenschutz.html` links
- Playwright assertions all passed: `cards=4`, `gridDisplay=grid`, `reviews=2`, `stars=5,5`, partners all 5 brands, `footerAddr=true impressum=true datenschutz=true`
- Evidence written to `.omo/evidence/task-5-{cards,reviews,partners,footer-links}.txt`

## Task 6 — Impressum § 5 DDG legal fields
- `impressum.html` `<!-- SECTION: impressum-content -->` replaced with 8 `<section>` blocks covering all mandatory § 5 DDG fields
- All values confirmed by client: Einwich & Lottes GmbH, Lange Straße 34, 96117 Memmelsdorf (OT Kremmeldorf), Tel 09505 4503930, info@einwich-lottes.de, Patrick Einwich / Alexander Lottes, HRB 11512 Amtsgericht Bamberg, Handwerkskammer Oberfranken Betriebsnr. 3039281, Installateur- und Heizungsbauermeister (verliehen in Deutschland), USt-IdNr. DE366642580
- Backlink `<a href="index.html">← Zurück zur Startseite</a>` untouched
- All 13 grep assertions passed against live curl; evidence saved to `.omo/evidence/task-6-legal-fields.txt` and `task-6-backlink.txt`
- Port 8000 was already occupied by a prior server session — curl assertions ran against existing server without restart

## Task 7 — Datenschutz DSGVO content
- `datenschutz.html` `<!-- SECTION: datenschutz-content -->` replaced with 6 `<section>` blocks inside `<main>`
- Sections: Verantwortliche Stelle, Allgemeines zur Datenverarbeitung, Cookies/Tracking/externe Ressourcen, Kontaktaufnahme, Ihre Rechte, Aktualität
- Legal basis: Art. 6 Abs. 1 lit. b + lit. f DSGVO for contact processing
- Data subject rights: Art. 15–21 DSGVO listed as `<ul>`
- Supervisory authority: Bayerisches Landesamt für Datenschutzaufsicht, lda.bayern.de — user-clickable anchor only, no runtime fetch
- All 11 grep assertions passed against live curl on port 8001 (8000 already occupied)
- Backlink `<a href="index.html">← Zurück zur Startseite</a>` untouched
- Evidence saved to `.omo/evidence/task-7-content.txt` and `task-7-backlink.txt`
