import React, { Component } from 'react';
import './App.css';
import WinnerInfo from './layouts/WinnerInfo.jsx';
import Board from './layouts/Board.jsx';

import { MOVE } from './config';
import WhoIsNextInfo from './layouts/WhoIsNextInfo.jsx';
import PlayAgainButton from './layouts/PlayAgainButton.jsx';
import PlayerInfo from './layouts/PlayerInfo.jsx';

/**
 * Initial state of the app, used to initialize and reset the game
 */
const initialState = {
  davidIsNext: false,
  winner: null,
  isFull: false,
  squares: [
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val,
    MOVE.PENDING.val
  ]
};

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  togglePlayer = toggle => {
    return !toggle;
  };

  getNextPlayer = () => {
    return this.state.davidIsNext ? MOVE.PLAYER_2.val : MOVE.PLAYER_1.val;
  };

  updateSquares = (squareIndex, player) => {
    if (typeof squareIndex !== 'number' && squareIndex < 0 && squareIndex > 8) {
      throw new Error('Invalid param squareIndex: ' + squareIndex);
    }

    if (player !== MOVE.PLAYER_1.val && player !== MOVE.PLAYER_2.val) {
      throw new Error('Invalid player value: ' + player);
    }

    const squares = [...this.state.squares];
    squares[squareIndex] = player;
    return squares;
  };

  verifyResult = (squares, actualPlayer) => {
    for (let i = 0; i < 9; i += 3) {
      const col1 = squares[i + 0];
      const col2 = squares[i + 1];
      const col3 = squares[i + 2];
      if (col1 === col2 && col2 === col3 && col1 !== MOVE.PENDING.val) {
        return actualPlayer;
      }
    }

    for (let i = 0; i < 3; i += 1) {
      const row1 = squares[i + 0];
      const row2 = squares[i + 3];
      const row3 = squares[i + 6];
      if (row1 === row2 && row2 === row3 && row1 !== MOVE.PENDING.val) {
        return actualPlayer;
      }
    }

    const topLeft = squares[0];
    const topRight = squares[2];
    const center = squares[4];
    const bottomLeft = squares[6];
    const bottomRight = squares[8];

    if (
      topLeft === center &&
      center === bottomRight &&
      topLeft !== MOVE.PENDING.val
    ) {
      return actualPlayer;
    }

    if (
      topRight === center &&
      center === bottomLeft &&
      topRight !== MOVE.PENDING.val
    ) {
      return actualPlayer;
    }

    return null;
  };

  isFull = () => {
    const pendingFound = this.state.squares.find(
      square => square === MOVE.PENDING.val
    );
    const result = typeof pendingFound === 'undefined';
    return result;
  };

  moveHandler = squareIndex => {
    const actualPlayer = this.getNextPlayer();
    const squares = this.updateSquares(squareIndex, actualPlayer);
    const davidIsNext = this.togglePlayer(this.state.davidIsNext);
    const isFull = this.isFull();
    const winner = this.verifyResult(squares, actualPlayer);

    this.setState({
      squares,
      davidIsNext,
      winner,
      isFull
    });
  };

  resetGameHandler = () => {
    this.setState(initialState);
  };

  render() {
    // console.log(this.state);
    const hasWinner = this.state.winner !== null;
    const isBoardFull = this.state.isFull;
    const isGameOver = hasWinner || isBoardFull;

    return (
      <div>

        <h1>Tic tac toe</h1>

        <br />
        {/*Information about the players*/}
        <PlayerInfo player={MOVE.PLAYER_1.val} />
        <br />
        <PlayerInfo player={MOVE.PLAYER_2.val} />

        <Board
          squares={this.state.squares}
          moveHandler={this.moveHandler}
          isGameOver={isGameOver}
        />

        <WhoIsNextInfo
          player={this.getNextPlayer()}
          isGameOver={isGameOver}
        />

        <WinnerInfo
          player={this.state.winner}
          hasWinner={this.state.winner !== null}
          isBoardFull={this.state.isFull}
        />

        <PlayAgainButton
          isGameOver={isGameOver}
          resetGame={this.resetGameHandler}
        />
      </div>
    );
  }
}

export default TicTacToe;
