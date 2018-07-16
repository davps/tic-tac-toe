/**
 * Aceptance tests for the feature "reset game"
 */

import { POSITION } from './constants';
import DSL from './DSL';

const testDSL = new DSL();
const { Scenario, I } = testDSL;

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

Scenario(
  'Place moves to reach a Game Over because that will enable the Reset controls, which we trigger to verify its outcome'
);
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
I.placeMove(BOTTOM_RIGHT);
I.placeMove(TOP_CENTER);
I.placeMove(BOTTOM_CENTER);
I.placeMove(TOP_RIGHT);

I.expect(TOP_LEFT).isNotAvailable();
I.expect(BOTTOM_RIGHT).isNotAvailable();
I.expect(TOP_CENTER).isNotAvailable();
I.expect(BOTTOM_CENTER).isNotAvailable();
I.expect(TOP_RIGHT).isNotAvailable();

I.resetGame();

I.expect(TOP_LEFT).isAvailable();
I.expect(TOP_CENTER).isAvailable();
I.expect(TOP_RIGHT).isAvailable();
I.expect(MIDDLE_LEFT).isAvailable();
I.expect(CENTER).isAvailable();
I.expect(MIDDLE_RIGHT).isAvailable();
I.expect(BOTTOM_LEFT).isAvailable();
I.expect(BOTTOM_CENTER).isAvailable();
I.expect(BOTTOM_RIGHT).isAvailable();

export default testDSL.toJSON();
