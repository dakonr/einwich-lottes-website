# Draft: Web-Visitenkarte Einwich & Lottes GmbH

## Requirements (confirmed)
- One-pager website + legal pages (Impressum, Datenschutz)
- 100% DSGVO-compliant (Zero external dependencies)
- Mobile-first, responsive, Modern Flat Design
- Performance optimized (PageSpeed 98-100)
- Colors/CI provided
- Specific structural layout requested
- Geschäftsführer: Patrick Einwich und Alexander Lottes
- HRB Nummer: HRB 11512
- HwK Betriebsnummer: 3039281
- USt-IdNr: DE366642580
- Assets are provided in the folder

## Technical Decisions
- HTML/CSS (Static), JavaScript only if strictly necessary (for functionality, not dependencies)
- Native System Fonts
- Fixed CSS for layout
- Agent-based QA verification (Playwright/Curl)
- Links must be fully functional (not dead)

## Open Questions
- None.

## Scope Boundaries
- INCLUDE: index.html, impressum.html, datenschutz.html, css/style.css, assets/
- EXCLUDE: External APIs, Analytics, CDNs
