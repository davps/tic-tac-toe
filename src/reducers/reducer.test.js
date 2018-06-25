import { PLACE_MOVE, RESET_GAME } from '../actions/actions';
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
    stateA = reducer(initialState, { type: PLACE_MOVE, position: topLeft });
    stateB = reducer(stateA, { type: PLACE_MOVE, position: bottomLeft });
    stateC = reducer(stateB, { type: PLACE_MOVE, position: topMid });
    stateD = reducer(stateC, { type: PLACE_MOVE, position: bottomRight });
    stateE = reducer(stateD, { type: PLACE_MOVE, position: topRight });
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
    const state = reducer(stateE, { type: RESET_GAME });
    expect(state).toEqual(initialState);
  });
});
