import React from 'react';
import PropTypes from 'prop-types';
import PlayerInfo from './PlayerInfo';
import { MOVE } from '../constants';
import { X, O } from './Icons';
import { SpacedContainer as Container } from './Container';

/* eslint-disable react/jsx-one-expression-per-line */
const WinnerInfo = ({ hasWinner, isBoardFull, player }) => (
  <span>
    {hasWinner && (
      <Container className="has-winner">
        <strong>
          <PlayerInfo player={player} />
        </strong>
        wins!
      </Container>
    )}

    {!hasWinner &&
      isBoardFull && (
        <Container className="has-no-winner">
          Draw! <X size={25} /> <O size={25} />
        </Container>
      )}
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
