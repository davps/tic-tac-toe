import React from 'react';
import PropTypes from 'prop-types';
import PlayerInfo from './PlayerInfo.jsx';

const WinnerInfo = ({ hasWinner, isBoardFull, player }) => (
  <span>
    {hasWinner && (
      <div>
        The winner is{' '}
        <strong>
          <PlayerInfo player={player} />{' '}
        </strong>{' '}
      </div>
    )}

    {!hasWinner && isBoardFull && <div>Nobody wins!</div>}
  </span>
);

WinnerInfo.propTypes = {
  hasWinner: PropTypes.bool.isRequired,
  player: PropTypes.string,
  isBoardFull: PropTypes.bool.isRequired
};

export default WinnerInfo;
