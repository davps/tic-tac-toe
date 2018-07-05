import PropTypes from 'prop-types';

/**
 * I used the key property on this data structure because it is
 * easiert to debug with it (instead of using null or empty)
 */
export const MOVE = {
  PENDING: { val: 'PENDING', label: ' ' },
  PLAYER_1: { val: 'PLAYER_1', label: 'X', name: 'Laura' },
  PLAYER_2: { val: 'PLAYER_2', label: 'O', name: 'David' }
};

const m = 3;
const margins = [
  { top: 0, left: 0, right: m, bottom: m },
  { top: 0, left: m, right: m, bottom: m },
  { top: 0, left: m, right: 0, bottom: m },

  { top: m, left: 0, right: m, bottom: m },
  { top: m, left: m, right: m, bottom: m },
  { top: m, left: m, right: 0, bottom: m },

  { top: m, left: 0, right: m, bottom: 0 },
  { top: m, left: m, right: m, bottom: 0 },
  { top: m, left: m, right: 0, bottom: 0 }
];

const square = {
  width: 64,
  height: 64
};

const marginsWidth =
  margins[0].left +
  margins[0].right +
  (margins[1].left + margins[1].right) +
  (margins[2].left + margins[2].right);

const marginsHeigh =
  margins[0].top +
  margins[0].bottom +
  (margins[3].top + margins[3].bottom) +
  (margins[6].top + margins[6].bottom);

const board = {
  width: square.width * 3 + marginsWidth,
  heigth: square.height * 3 + marginsHeigh
};

export const DIMENSIONS = {
  square,
  margins,
  board
};

export const customPropTypes = {
  moves: PropTypes.arrayOf(
    PropTypes.oneOf([MOVE.PENDING.val, MOVE.PLAYER_1.val, MOVE.PLAYER_2.val])
  ),
  winner: PropTypes.oneOf([MOVE.PLAYER_1.val, MOVE.PLAYER_2.val]),
  winnerMoves: PropTypes.arrayOf(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8])),
  moveVal: PropTypes.oneOf([
    MOVE.PENDING.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_2.val
  ])
};

export const customDefaultTypes = {};

export const POSITION = {
  TOP_LEFT: 0,
  TOP_CENTER: 1,
  TOP_RIGHT: 2,
  MIDDLE_LEFT: 3,
  CENTER: 4,
  MIDDLE_RIGHT: 5,
  BOTTOM_LEFT: 6,
  BOTTOM_CENTER: 7,
  BOTTOM_RIGHT: 8
};
