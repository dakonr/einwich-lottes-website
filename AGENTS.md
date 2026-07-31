# PROJECT KNOWLEDGE BASE

**Generated:** 2026-07-31
**Commit:** d697ac6
**Branch:** main

## OVERVIEW
Static one-page "web business card" (Web-Visitenkarte) for Einwich & Lottes GmbH, a German HVAC/plumbing trade business (Heizung/Sanitär/Solar/Wartung) near Bamberg. Pure hand-written HTML5 + one CSS file. No build step, no framework, no dependencies.

## STRUCTURE
```
index.html         # One-pager: hero, phone banner, floating contact, 5 content sections
impressum.html     # Legal notice (§5 DDG) — noindex
datenschutz.html   # GDPR privacy policy — noindex
css/style.css      # Single stylesheet, design tokens in :root, mobile-first
assets/images/     # logo + hero_banner in .avif/.webp/.jpg(.png) — pre-optimized variants
assets/icons/      # empty (.gitkeep); icons are inlined SVG in HTML instead
REQUIREMENTS.md    # Full German spec — source of truth for content + constraints
```

## WHERE TO LOOK
| Task                                         | Location                                                                                  | Notes                                   |
| -------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------- |
| Change content/copy                          | `index.html` sections `#ueber-uns`, `#leistungen`, `#angebot`, `#partner`, `#bewertungen` | Content is hardcoded German prose       |
| Styling / colors                             | `css/style.css` `:root` tokens                                                            | All colors/spacing/radii are CSS vars   |
| Contact info (phone/email/address)           | Repeated in all 3 HTML files + footer + JSON-LD                                           | Update ALL occurrences together         |
| SEO / structured data                        | `index.html` `<head>` (meta, OG, Twitter, JSON-LD `HVACBusiness`)                         |                                         |
| Legal facts (HRB, USt-IdNr, Geschäftsführer) | `impressum.html`                                                                          | Real registered data — not placeholders |
| Original requirements                        | `REQUIREMENTS.md`                                                                         | Authoritative spec                      |

## CONVENTIONS
- Language: all user-facing content and comments are German; `<html lang="de">`.
- CSS: single file, numbered section banners (`/* 1. Design Tokens */`), design tokens only in `:root`. Add new tokens rather than hardcoding hex/spacing.
- Mobile-first: base styles = mobile; breakpoints at `min-width: 600px` and `1024px` only.
- Icons: inline SVG directly in HTML (`assets/icons/` is intentionally empty).
- Images: ship `.avif` + `.webp` + fallback via `<picture>`/`<source>`; keep all three variants in sync.
- Content max-width: 960px (`.container`).

## ANTI-PATTERNS (THIS PROJECT — HARD CONSTRAINTS)
- **NO external requests (GDPR/DSGVO):** never add Google Fonts, CDNs, FontAwesome, Google Maps, Analytics, jQuery, or any third-party script/stylesheet. Zero external network calls is a legal requirement.
- **NO cookie banner / tracking / analytics** — adding any would break the "no consent needed" premise stated in `datenschutz.html`.
- **NO build tooling / npm / bundler / framework** — this is intentionally plain static files served as-is.
- **NO system fonts replaced** — use only the native font stack (`system-ui, -apple-system, "Segoe UI", Roboto, Arial`).
- Don't set `impressum.html`/`datenschutz.html` to indexable — they carry `robots: noindex, follow`.

## NOTES
- Performance target: Lighthouse 98–100 mobile & desktop. Keep it dependency-free and lean.
- No test/build/dev commands. Preview by opening `index.html` in a browser (or any static server, e.g. `python3 -m http.server`).
- Acceptance checklist lives in `REQUIREMENTS.md` §7 (W3C validity, zero external requests, click-to-call `tel:095054503930`, mailto, WCAG AA contrast).
