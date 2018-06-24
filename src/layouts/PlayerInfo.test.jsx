import React from 'react';
import renderer from 'react-test-renderer';
import { MOVE } from '../config';
import PlayerInfo from './PlayerInfo';

it('PlayerInfo_snapshot', () => {
  // eslint-disable-next-line react/jsx-filename-extension
  const tree = renderer.create(<PlayerInfo player={MOVE.PLAYER_1.val} />);
  expect(tree).toMatchSnapshot();
});
