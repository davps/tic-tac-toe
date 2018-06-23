import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export const PLAYER = {
  PENDING: { val: 'PENDING', label: ' ' },
  PLAYER_1: { val: 'PLAYER_1', label: 'X', name: 'Jacob' },
  PLAYER_2: { val: 'PLAYER_2', label: 'O', name: 'David' }
};

export const PlayerInfo = ({ player }) => {
  return (
    <span>
      {' ' + PLAYER[player].name} ( {PLAYER[player].label} )
    </span>
  );
};

const Square = function({ owner, onMove, disabled }) {
  if (
    owner !== PLAYER.PENDING.val &&
    owner !== PLAYER.PLAYER_1.val &&
    owner !== PLAYER.PLAYER_2.val
  ) {
    throw new Error('The value of PLAYER is not valid');
  }

  const component = {};
  component[PLAYER.PENDING.val] = (
    <button disabled={disabled} onClick={onMove} />
  );
  component[PLAYER.PLAYER_1.val] = <span>{PLAYER.PLAYER_1.label}</span>;
  component[PLAYER.PLAYER_2.val] = <span>{PLAYER.PLAYER_2.label}</span>;

  return component[owner];
};

const initialState = {
  togglePlayer: false,
  winner: null,
  isFull: false,
  squares: [
    PLAYER.PENDING.val,
    PLAYER.PENDING.val,
    PLAYER.PENDING.val,
    PLAYER.PENDING.val,
    PLAYER.PENDING.val,
    PLAYER.PENDING.val,
    PLAYER.PENDING.val,
    PLAYER.PENDING.val,
    PLAYER.PENDING.val
  ]
};

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  changePlayer = () => {
    return new Promise((resolve, reject) => {
      this.setState({ togglePlayer: !this.state.togglePlayer }, () => {
        resolve(this.getActualPlayer());
      });
    });
  };

  getActualPlayer = () => {
    return this.state.togglePlayer ? PLAYER.PLAYER_2.val : PLAYER.PLAYER_1.val;
  };

  changeSquareState = (squareIndex, player) => {
    const squares = [...this.state.squares];

    squares[squareIndex] = player;

    return new Promise((resolve, reject) => {
      this.setState(
        {
          squares: squares
        },
        resolve()
      );
    });
  };

  verifyResult = () => {
    for (let i = 0; i < 9; i += 3) {
      const col1 = this.state.squares[i + 0];
      const col2 = this.state.squares[i + 1];
      const col3 = this.state.squares[i + 2];
      if (col1 === col2 && col2 === col3 && col1 != PLAYER.PENDING.val) {
        this.setState({ winner: this.getActualPlayer() });
        return;
      }
    }

    for (let i = 0; i < 3; i += 1) {
      const row1 = this.state.squares[i + 0];
      const row2 = this.state.squares[i + 3];
      const row3 = this.state.squares[i + 6];
      if (row1 === row2 && row2 === row3 && row1 != PLAYER.PENDING.val) {
        this.setState({ winner: this.getActualPlayer() });
        return;
      }
    }

    const topLeft = this.state.squares[0];
    const topRight = this.state.squares[2];
    const center = this.state.squares[4];
    const bottomLeft = this.state.squares[6];
    const bottomRight = this.state.squares[8];

    if (
      topLeft === center &&
      center === bottomRight &&
      topLeft != PLAYER.PENDING.val
    ) {
      this.setState({ winner: this.getActualPlayer() });
      return;
    }

    if (
      topRight === center &&
      center === bottomLeft &&
      topRight != PLAYER.PENDING.val
    ) {
      this.setState({ winner: this.getActualPlayer() });
      return;
    }

    this.setState({ isFull: this.isFull() });
  };

  isFull = () => {
    const pendingFound = this.state.squares.find(
      square => square === PLAYER.PENDING.val
    );
    const result = typeof pendingFound === 'undefined';
    return result;
  };

  moveHandler = squareIndex => {
    this.changePlayer().then(player => {
      this.changeSquareState(squareIndex, player).then(this.verifyResult);
    });
  };

  resetGame = () => {
    this.setState(initialState);
  };

  isLineBreak = index => {
    return (index === 2 || index === 5);
  };

  render() {
    const actualPlayer = this.getActualPlayer();
    const actualPlayerName = PLAYER[actualPlayer].name;

    console.log(this.state);

    return (
      <div>
        {this.state.squares.map((square, index) => (
          <span>
            <Square
              key={index}
              onMove={() => this.moveHandler(index)}
              owner={this.state.squares[index]}
              disabled={this.state.winner !== null}
            />
            {this.isLineBreak(index) && <br />}
          </span>
        ))}

        {!this.state.winner &&
          !this.state.isFull && (
            <div>
              Now is the turn of
              <strong>
                <PlayerInfo player={actualPlayer} />
              </strong>
            </div>
          )}

        {this.state.winner && (
          <div>
            The winner is{' '}
            <strong>
              <PlayerInfo player={this.state.winner} />{' '}
            </strong>{' '}
          </div>
        )}

        {!this.state.winner && this.state.isFull && <div>Nobody wins!</div>}

        {(this.state.winner || this.state.isFull) && (
          <button onClick={this.resetGame}>Play again</button>
        )}
      </div>
    );
  }
}

export default TicTacToe;
