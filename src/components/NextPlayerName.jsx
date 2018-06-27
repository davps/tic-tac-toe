import React from 'react';
import PropTypes from 'prop-types';
import PlayerName from './PlayerName';
import { SpacedContainer, fadeInOut } from './Container';
import { customPropTypes } from '../constants';

const Container = SpacedContainer.extend`
  animation: ${fadeInOut} 1s step-start infinite;
`;

const WhoIsNextInfo = ({ player, isGameOver }) => (
  <div>
    {!isGameOver && (
      <Container>
        <PlayerName player={player} />
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <span> turn</span>
      </Container>
    )}
  </div>
);

WhoIsNextInfo.propTypes = {
  player: customPropTypes.winner.isRequired,
  isGameOver: PropTypes.bool
};

WhoIsNextInfo.defaultProps = {
  isGameOver: false
};

export default WhoIsNextInfo;
