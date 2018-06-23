import React from 'react';
import PropTypes from 'prop-types';
import WinnerInfo from './WinnerInfo.jsx';

const PlayAgainButton = ({ hasWinner, isBoardFull, resetGame }) => (
  <span>
    {(hasWinner || isBoardFull) && (
      <button onClick={resetGame}>Play again</button>
    )}
  </span>
);

PlayAgainButton.propTypes = {
  hasWinner: WinnerInfo.propTypes.hasWinner,
  isBoardFull: WinnerInfo.propTypes.isBoardFull,
  resetGame: PropTypes.func.isRequired
};

export default PlayAgainButton;
