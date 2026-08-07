# AGENTS.md

## PROJECT
Static one-page "web business card" (Web-Visitenkarte) for Einwich & Lottes GmbH, a German HVAC/plumbing trade business (Heizung/Sanitär/Solar/Wartung) near Bamberg. Pure hand-written HTML5 + one CSS file + minimal JS. No build step, no framework, no runtime dependencies.

## STRUCTURE
```
index.html         # One-pager: hero, phone banner, floating contact (3 btns), 5 content sections
impressum.html     # Legal notice (§5 DDG) — noindex
datenschutz.html   # GDPR privacy policy — noindex
css/style.css      # Single stylesheet, design tokens in :root, mobile-first
js/email.js        # Email obfuscation (data-c attribute decoder: encoded user part + plain domain)
assets/images/     # hero_banner (.avif/.webp/.jpg) + logo (.avif/.png) — pre-optimized variants
assets/icons/      # favicons + touch icons (png, ico) — inlined SVG in HTML for site icons
manifest.json      # PWA manifest (name, theme_color #3356A1, logo.png icon)
robots.txt         # Allow all + sitemap reference
sitemap.xml        # 3 URLs: /, impressum.html, datenschutz.html
REQUIREMENTS.md    # Full German spec — source of truth for content + constraints
deploy/            # Deployment staging directory (gitignored, rebuilt by CI)
```

## KEY COMMANDS
| Command | What it does |
|---|---|
| `npm run test:a11y` | Playwright + axe-core WCAG 2.1 AA audit (all 3 pages) |
| `npm run test:a11y:ci` | Same, with line reporter for CI |
| `npm run test:lighthouse` | Lighthouse CI performance/accessibility audit |
| `npm run test:lighthouse:ci` | Same, fail on budget |
| `npm run serve` | `python3 -m http.server 3000` for local preview |
| `./run-tests.sh` | Runs a11y + lighthouse + screenshots + deploy locally |
| `./run-tests.sh a11y` | Accessibility audit only |
| `./run-tests.sh deploy` | Create deployment ZIP (excludes dev files) |
| `npx playwright test` | Run ALL Playwright tests (a11y + email-obfuscation + legal + screenshots; 37 tests) |
| `npx playwright test tests/email-obfuscation.spec.js` | Email obfuscation tests only |
| `npx playwright test tests/legal.spec.js` | Legal tests only (Impressum content + legal links) |

## TESTING
- **Playwright** (`playwright.config.js`) — runs against `localhost:3000`, starts its own dev server
- **axe-core** (`tests/accessibility.spec.js`) — checks all 3 pages for WCAG 2.1 AA violations
- **Lighthouse CI** (`lighthouserc.json`) — budgets: perf ≥90, a11y ≥90, best-practices ≥90, LCP ≤2500ms, CLS ≤0.1
- **Screenshots** (`tests/screenshots.spec.js`) — visual regression at mobile + desktop
- **Email obfuscation** (`tests/email-obfuscation.spec.js`) — verifies `data-c` format (encoded user part, plain domain) on all 3 pages + decodes to `mailto:` on hover/focus/click (7 tests)
- **Legal** (`tests/legal.spec.js`) — verifies all manually-checked Impressum facts (§5 DDG: company, address, tel/email, Geschäftsführer, HRB, USt-IdNr, Kammer, Berufsbezeichnung, Streitbeilegung) + checks every page links to Impressum & Datenschutz in `nav[aria-label="Rechtliche Links"]` (12 tests)
- CI runs tests manually via `workflow_dispatch` (not on every PR)

## DEPLOYMENT
- CI creates `einwich-lottes-deploy.zip` on push to `main` via `.github/workflows/ci-cd.yml`
- ZIP excludes: `.DS_Store`, `.playwright-mcp`, `icons/.gitkeep`, `.git`, `.github`, `.omo`, `tests`, `screenshots`, `playwright-report`, `test-results`, `.lighthouseci`, config files (`package*.json`, `playwright.config.js`, `lighthouserc.json`, `run-tests.sh`, `.gitignore`)
- `deploy/` directory is gitignored; rebuilt fresh each CI run
- Release auto-created on `main` push with the ZIP as an asset (tag `v${run_number}`)

## WHERE TO LOOK
| Task | Location | Notes |
|---|---|---|
| Change content/copy | `index.html` sections `#ueber-uns`, `#leistungen`, `#angebot`, `#partner`, `#bewertungen` | Hardcoded German prose |
| Styling / colors | `css/style.css` `:root` tokens | All colors/spacing/radii are CSS vars |
| Contact info (phone/email/address) | All 3 HTML files + footer + JSON-LD | Update ALL occurrences together |
| Social links (Instagram, tel:) | `index.html` floating buttons (`.floating-btn`), footer | Instagram opens in new tab |
| Google Business-Profil-Link | `index.html` `#bewertungen` review-summary-count | `share.google` short link + `title` tooltip |
| SEO / structured data | `index.html` `<head>` (meta, OG, Twitter, JSON-LD `HVACBusiness`) | Includes openingHours, areaServed as cities, hasMap |
| PWA / robots / sitemap | `manifest.json`, `robots.txt`, `sitemap.xml` | Domain `www.einwich-lottes.de` in sitemap |
| Legal facts (HRB, USt-IdNr, Geschäftsführer) | `impressum.html` | Real registered data — not placeholders |
| Original requirements | `REQUIREMENTS.md` | Authoritative spec (some colors differ from implementation) |

## CONVENTIONS
- Language: all user-facing content and comments are German; `<html lang="de">`.
- CSS: single file, numbered section banners (`/* 1. Design Tokens */`), design tokens only in `:root`. Add new tokens rather than hardcoding hex/spacing.
- Mobile-first: base styles = mobile; breakpoints at `min-width: 600px` and `1024px` only.
- Icons: inline SVG directly in HTML; `assets/icons/` holds favicons/touch icons only (not site UI icons).
- Images: ship `.avif` + `.webp` + fallback via `<picture>`/`<source>`; keep all three variants in sync. Logo currently only has `.avif` + `.png`.
- Content max-width: 960px (`.container`).
- External links open in a new tab with `rel="noopener noreferrer"` (e.g. Instagram button, hosting provider link in datenschutz).
- Email obfuscation: `data-c` attribute holds the **user part as comma-separated char codes** followed by **`@` + plain-text domain** (e.g. `105,110,102,111@einwich-lottes.de`), decoded by `js/email.js` on interaction (focus/mouseenter/touchstart/click). Helper: `encode-mail.sh` encodes only the user part. Cover format + decoding in `tests/email-obfuscation.spec.js`.

## IMPLEMENTATION NOTES (divergences from REQUIREMENTS.md)
- **Primary Blue**: CSS uses `--color-blue: #2655A4` (logo-sampled) vs REQUIREMENTS `#0055A5`
- **Contact Banner/Footer bg**: Uses `--color-contact: #3356A1` (not dark slate)
- **Dark Slate**: `--color-dark-900: #2a0f0f` (reddish) vs REQUIREMENTS `#0F172A`
- **Floating buttons**: 3 buttons (Instagram, Email, Phone) — REQUIREMENTS specifies only 2
- **Reviews**: JavaScript carousel with prev/next (9 cards), not static HTML
- **JSON-LD**: Much richer than spec (openingHours, areaServed as City[], hasMap, founder)
- **Partner logos**: Text tiles (`.partner-tile`), not image files

## ANTI-PATTERNS (HARD CONSTRAINTS)
- **NO external requests (GDPR/DSGVO):** never add Google Fonts, CDNs, FontAwesome, Google Maps, Analytics, jQuery, or any third-party script/stylesheet. Zero external network calls is a legal requirement.
- **NO cookie banner / tracking / analytics** — adding any would break the "no consent needed" premise in `datenschutz.html`.
- **NO build tooling / npm / bundler / framework** — this is intentionally plain static files served as-is.
- **NO system fonts replaced** — use only the native font stack (`system-ui, -apple-system, "Segoe UI", Roboto, Arial`).
- Don't set `impressum.html`/`datenschutz.html` to indexable — they carry `robots: noindex, follow`.

## NOTES
- Performance target: Lighthouse 98–100 mobile & desktop. Keep it dependency-free and lean.
- Preview locally: `npm run serve` then open `http://localhost:3000` in a browser.
- Acceptance checklist lives in `REQUIREMENTS.md` §7 (W3C validity, zero external requests, click-to-call `tel:095054503930`, mailto, WCAG AA contrast).
- `.omo/` is internal agent tooling (plans, evidence, notepads) — not part of the deployed site; do not edit.