import MoveResolver from './MoveResolver';
import initialState from '../store/initialState';
import ACTOR from './ACTOR';

const { PLAYER_1, PENDING } = ACTOR;

// I didn't need extensive testing of MoveResolver because
// the reducer tests and the DSLtoRedux.adaptor.test.js does it well
it('smoke unit test to demostrate the usage of mock objects with dependency injection', () => {
  const ScriptMock = {
    updateMoves: () => {
      const moves = [...initialState.moves];
      moves[0] = PLAYER_1;
      return moves;
    },
    getNextPlayer: () => PLAYER_1
  };
  const GameOverDetectorMock = {
    isFull: () => false,
    detectWinner: () => ({ winner: null, winnerMoves: null })
  };

  const state = MoveResolver.reduce({
    state: initialState,
    position: 0,
    Script: ScriptMock,
    GameOverDetector: GameOverDetectorMock
  });

  expect(state).toEqual({
    isFull: false,
    moves: [
      PLAYER_1,
      PENDING,
      PENDING,
      PENDING,
      PENDING,
      PENDING,
      PENDING,
      PENDING,
      PENDING
    ],
    winner: null,
    winnerMoves: null,
    xIsNext: true
  });
});
