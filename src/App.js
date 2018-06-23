import React, { Component } from 'react';
import './App.css';
import TicTacToe, { MOVE, PlayerInfo } from './TicTacToe';

class App extends Component {
  render() {
    return <div className="App">
        <h1>Tic tac toe</h1>
        <br />
        {/* <h2>Information about the players</h2> */}
        <PlayerInfo player={MOVE.PLAYER_1.val} />
        <br />
        <PlayerInfo player={MOVE.PLAYER_2.val} />

        <h2>Board</h2>
        <TicTacToe />
      </div>;
  }
}

export default App;
