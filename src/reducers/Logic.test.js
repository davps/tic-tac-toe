import Logic from './Logic';
import { MOVE } from '../constants';

it('the board is full', () => {
  const moves = [
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val
  ];
  expect(Logic.isFull(moves)).toBe(true);
});

it('the board is not full', () => {
  const moves = [
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PENDING.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val
  ];
  expect(Logic.isFull(moves)).toBe(false);
});

it('the game has a winner', () => {
  const moves1 = [
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_1.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val
  ];

  expect(Logic.getWinner(moves1)).toEqual({
    winner: MOVE.PLAYER_1.val,
    winnerMoves: [0, 1, 2]
  });

  const moves2 = [
    MOVE.PLAYER_1.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PLAYER_1.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PLAYER_1.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val
  ];
  expect(Logic.getWinner(moves2)).toEqual({
    winner: MOVE.PLAYER_1.val,
    winnerMoves: [0, 3, 6]
  });

  const moves3 = [
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PLAYER_2.val,
    MOVE.PENDING.val,
    MOVE.PLAYER_2.val,
    MOVE.PENDING.val,
    MOVE.PLAYER_2.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val
  ];

  expect(Logic.getWinner(moves3)).toEqual({
    winner: MOVE.PLAYER_2.val,
    winnerMoves: [2, 4, 6]
  });

  const moves4 = [
    MOVE.PLAYER_1.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PLAYER_1.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PLAYER_1.val
  ];

  expect(Logic.getWinner(moves4)).toEqual({
    winner: MOVE.PLAYER_1.val,
    winnerMoves: [0, 4, 8]
  });
});

it('the game has no winner', () => {
  const moves = [
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PLAYER_1.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PLAYER_2.val,
    MOVE.PENDING.val
  ];

  expect(Logic.getWinner(moves)).toEqual({
    winner: null,
    winnerMoves: null
  });
});

it('place a move on the board', () => {
  const moves = [
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val
  ];
  const updatedMoves = [
    MOVE.PLAYER_1.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val
  ];
  expect(Logic.updateMoves(moves, 0, MOVE.PLAYER_1.val)).toEqual(updatedMoves);
});

it('updateMoves with invalid arguments', () => {
  const moves = [];
  const moveIdx = 10;
  const player = MOVE.PLAYER_1.val;

  expect(() => {
    Logic.updateMoves(moves, moveIdx, player);
  }).toThrow();

  expect(() => {
    Logic.updateMoves(moves, -moveIdx, player);
  }).toThrow();

  expect(() => {
    Logic.updateMoves(moves, 0, null);
  }).toThrow();
});
