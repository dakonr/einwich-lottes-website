import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const EMAIL = 'info@einwich-lottes.de';
const DOMAIN = 'einwich-lottes.de';
const USER = 'info';
const ENCODED_USER = '105,110,102,111';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Impressum', path: '/impressum.html' },
  { name: 'Datenschutz', path: '/datenschutz.html' },
];

test.describe('E-Mail-Obfuskation (data-c)', () => {
  for (const { name, path } of pages) {
    test(`${name}: data-c enthält encodierten User-Part und Domain-Part als Klartext`, async ({ page }) => {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });

      const links = page.locator('a[data-c]');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const raw = await links.nth(i).getAttribute('data-c');
        expect(raw).toBeTruthy();

        const at = raw.indexOf('@');
        expect(at, `data-c="${raw}" enthält kein @`).toBeGreaterThan(-1);

        const encodedUser = raw.slice(0, at);
        const domain = raw.slice(at + 1);

        // User-Part: nur Ziffern und Kommas (encodierte Zeichencodes)
        expect(encodedUser, `User-Part von "${raw}" ist nicht encodiert`).toMatch(/^[0-9,]+$/);
        // Domain-Part: Klartext
        expect(domain, `Domain-Part von "${raw}" ist nicht Klartext`).toBe(DOMAIN);

        // Encodierter User-Part dekodiert zum erwarteten lokalen Teil
        const decodedUser = encodedUser.split(',').map(c => String.fromCharCode(Number(c))).join('');
        expect(decodedUser).toBe(USER);
      }
    });

    test(`${name}: alle data-c Links dekodieren zu mailto:${EMAIL}`, async ({ page }) => {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });

      const links = page.locator('a[data-c]');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count; i++) {
        const link = links.nth(i);

        // Vor Interaktion: href ist noch Platzhalter
        await expect(link).toHaveAttribute('href', '#');

        // Dekodierung über mouseenter auslösen
        await link.hover();

        await expect(link, `Link ${i} auf ${path} dekodiert nicht korrekt`)
          .toHaveAttribute('href', `mailto:${EMAIL}`);

        // Text-Links (ohne Icon-SVG) zeigen danach die volle Adresse
        const hasSvg = await link.locator('svg').count();
        if (hasSvg === 0) {
          await expect(link).toHaveText(EMAIL);
        }
      }
    });
  }

  test('encodierter User-Part entspricht dem erwarteten Zeichencode-Muster', async () => {
    const expected = Array.from(USER).map(ch => ch.charCodeAt(0)).join(',');
    expect(ENCODED_USER).toBe(expected);
  });
});
