import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MOVE } from '../constants';
import WinnerInfo from './WinnerInfo';
import Board from './Board';
import Logic from '../reducers/Logic';
import WhoIsNextInfo from './WhoIsNextInfo';
import PlayAgainButton from './PlayAgainButton';
import PlayerInfo from './PlayerInfo';
import initialState from '../store/initialState';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlayersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Game = ({
  xIsNext,
  winner,
  winnerMoves,
  isFull,
  moves,
  placeMove,
  resetGame
}) => {
  const hasWinner = winner !== null;
  const isGameOver = hasWinner || isFull;
  const nextPlayer = Logic.getNextPlayer(xIsNext);

  /* eslint-disable react/jsx-one-expression-per-line */
  return (
    <Container>
      <h1>TIC TAC TOE!</h1>

      <PlayersContainer>
        <PlayerInfo player={MOVE.PLAYER_1.val} />
        <span style={{ width: 20 }} />
        <PlayerInfo player={MOVE.PLAYER_2.val} />
      </PlayersContainer>

      <WhoIsNextInfo player={nextPlayer} isGameOver={isGameOver} />
      <WinnerInfo player={winner} hasWinner={hasWinner} isBoardFull={isFull} />

      <Board
        moves={moves}
        onMove={placeMove}
        isGameOver={isGameOver}
        winnerMoves={winnerMoves}
      />

      <PlayAgainButton isGameOver={isGameOver} resetGame={resetGame} />
    </Container>
  );
  /* eslint-enable */
};

Game.propTypes = {
  xIsNext: PropTypes.bool,
  winner: PropTypes.string,
  isFull: PropTypes.bool,
  moves: PropTypes.arrayOf(
    PropTypes.oneOf([MOVE.PENDING.val, MOVE.PLAYER_1.val, MOVE.PLAYER_2.val])
  ).isRequired,
  placeMove: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  winnerMoves: PropTypes.arrayOf(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8]))
};

Game.defaultProps = {
  xIsNext: initialState.xIsNext,
  isFull: initialState.isFull,
  winner: initialState.winner,
  winnerMoves: null
};

export default Game;
