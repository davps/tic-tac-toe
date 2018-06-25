import {
  PLACE_MOVE,
  RESET_GAME,
  placeMove,
  resetGame
} from '../actions/actions';
import reducer from './reducer';
import { MOVE } from '../config';

describe(PLACE_MOVE, () => {
  let initialState;
  let stateA;
  let stateB;
  let stateC;
  let stateD;
  let stateE;
  const topLeft = 0;
  const topMid = 1;
  const topRight = 2;
  //   const midLeft = 3;
  //   const mid = 4;
  //   const midRight = 5;
  const bottomLeft = 6;
  //   const bottomMid = 7;
  const bottomRight = 8;
  beforeEach(() => {
    initialState = reducer(undefined, {});
    stateA = reducer(initialState, placeMove(topLeft));
    stateB = reducer(stateA, placeMove(bottomLeft));
    stateC = reducer(stateB, placeMove(topMid));
    stateD = reducer(stateC, placeMove(bottomRight));
    stateE = reducer(stateD, placeMove(topRight));
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
