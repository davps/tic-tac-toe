import React from 'react';
import PropTypes from 'prop-types';
import PlayerName from './PlayerName';
import { SpacedContainer, animation } from './Container';
import { customPropTypes } from '../constants';

const Container = SpacedContainer.extend`
  ${animation};
`;

const WhoIsNextInfo = ({ player, isGameOver }) => (
  <div>
    {!isGameOver && (
      <Container className="game-is-not-over">
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
