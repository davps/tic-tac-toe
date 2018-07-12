import ACTOR from './ACTOR';
import { POSITION } from '../constants';
import GameOverDetector from './GameOverDetector';

const { PLAYER_1, PLAYER_2, PENDING } = ACTOR;

const {
  TOP_LEFT,
  TOP_CENTER,
  TOP_RIGHT,
  MIDDLE_LEFT,
  CENTER,
  BOTTOM_LEFT,
  BOTTOM_RIGHT
} = POSITION;

it('the board is full', () => {
  const moves = [
    PLAYER_1,
    PLAYER_1,
    PLAYER_1,
    PLAYER_1,
    PLAYER_1,
    PLAYER_1,
    PLAYER_1,
    PLAYER_1,
    PLAYER_1
  ];
  expect(GameOverDetector.isFull(moves)).toBe(true);
});

it('the board is not full', () => {
  const moves = [
    PLAYER_1,
    PLAYER_1,
    PLAYER_1,
    PLAYER_1,
    PENDING,
    PLAYER_1,
    PLAYER_1,
    PLAYER_1,
    PLAYER_1
  ];
  expect(GameOverDetector.isFull(moves)).toBe(false);
});

it('the game has a winner', () => {
  const moves1 = [
    PLAYER_1,
    PLAYER_1,
    PLAYER_1,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING
  ];

  expect(GameOverDetector.detectWinner(moves1)).toEqual({
    winner: PLAYER_1,
    winnerMoves: [TOP_LEFT, TOP_CENTER, TOP_RIGHT]
  });

  const moves2 = [
    PLAYER_1,
    PENDING,
    PENDING,
    PLAYER_1,
    PENDING,
    PENDING,
    PLAYER_1,
    PENDING,
    PENDING
  ];

  expect(GameOverDetector.detectWinner(moves2)).toEqual({
    winner: PLAYER_1,
    winnerMoves: [TOP_LEFT, MIDDLE_LEFT, BOTTOM_LEFT]
  });

  const moves3 = [
    PENDING,
    PENDING,
    PLAYER_2,
    PENDING,
    PLAYER_2,
    PENDING,
    PLAYER_2,
    PENDING,
    PENDING
  ];

  expect(GameOverDetector.detectWinner(moves3)).toEqual({
    winner: PLAYER_2,
    winnerMoves: [TOP_RIGHT, CENTER, BOTTOM_LEFT]
  });

  const moves4 = [
    PLAYER_1,
    PENDING,
    PENDING,
    PENDING,
    PLAYER_1,
    PENDING,
    PENDING,
    PENDING,
    PLAYER_1
  ];

  expect(GameOverDetector.detectWinner(moves4)).toEqual({
    winner: PLAYER_1,
    winnerMoves: [TOP_LEFT, CENTER, BOTTOM_RIGHT]
  });
});

it('the game has no winner', () => {
  const moves = [
    PENDING,
    PENDING,
    PENDING,
    PLAYER_1,
    PENDING,
    PENDING,
    PENDING,
    PLAYER_2,
    PENDING
  ];

  expect(GameOverDetector.detectWinner(moves)).toEqual({
    winner: null,
    winnerMoves: null
  });
});
