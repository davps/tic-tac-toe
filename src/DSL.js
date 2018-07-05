/**
 * My Domain Specific Language (DSLs) for Tic Tac Toe.
 *
 * Used to describe the tests. An usage example could be found
 * on the Tests.DSL.js file.
 *
 * How to use it: Use this DSL to describe the behaviour
 * of the app, which could be useful for integration or for
 * end to end tests. It was not designed to write unit tests.
 *
 * How it works: This file generates a JSON file describing
 * what tests needs to be done.
 * Then I have two diferent adaptors, for enzime and for
 * puppeteer to run the JSON that was generated from the DSL.
 * All methods from here are synchronous. The asynchronous nature of
 * some actions are implementation details of the adaptors, not
 * a concern of my DSL.
 *
 * Advantages: DRY. I write tests once, and run it on different
 * ways (with or without a headless browser, etc). In the future I
 * can just add another adaptor if required (for reducers, for other
 * headless browsers, etc) and run all my test suites on it.
 */

import { placeMove, resetGame } from './actions/actions';

/*
 * Expectation types
 */
export const EXPECT_A_WINNER = 'EXPECT_A_WINNER';
export const EXPECT_DRAW = 'EXPECT_DRAW';
export const EXPECT_GAME_OVER = 'EXPECT_GAME_OVER';
export const EXPECT_GAME_NOT_OVER = 'EXPECT_GAME_NOT_OVER';
export const EXPECT_TO_BE_WINNER = 'EXPECT_TO_BE_WINNER';
export const EXPECT_NOT_TO_BE_WINNER = 'EXPECT_NOT_TO_BE_WINNER';

/*
 * Expectation creators
 */
const expect = {
  aWinner: () => ({
    type: EXPECT_A_WINNER
  }),

  draw: () => ({
    type: EXPECT_DRAW
  }),

  gameOver: () => ({
    type: EXPECT_GAME_OVER
  }),

  gameNotOver: () => ({
    type: EXPECT_GAME_NOT_OVER
  }),

  notToBeWinner: player => ({
    type: EXPECT_NOT_TO_BE_WINNER,
    player
  }),

  toBeWinner: player => ({
    type: EXPECT_TO_BE_WINNER,
    player
  })
};

const actionsByScenario = [];
let currentScenario = null;
const findScenario = scenarioName =>
  actionsByScenario.find(item => item.name === scenarioName);

export const Scenario = name => {
  if (!name) {
    throw new Error('The scenario must have a name');
  }

  if (!findScenario(name)) {
    actionsByScenario.push({
      name,
      actions: []
    });
  }

  currentScenario = name;
};

export const createTestDescription = () => {
  const dispatch = action => {
    if (currentScenario === null) {
      throw new Error(
        'You must define a scenario before taking an action ( before using I.method() )'
      );
    }
    const scenario = findScenario(currentScenario);
    if (!scenario) {
      throw new Error('It is always expected to get an object here');
    }
    scenario.actions.push(action);
    currentScenario = scenario.name;
  };

  const descriptors = {
    placeMove: position => dispatch(placeMove(position)),
    resetGame: () => dispatch(resetGame()),
    expect: player => ({
      aWinner: () => dispatch(expect.aWinner()),
      draw: () => dispatch(expect.draw()),
      gameOver: () => dispatch(expect.gameOver()),
      gameNotOver: () => dispatch(expect.gameNotOver()),
      toBeWinner: () => dispatch(expect.toBeWinner(player)),
      notToBeWinner: () => dispatch(expect.notToBeWinner(player))
    }),
    getMyTestDescription: () => [...actionsByScenario]
  };

  return descriptors;
};

export const I = createTestDescription();
