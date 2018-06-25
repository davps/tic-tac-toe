import React from 'react';
import PropTypes from 'prop-types';

const PlayAgainButton = ({ isGameOver, resetGame }) => (
  <span>
    {isGameOver && (
      <button className="play-again" type="button" onClick={resetGame}>
        Play again
      </button>
    )}
  </span>
);

PlayAgainButton.propTypes = {
  isGameOver: PropTypes.bool.isRequired,
  resetGame: PropTypes.func.isRequired
};

export default PlayAgainButton;
