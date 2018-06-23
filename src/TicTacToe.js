import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const SQUARE_STATE = {
  NOT_USED: 0,
  PLAYER_1: 1,
  PLAYER_2: 2
};

const Square = function({ value, flip }) {
  let text;
  if (value === SQUARE_STATE.NOT_USED) {
    text = ' ';
  } else if (value === SQUARE_STATE.PLAYER_1) {
    text = 'X';
  } else if (value === SQUARE_STATE.PLAYER_2) {
    text = 'O';
  } else {
    throw new Error('The value of SQUARE_STATE is not valid');
  }

  return <button onClick={flip}>{text}</button>;
};

class TicTacToe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      row1: [
        SQUARE_STATE.NOT_USED,
        SQUARE_STATE.NOT_USED,
        SQUARE_STATE.NOT_USED
      ],
      row2: [
        SQUARE_STATE.NOT_USED,
        SQUARE_STATE.NOT_USED,
        SQUARE_STATE.NOT_USED
      ],
      row3: [
        SQUARE_STATE.NOT_USED,
        SQUARE_STATE.NOT_USED,
        SQUARE_STATE.NOT_USED
      ]
    };
  }

  changeWhoIsPlaying = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  changeSquareState = (rowIndex, rowName) => {
    const row = [...this.state[rowName]];

    const state = {
      row: this.state[rowName]
    };

    let value;
    if (this.state.toogle === false) {
      value = SQUARE_STATE.PLAYER_1;
    } else {
      value = SQUARE_STATE.PLAYER_2;
    }

    state.row[rowIndex] = value;

    this.setState(state);
  };

  clickHandler = (rowIndex, rowNumber) => {
    this.changeWhoIsPlaying();

    if (rowNumber === 1) {
      this.changeSquareState(rowIndex, 'row1');
    } else if (rowNumber === 2) {
      this.changeSquareState(rowIndex, 'row2');
    } else if (rowNumber === 3) {
      this.changeSquareState(rowIndex, 'row3');
    }
  };

  render() {
    return (
      <div>
        {this.state.row1.map((rowItem, index) => {
          console.log(rowItem);
          return (
            <Square flip={() => this.clickHandler(index, 1)} value={rowItem} />
          );
        })}
        <br />
        {this.state.row2.map((rowItem, index) => (
          <Square flip={() => this.clickHandler(index, 2)} value={rowItem} />
        ))}
        <br />
        {this.state.row3.map((rowItem, index) => (
          <Square flip={() => this.clickHandler(index, 3)} value={rowItem} />
        ))}

        <div>
          Who is playing now?
          <br />
          Now is the turn of
          <strong>{this.state.toggle === false ? ' Jacob' : ' David'}</strong>
        </div>
      </div>
    );
  }
}

export default TicTacToe;
