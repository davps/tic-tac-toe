import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import PlayerName from './PlayerName';
import { SpacedContainer as Container } from './Container';
import { customPropTypes } from '../constants';

const fadeIn = keyframes`
  100% { transform: scale(1, 1); }
`;

const NextPlayerName = ({ player, isGameOver }) => {
  // create this Animation component inside
  // to reset the animation on every render
  const Animation = styled.div`
    animation: ${fadeIn} 0.1s ease-out
    transform: scale(0.7,0.7);
    animation-fill-mode: forwards; /* Add this so that your div doesn't close after the animation completes */
  `;

  return (
    <div>
      {!isGameOver && (
        <Animation>
          <Container player={player} className="game-is-not-over">
            <PlayerName player={player} />
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <span> turn</span>
          </Container>
        </Animation>
      )}
    </div>
  );
};

NextPlayerName.propTypes = {
  player: customPropTypes.winner.isRequired,
  isGameOver: PropTypes.bool
};

NextPlayerName.defaultProps = {
  isGameOver: false
};

export default NextPlayerName;
