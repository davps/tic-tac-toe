import React from 'react';
import { shallow, mount } from 'enzyme';
import Game from './Game';
import initialState from './initialState';
import { MOVE } from '../config';
import PlayAgainButton from './PlayAgainButton';
import Square from './Square';

it('renders without crashing', () => {
  shallow(<Game />);
});

it('Test the Game', () => {
  const game = mount(<Game />);

  const movesAfterFirstClick = [...initialState.moves];
  movesAfterFirstClick[0] = MOVE.PLAYER_1.val;

  expect(game.state()).toEqual(initialState);

  const squares = game.find(Square);

  squares.first().simulate('click'); //x
  expect(game.state().moves).toEqual(movesAfterFirstClick);

  squares.at(4).simulate('click'); //o
  squares.at(1).simulate('click'); //x
  squares.at(5).simulate('click'); //o
  squares.at(2).simulate('click'); //x

  game
    .find(PlayAgainButton)
    .find('button')
    .simulate('click');

  expect(game.state()).toEqual(initialState);
});
