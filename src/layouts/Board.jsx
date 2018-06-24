import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { MOVE } from '../config';

const Board = ({ moves, onMove, isGameOver }) => {
  const isLineBreak = index => index === 2 || index === 5;

  /* eslint-disable react/no-array-index-key */
  return (
    <div>
      {moves.map((square, index) => (
        <span key={index}>
          <Square
            onMove={() => onMove(index)}
            owner={square}
            isGameOver={isGameOver}
          />
          {isLineBreak(index) && <br />}
        </span>
      ))}
    </div>
  );
  /* eslint-enable */
};

Board.propTypes = {
  moves: PropTypes.arrayOf(
    PropTypes.oneOf([MOVE.PENDING.val, MOVE.PLAYER_1.val, MOVE.PLAYER_2.val])
  ).isRequired,
  onMove: PropTypes.func.isRequired,
  isGameOver: PropTypes.bool.isRequired
};

export default Board;
