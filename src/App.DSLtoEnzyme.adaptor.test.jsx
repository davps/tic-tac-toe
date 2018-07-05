import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Square from './components/Square';
import ResetGame from './components/ResetGame';
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
import WinnerName from './components/WinnerName';
import NextPlayerName from './components/NextPlayerName';
import tests from './App.testsWithDSL';

/**
 * Smoke test
 * */
it('renders without crashing', () => {
  shallow(<App />);
});

/**
 * Tests from DSL
 */
const game = mount(<App />);

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
              .find('.has-winner').length
          ).toBeGreaterThan(0);
          break;
        }

        case EXPECT_DRAW: {
          expect(
            game
              .find(WinnerName)
              .at(0)
              .find('.has-no-winner').length
          ).toBeGreaterThan(0);
          break;
        }

        case EXPECT_GAME_OVER: {
          expect(
            game
              .find(WinnerName)
              .at(0)
              .find('.game-over').length
          ).toBeGreaterThan(0);
          break;
        }

        case EXPECT_GAME_NOT_OVER: {
          expect(
            game
              .find(NextPlayerName)
              .at(0)
              .find('.game-is-not-over').length
          ).toBeGreaterThan(0);
          break;
        }

        case EXPECT_TO_BE_WINNER: {
          expect(
            game
              .find(WinnerName)
              .at(0)
              .find(`.has-winner .${action.player}`).length
          ).toBeGreaterThan(0);
          break;
        }

        case EXPECT_NOT_TO_BE_WINNER: {
          const otherPlayer =
            action.player === MOVE.PLAYER_1.val
              ? MOVE.PLAYER_2.val
              : MOVE.PLAYER_1.val;

          expect(
            game
              .find(WinnerName)
              .at(0)
              .find(`.has-winner .${otherPlayer}`).length
          ).toBeGreaterThan(0);
          break;
        }

        default:
          break;
      } // switch
    }); // scenario.actions.forEach
  }); // it()
});
