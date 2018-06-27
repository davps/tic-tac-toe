import React from 'react';

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
/* eslint-enable */
import { MOVE } from '../constants';
import App from '../App';
import Game from '../components/Game';
import Square from '../components/Square';
import Board from '../components/Board';
import ResetGame from '../components/ResetGame';
import NextPlayerName from '../components/NextPlayerName';
import WinnerName from '../components/WinnerName';
import PlayerName from '../components/PlayerName';

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
  .add(
    `Game is not over, used by ${MOVE.PLAYER_1.val}  (${MOVE.PLAYER_1.label} )`,
    () => (
      <Square
        owner={owners()}
        onMove={action('clicked')}
        isGameOver={boolean('Game over', false)}
      />
    )
  )
  .add(
    `Game is not over, used by ${MOVE.PLAYER_2.val}  (${MOVE.PLAYER_2.label} )`,
    () => (
      <Square
        owner={owners(MOVE.PLAYER_2.val)}
        onMove={action('clicked')}
        isGameOver={boolean('Game over', false)}
      />
    )
  )
  .add(
    `Game over, used by ${MOVE.PLAYER_1.val}  (${
      MOVE.PLAYER_1.label
    } ), player is not the winner`,
    () => (
      <Square
        owner={owners()}
        onMove={action('clicked')}
        isGameOver={boolean('Game over', false)}
        isWinningMove={boolean('Is a winner', false)}
      />
    )
  )
  .add(
    `Game over, used by ${MOVE.PLAYER_2.val}  (${
      MOVE.PLAYER_2.label
    } ), player is not the winner`,
    () => (
      <Square
        owner={owners(MOVE.PLAYER_2.val)}
        onMove={action('clicked')}
        isGameOver={boolean('Game over', false)}
        isWinningMove={boolean('Is a winner', false)}
      />
    )
  )
  .add(
    `Game over, used by ${MOVE.PLAYER_1.val}  (${
      MOVE.PLAYER_1.label
    } ), player is the winner`,
    () => (
      <Square
        owner={owners()}
        onMove={action('clicked')}
        isGameOver={boolean('Game over', false)}
        isWinningMove={boolean('Is a winner', true)}
      />
    )
  )
  .add(
    `Game over, used by ${MOVE.PLAYER_2.val}  (${
      MOVE.PLAYER_2.label
    } ), player is the winner`,
    () => (
      <Square
        owner={owners(MOVE.PLAYER_2.val)}
        onMove={action('clicked')}
        isGameOver={boolean('Game over', false)}
        isWinningMove={boolean('Is a winner', true)}
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

const movesWithDraw = [
  MOVE.PLAYER_1.val,
  MOVE.PLAYER_2.val,
  MOVE.PLAYER_1.val,
  MOVE.PLAYER_1.val,
  MOVE.PLAYER_2.val,
  MOVE.PLAYER_2.val,
  MOVE.PLAYER_2.val,
  MOVE.PLAYER_1.val,
  MOVE.PLAYER_2.val
];

const movesWithWinner2 = [
  MOVE.PLAYER_1.val,
  MOVE.PLAYER_1.val,
  MOVE.PLAYER_1.val,
  MOVE.PLAYER_2.val,
  MOVE.PLAYER_2.val,
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
  .add('Game over! and has a winner', () => (
    <Board
      moves={movesWithWinner}
      onMove={action('clicked')}
      isGameOver={boolean('Game over', true)}
      winnerMoves={[0, 1, 2]}
    />
  ))
  .add('Game over! and nobody wins', () => (
    <Board
      moves={movesWithDraw}
      onMove={action('clicked')}
      isGameOver={boolean('Game over', true)}
      winnerMoves={null}
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
      onMove={action('clicked')}
      onReset={action('clicked')}
    />
  ))
  .add('With full board and winner', () => (
    <Game
      xIsNext={boolean(`${MOVE.PLAYER_1.val} is next`, false)}
      winner={MOVE.PLAYER_1.val}
      winnerMoves={[0, 1, 2]}
      isFull={boolean('Is the board full', true)}
      moves={movesWithWinner2}
      onMove={action('clicked')}
      onReset={action('clicked')}
    />
  ))
  .add('With full board and no winner', () => (
    <Game
      xIsNext={boolean(`${MOVE.PLAYER_1.val} is next`, false)}
      winner={null}
      isFull={boolean('Is the board full', true)}
      moves={movesWithDraw}
      onMove={action('clicked')}
      onReset={action('clicked')}
    />
  ));

storiesOf('PlayerName', module)
  .add(
    `PlayerName of  val=${MOVE.PLAYER_1.val} label=${
      MOVE.PLAYER_1.label
    } name=${MOVE.PLAYER_1.name}`,
    () => <PlayerName player={MOVE.PLAYER_1.val} />
  )
  .add(
    `PlayerName of  val=${MOVE.PLAYER_2.val} label=${
      MOVE.PLAYER_2.label
    } name=${MOVE.PLAYER_2.name}`,
    () => <PlayerName player={MOVE.PLAYER_2.val} />
  );

storiesOf('ResetGame', module)
  .addDecorator(withKnobs)
  .add('Game over!', () => (
    <ResetGame
      isGameOver={boolean('Game over', true)}
      onReset={action('clicked')}
    />
  ))
  .add('Game is not over yet (so this component should be hidden) ', () => (
    <ResetGame
      isGameOver={boolean('Game over', false)}
      onReset={action('clicked')}
    />
  ));

storiesOf('NextPlayerName', module)
  .addDecorator(withKnobs)
  .add(`Game is not over and the next player is ${MOVE.PLAYER_1.val} `, () => (
    <NextPlayerName
      player={MOVE.PLAYER_1.val}
      isGameOver={boolean('Game over', false)}
    />
  ))
  .add('Game over! (so this component should be hidden)', () => (
    <NextPlayerName
      player={MOVE.PLAYER_1.val}
      isGameOver={boolean('Game over', true)}
    />
  ));

storiesOf('WinnerName', module)
  .add(`Game over! ${MOVE.PLAYER_1.val} wins. `, () => (
    <WinnerName isBoardFull={false} winner={MOVE.PLAYER_1.val} />
  ))
  .add('Game is NOT over yet (so this component should be hidden)', () => (
    <WinnerName />
  ))
  .add('Game over! The board is full but without a winner', () => (
    <WinnerName isBoardFull />
  ));
