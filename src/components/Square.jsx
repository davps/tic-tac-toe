import React from 'react';
import PropTypes from 'prop-types';
import { MOVE } from '../config';

/**
 * A square of tic tac toe board
 * @param {string} owner The player (val) that owns the square
 */
const Square = ({ owner, onMove, isGameOver, className }) => {
  const elements = {};
  elements[MOVE.PENDING.val] = (
    <button
      type="button"
      className={`square pending ${className}`}
      disabled={isGameOver}
      onClick={onMove}
    />
  );
  /* eslint-disable react/jsx-one-expression-per-line */
  elements[MOVE.PLAYER_1.val] = (
    <span className={`square placed ${className}`}>{MOVE.PLAYER_1.label}</span>
  );
  elements[MOVE.PLAYER_2.val] = (
    <span className={`square placed ${className}`}>{MOVE.PLAYER_2.label}</span>
  );
  /* eslint-enable */

  return elements[owner];
};

Square.propTypes = {
  owner: PropTypes.oneOf([
    MOVE.PENDING.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_2.val
  ]).isRequired,
  onMove: PropTypes.func.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  className: PropTypes.string
};

Square.defaultProps = {
  className: ''
};

export default Square;
