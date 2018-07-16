/**
 * My Domain Specific Language (DSLs) for Tic Tac Toe.
 *
 * Used to describe the tests. An usage example could be found
 * on the App.testsWithDSL.js file.
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
export const EXPECT_IS_AVAILABLE = 'EXPECT_IS_AVAILABLE';
export const EXPECT_IS_NOT_AVAILABLE = 'EXPECT_IS_NOT_AVAILABLE';
export const START_NEW_GAME = 'START_NEW_GAME';
export const EXPECT_HAS_MOVE = 'EXPECT_HAS_MOVE';

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
  }),
  isAvailable: position => ({
    type: EXPECT_IS_AVAILABLE,
    position
  }),
  isNotAvailable: position => ({
    type: EXPECT_IS_NOT_AVAILABLE,
    position
  }),
  hasMove: (position, player) => ({
    type: EXPECT_HAS_MOVE,
    position,
    player
  })
};

const nonReduxActionCreators = {
  startNewGame: () => ({
    type: START_NEW_GAME
  })
};

/**
 * Use symbols to create (sort of) private methods
 * because I want to expose only some methods which helps to
 * easily change the internals in the future
 */
const createDescriptor = Symbol('createDescriptor');
const findScenario = Symbol('findScenario');

class DSL {
  constructor() {
    this.actionsByScenario = [];
    this.currentScenario = null;

    this.Scenario = name => {
      if (!name) {
        throw new Error('The scenario must have a name');
      }

      if (this[findScenario](name)) {
        throw new Error('Cannot repeat the same scenario twice.');
      }

      this.actionsByScenario.push({
        name,
        actions: []
      });

      this.currentScenario = name;
    };

    this.I = this[createDescriptor]();

    this[findScenario] = this[findScenario].bind(this);
    this[createDescriptor] = this[createDescriptor].bind(this);
    this.toJSON = this.toJSON.bind(this);
  }

  toJSON() {
    return JSON.parse(JSON.stringify(this.actionsByScenario));
  }

  [findScenario](scenarioName) {
    return this.actionsByScenario.find(item => item.name === scenarioName);
  }

  [createDescriptor]() {
    const dispatch = action => {
      if (this.currentScenario === null) {
        throw new Error(
          'You must define a scenario before taking an action ( before using I.method() )'
        );
      }
      const scenario = this[findScenario](this.currentScenario);
      // commented this block of code because (in theory)
      // my code will never pass this condition (unreachable code)
      // if (!scenario) {
      //   throw new Error('It is always expected to get an object here');
      // }
      scenario.actions.push(action);
      this.currentScenario = scenario.name;
    };

    const descriptors = {
      placeMove: position => dispatch(placeMove(position)),
      resetGame: () => dispatch(resetGame()),
      startNewGame: () => dispatch(nonReduxActionCreators.startNewGame()),
      expect: arg => ({
        aWinner: () => dispatch(expect.aWinner()),
        draw: () => dispatch(expect.draw()),
        gameOver: () => dispatch(expect.gameOver()),
        gameNotOver: () => dispatch(expect.gameNotOver()),
        toBeWinner: () => dispatch(expect.toBeWinner(arg)),
        notToBeWinner: () => dispatch(expect.notToBeWinner(arg)),
        isAvailable: () => dispatch(expect.isAvailable(arg)),
        isNotAvailable: () => dispatch(expect.isNotAvailable(arg)),
        hasMove: player => dispatch(expect.hasMove(arg, player))
      })
    };

    return descriptors;
  }
}

export default DSL;
