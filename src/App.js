import 'core-js';
import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store/store';
import GameContainer from './containers/GameContainer';

/* eslint-disable react/jsx-filename-extension */
const App = () => (
  <Provider store={store}>
    <GameContainer />
  </Provider>
);
/* eslint-enable */

export default App;
