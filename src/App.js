import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TicTacToe, { PLAYER, PlayerInfo } from './TicTacToe';

class App extends Component {
  render() {
    return <div className="App">
        <h1>Tic tac toe</h1>
        <br />
        {/* <h2>Information about the players</h2> */}
        <PlayerInfo player={PLAYER.PLAYER_1.val} />
        <br />
        <PlayerInfo player={PLAYER.PLAYER_2.val} />

        <h2>Board</h2>
        <TicTacToe />
      </div>;
  }
}

export default App;
