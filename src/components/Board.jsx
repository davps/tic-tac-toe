import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Square from './Square';
import { DIMENSIONS, customPropTypes } from '../constants';

const Container = styled.div`
  background: black;
  display: flex;
  flex-wrap: wrap;
  width: ${DIMENSIONS.board.width}px;
  height: ${DIMENSIONS.board.heigth}px;
  padding: 0px;
  margin: 0px;
  margin-bottom: 20px;
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
  moves: customPropTypes.moves.isRequired,
  onMove: PropTypes.func.isRequired,
  isGameOver: PropTypes.bool,
  winnerMoves: customPropTypes.winnerMoves
};

Board.defaultProps = {
  winnerMoves: null,
  isGameOver: false
};

export default Board;
