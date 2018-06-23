import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square.jsx';

const Board = ({ squares, moveHandler, hasWinner }) => {
  const isLineBreak = index => {
    return index === 2 || index === 5;
  };

  return (
    <div>
      {squares.map((square, index) => (
        <span key={index}>
          <Square
            onMove={() => moveHandler(index)}
            owner={squares[index]}
            disabled={hasWinner}
          />
          {isLineBreak(index) && <br />}
        </span>
      ))}
    </div>
  );
};

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  moveHandler: PropTypes.func.isRequired,
  hasWinner: PropTypes.bool
};

export default Board;
