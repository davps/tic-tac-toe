import React from 'react';
import { MOVE, customPropTypes } from '../constants';
import { X, O } from './Icons';
import { Container } from './Container';

const icon = {};
icon[MOVE.PLAYER_1.val] = <X size={25} />;
icon[MOVE.PLAYER_2.val] = <O size={25} />;

/**
 * Component to display information about a player
 * @param {string} player The player value
 */
/* eslint-disable react/jsx-one-expression-per-line */
const PlayerName = ({ player }) => (
  <Container className={MOVE[player].val}>
    <span>{MOVE[player].name}</span>
    {icon[player]}
  </Container>
);
/* eslint-enable */

PlayerName.propTypes = {
  player: customPropTypes.winner.isRequired
};

export default PlayerName;
