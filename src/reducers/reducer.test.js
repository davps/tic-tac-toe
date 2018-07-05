import {
  PLACE_MOVE,
  RESET_GAME,
  placeMove,
  resetGame
} from '../actions/actions';
import reducer from './reducer';
import { MOVE, POSITION } from '../constants';

const { TOP_LEFT, TOP_CENTER, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT } = POSITION;

describe(PLACE_MOVE, () => {
  let initialState;
  let stateA;
  let stateB;
  let stateC;
  let stateD;
  let stateE;
  beforeEach(() => {
    initialState = reducer(undefined, {});
    stateA = reducer(initialState, placeMove(TOP_LEFT));
    stateB = reducer(stateA, placeMove(BOTTOM_LEFT));
    stateC = reducer(stateB, placeMove(TOP_CENTER));
    stateD = reducer(stateC, placeMove(BOTTOM_RIGHT));
    stateE = reducer(stateD, placeMove(TOP_RIGHT));
  });
  it('initial state', () => {
    expect(initialState).not.toBeNull();
    expect(initialState).toBeDefined();
    expect(initialState.moves.includes(MOVE.PLAYER_1.val)).toBe(false);
    expect(initialState.moves.includes(MOVE.PLAYER_2.val)).toBe(false);
  });
  it('game over', () => {
    expect(stateE.winner).toBe(MOVE.PLAYER_1.val);
    expect(stateE.isFull).toBe(false);
  });

  it(RESET_GAME, () => {
    const state = reducer(stateE, resetGame());
    expect(state).toEqual(initialState);
  });
});
