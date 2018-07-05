import { POSITION, MOVE } from './constants';
import { I, Scenario } from './DSL';

const {
  TOP_LEFT,
  TOP_CENTER,
  TOP_RIGHT,
  MIDDLE_LEFT,
  CENTER,
  MIDDLE_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_CENTER,
  BOTTOM_RIGHT
} = POSITION;

const X = MOVE.PLAYER_1.val;
const O = MOVE.PLAYER_2.val;

Scenario('Game is not over yet');
I.placeMove(TOP_LEFT);
I.placeMove(BOTTOM_RIGHT);
I.placeMove(TOP_CENTER);
I.expect().gameNotOver();

Scenario('Game over, X wins');
I.placeMove(BOTTOM_CENTER);
I.placeMove(TOP_RIGHT);
I.expect().aWinner();
I.expect(X).toBeWinner();
I.expect(O).notToBeWinner();
I.expect().gameOver();

Scenario('Reset game');
I.resetGame();
I.expect().gameNotOver();

Scenario('Draw (no winners and board is full)');
I.placeMove(TOP_LEFT);
I.placeMove(BOTTOM_RIGHT);
I.placeMove(TOP_RIGHT);
I.placeMove(TOP_CENTER);
I.placeMove(MIDDLE_LEFT);
I.placeMove(CENTER);
I.placeMove(BOTTOM_CENTER);
I.placeMove(BOTTOM_LEFT);
I.placeMove(MIDDLE_RIGHT);
I.expect().draw();
I.resetGame();

Scenario('Draw (no winners and board is full)');
I.placeMove(TOP_LEFT);
I.placeMove(BOTTOM_RIGHT);
I.placeMove(TOP_RIGHT);
I.placeMove(TOP_CENTER);
I.placeMove(MIDDLE_LEFT);
I.placeMove(CENTER);
I.placeMove(BOTTOM_CENTER);
I.placeMove(BOTTOM_LEFT);
I.placeMove(MIDDLE_RIGHT);
I.expect().draw();

// winner positions
const x = [
  [TOP_LEFT, CENTER, BOTTOM_RIGHT],
  [TOP_RIGHT, CENTER, BOTTOM_LEFT],
  [TOP_LEFT, MIDDLE_LEFT, BOTTOM_LEFT],
  [MIDDLE_LEFT, CENTER, MIDDLE_RIGHT],
  [TOP_RIGHT, MIDDLE_RIGHT, BOTTOM_RIGHT],
  [TOP_LEFT, TOP_CENTER, TOP_RIGHT],
  [MIDDLE_LEFT, CENTER, MIDDLE_RIGHT],
  [BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT]
];

// no winner positions
const o = [
  [MIDDLE_LEFT, BOTTOM_LEFT],
  [MIDDLE_LEFT, MIDDLE_RIGHT],
  [MIDDLE_RIGHT, CENTER],
  [TOP_LEFT, TOP_CENTER],
  [MIDDLE_LEFT, TOP_CENTER],
  [MIDDLE_LEFT, CENTER],
  [TOP_LEFT, TOP_CENTER],
  [TOP_LEFT, TOP_CENTER]
];

for (let i = 0; i < x.length; i += 1) {
  const xPositions = x[i];
  const oPositions = o[i];

  Scenario(`Winning in other positions (${i})`);
  I.resetGame();
  I.placeMove(xPositions[0]);
  I.placeMove(oPositions[0]);
  I.placeMove(xPositions[1]);
  I.placeMove(oPositions[1]);
  I.placeMove(xPositions[2]);
  I.expect().gameOver();
  I.expect(X).toBeWinner();
}

export default I.getTestsAsJSON();
