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
    this.getNextPlayer = this.getNextPlayer.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.resetGameHandler = this.resetGameHandler.bind(this);
  }

  getNextPlayer() {
    const { xIsNext } = this.state;
    return xIsNext ? MOVE.PLAYER_2.val : MOVE.PLAYER_1.val;
  }

  resetGameHandler() {
    this.setState(initialState);
  }

  moveHandler(moveIdx) {
    const { moves, xIsNext } = this.state;
    const player = this.getNextPlayer();
    const updatedMoves = Logic.updateMoves(moves, moveIdx, player);
    const updatedXIsNext = Logic.togglePlayer(xIsNext);
    const isFull = Logic.isFull(updatedMoves);
    const winner = Logic.hasWinner(updatedMoves, player);

    this.setState({
      moves: updatedMoves,
      xIsNext: updatedXIsNext,
      winner,
      isFull
    });
  }

  render() {
    // console.log(this.state);
    const { winner, isFull, moves } = this.state;
    const hasWinner = winner !== null;
    const isGameOver = hasWinner || isFull;

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
          moveHandler={this.moveHandler}
          isGameOver={isGameOver}
        />

        <WhoIsNextInfo player={this.getNextPlayer()} isGameOver={isGameOver} />

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
