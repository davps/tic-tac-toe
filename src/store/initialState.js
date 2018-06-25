import { MOVE } from '../config';
/**
 * Initial state of the app, used to initialize and reset the game
 */
const initialState = {
  xIsNext: false,
  winner: null,
  isFull: false,
  moves: [
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val
  ]
};

export default initialState;
