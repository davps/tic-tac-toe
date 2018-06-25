/*
 * Action types
 */
export const PLACE_MOVE = 'PLACE_MOVE';
export const RESET_GAME = 'RESET_GAME';

/*
 * Action creators
 */
export const placeMove = position => ({
  type: PLACE_MOVE,
  position
});

export const resetGame = () => ({
  type: RESET_GAME
});
