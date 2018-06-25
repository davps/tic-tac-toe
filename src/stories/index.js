import React from 'react';

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
/* eslint-enable */

import { MOVE } from '../config';
import Square from '../layouts/Square';
import Board from '../layouts/Board';
import PlayAgainButton from '../layouts/PlayAgainButton';
import WhoIsNextInfo from '../layouts/WhoIsNextInfo';
import WinnerInfo from '../layouts/WinnerInfo';
import PlayerInfo from '../layouts/PlayerInfo';
import GameContainer from '../containers/GameContainer';
import App from '../App';
import Game from '../layouts/Game';

const owners = (defaultPlayer = MOVE.PLAYER_1.val) =>
  select(
    'Player',
    [MOVE.PLAYER_1.val, MOVE.PLAYER_2.val],
    defaultPlayer,
    'GROUP-ID1'
  );

// eslint-disable-next-line react/jsx-filename-extension
storiesOf('Full, live game', module).add('Play it here', () => <App />);

storiesOf('Square', module)
  .addDecorator(withKnobs)
  .add('Pending to use (displayed as a button)', () => (
    <Square
      owner={MOVE.PENDING.val}
      onMove={action('clicked')}
      isGameOver={boolean('Game over', false)}
    />
  ))
  .add('Pending to use but game is over', () => (
    <Square
      owner={MOVE.PENDING.val}
      onMove={action('clicked')}
      isGameOver={boolean('Game over', true)}
    />
  ))
  .add(`used by ${MOVE.PLAYER_1.val}  (${MOVE.PLAYER_1.label} )`, () => (
    <Square
      owner={owners()}
      onMove={action('clicked')}
      isGameOver={boolean('Game over', false)}
    />
  ))
  .add(`used by ${MOVE.PLAYER_2.val}  (${MOVE.PLAYER_2.label} )`, () => (
    <Square
      owner={owners(MOVE.PLAYER_2.val)}
      onMove={action('clicked')}
      isGameOver={boolean('Game over', false)}
    />
  ));

const movesAllPending = [
  MOVE.PENDING.val,
  MOVE.PENDING.val,
  MOVE.PENDING.val,
  MOVE.PENDING.val,
  MOVE.PENDING.val,
  MOVE.PENDING.val,
  MOVE.PENDING.val,
  MOVE.PENDING.val,
  MOVE.PENDING.val
];

const movesWithWinner = [
  MOVE.PLAYER_1.val,
  MOVE.PLAYER_1.val,
  MOVE.PLAYER_1.val,
  MOVE.PENDING.val,
  MOVE.PENDING.val,
  MOVE.PENDING.val,
  MOVE.PENDING.val,
  MOVE.PENDING.val,
  MOVE.PENDING.val
];

storiesOf('Board', module)
  .addDecorator(withKnobs)
  .add('Game is not over yet', () => (
    <Board
      moves={movesAllPending}
      onMove={action('clicked')}
      isGameOver={boolean('Game over', false)}
    />
  ))
  .add('Game over!', () => (
    <Board
      moves={movesWithWinner}
      onMove={action('clicked')}
      isGameOver={boolean('Game over', true)}
    />
  ));

storiesOf('Game', module)
  .addDecorator(withKnobs)
  .add('With initialized values', () => (
    <Game
      xIsNext={boolean(`${MOVE.PLAYER_1.val} is next`, false)}
      winner={null}
      isFull={boolean('Is the board full', false)}
      moves={movesAllPending}
      placeMove={action('clicked')}
      resetGame={action('clicked')}
    />
  ));

storiesOf('PlayerInfo', module)
  .add(
    `PlayerInfo of  val=${MOVE.PLAYER_1.val} label=${
      MOVE.PLAYER_1.label
    } name=${MOVE.PLAYER_1.name}`,
    () => <PlayerInfo player={MOVE.PLAYER_1.val} />
  )
  .add(
    `PlayerInfo of  val=${MOVE.PLAYER_2.val} label=${
      MOVE.PLAYER_2.label
    } name=${MOVE.PLAYER_2.name}`,
    () => <PlayerInfo player={MOVE.PLAYER_2.val} />
  );

storiesOf('PlayAgainButton', module)
  .addDecorator(withKnobs)
  .add('Game over!', () => (
    <PlayAgainButton
      isGameOver={boolean('Game over', true)}
      resetGame={action('clicked')}
    />
  ))
  .add('Game is not over yet (so this component should be hidden) ', () => (
    <PlayAgainButton
      isGameOver={boolean('Game over', false)}
      resetGame={action('clicked')}
    />
  ));

storiesOf('WhoIsNextInfo', module)
  .addDecorator(withKnobs)
  .add(`Game is not over and the next player is ${MOVE.PLAYER_1.val} `, () => (
    <WhoIsNextInfo
      player={MOVE.PLAYER_1.val}
      isGameOver={boolean('Game over', false)}
    />
  ))
  .add('Game over! (so this component should be hidden)', () => (
    <WhoIsNextInfo
      player={MOVE.PLAYER_1.val}
      isGameOver={boolean('Game over', true)}
    />
  ));

storiesOf('WinnerInfo', module)
  .add(`Game over! ${MOVE.PLAYER_1.val} wins. `, () => (
    <WinnerInfo isBoardFull={false} player={MOVE.PLAYER_1.val} />
  ))
  .add('Game is NOT over yet (so this component should be hidden)', () => (
    <WinnerInfo
      hasWinner={false}
      isBoardFull={false}
      player={MOVE.PLAYER_1.val}
    />
  ))
  .add('Game over! But without a winner, the board is full', () => (
    <WinnerInfo hasWinner={false} player={MOVE.PLAYER_1.val} />
  ));
