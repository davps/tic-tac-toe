import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { DIMENSIONS, customPropTypes } from '../constants';
import { X, O } from './Icons';
import ACTOR from '../reducers/ACTOR';

const { PLAYER_1, PLAYER_2, PENDING } = ACTOR;

const Container = styled.div`
  width: ${DIMENSIONS.square.width}px;
  height: ${DIMENSIONS.square.height}px;
  background-color: white;
  margin-top: ${({ top }) => `${top}px;`}
  margin-bottom: ${({ bottom }) => `${bottom}px;`}
  margin-left: ${({ left }) => `${left}px;`}
  margin-right: ${({ right }) => `${right}px;`}
`;

const buttonSize = 80;
const Button = styled.button`
  width: ${buttonSize}%;
  height: ${buttonSize}%;
  margin: ${(100 - buttonSize) / 2}%;

  border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
  border-style: solid;
  border-width: 1px;
  padding: 1px 7px 2px;
  background-color: white;

  position: relative;
  display: inline-block;

  border-radius: 5px;
  color: #fff;
  position: relative;
  display: inline-block;

  &: hover {
    background-color: #eee;
  }
`;

const fadeInOut = keyframes`
  0%,100% { opacity: 0.8 }
  50% { opacity: 1 }
`;

const BlinkingContainer = Container.extend`
  animation: ${fadeInOut} 1s step-start infinite;
`;

const fadeIn = keyframes`
  100% { transform: scale(1,1); }
`;

const Animation = styled.div`
  animation: ${fadeIn} 0.1s ease-out
  transform: scale(0,0);
  animation-fill-mode: forwards; /* Add this so that your div doesn't close after the animation completes */
`;

/**
 * A square of tic tac toe board
 * @param {string} owner The player (val) that owns the square
 */
const Square = ({
  owner,
  onMove,
  isGameOver,
  className,
  isWinningMove,
  style
}) => {
  const SelectedContainer = isWinningMove ? BlinkingContainer : Container;
  return (
    <SelectedContainer {...style}>
      {owner === PLAYER_1 && (
        <Animation>
          <X className={className} />
        </Animation>
      )}
      {owner === PLAYER_2 && (
        <Animation>
          <O className={className} />
        </Animation>
      )}
      {owner === PENDING && isGameOver && <span />}
      {owner === PENDING &&
        !isGameOver && (
          <Button
            type="button"
            className={`square pending ${className}`}
            disabled={isGameOver}
            onClick={onMove}
          />
        )}
    </SelectedContainer>
  );
};

Square.propTypes = {
  owner: customPropTypes.moveVal.isRequired,
  onMove: PropTypes.func.isRequired,
  isGameOver: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
  }),
  isWinningMove: PropTypes.bool
};

Square.defaultProps = {
  isGameOver: false,
  className: '',
  style: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  isWinningMove: false
};

export default Square;
