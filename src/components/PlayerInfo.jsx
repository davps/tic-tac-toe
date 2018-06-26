import React from 'react';
import PropTypes from 'prop-types';
import { MOVE } from '../constants';
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
const PlayerInfo = ({ player }) => (
  <Container>
    <span>{MOVE[player].name}</span>
    {icon[player]}
  </Container>
);
/* eslint-enable */

PlayerInfo.propTypes = {
  player: PropTypes.oneOf([MOVE.PLAYER_1.val, MOVE.PLAYER_2.val]).isRequired
};

export default PlayerInfo;
