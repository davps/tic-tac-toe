/**
 * I used the key property on this data structure because it is
 * easiert to debug with it (instead of using null or empty)
 */
export const MOVE = {
  PENDING: { val: 'PENDING', label: ' ' },
  PLAYER_1: { val: 'PLAYER_1', label: 'X', name: 'Jacob' },
  PLAYER_2: { val: 'PLAYER_2', label: 'O', name: 'David' }
};

const m = 7;
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

export default {};
