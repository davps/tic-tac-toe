import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import PlayerInfo from './PlayerInfo';
import { SpacedContainer } from './Container';

const fadeInOut = keyframes`
  0%,100% { opacity: 0.3 }
  50% { opacity: 1 }
`;

const Container = SpacedContainer.extend`
  animation: ${fadeInOut} 1s step-start infinite;
`;

const WhoIsNextInfo = ({ player, isGameOver }) => (
  <div>
    {!isGameOver && (
      <Container>
        <PlayerInfo player={player} />
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
