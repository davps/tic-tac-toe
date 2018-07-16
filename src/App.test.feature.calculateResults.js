/**
 * Aceptance tests for the feature "Detect game over and calculate results"
 */

import { POSITION } from './constants';
import ACTOR from './reducers/ACTOR';
import DSL from './DSL';

const testDSL = new DSL();
const { Scenario } = testDSL;
const I = testDSL.createDescriptor();

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

const X = ACTOR.PLAYER_1;
const O = ACTOR.PLAYER_2;

Scenario(
  'Place 3 moves to verify its non game over state. The game over actions cannot be performed in this case.'
);
I.startNewGame();
I.placeMove(TOP_LEFT);
I.placeMove(BOTTOM_RIGHT);
I.placeMove(TOP_CENTER);
I.expect().gameNotOver();

Scenario(
  'Place more moves for a Game over and X wins to verify it was detected by the game'
);
I.placeMove(BOTTOM_CENTER);
I.placeMove(TOP_RIGHT);
I.expect().aWinner();
I.expect(X).toBeWinner();
I.expect(O).notToBeWinner();
I.expect().gameOver();

Scenario(
  'Start a new game and fill all squares but with no winners to verify if the game detected the Draw'
);
I.startNewGame();
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

  Scenario(`Winning in all positions (${i}) to cover all winning use cases`);
  I.startNewGame();
  I.placeMove(xPositions[0]);
  I.placeMove(oPositions[0]);
  I.placeMove(xPositions[1]);
  I.placeMove(oPositions[1]);
  I.placeMove(xPositions[2]);
  I.expect().gameOver();
  I.expect(X).toBeWinner();
}

export default testDSL.toJSON();
