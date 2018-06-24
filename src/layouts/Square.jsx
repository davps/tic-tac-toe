import React from 'react';
import PropTypes from 'prop-types';
import { MOVE } from '../config';

/**
 * A square of tic tac toe board
 * @param {string} owner The player (val) that owns the square
 */
const Square = function({ owner, onMove, isGameOver }) {
  const elements = {};
  elements[MOVE.PENDING.val] = <button disabled={isGameOver} onClick={onMove} />;
  elements[MOVE.PLAYER_1.val] = <span>{MOVE.PLAYER_1.label}</span>;
  elements[MOVE.PLAYER_2.val] = <span>{MOVE.PLAYER_2.label}</span>;
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
};

export default Square;
