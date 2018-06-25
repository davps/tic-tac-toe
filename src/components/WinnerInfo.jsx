import React from 'react';
import PropTypes from 'prop-types';
import PlayerInfo from './PlayerInfo';
import { MOVE } from '../config';

/* eslint-disable react/jsx-one-expression-per-line */
const WinnerInfo = ({ hasWinner, isBoardFull, player }) => (
  <span>
    {hasWinner && (
      <div className="has-winner">
        The winner{' '}
        <strong>
          <PlayerInfo player={player} />
        </strong>
      </div>
    )}

    {!hasWinner &&
      isBoardFull && <div className="has-no-winner">Nobody wins!</div>}
  </span>
);
/* eslint-enable */

WinnerInfo.propTypes = {
  hasWinner: PropTypes.bool,
  player: PropTypes.oneOf([MOVE.PLAYER_1.val, MOVE.PLAYER_2.val]),
  isBoardFull: PropTypes.bool
};

WinnerInfo.defaultProps = {
  hasWinner: true,
  isBoardFull: true,
  player: null
};

export default WinnerInfo;
