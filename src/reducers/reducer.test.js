import {
  PLACE_MOVE,
  RESET_GAME,
  placeMove,
  resetGame
} from '../actions/actions';
import reducer from './reducer';
import { POSITION } from '../constants';
import ACTOR from './ACTOR';

const { PLAYER_1, PLAYER_2 } = ACTOR;
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
    expect(initialState.moves.includes(PLAYER_1)).toBe(false);
    expect(initialState.moves.includes(PLAYER_2)).toBe(false);
  });
  it('game over', () => {
    expect(stateE.winner).toBe(PLAYER_1);
    expect(stateE.isFull).toBe(false);
  });

  it(RESET_GAME, () => {
    const state = reducer(stateE, resetGame());
    expect(state).toEqual(initialState);
  });
});
