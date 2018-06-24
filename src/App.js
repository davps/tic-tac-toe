import React, { Component } from 'react';
import './App.css';
import Game from './layouts/Game';

class App extends Component {
  render() {
    var a = 2;
    console.log(a);
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
