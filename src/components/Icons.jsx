import React from 'react';
import PropTypes from 'prop-types';
import ACTOR from '../reducers/ACTOR';

const { PLAYER_1, PLAYER_2 } = ACTOR;

/**
 * The svg transformation to the origin is tricky
 * Source: https://stackoverflow.com/a/49563224
 */

export const X = ({ size, className }) => (
  <span
    style={{
      width: 'auto',
      height: `${size}px`
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="100%"
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
      className={`${PLAYER_1} ${className}`}
    >
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
  </span>
);

X.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
};

X.defaultProps = {
  size: 64,
  className: ''
};

export const O = ({ size, className }) => (
  <span
    style={{
      width: 'auto',
      height: `${size}px`
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="100%"
      viewBox="0 0 64 64"
      preserveAspectRatio="xMidYMid meet"
      className={`${PLAYER_2} ${className}`}
    >
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
  </span>
);

O.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
};

O.defaultProps = {
  size: 64,
  className: ''
};
