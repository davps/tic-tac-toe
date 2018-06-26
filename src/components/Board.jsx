import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Square from './Square';
import { MOVE, DIMENSIONS } from '../constants';

const Container = styled.div`
  background: black;
  display: flex;
  flex-wrap: wrap;
  width: ${DIMENSIONS.board.width}px;
  height: ${DIMENSIONS.board.heigth}px;
  padding: 0px;
  margin: 0px;
`;

const Board = ({ moves, onMove, isGameOver }) => {
  /* eslint-disable react/no-array-index-key */
  return (
    <Container>
      {moves.map((square, index) => (
        <Square
          key={index}
          onMove={() => onMove(index)}
          owner={square}
          isGameOver={isGameOver}
          className={`square-${index}`}
          style={DIMENSIONS.margins[index]}
        />
      ))}
    </Container>
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
