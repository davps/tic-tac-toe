import React, { Component } from 'react';
import initialState from './initialState';
import WinnerInfo from './WinnerInfo';
import Board from './Board';
import Logic from './Logic';

import { MOVE } from '../config';
import WhoIsNextInfo from './WhoIsNextInfo';
import PlayAgainButton from './PlayAgainButton';
import PlayerInfo from './PlayerInfo';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.resetGameHandler = this.resetGameHandler.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
  }

  resetGameHandler() {
    this.setState(initialState);
  }

  moveHandler(moveIdx) {
    const { state } = this;
    this.setState(Logic.makeMove(moveIdx, state));
  }

  render() {
    const { winner, isFull, moves, xIsNext } = this.state;
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

        <Board
          moves={moves}
          onMove={this.moveHandler}
          isGameOver={isGameOver}
        />

        <WhoIsNextInfo player={nextPlayer} isGameOver={isGameOver} />

        <WinnerInfo
          player={winner}
          hasWinner={hasWinner}
          isBoardFull={isFull}
        />

        <PlayAgainButton
          isGameOver={isGameOver}
          resetGame={this.resetGameHandler}
        />
      </div>
    );
    /* eslint-enable */
  }
}

export default Game;
