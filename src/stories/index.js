import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

import Square from '../layouts/Square';
import { MOVE } from '../config';
import Board from '../layouts/Board';
import PlayAgainButton from '../layouts/PlayAgainButton';
import WhoIsNextInfo from '../layouts/WhoIsNextInfo';
import WinnerInfo from '../layouts/WinnerInfo';
import PlayerInfo from '../layouts/PlayerInfo';
import Game from '../layouts/Game';

storiesOf('Full game', module).add('Play it here', () => <Game />);

const owners = (defaultPlayer = MOVE.PLAYER_1.val) =>
  select(
    'Player',
    [MOVE.PLAYER_1.val, MOVE.PLAYER_2.val],
    defaultPlayer,
    'GROUP-ID1'
  );

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
  .add(
    'used by ' + MOVE.PLAYER_1.val + ' (' + MOVE.PLAYER_1.label + ')',
    () => (
      <Square
        owner={owners()}
        onMove={action('clicked')}
        isGameOver={boolean('Game over', false)}
      />
    )
  )
  .add(
    'used by ' + MOVE.PLAYER_2.val + ' (' + MOVE.PLAYER_2.label + ')',
    () => (
      <Square
        owner={owners(MOVE.PLAYER_2.val)}
        onMove={action('clicked')}
        isGameOver={boolean('Game over', false)}
      />
    )
  );

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
  .add('board without winner', () => (
    <Board
      moves={movesAllPending}
      onMove={action('clicked')}
      isGameOver={boolean('Game over', false)}
    />
  ))
  .add('board with a winner', () => (
    <Board
      moves={movesWithWinner}
      onMove={action('clicked')}
      isGameOver={boolean('Game over', true)}
    />
  ));

storiesOf('PlayerInfo', module)
  .add(
    'PlayerInfo of  val=' +
      MOVE.PLAYER_1.val +
      ' label=' +
      MOVE.PLAYER_1.label +
      ' name=' +
      MOVE.PLAYER_1.name,
    () => <PlayerInfo player={MOVE.PLAYER_1.val} />
  )
  .add(
    'PlayerInfo of  val=' +
      MOVE.PLAYER_2.val +
      ' label=' +
      MOVE.PLAYER_2.label +
      ' name=' +
      MOVE.PLAYER_2.name,
    () => <PlayerInfo player={MOVE.PLAYER_2.val} />
  );

storiesOf('PlayAgainButton', module)
  .addDecorator(withKnobs)
  .add('game is over', () => (
    <PlayAgainButton
      isGameOver={boolean('Game over', true)}
      resetGame={action('clicked')}
    />
  ))
  .add('game is not over yet (component should be hidden) ', () => (
    <PlayAgainButton
      isGameOver={boolean('Game over', false)}
      resetGame={action('clicked')}
    />
  ));

storiesOf('WhoIsNextInfo', module)
  .addDecorator(withKnobs)
  .add(
    MOVE.PLAYER_1.val + ' is the next player and game did not finish yet',
    () => (
      <WhoIsNextInfo
        player={MOVE.PLAYER_1.val}
        isGameOver={boolean('Game over', false)}
      />
    )
  )
  .add('Game finished (so this component should be hidden)', () => (
    <WhoIsNextInfo
      player={MOVE.PLAYER_1.val}
      isGameOver={boolean('Game over', true)}
    />
  ));

storiesOf('WinnerInfo', module)
  .add(MOVE.PLAYER_1.val + ' wins. ', () => (
    <WinnerInfo
      hasWinner={true}
      isBoardFull={false}
      player={MOVE.PLAYER_1.val}
    />
  ))
  .add(
    'We do not have a winner yet (so this component should be hidden)',
    () => (
      <WinnerInfo
        hasWinner={false}
        isBoardFull={false}
        player={MOVE.PLAYER_1.val}
      />
    )
  )
  .add('We do not have a winner yet and the board is full', () => (
    <WinnerInfo
      hasWinner={false}
      isBoardFull={true}
      player={MOVE.PLAYER_1.val}
    />
  ));
