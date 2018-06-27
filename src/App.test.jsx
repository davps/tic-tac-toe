import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Square from './components/Square';
import ResetGame from './components/ResetGame';

/**
 * Smoke test
 * */
it('renders without crashing', () => {
  shallow(<App />);
});

it('Smoke test', () => {
  const game = mount(<App />);

  const placeMove = position =>
    game
      .find(Square)
      .at(position)
      .find('button')
      .simulate('click');

  placeMove(0);
  placeMove(4);
  placeMove(1);
  placeMove(5);
  placeMove(2);

  game
    .find(ResetGame)
    .at(0)
    .find('button')
    .simulate('click');
});
