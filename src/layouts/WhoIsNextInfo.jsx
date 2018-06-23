import React from 'react';
import PropTypes from 'prop-types';
import PlayerInfo from './PlayerInfo.jsx';
import WinnerInfo from './WinnerInfo.jsx';

const WhoIsNextInfo = ({ player, hasWinner, isBoardFull }) => (
  <div>
    {!hasWinner &&
      !isBoardFull && (
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
  hasWinner: WinnerInfo.propTypes.hasWinner,
  isBoardFull: WinnerInfo.propTypes.isBoardFull
};

export default WhoIsNextInfo;
