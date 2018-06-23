import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MOVE } from '../config';

/**
 * Component to display information about a player
 * @param {string} player The player value
 */
const PlayerInfo = ({ player }) => {
  return (
    <span>
      {' ' + MOVE[player].name} ( {MOVE[player].label} )
    </span>
  );
};

PlayerInfo.propTypes = {
  player: PropTypes.oneOf([MOVE.PLAYER_1.val, MOVE.PLAYER_2.val]).isRequired
};

export default PlayerInfo;
