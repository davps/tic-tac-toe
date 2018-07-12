import ACTOR from '../reducers/ACTOR';

const { PENDING } = ACTOR;

/**
 * Initial state of the app, used to initialize and reset the game
 */
const initialState = {
  xIsNext: false,
  winner: null,
  isFull: false,
  winnerMoves: null,
  moves: [
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING
  ]
};

export default initialState;
