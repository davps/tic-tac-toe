import React from 'react';
import PropTypes from 'prop-types';
import PlayerInfo from './PlayerInfo';

const WhoIsNextInfo = ({ player, isGameOver }) => (
  <div>
    {!isGameOver && (
      <span>
        Now is the turn of
        <strong>
          <PlayerInfo player={player} />
        </strong>
      </span>
    )}
  </div>
);

WhoIsNextInfo.propTypes = {
  player: PlayerInfo.propTypes.player, // eslint-disable-line react/require-default-props
  isGameOver: PropTypes.bool.isRequired
};

export default WhoIsNextInfo;
