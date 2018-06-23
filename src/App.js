import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TicTacToe from './TicTacToe';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TicTacToe />
      </div>
    );
  }
}

export default App;
