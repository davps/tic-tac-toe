import React from 'react';
import PropTypes from 'prop-types';
import PlayerInfo from './PlayerInfo';
import { SpacedContainer, fadeInOut } from './Container';

const Container = SpacedContainer.extend`
  animation: ${fadeInOut} 1s step-start infinite;
`;

const WhoIsNextInfo = ({ player, isGameOver }) => (
  <div>
    {!isGameOver && (
      <Container>
        <PlayerInfo player={player} />
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <span> turn</span>
      </Container>
    )}
  </div>
);

WhoIsNextInfo.propTypes = {
  player: PlayerInfo.propTypes.player, // eslint-disable-line react/require-default-props
  isGameOver: PropTypes.bool.isRequired
};

export default WhoIsNextInfo;
