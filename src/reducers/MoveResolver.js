const MoveResolver = {
  reduce: ({ state, position, Script, GameOverDetector }) => {
    const { moves, xIsNext } = state;
    const player = Script.getNextPlayer(xIsNext);
    const updatedMoves = Script.updateMoves(moves, position, player);
    const isFull = GameOverDetector.isFull(updatedMoves);
    const { winner, winnerMoves } = GameOverDetector.detectWinner(updatedMoves);

    return {
      ...state,
      moves: updatedMoves,
      xIsNext: !xIsNext,
      winner,
      winnerMoves,
      isFull
    };
  }
};

export default MoveResolver;
