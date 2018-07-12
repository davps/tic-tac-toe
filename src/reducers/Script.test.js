import Script from './Script';
import ACTOR from './ACTOR';

const { PLAYER_1, PENDING } = ACTOR;

it('place a move on the board', () => {
  const moves = [
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING
  ];
  const updatedMoves = [
    PLAYER_1,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING,
    PENDING
  ];
  expect(Script.updateMoves(moves, 0, PLAYER_1)).toEqual(updatedMoves);
});

it('updateMoves with invalid arguments', () => {
  const moves = [];
  const moveIdx = 10;
  const player = PLAYER_1;

  expect(() => {
    Script.updateMoves(moves, moveIdx, player);
  }).toThrow();

  expect(() => {
    Script.updateMoves(moves, -moveIdx, player);
  }).toThrow();

  expect(() => {
    Script.updateMoves(moves, 0, null);
  }).toThrow();
});
