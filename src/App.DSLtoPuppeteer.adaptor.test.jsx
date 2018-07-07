/**
 * @jest-environment node
 */

import puppeteer from 'puppeteer';
import { setup, teardown } from 'jest-dev-server';
import {
  EXPECT_A_WINNER,
  EXPECT_DRAW,
  EXPECT_GAME_OVER,
  EXPECT_GAME_NOT_OVER,
  EXPECT_TO_BE_WINNER,
  EXPECT_NOT_TO_BE_WINNER
} from './DSL';
import { MOVE } from './constants';
import { PLACE_MOVE, RESET_GAME } from './actions/actions';
import tests from './App.testsWithDSL';

const timeout = 60000;
const port = 3000;
const url = `http://localhost:${port}/`;

// server start only on Travis because it is slow on
// my local dev environment. Instead, I just have
// the server running manually on the terminal
const startServer = process.env.CI;

describe('e2e tests', () => {
  let page;
  let browser;
  beforeAll(async () => {
    if (startServer) {
      /*
       * If the port is being used on my dev environment
       * (due to a unsuccessfull teardown or something) then
       * I can kill the process from the terminal with these steps:
       * 1- Get the PID of the node server running on the port
       * $ sudo lsof -i tcp:3000
       * 2- Use that PID obtained from the previous command 
       * to run this command:
       * $ sudo kill -9 34424
       * (on the above example the PID is 34424)
       */
      await setup({
        command: `PORT=${port} npm run start`,
        launchTimeout: 50000,
        port
      });
    }

    /**
     * TODO: Instal Redux DevTool chrome extension for the headless chrome with these steps:
     * 1- Add more arguments to puppeteer.lauch (below):
        '--disable-extensions-except=/path/to/extension/',
        '--load-extension=/path/to/extension/'
     * https://github.com/GoogleChrome/puppeteer/blob/master/examples/README.md#load-a-chrome-extension
     * 
     * 2- Programmatically, before launching chrome, check if the crx extension 
     * file exist on the disk and if it did not, then downlaod it from the store 
     * with the instructions provided here:
     * https://stackoverflow.com/a/14099762
     * (probably I will need to retrive my chrome version programmatically too)
     * 
     * Why?: I need to to resemble my original dev environment and to 
     * have full tests coverage (100%) 
     * (see store.js, line 8 https://coveralls.io/builds/17849136/source?filename=src/store/store.js#L8).
     */

    /* args --no-sandbox and --disable-setuid-sandbox are supplied 
         to avoid issues in Travis CI to launch chromium:
         https://github.com/GoogleChrome/puppeteer/issues/807 */
    browser = await puppeteer.launch({
      headless: true, // sometimes I manually toggle this value on my dev environment
      slowMo: 0,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    page = await browser.newPage();
    await page.goto(url);
  }, timeout);

  it('smoke tests', async () => {
    await page.waitForSelector('.square');
  });

  tests.forEach(scenario => {
    it(scenario.name, async () => {
      // disabled the linter below because I really need to await
      // inside the loop, I didn't find a better way right now

      /* eslint-disable no-restricted-syntax */
      /* eslint-disable no-await-in-loop */
      for (const action of scenario.actions) {
        switch (action.type) {
          case PLACE_MOVE: {
            await page.click(`.square-${action.position}`);
            break;
          }

          case RESET_GAME: {
            await page.click('.play-again');
            break;
          }

          case EXPECT_A_WINNER: {
            await page.waitForSelector('.has-winner');
            break;
          }

          case EXPECT_DRAW: {
            await page.waitForSelector('.has-no-winner');
            break;
          }

          case EXPECT_GAME_OVER: {
            await page.waitForSelector('.game-over');
            break;
          }

          case EXPECT_GAME_NOT_OVER: {
            await page.waitForSelector('.game-is-not-over');
            break;
          }

          case EXPECT_TO_BE_WINNER: {
            await page.waitForSelector(`.has-winner .${action.player}`);
            break;
          }

          case EXPECT_NOT_TO_BE_WINNER: {
            const otherPlayer =
              action.player === MOVE.PLAYER_1.val
                ? MOVE.PLAYER_2.val
                : MOVE.PLAYER_1.val;
            await page.waitForSelector(`.has-winner .${otherPlayer}`);
            break;
          }

          default: {
            break;
          }
        }
      }
      /* eslint-enable */
    });
  });

  afterAll(async () => {
    await browser.close();
    if (startServer) {
      await teardown();
    }
  });
});