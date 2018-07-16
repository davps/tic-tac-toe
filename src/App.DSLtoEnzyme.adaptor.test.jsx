import React from 'react';
import { shallow, mount } from 'enzyme';
import { mountWithState } from 'enzyme-redux';
import App from './App';
import Square from './components/Square';
import ResetGame from './components/ResetGame';
import {
  EXPECT_A_WINNER,
  EXPECT_DRAW,
  EXPECT_GAME_OVER,
  EXPECT_GAME_NOT_OVER,
  EXPECT_TO_BE_WINNER,
  EXPECT_NOT_TO_BE_WINNER,
  EXPECT_IS_AVAILABLE,
  EXPECT_IS_NOT_AVAILABLE,
  START_NEW_GAME,
  EXPECT_HAS_MOVE
} from './DSL';
import { PLACE_MOVE, RESET_GAME, resetGame } from './actions/actions';
import store from './store/store';
import initialState from './store/initialState';
import WinnerName from './components/WinnerName';
import NextPlayerName from './components/NextPlayerName';
import ACTOR from './reducers/ACTOR';
import Board from './components/Board';
import testFeaturePlaceMove from './App.test.feature.placeMove';
import testResetGame from './App.test.feature.resetGame';
import testCalculateResults from './App.test.feature.calculateResults';

const { PLAYER_1, PLAYER_2, PENDING } = ACTOR;

/**
 * Smoke test
 * */
it('renders without crashing', () => {
  shallow(<App />);
});

/**
 * Tests from DSL
 */
const tests = [].concat(
  testFeaturePlaceMove,
  testResetGame,
  testCalculateResults
);

let game = mount(<App />);

tests.forEach(scenario => {
  it(scenario.name, () => {
    scenario.actions.forEach(action => {
      switch (action.type) {
        case PLACE_MOVE: {
          game
            .find(Square)
            .at(action.position)
            .find('button')
            .simulate('click');
          break;
        }

        case RESET_GAME: {
          game
            .find(ResetGame)
            .at(0)
            .find('button')
            .simulate('click');
          break;
        }

        case EXPECT_A_WINNER: {
          expect(
            game
              .find(WinnerName)
              .at(0)
              .find('.has-winner').length > 0
          ).toEqualBecause(true, action);
          break;
        }

        case EXPECT_DRAW: {
          expect(
            game
              .find(WinnerName)
              .at(0)
              .find('.has-no-winner').length > 0
          ).toEqualBecause(true, action);
          break;
        }

        case EXPECT_GAME_OVER: {
          expect(
            game
              .find(WinnerName)
              .at(0)
              .find('.game-over').length > 0
          ).toEqualBecause(true, action);
          break;
        }

        case EXPECT_GAME_NOT_OVER: {
          expect(
            game
              .find(NextPlayerName)
              .at(0)
              .find('.game-is-not-over').length > 0
          ).toEqualBecause(true, action);
          break;
        }

        case EXPECT_TO_BE_WINNER: {
          expect(
            game
              .find(WinnerName)
              .at(0)
              .find(`.has-winner .${action.player}`).length > 0
          ).toEqualBecause(true, action);
          break;
        }

        case EXPECT_NOT_TO_BE_WINNER: {
          const otherPlayer = action.player === PLAYER_1 ? PLAYER_2 : PLAYER_1;

          expect(
            game
              .find(WinnerName)
              .at(0)
              .find(`.has-winner .${otherPlayer}`).length > 0
          ).toEqualBecause(true, action);
          break;
        }

        case EXPECT_IS_AVAILABLE: {
          expect(
            game
              .find(Board)
              .find(`Square.square-${action.position}`)
              .prop('owner')
          ).toEqualBecause(PENDING, action);
          break;
        }

        case EXPECT_IS_NOT_AVAILABLE: {
          expect(
            game.find(Board).find(`button.square-${action.position}`).length
          ).toEqualBecause(0, action);
          break;
        }

        case START_NEW_GAME: {
          store.dispatch(resetGame());
          game = mountWithState(<App />, initialState);
          break;
        }

        case EXPECT_HAS_MOVE: {
          const square = game
            .find(Board)
            .find(`svg.square-${action.position}.${action.player}`);
          expect(square.length > 0).toEqualBecause(true, action);
          break;
        }

        default:
          break;
      } // switch
    }); // scenario.actions.forEach
  }); // it()
});
