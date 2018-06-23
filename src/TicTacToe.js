import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

/**
 * I used the key property on this data structure because it is
 * easiert to debug with it (instead of using null or empty)
 */
export const MOVE = {
  PENDING: { val: 'PENDING', label: ' ' },
  PLAYER_1: { val: 'PLAYER_1', label: 'X', name: 'Jacob' },
  PLAYER_2: { val: 'PLAYER_2', label: 'O', name: 'David' }
};

/**
 * Initial state of the app, used to initialize and reset the game
 */
const initialState = {
  togglePlayer: false,
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

/**
 * Component to display information about a player
 * @param {string} player The player value
 */
export const PlayerInfo = ({ player }) => {
  return (
    <span>
      {' ' + MOVE[player].name} ( {MOVE[player].label} )
    </span>
  );
};

PlayerInfo.propTypes = {
  player: PropTypes.oneOf([MOVE.PLAYER_1.val, MOVE.PLAYER_2.val]).isRequired
};

/**
 * A square of tic tac toe board
 * @param {string} owner The player (val) that owns the square
 */
const Square = function({ owner, onMove, disabled }) {
  const elements = {};
  elements[MOVE.PENDING.val] = <button disabled={disabled} onClick={onMove} />;
  elements[MOVE.PLAYER_1.val] = <span>{MOVE.PLAYER_1.label}</span>;
  elements[MOVE.PLAYER_2.val] = <span>{MOVE.PLAYER_2.label}</span>;

  return elements[owner];
};

Square.propTypes = {
  owner: PropTypes.oneOf([
    MOVE.PENDING.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_2.val
  ]).isRequired,
  onMove: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Square.defaultProps = {
  disabled: false
};

const Board = ({ squares, moveHandler, hasWinner }) => {
  const isLineBreak = index => {
    return index === 2 || index === 5;
  };

  return (
    <div>
      {squares.map((square, index) => (
        <span key={index}>
          <Square
            onMove={() => moveHandler(index)}
            owner={squares[index]}
            disabled={hasWinner}
          />
          {isLineBreak(index) && <br />}
        </span>
      ))}
    </div>
  );
};

Board.propTypes = {
  squares: PropTypes.array.isRequired,
  moveHandler: PropTypes.func.isRequired,
  hasWinner: PropTypes.bool
};

const WinnerInfo = ({ hasWinner, isBoardFull, player }) => (
  <span>
    {hasWinner && (
      <div>
        The winner is{' '}
        <strong>
          <PlayerInfo player={player} />{' '}
        </strong>{' '}
      </div>
    )}

    {!hasWinner && isBoardFull && <div>Nobody wins!</div>}
  </span>
);

WinnerInfo.propTypes = {
  hasWinner: PropTypes.bool.isRequired,
  player: PropTypes.string,
  isBoardFull: PropTypes.bool.isRequired
};

const WhoIsNextInfo = ({ player, hasWinner, isBoardFull }) => (
  <div>
    {!hasWinner &&
      !isBoardFull && (
        <span>
          Now is the turn of
          <strong>
            <PlayerInfo player={player} />
          </strong>
        </span>
      )}
  </div>
);

WhoIsNextInfo.propTypes = {
  player: PlayerInfo.propTypes.player,
  hasWinner: WinnerInfo.propTypes.hasWinner,
  isBoardFull: WinnerInfo.propTypes.isBoardFull
};

const PlayAgainButton = ({ hasWinner, isBoardFull, resetGame }) => (
  <span>
    {(hasWinner || isBoardFull) && (
      <button onClick={resetGame}>Play again</button>
    )}
  </span>
);

PlayAgainButton.propTypes = {
  hasWinner: WinnerInfo.propTypes.hasWinner,
  isBoardFull: WinnerInfo.propTypes.isBoardFull,
  resetGame: PropTypes.func.isRequired
};

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  /**
   * Note that this method is async because it set the state
   * and I will need to perform other actions after it finish
   * @see {@link moveHandler} to understand how it's being used
   */
  changePlayerAsync = () => {
    return new Promise((resolve, reject) => {
      this.setState({ togglePlayer: !this.state.togglePlayer }, () => {
        resolve(this.getActualPlayer());
      });
    });
  };

  getActualPlayer = () => {
    return this.state.togglePlayer ? MOVE.PLAYER_2.val : MOVE.PLAYER_1.val;
  };

  /**
   * @see {@link changePlayerAsync} for explanation about its asynchronity
   */
  useSquareAsync = (squareIndex, player) => {
    if (typeof squareIndex !== 'number' && squareIndex < 0 && squareIndex > 8) {
      throw new Error('Invalid param squareIndex: ' + squareIndex);
    }

    if (player !== MOVE.PLAYER_1.val && player !== MOVE.PLAYER_2.val) {
      throw new Error('Invalid player value: ' + player);
    }

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

  /**
   * TODO: This should be async too, now it didn't affect the
   * actual implementation but should break if I perform async
   * actions after it
   */
  verifyResult = () => {
    for (let i = 0; i < 9; i += 3) {
      const col1 = this.state.squares[i + 0];
      const col2 = this.state.squares[i + 1];
      const col3 = this.state.squares[i + 2];
      if (col1 === col2 && col2 === col3 && col1 !== MOVE.PENDING.val) {
        this.setState({ winner: this.getActualPlayer() });
        return;
      }
    }

    for (let i = 0; i < 3; i += 1) {
      const row1 = this.state.squares[i + 0];
      const row2 = this.state.squares[i + 3];
      const row3 = this.state.squares[i + 6];
      if (row1 === row2 && row2 === row3 && row1 !== MOVE.PENDING.val) {
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
      topLeft !== MOVE.PENDING.val
    ) {
      this.setState({ winner: this.getActualPlayer() });
      return;
    }

    if (
      topRight === center &&
      center === bottomLeft &&
      topRight !== MOVE.PENDING.val
    ) {
      this.setState({ winner: this.getActualPlayer() });
      return;
    }

    this.setState({ isFull: this.isFull() });
  };

  isFull = () => {
    const pendingFound = this.state.squares.find(
      square => square === MOVE.PENDING.val
    );
    const result = typeof pendingFound === 'undefined';
    return result;
  };

  moveHandler = squareIndex => {
    Promise.resolve()
      .then(() => {
        return this.useSquareAsync(squareIndex, this.getActualPlayer());
      })
      .then(() => {
        return this.changePlayerAsync();
      })
      .then(player => {
        return this.verifyResult();
      });
  };

  resetGameHandler = () => {
    this.setState(initialState);
  };

  render() {
    console.log(this.state);

    return (
      <div>
        <Board
          squares={this.state.squares}
          moveHandler={this.moveHandler}
          hasWinner={this.state.winner !== null}
        />

        <WhoIsNextInfo
          player={this.getActualPlayer()}
          hasWinner={this.state.winner !== null}
          isBoardFull={this.state.isFull}
        />

        <WinnerInfo
          player={this.state.winner}
          hasWinner={this.state.winner !== null}
          isBoardFull={this.state.isFull}
        />

        <PlayAgainButton
          hasWinner={this.state.winner !== null}
          isBoardFull={this.state.isFull}
          resetGame={this.resetGameHandler}
        />
      </div>
    );
  }
}

export default TicTacToe;
