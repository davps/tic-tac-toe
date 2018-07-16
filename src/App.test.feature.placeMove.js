/**
 * Aceptance tests for the feature "Place moves"
 */

import { POSITION } from './constants';
import ACTOR from './reducers/ACTOR';
import DSL from './DSL';

const testDSL = new DSL();
const { Scenario } = testDSL;
const I = testDSL.createTestDescription();

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

Scenario('Place a move');
I.startNewGame();

I.expect(TOP_LEFT).isAvailable();
I.expect(TOP_CENTER).isAvailable();
I.expect(TOP_RIGHT).isAvailable();
I.expect(MIDDLE_LEFT).isAvailable();
I.expect(CENTER).isAvailable();
I.expect(MIDDLE_RIGHT).isAvailable();
I.expect(BOTTOM_LEFT).isAvailable();
I.expect(BOTTOM_CENTER).isAvailable();
I.expect(BOTTOM_RIGHT).isAvailable();

I.placeMove(TOP_LEFT);

I.expect(TOP_LEFT).hasMove(X);
I.expect(TOP_LEFT).isNotAvailable();
I.expect(TOP_CENTER).isAvailable();
I.expect(TOP_RIGHT).isAvailable();
I.expect(MIDDLE_LEFT).isAvailable();
I.expect(CENTER).isAvailable();
I.expect(MIDDLE_RIGHT).isAvailable();
I.expect(BOTTOM_LEFT).isAvailable();
I.expect(BOTTOM_CENTER).isAvailable();
I.expect(BOTTOM_RIGHT).isAvailable();

Scenario('Place more moves');
I.placeMove(BOTTOM_RIGHT);
I.placeMove(TOP_CENTER);
I.expect(TOP_LEFT).hasMove(X);
I.expect(TOP_LEFT).isNotAvailable();
I.expect(TOP_CENTER).hasMove(X);
I.expect(TOP_CENTER).isNotAvailable();
I.expect(TOP_RIGHT).isAvailable();
I.expect(MIDDLE_LEFT).isAvailable();
I.expect(CENTER).isAvailable();
I.expect(MIDDLE_RIGHT).isAvailable();
I.expect(BOTTOM_LEFT).isAvailable();
I.expect(BOTTOM_CENTER).isAvailable();
I.expect(BOTTOM_RIGHT).hasMove(O);
I.expect(BOTTOM_RIGHT).isNotAvailable();

export default I.getTestsAsJSON();
