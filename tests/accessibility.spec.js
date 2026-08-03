import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Impressum', path: '/impressum.html' },
  { name: 'Datenschutz', path: '/datenschutz.html' },
];

test.describe('Accessibility (WCAG 2.1 AA)', () => {
  for (const { name, path } of pages) {
    test(`${name} should have no WCAG 2.1 AA violations`, async ({ page }) => {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      if (results.violations.length > 0) {
        const violationDetails = results.violations
          .map(v => `${v.id} (${v.impact}): ${v.description}\n  ${v.helpUrl}\n  Nodes: ${v.nodes.length}`)
          .join('\n\n');
        throw new Error(`Accessibility violations on ${name} (${path}):\n\n${violationDetails}`);
      }
    });
  }
});