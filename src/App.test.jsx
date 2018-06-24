import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Game from './layouts/Game';

/**
 * Smoke test for the App component. This is enough because it acts just as a container.
 * */
it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Game', () => {});
