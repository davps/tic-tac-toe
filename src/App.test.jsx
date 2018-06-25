import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Square from './components/Square';
import PlayAgainButton from './components/PlayAgainButton';

/**
 * Smoke test
 * */
it('renders without crashing', () => {
  shallow(<App />);
});

// TODO: write e2e tests based on this
it('Smoke test', () => {
  const game = mount(<App />);
  const squares = game.find(Square);
  squares.first().simulate('click');
  squares.at(4).simulate('click');
  squares.at(1).simulate('click');
  squares.at(5).simulate('click');
  squares.at(2).simulate('click');

  game
    .find(PlayAgainButton)
    .find('button')
    .simulate('click');
});
