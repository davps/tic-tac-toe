import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MOVE, DIMENSIONS } from '../constants';

const Container = styled.div`
  width: ${DIMENSIONS.square.width}px;
  height: ${DIMENSIONS.square.height}px;
  /*background-color: #aaa9;*/
  background-color: white;
  margin-top: ${({ top }) => `${top}px;`}
  margin-bottom: ${({ bottom }) => `${bottom}px;`}
  margin-left: ${({ left }) => `${left}px;`}
  margin-right: ${({ right }) => `${right}px;`}
`;

const Button = styled.button`
  width: 90%;
  height: 90%;
  margin: 5%;

  border-radius: 5px;
  color: #fff;
  position: relative;
  display: inline-block;

  &: hover {
    background-color: #eee;
  }
`;

/**
 * A square of tic tac toe board
 * @param {string} owner The player (val) that owns the square
 */
const Square = ({ owner, onMove, isGameOver, className, style }) => {
  const elements = {};
  elements[MOVE.PENDING.val] = isGameOver ? (
    <span />
  ) : (
    <Button
      type="button"
      className={`square pending ${className}`}
      disabled={isGameOver}
      onClick={onMove}
    />
  );

  elements[MOVE.PLAYER_1.val] = (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <g id="svg_1" transform="translate(-64,0)">
        <path
          fill="#000000"
          fillRule="nonzero"
          stroke="#000000"
          strokeWidth="2"
          strokeMiterlimit="4"
          strokeDashoffset="0"
          id="path3676"
          d="m74.703056,8.841259c19.607048,11.244652 33.795158,29.334084 49.728645,44.918777c-7.007111,7.20647 -11.414139,-6.358295 -17.052429,-9.858994c-11.052872,-12.053177 -22.706978,-24.248817 -37.325134,-31.945286c1.549683,-1.038117 3.099236,-2.076383 4.648918,-3.114498z"
        />
        <path
          fill="#000000"
          fillRule="nonzero"
          stroke="#000000"
          strokeWidth="2"
          strokeMiterlimit="4"
          strokeDashoffset="0"
          id="path3678"
          d="m120.117722,8.394409c-11.148987,14.233082 -23.505707,27.402821 -36.517448,39.945713c-1.795517,4.951488 -18.3871,16.510624 -8.64241,6.133335c13.050117,-14.025063 27.335167,-26.984692 38.808296,-42.446398c1.308609,-2.23285 4.248138,-2.444931 6.351563,-3.63265z"
        />
      </g>
    </svg>
  );

  elements[MOVE.PLAYER_2.val] = (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
      <g>
        <path
          fill="#000000"
          fillRule="nonzero"
          stroke="#000000"
          strokeWidth="2"
          strokeMiterlimit="4"
          strokeDashoffset="0"
          id="path3666"
          d="m35.104694,11.161316c-3.745693,-0.694368 -16.796932,3.032976 -14.63146,2.685302c3.489632,-2.757582 -8.717073,9.22066 -6.354376,14.71551c-1.657402,15.053522 14.30228,23.750284 27.104179,25.269571c3.250519,0.293041 12.036514,-3.859299 4.552967,-0.218243c8.041058,-10.160023 5.919575,-26.781155 -2.633755,-36.271605c-5.378586,-3.32588 -15.767635,-10.787502 -4.564316,-9.648385c12.621204,5.820886 19.66098,20.668349 16.303444,34.1296c-0.427242,14.974796 -21.150288,18.985233 -31.472523,10.861671c-13.402975,-4.417789 -18.267056,-21.579205 -10.777348,-33.029352c4.744314,-8.447283 21.285046,-12.820305 25.849361,-10.947108c-1.125397,0.817653 -2.250782,1.635401 -3.376175,2.453038z"
        />
      </g>
    </svg>
  );

  return <Container {...style}>{elements[owner]}</Container>;
};

Square.propTypes = {
  owner: PropTypes.oneOf([
    MOVE.PENDING.val,
    MOVE.PLAYER_1.val,
    MOVE.PLAYER_2.val
  ]).isRequired,
  onMove: PropTypes.func.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
  })
};

Square.defaultProps = {
  className: '',
  style: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
};

export default Square;
