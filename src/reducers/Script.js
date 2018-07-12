import ACTOR from './ACTOR';

const { PLAYER_1, PLAYER_2 } = ACTOR;

const Script = {
  updateMoves: (moves, moveIdx, player) => {
    if (typeof moveIdx !== 'number' || moveIdx < 0 || moveIdx > 8) {
      throw new Error(`Invalid param moveIdx: ${moveIdx}`);
    }
    if (![PLAYER_1, PLAYER_2].includes(player)) {
      throw new Error(`Invalid player value: ${player}`);
    }
    const updatedMoves = [...moves];
    updatedMoves[moveIdx] = player;
    return updatedMoves;
  },

  getNextPlayer: xIsNext => (xIsNext ? PLAYER_2 : PLAYER_1)
};

export default Script;
