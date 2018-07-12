import { POSITION } from '../constants';
import ACTOR from './ACTOR';

const { PENDING } = ACTOR;
const { TOP_LEFT, TOP_RIGHT, CENTER, BOTTOM_LEFT, BOTTOM_RIGHT } = POSITION;

const GameOverDetector = {
  isFull: moves => {
    const exists = moves.find(move => move === PENDING);
    return typeof exists === 'undefined';
  },

  detectWinner: moves => {
    for (let i = 0; i < 9; i += 3) {
      const col1 = moves[i + 0];
      const col2 = moves[i + 1];
      const col3 = moves[i + 2];
      if (col1 === col2 && col2 === col3 && col1 !== PENDING) {
        return { winner: col1, winnerMoves: [i, i + 1, i + 2] };
      }
    }
    for (let i = 0; i < 3; i += 1) {
      const row1 = moves[i + 0];
      const row2 = moves[i + 3];
      const row3 = moves[i + 6];
      if (row1 === row2 && row2 === row3 && row1 !== PENDING) {
        return { winner: row1, winnerMoves: [i, i + 3, i + 6] };
      }
    }

    const topLeft = moves[TOP_LEFT];
    const topRight = moves[TOP_RIGHT];
    const center = moves[CENTER];
    const bottomLeft = moves[BOTTOM_LEFT];
    const bottomRight = moves[BOTTOM_RIGHT];
    if (topLeft === center && center === bottomRight && topLeft !== PENDING) {
      return { winner: topLeft, winnerMoves: [TOP_LEFT, CENTER, BOTTOM_RIGHT] };
    }
    if (topRight === center && center === bottomLeft && topRight !== PENDING) {
      return {
        winner: topRight,
        winnerMoves: [TOP_RIGHT, CENTER, BOTTOM_LEFT]
      };
    }
    return { winner: null, winnerMoves: null };
  }
};

export default GameOverDetector;
