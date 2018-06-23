import React, { Component } from 'react';
import './App.css';
import TicTacToe from './TicTacToe';
import { MOVE } from './config';

class App extends Component {
  render() {
    return <div className="App">
        <TicTacToe />
      </div>;
  }
}

export default App;
