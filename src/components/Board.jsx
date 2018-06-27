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

/* eslint-disable react/no-array-index-key */
const Board = ({ moves, onMove, isGameOver, winnerMoves }) => (
  <Container>
    {moves.map((square, index) => (
      <Square
        key={index}
        onMove={() => onMove(index)}
        owner={square}
        isGameOver={isGameOver}
        isWinningMove={winnerMoves && winnerMoves.includes(index)}
        className={`square-${index}`}
        style={DIMENSIONS.margins[index]}
      />
    ))}
  </Container>
);
/* eslint-enable */

Board.propTypes = {
  moves: PropTypes.arrayOf(
    PropTypes.oneOf([MOVE.PENDING.val, MOVE.PLAYER_1.val, MOVE.PLAYER_2.val])
  ).isRequired,
  onMove: PropTypes.func.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  winnerMoves: PropTypes.arrayOf(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8]))
};

Board.defaultProps = {
  winnerMoves: null
};

export default Board;
