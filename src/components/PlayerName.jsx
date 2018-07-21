import React from 'react';
import { customPropTypes } from '../constants';
import { X, O } from './Icons';
import { Container } from './Container';
import ACTOR from '../reducers/ACTOR';

const icon = {};
icon[ACTOR.PLAYER_1] = <X size={25} />;
icon[ACTOR.PLAYER_2] = <O size={25} />;

/**
 * Component to display information about a player
 * @param {string} player The player value
 */
/* eslint-disable react/jsx-one-expression-per-line */
const PlayerName = ({ player }) => (
  <Container className={ACTOR[player]} player={player}>
    <span>{ACTOR.name[player]}</span>
    {icon[player]}
  </Container>
);
/* eslint-enable */

PlayerName.propTypes = {
  player: customPropTypes.winner.isRequired
};

export default PlayerName;
