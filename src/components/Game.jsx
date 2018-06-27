import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MOVE, customPropTypes } from '../constants';
import WinnerName from './WinnerName';
import Board from './Board';
import Logic from '../reducers/Logic';
import NextPlayerName from './NextPlayerName';
import ResetGame from './ResetGame';
import PlayerName from './PlayerName';
import initialState from '../store/initialState';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px #ccc solid;
`;

const PlayersInfoContainer = styled.div`
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
  onMove,
  onReset
}) => {
  const hasWinner = winner !== null;
  const isGameOver = hasWinner || isFull;
  const nextPlayer = Logic.getNextPlayer(xIsNext);

  /* eslint-disable react/jsx-one-expression-per-line */
  return (
    <Container>
      <h1>TIC TAC TOE!</h1>

      <PlayersInfoContainer>
        <PlayerName player={MOVE.PLAYER_1.val} />
        <span style={{ width: 20 }} />
        <PlayerName player={MOVE.PLAYER_2.val} />
      </PlayersInfoContainer>

      <NextPlayerName player={nextPlayer} isGameOver={isGameOver} />
      <WinnerName winner={winner} isBoardFull={isFull} />

      <Board
        moves={moves}
        onMove={onMove}
        isGameOver={isGameOver}
        winnerMoves={winnerMoves}
      />

      <ResetGame isGameOver={isGameOver} onReset={onReset} />
    </Container>
  );
  /* eslint-enable */
};

Game.propTypes = {
  xIsNext: PropTypes.bool,
  winner: customPropTypes.winner,
  isFull: PropTypes.bool,
  moves: customPropTypes.moves.isRequired,
  onMove: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  winnerMoves: customPropTypes.winnerMoves
};

Game.defaultProps = {
  xIsNext: initialState.xIsNext,
  isFull: initialState.isFull,
  winner: initialState.winner,
  winnerMoves: initialState.winnerMoves
};

export default Game;
