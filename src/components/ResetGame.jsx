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

const ResetGame = ({ isGameOver, onReset }) => (
  <div style={{ height: 57 }}>
    {isGameOver && (
      <Button className="play-again" onClick={onReset}>
        Play again
      </Button>
    )}
  </div>
);

ResetGame.propTypes = {
  isGameOver: PropTypes.bool,
  onReset: PropTypes.func.isRequired
};

ResetGame.defaultProps = {
  isGameOver: false
};

export default ResetGame;
