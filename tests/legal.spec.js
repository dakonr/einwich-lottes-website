import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const EMAIL = 'info@einwich-lottes.de';
const TEL_DISPLAY = '09505 4503930';
const TEL_HREF = 'tel:095054503930';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Impressum', path: '/impressum.html' },
  { name: 'Datenschutz', path: '/datenschutz.html' },
];

const requiredLegalLinks = [
  { href: 'impressum.html', label: 'Impressum' },
  { href: 'datenschutz.html', label: 'Datenschutzerklärung' },
];

test.describe('Rechtliche Angaben', () => {
  test.describe('Impressum-Inhalt (manuell geprüfte Daten, jetzt automatisiert)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/impressum.html`, { waitUntil: 'networkidle' });
    });

    test('Seite lädt mit korrektem Titel und Überschrift', async ({ page }) => {
      await expect(page).toHaveTitle(/Impressum/);
      await expect(page.getByRole('heading', { name: 'Impressum', exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Angaben gemäß § 5 DDG' })).toBeVisible();
    });

    test('enthält Firmenname und vollständige Anschrift', async ({ page }) => {
      const body = page.locator('body');
      await expect(body).toContainText('Einwich & Lottes GmbH');
      await expect(body).toContainText('Lange Straße 34');
      await expect(body).toContainText('96117 Memmelsdorf (OT Kremmeldorf)');
      await expect(body).toContainText('Deutschland');
    });

    test('enthält Kontaktdaten: Telefon (klickbar) und E-Mail (dekodiert)', async ({ page }) => {
      const tel = page.locator(`a[href="${TEL_HREF}"]`);
      await expect(tel).toBeVisible();
      await expect(tel).toHaveText(TEL_DISPLAY);

      const mail = page.locator('a[data-c]');
      await expect(mail).toHaveCount(1);
      await mail.hover();
      await expect(mail).toHaveAttribute('href', `mailto:${EMAIL}`);
    });

    test('enthält vertretungsberechtigte Geschäftsführer', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Vertretungsberechtigte Geschäftsführer' })).toBeVisible();
      await expect(page.locator('body')).toContainText('Patrick Einwich, Alexander Lottes');
    });

    test('enthält Registereintrag (Registergericht + HRB-Nummer)', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Registereintrag' })).toBeVisible();
      await expect(page.locator('body')).toContainText('Amtsgericht Bamberg');
      await expect(page.locator('body')).toContainText('HRB 11512');
    });

    test('enthält zuständige Kammer und Betriebsnummer', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Zuständige Kammer' })).toBeVisible();
      await expect(page.locator('body')).toContainText('Handwerkskammer Oberfranken');
      await expect(page.locator('body')).toContainText('Betriebsnummer: 3039281');
    });

    test('enthält Berufsbezeichnung', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Berufsbezeichnung' })).toBeVisible();
      await expect(page.locator('body')).toContainText('Installateur- und Heizungsbauermeister');
    });

    test('enthält Umsatzsteuer-Identifikationsnummer', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Umsatzsteuer-Identifikationsnummer' })).toBeVisible();
      await expect(page.locator('body')).toContainText('USt-IdNr.: DE366642580');
    });

    test('enthält Erklärung zur Verbraucherstreitbeilegung', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Verbraucherstreitbeilegung / Universalschlichtungsstelle' })).toBeVisible();
      await expect(page.locator('body')).toContainText('nicht bereit und nicht verpflichtet');
    });
  });

  test.describe('Rechtliche Links auf allen Seiten', () => {
    for (const { name, path } of pages) {
      test(`${name}: Links zu Impressum und Datenschutzerklärung vorhanden`, async ({ page }) => {
        await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });

        const nav = page.locator('nav[aria-label="Rechtliche Links"]');
        await expect(nav).toBeVisible();

        for (const { href, label } of requiredLegalLinks) {
          const link = nav.locator(`a[href="${href}"]`);
          await expect(link, `${path} fehlt Link "${label}" (${href})`).toHaveCount(1);
          await expect(link).toHaveText(label);
        }
      });
    }
  });
});
