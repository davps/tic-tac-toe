/**
 * Here I assume store.dispatch is synchronous and
 * no other enhancers are modifying it to make it
 * asynchronous.
 * In case that happens, I should modify this implementation
 * to handle the asynchronous calls (using store.subscribe and
 * may be await/async).
 * I keep it in this way for simplicity of the code.
 */

import {
  EXPECT_A_WINNER,
  EXPECT_DRAW,
  EXPECT_GAME_OVER,
  EXPECT_GAME_NOT_OVER,
  EXPECT_TO_BE_WINNER,
  EXPECT_NOT_TO_BE_WINNER
} from './DSL';
import tests from './App.testsWithDSL';
import store from './store/store';

import {
  PLACE_MOVE,
  RESET_GAME,
  placeMove,
  resetGame
} from './actions/actions';
import initialState from './store/initialState';

/**
 * Smoke test
 * */
it('run without crashing', () => {
  const state = store.getState();
  expect(state).toBeDefined();
  expect(state).toEqual(initialState);
});

/**
 * Tests from DSL
 */
tests.forEach(scenario => {
  it(scenario.name, () => {
    scenario.actions.forEach(action => {
      switch (action.type) {
        case PLACE_MOVE: {
          store.dispatch(placeMove(action.position));
          break;
        }

        case RESET_GAME: {
          store.dispatch(resetGame());
          break;
        }

        case EXPECT_A_WINNER: {
          expect(store.getState().winner).toBeDefined();
          break;
        }

        case EXPECT_DRAW: {
          expect(store.getState().winner).toBeNull();
          expect(store.getState().isFull).toBe(true);
          break;
        }

        case EXPECT_GAME_OVER: {
          const state = store.getState();
          expect(state.winner !== null || state.isFull).toBe(true);
          break;
        }

        case EXPECT_GAME_NOT_OVER: {
          expect(store.getState().winner).toBeNull();
          expect(store.getState().isFull).toBe(false);
          break;
        }

        case EXPECT_TO_BE_WINNER: {
          expect(store.getState().winner).toEqual(action.player);
          break;
        }

        case EXPECT_NOT_TO_BE_WINNER: {
          expect(store.getState().winner).not.toEqual(action.player);
          break;
        }

        default:
          break;
      }
    });
  });
});
