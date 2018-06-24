import { MOVE } from '../config';

const Logic = {
  togglePlayer: toggle => !toggle,

  hasWinner: (moves, actualPlayer) => {
    for (let i = 0; i < 9; i += 3) {
      const col1 = moves[i + 0];
      const col2 = moves[i + 1];
      const col3 = moves[i + 2];
      if (col1 === col2 && col2 === col3 && col1 !== MOVE.PENDING.val) {
        return actualPlayer;
      }
    }
    for (let i = 0; i < 3; i += 1) {
      const row1 = moves[i + 0];
      const row2 = moves[i + 3];
      const row3 = moves[i + 6];
      if (row1 === row2 && row2 === row3 && row1 !== MOVE.PENDING.val) {
        return actualPlayer;
      }
    }
    const topLeft = moves[0];
    const topRight = moves[2];
    const center = moves[4];
    const bottomLeft = moves[6];
    const bottomRight = moves[8];
    if (
      topLeft === center &&
      center === bottomRight &&
      topLeft !== MOVE.PENDING.val
    ) {
      return actualPlayer;
    }
    if (
      topRight === center &&
      center === bottomLeft &&
      topRight !== MOVE.PENDING.val
    ) {
      return actualPlayer;
    }
    return null;
  },

  isFull: moves => {
    const exists = moves.find(move => move === MOVE.PENDING.val);
    return typeof exists === 'undefined';
  },

  updateMoves: (moves, moveIdx, player) => {
    if (typeof moveIdx !== 'number' && moveIdx < 0 && moveIdx > 8) {
      throw new Error(`Invalid param moveIdx: ${moveIdx}`);
    }
    if (player !== MOVE.PLAYER_1.val && player !== MOVE.PLAYER_2.val) {
      throw new Error(`Invalid player value: ${player}`);
    }
    const updatedMoves = [...moves];
    updatedMoves[moveIdx] = player;
    return updatedMoves;
  }
};

export default Logic;
