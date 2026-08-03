import { test, expect, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const SCREENSHOTS_DIR = path.resolve(__dirname, '../screenshots');

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const pages = [
  { name: 'index', path: '/' },
  { name: 'impressum', path: '/impressum.html' },
  { name: 'datenschutz', path: '/datenschutz.html' },
];

const viewports = [
  { name: 'mobile', width: 375, height: 667 },      // iPhone SE / 8
  { name: 'mobile-lg', width: 414, height: 896 },   // iPhone 11/12/13 Pro Max
  { name: 'tablet', width: 768, height: 1024 },     // iPad
  { name: 'desktop', width: 1280, height: 800 },    // Standard laptop
  { name: 'desktop-lg', width: 1920, height: 1080 }, // Full HD
];

test.describe('Visual Screenshots', () => {
  for (const { name: pageName, path: pagePath } of pages) {
    for (const { name: vpName, width, height } of viewports) {
      test(`${pageName} @ ${vpName} (${width}x${height})`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: 'networkidle' });

        // Wait for fonts and images to load
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);

        // Take full-page screenshot
        const filename = `${pageName}-${vpName}.png`;
        const filepath = path.join(SCREENSHOTS_DIR, filename);

        await page.screenshot({
          path: filepath,
          fullPage: true,
        });

        // Verify screenshot was created
        expect(fs.existsSync(filepath)).toBeTruthy();
        const stats = fs.statSync(filepath);
        expect(stats.size).toBeGreaterThan(1000); // At least 1KB
      });
    }
  }
});