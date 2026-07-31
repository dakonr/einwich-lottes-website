# Coding Agent Anforderungsspezifikation: Web-Visitenkarte Einwich & Lottes GmbH

**Projektname:** Web-Visitenkarte Einwich & Lottes GmbH  
**Kunde:** Einwich & Lottes GmbH (Memmelsdorf / OT Kremmeldorf, Landkreis Bamberg)  
**Gewerk:** Sanitär, Heizung, Solar, Wartung  
**Ziel:** Erstellung einer extrem schnellen, DSGVO-konformen (0 externe Calls), mobil-optimierten One-Pager Web-Visitenkarte im Modern Flat Design.  
**Version:** 1.0.0  

---

## 1. Übersicht & Zielsetzung für den Coding Agent

Der Agent hat die Aufgabe, ein vollständiges, sofort einsatzbereites HTML/CSS-Webprojekt zu generieren. Das Projekt dient als digitale Visitenkarte für einen regionalen Handwerksbetrieb im Landkreis Bamberg.

### Kernprinzipien & Restriktionen:
1. **Zero External Dependencies (100% DSGVO-Clean):** Keine Einbindung von Google Fonts, FontAwesome, CDNs, Google Maps API, Google Analytics, jQuery oder sonstigen externen Skripten/Stylesheets.
2. **Native System Fonts:** Nutzung des Betriebssystem-Font-Stacks (`system-ui`, `-apple-system`, `Segoe UI`, `Roboto`, `Arial`).
3. **Mobile First & Responsive:** Optimiert für Smartphones (Click-to-Call), flüssiges Alignment von 320px bis 4K Displays.
4. **No Cookie Consent Banner Needed:** Da keinerlei Tracking-, Analytics- oder Drittanbieter-Cookies/Skripte genutzt werden, entfällt das Cookie-Banner vollständig.
5. **Performance Target:** PageSpeed Score von 98–100 (Google Lighthouse) auf Mobile und Desktop.

---

## 2. Projekt- & Datei-Struktur

Der Agent soll exakt folgende Dateistruktur erstellen:

```
einwich-lottes-website/
├── index.html            # Hauptseite (One-Pager)
├── impressum.html        # Rechtssicheres Impressum
├── datenschutz.html      # DSGVO-Datenschutzerklärung
├── css/
│   └── style.css         # Zentrales Flat-Design Stylesheet
└── assets/
    ├── images/
    │   ├── hero-placeholder.jpg   # Platzhalter für Geschäftsführer & Fuhrpark (1200x500px)
    │   ├── logo.png               # Firmenlogo
    │   └── partner/               # Partner-Logos (lokal gehostet)
    └── icons/                     # SVG-Icons (direkt inline im HTML oder als lokale SVG-Dateien)
```

---

## 3. Stammdaten & Corporate Identity

### 3.1 Kundendaten
* **Firmenname:** Einwich & Lottes GmbH
* **Slogan / Leistungen:** Heizung – Sanitär – Solar – Wartung
* **Strasse / Nr.:** Lange Straße 34
* **PLZ / Ort:** 96117 Memmelsdorf (OT Kremmeldorf)
* **Telefon:** `09505 4503930` (Format für Links: `tel:095054503930`)
* **E-Mail:** `info@einwich-lottes.de` (Format für Links: `mailto:info@einwich-lottes.de`)
* **Domain:** `www.einwich-lottes.de`
* **Zielregion (SEO):** Landkreis Bamberg (Memmelsdorf, Hallstadt, Scheßlitz, Hirschaid, Burgebrach, Bamberg Stadt).

### 3.2 Farbpalette (Flat Design aus Logo abgeleitet)
* **Primary Blue (Sanitär):** `#0055A5` (Buttons, Links, Subtitles)
* **Accent Red (Brand Accent):** `#E30613` (Sektions-Border, Notdienst-Highlights, Initialen-Akzent)
* **Solar Yellow (Rating/Highlights):** `#FBC02D` (Google Sterne, Solar-Akzente)
* **Phone Green (Call Action):** `#16A34A` (Telefon Floating Button)
* **Dark Slate (Text & Deep Backs):** `#0F172A` / `#1E293B` (Headings, Footer, Phone Banner)
* **Background Light:** `#F8FAFC` (Seiten-Hintergrund)
* **Card Surface:** `#FFFFFF` (Kacheln & Formulare)

---

## 4. Detaillierte Seitenspezifikation (`index.html`)

Die Hauptseite muss in exakt folgender Reihenfolge aufgebaut werden:

### Sektion 1: Hero-Header (Bild-Platzhalter)
* **Container:** Header-Element über die volle Breite.
* **Inhalt:** `<img>`-Tag mit dem Pfad `assets/images/hero-placeholder.jpg`.
* **Spezifikation:** `width: 100%`, `max-height: 480px`, `object-fit: cover`.
* **Alt-Text:** `"Einwich & Lottes GmbH - Geschäftsführer und Fuhrpark in Memmelsdorf Landkreis Bamberg"`

### Sektion 2: Direkt-Kontakt Banner (Telefonnummer)
* **Position:** Direkt unter dem Hero-Bild platziert.
* **Styling:** Hintergrund `#1E293B`, Text weiß, zentriert, Padding 16px 20px.
* **Inhalt:**
  * Subtext: *"Jetzt direkt anrufen:"*
  * Haupt-Link: `<a href="tel:095054503930" class="phone-link">📞 09505 / 4503930</a>`
  * Styling `phone-link`: Schriftgröße min. `1.5rem`, `font-weight: 700`, Farbe Weiß (`#FFFFFF`).

### Sektion 3: Floating Quick-Contact Buttons (Fixed UI)
* **Position:** `position: fixed; right: 16px; bottom: 20px; z-index: 9999;`
* **Anordnung:** Vertikaler Flexbox-Container, Abstands-Gap 10px.
* **Button 1 (Oben - E-Mail):**
  * Tag: `<a href="mailto:info@einwich-lottes.de" class="floating-btn mail-btn" aria-label="E-Mail schreiben">`
  * Styling: BxH `48px x 48px`, `border-radius: 8px`, Background `#0055A5`, Shadow `0 4px 12px rgba(0,0,0,0.2)`.
  * Icon: Inlined SVG Brief-Icon (`fill="#ffffff"`).
* **Button 2 (Unten - Anruf):**
  * Tag: `<a href="tel:095054503930" class="floating-btn phone-btn" aria-label="Jetzt anrufen">`
  * Styling: BxH `48px x 48px`, `border-radius: 8px`, Background `#16A34A`, Shadow `0 4px 12px rgba(0,0,0,0.2)`.
  * Icon: Inlined SVG Telefon-Icon (`fill="#ffffff"`).

### Sektion 4: Inhaltsbereich (Content Wrapper `max-width: 960px`)

#### 4.1 Überschrift: `<h2>Wer sind wir?</h2>`
* Border-bottom: `3px solid #E30613` (Akzent-Rot).
* **Textinhalt:** Vorstellung der Einwich & Lottes GmbH als traditionsreicher Meisterbetrieb für Sanitär, Heizung, Solar und Wartung aus Memmelsdorf (OT Kremmeldorf). Betreuung von Privat- und Gewerbekunden im gesamten Landkreis Bamberg.

#### 4.2 Überschrift: `<h2>Was machen wir?</h2>`
* **Layout:** Grid-System (`grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`, Gap 20px).
* **4 Flat-Cards (Weißer Hintergrund, subtle Border `#E2E8F0`, Radius 8px):**
  1. **Heizung:** Installation, Modernisierung, Wärmepumpen, Holz/Pellet & Gas.
  2. **Sanitär:** Traumbäder, Badsanierung, Barrierefreiheit, Trinkwasserhygiene.
  3. **Solar:** Solarthermie, zukunftssichere Heizungsunterstützung, Erneuerbare Energien.
  4. **Wartung:** Kundendienst, Überprüfung, Brenner-Service, Störungsbehebung.

#### 4.3 Überschrift: `<h2>Was bieten wir an?</h2>`
* **Layout:** Aufzählung / Service-Cards mit Checkmark-Vektorgrafik.
* **Punkte:**
  * **Vor-Ort-Beratung & Individuelle Planung:** Maßgeschneiderte Konzepte für Altbau und Neubau im Landkreis Bamberg.
  * **Schnelle Reaktionszeiten & Notdienst:** Zuverlässige Hilfe bei Heizungsausfall oder Rohrbruch.
  * **Transparente Angebote & Meisterqualität:** Einbau von Markenprodukten führender Hersteller.

#### 4.4 Überschrift: `<h2>Partner</h2>`
* **Text:** *"Wir setzen auf Qualität und arbeiten mit den führenden Herstellern der Branche zusammen:"*
* **Layout:** Flat Grid mit Marken-Namen / Logos (Viessmann, Buderus, Vaillant, Geberit, Grohe).

#### 4.5 Überschrift: `<h2>Google Bewertungen</h2>`
* **Hinweis:** Statisches HTML (DSGVO-sauber, kein externes Widget).
* **Layout:** Grid aus 2 Kundenstimmen-Karten.
* **Karten-Inhalt:**
  * 5 Sterne Icon-Reihe (`color: #FBC02D`).
  * Zitat-Text (z.B. *"Hervorragende Badsanierung! Saubere Arbeit, pünktlich und super freundliches Team."*).
  * Autorenschaft: *"Kunde aus Memmelsdorf"* / *"Hausbesitzer aus dem Landkreis Bamberg"*.

### Sektion 5: Footer
* **Styling:** Background `#0F172A`, Text `#94A3B8`, Padding 30px 20px, Text-align centered.
* **Inhalt:**
  * Adresse: Einwich & Lottes GmbH | Lange Straße 34 | 96117 Memmelsdorf (OT Kremmeldorf)
  * Kontakt: Tel: 09505 4503930 | E-Mail: info@einwich-lottes.de
  * Links: `<a href="impressum.html">Impressum</a>` | `<a href="datenschutz.html">Datenschutzerklärung</a>`

---

## 5. Spezifikation der Rechtsseiten

### 5.1 `impressum.html`
* **Titel:** Impressum | Einwich & Lottes GmbH
* **Struktur:** Clean HTML Page mit Link zurück zur Startseite (`<a href="index.html">← Zurück zur Startseite</a>`).
* **Pflichtangaben (§ 5 DDG):**
  * Diensteanbieter: Einwich & Lottes GmbH
  * Adresse: Lange Straße 34, 96117 Memmelsdorf (OT Kremmeldorf)
  * Vertretungsberechtigte Geschäftsführer: [Platzhalter: Vorname Nachname]
  * Kontakt: Telefon 09505 4503930, E-Mail info@einwich-lottes.de
  * Registereintrag: Registergericht Amtsgericht Bamberg, HRB-Nummer [Platzhalter]
  * Zuständige Kammer: Handwerkskammer Oberfranken
  * Berufsbezeichnung: Installateur- und Heizungsbauermeister (verliehen in Deutschland)
  * USt-IdNr.: [Platzhalter DE...]

### 5.2 `datenschutz.html`
* **Titel:** Datenschutzerklärung | Einwich & Lottes GmbH
* **Kernaussagen der Erklärung:**
  * Verantwortliche Stelle (Einwich & Lottes GmbH).
  * Hinweistext zur rein informatorischen Nutzung ohne Server-Log-Files / ohne Web-Analytics.
  * Kontaktaufnahme via E-Mail & Telefon (Verarbeitung gemäß Art. 6 Abs. 1 lit. b DSGVO zur Vertragserfüllung/Anfragebearbeitung).
  * Ausdrücklicher Hinweis: **Es werden keine Cookies, keine Tracking-Dienste und keine externen CDN-Ressourcen (wie Google Fonts) eingesetzt.**
  * Rechte der betroffenen Personen (Auskunft, Berichtigung, Löschung).

---

## 6. SEO & Technische Meta-Spezifikation

Der Agent muss folgende Meta-Tags in den `<head>` von `index.html` einbinden:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Einwich & Lottes GmbH | Heizung, Sanitär, Solar & Wartung Memmelsdorf / Bamberg</title>
<meta name="description" content="Ihr Meisterbetrieb für Heizung, Sanitär, Solar und Wartung in Memmelsdorf und dem gesamten Landkreis Bamberg. Rufen Sie uns jetzt an: 09505 4503930!">
<meta name="keywords" content="Sanitär Bamberg, Heizung Memmelsdorf, Badsanierung Bamberg, Solarthermie Bamberg, Wärmepumpe Bamberg, Einwich Lottes">
<link rel="canonical" href="https://www.einwich-lottes.de/">

<!-- JSON-LD Structured Data (LocalBusiness) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "name": "Einwich & Lottes GmbH",
  "image": "https://www.einwich-lottes.de/assets/images/logo.png",
  "telephone": "+49-9505-4503930",
  "email": "info@einwich-lottes.de",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Lange Straße 34",
    "addressLocality": "Memmelsdorf",
    "addressRegion": "Bavaria",
    "postalCode": "96117",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.932,
    "longitude": 10.998
  },
  "areaServed": "Landkreis Bamberg",
  "priceRange": "$$"
}
</script>
```

---

## 7. Akzeptanzkriterien & Testing Checklist für den Agenten

Nach Erstellung des Codes muss der Coding Agent folgende Kriterien verifizieren:

* [ ] **W3C Validierung:** HTML5 und CSS3 fehlerfrei ohne Parsing-Errors.
* [ ] **Zero External Network Requests:** Beim Aufruf im Browser darf im Network-Tab KEINE Anfrage an externe Domains (Google, Cloudflare, etc.) stattfinden.
* [ ] **Responsive Breakpoints:**
  * `< 600px`: Einspaltiges Grid, Telefonbanner volle Breite, Floating-Buttons am rechten Rand gut erreichbar.
  * `600px - 1024px`: 2-spaltiges Grid für Leistungen und Bewertungen.
  * `> 1024px`: Maximale Inhaltsbreite 960px zentriert.
* [ ] **Click-to-Call Test:** Alle Telefon-Links müssen das Schema `href="tel:095054503930"` exakt aufweisen.
* [ ] **Mailto Test:** E-Mail-Links müssen `href="mailto:info@einwich-lottes.de"` aufweisen.
* [ ] **Accessibility (a11y):** Alle interaktiven Elemente besitzen entsprechende `aria-label` oder sichtbare Text-Labels. Ausreichender Farbkontrast (WCAG AA Standard).

---
*Ende der Anforderungsspezifikation.*
