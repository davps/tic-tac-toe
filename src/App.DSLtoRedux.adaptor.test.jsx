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
  EXPECT_NOT_TO_BE_WINNER,
  EXPECT_IS_AVAILABLE,
  START_NEW_GAME,
  EXPECT_IS_NOT_AVAILABLE,
  EXPECT_HAS_MOVE
} from './DSL';
import store from './store/store';
import testFeaturePlaceMove from './App.test.feature.placeMove';
import testResetGame from './App.test.feature.resetGame';
import testCalculateResults from './App.test.feature.calculateResults';

import {
  PLACE_MOVE,
  RESET_GAME,
  placeMove,
  resetGame
} from './actions/actions';
import initialState from './store/initialState';
import ACTOR from './reducers/ACTOR';

const { PENDING } = ACTOR;

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

const tests = [].concat(
  testFeaturePlaceMove,
  testResetGame,
  testCalculateResults
);

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

        case EXPECT_IS_AVAILABLE: {
          expect(store.getState().moves[action.position]).toBe(PENDING);
          break;
        }

        case EXPECT_IS_NOT_AVAILABLE: {
          expect(store.getState().moves[action.position]).not.toBe(PENDING);
          break;
        }

        case START_NEW_GAME: {
          store.dispatch(resetGame());
          break;
        }

        case EXPECT_HAS_MOVE: {
          expect(store.getState().moves[action.position]).toBe(action.player);
          break;
        }

        default:
          break;
      }
    });
  });
});
