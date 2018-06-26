/**
 * @jest-environment node
 */

import puppeteer from 'puppeteer';
import { setup, teardownDevServer } from 'jest-dev-server';

const timeout = 60000;
const url = 'http://localhost:3006/';

describe('e2e tests', () => {
  let page;
  let browser;
  beforeAll(async () => {
    if (!process.env.CI) {
      return;
    }

    await setup({
      command: `PORT=3006 npm run start`,
      launchTimeout: 50000,
      port: 3006
    });

    /* args are supplied to avoid issues in Travis CI to launch chromium:
         https://github.com/GoogleChrome/puppeteer/issues/807 */
    browser = await puppeteer.launch({
      headless: true,
      // slowMo: 100,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    page = await browser.newPage();
    await page.goto(url);
  }, timeout);

  it('should have a winner with the right moves', async () => {
    if (!process.env.CI) {
      return;
    }
    expect(true).toBe(true);
    await page.waitForSelector('.square');
    await page.click('.square-0');
    await page.click('.square-8');
    await page.click('.square-1');
    await page.click('.square-7');
    await page.click('.square-2');
    await page.waitForSelector('.has-winner');

    await page.click('.play-again');
    await page.click('.square-0');
    await page.click('.square-8');
    await page.click('.square-2');
    await page.click('.square-1');
    await page.click('.square-3');
    await page.click('.square-4');
    await page.click('.square-7');
    await page.click('.square-6');
    await page.click('.square-5');
    await page.waitForSelector('.has-no-winner');
  });

  afterAll(async () => {
    if (!process.env.CI) {
      return;
    }
    await browser.close();
    await teardownDevServer();
  });
});
