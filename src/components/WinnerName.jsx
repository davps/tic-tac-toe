import React from 'react';
import PropTypes from 'prop-types';
import PlayerName from './PlayerName';
import { customPropTypes } from '../constants';
import { X, O } from './Icons';
import { SpacedContainer as Container } from './Container';

/* eslint-disable react/jsx-one-expression-per-line */
const WinnerName = ({ winner, isBoardFull }) => (
  <span>
    {winner && (
      <Container className="has-winner">
        <strong>
          <PlayerName player={winner} />
        </strong>
        wins!
      </Container>
    )}

    {!winner &&
      isBoardFull && (
        <Container className="has-no-winner">
          Draw! <X size={25} /> <O size={25} />
        </Container>
      )}
  </span>
);
/* eslint-enable */

WinnerName.propTypes = {
  winner: customPropTypes.winner,
  isBoardFull: PropTypes.bool
};

WinnerName.defaultProps = {
  isBoardFull: false,
  winner: null
};

export default WinnerName;
