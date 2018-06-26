import React from 'react';
import PropTypes from 'prop-types';
import { MOVE } from '../constants';

/**
 * Component to display information about a player
 * @param {string} player The player value
 */

/* eslint-disable react/jsx-one-expression-per-line */
const PlayerInfo = ({ player }) => (
  <span>{` ${MOVE[player].name} (${MOVE[player].label}) `}</span>
);
/* eslint-enable */

PlayerInfo.propTypes = {
  player: PropTypes.oneOf([MOVE.PLAYER_1.val, MOVE.PLAYER_2.val]).isRequired
};

export default PlayerInfo;
