import React from 'react';
import PlayerInfo from './PlayerInfo.jsx';

const WhoIsNextInfo = ({ player, isGameOver}) => (
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
  player: PlayerInfo.propTypes.player,
};

export default WhoIsNextInfo;
