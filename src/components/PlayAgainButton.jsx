import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  color: #444444;
  background: #f3f3f3;
  border: 1px #dadada solid;
  padding: 5px 10px;
  border-radius: 2px;
  font-weight: bold;
  font-size: 9pt;
  outline: none;
  margin: 15px;

  &: hover {
    border: 1px #c6c6c6 solid;
    box-shadow: 1px 1px 1px #eaeaea;
    color: #333333;
    background: #f7f7f7;
  }
`;

const PlayAgainButton = ({ isGameOver, resetGame }) => (
  <span>
    {isGameOver && (
      <Button className="play-again" onClick={resetGame}>
        Play again
      </Button>
    )}
  </span>
);

PlayAgainButton.propTypes = {
  isGameOver: PropTypes.bool.isRequired,
  resetGame: PropTypes.func.isRequired
};

export default PlayAgainButton;
