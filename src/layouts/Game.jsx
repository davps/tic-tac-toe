import React from 'react';
import PropTypes from 'prop-types';
import WinnerInfo from './WinnerInfo';
import Board from './Board';
import Logic from './Logic';

import { MOVE } from '../config';
import WhoIsNextInfo from './WhoIsNextInfo';
import PlayAgainButton from './PlayAgainButton';
import PlayerInfo from './PlayerInfo';
import initialState from './initialState';

const Game = ({ xIsNext, winner, isFull, moves, placeMove, resetGame }) => {
  const hasWinner = winner !== null;
  const isGameOver = hasWinner || isFull;
  const nextPlayer = Logic.getNextPlayer(xIsNext);

  /* eslint-disable react/jsx-one-expression-per-line */
  return (
    <div>
      <h1>Tic tac toe</h1>

      <br />
      <PlayerInfo player={MOVE.PLAYER_1.val} />
      <br />
      <PlayerInfo player={MOVE.PLAYER_2.val} />

      <Board moves={moves} onMove={placeMove} isGameOver={isGameOver} />

      <WhoIsNextInfo player={nextPlayer} isGameOver={isGameOver} />

      <WinnerInfo player={winner} hasWinner={hasWinner} isBoardFull={isFull} />

      <PlayAgainButton isGameOver={isGameOver} resetGame={resetGame} />
    </div>
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
  resetGame: PropTypes.func.isRequired
};

Game.defaultProps = {
  xIsNext: initialState.xIsNext,
  isFull: initialState.isFull,
  winner: initialState.winner
};

export default Game;
