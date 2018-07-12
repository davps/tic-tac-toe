import React from 'react';

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
/* eslint-enable */
import App from '../App';
import Game from '../components/Game';
import Square from '../components/Square';
import Board from '../components/Board';
import ResetGame from '../components/ResetGame';
import NextPlayerName from '../components/NextPlayerName';
import WinnerName from '../components/WinnerName';
import PlayerName from '../components/PlayerName';
import ACTOR from '../reducers/ACTOR';

const { PLAYER_1, PLAYER_2, PENDING } = ACTOR;

const owners = (defaultPlayer = PLAYER_1) =>
  select('Player', [PLAYER_1, PLAYER_2], defaultPlayer, 'GROUP-ID1');

// eslint-disable-next-line react/jsx-filename-extension
storiesOf('Full, live game', module).add('Play it here', () => <App />);

storiesOf('Square', module)
  .addDecorator(withKnobs)
  .add('Pending to use (displayed as a button)', () => (
    <Square
      owner={PENDING}
      onMove={action('clicked')}
      isGameOver={boolean('Game over', false)}
    />
  ))
  .add('Pending to use but game is over', () => (
    <Square
      owner={PENDING}
      onMove={action('clicked')}
      isGameOver={boolean('Game over', true)}
    />
  ))
  .add(
    `Game is not over, used by ${PLAYER_1}  (${ACTOR.label[PLAYER_1]} )`,
    () => (
      <Square
        owner={owners()}
        onMove={action('clicked')}
        isGameOver={boolean('Game over', false)}
      />
    )
  )
  .add(
    `Game is not over, used by ${PLAYER_2}  (${ACTOR.label[PLAYER_2]} )`,
    () => (
      <Square
        owner={owners(PLAYER_2)}
        onMove={action('clicked')}
        isGameOver={boolean('Game over', false)}
      />
    )
  )
  .add(
    `Game over, used by ${PLAYER_1}  (${
      ACTOR.label[PLAYER_1]
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
    `Game over, used by ${PLAYER_2}  (${
      ACTOR.label[PLAYER_2]
    } ), player is not the winner`,
    () => (
      <Square
        owner={owners(PLAYER_2)}
        onMove={action('clicked')}
        isGameOver={boolean('Game over', false)}
        isWinningMove={boolean('Is a winner', false)}
      />
    )
  )
  .add(
    `Game over, used by ${PLAYER_1}  (${
      ACTOR.label[PLAYER_1]
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
    `Game over, used by ${PLAYER_2}  (${
      ACTOR.label[PLAYER_2]
    } ), player is the winner`,
    () => (
      <Square
        owner={owners(PLAYER_2)}
        onMove={action('clicked')}
        isGameOver={boolean('Game over', false)}
        isWinningMove={boolean('Is a winner', true)}
      />
    )
  );

const movesAllPending = [
  PENDING,
  PENDING,
  PENDING,
  PENDING,
  PENDING,
  PENDING,
  PENDING,
  PENDING,
  PENDING
];

const movesWithWinner = [
  PLAYER_1,
  PLAYER_1,
  PLAYER_1,
  PENDING,
  PENDING,
  PENDING,
  PENDING,
  PENDING,
  PENDING
];

const movesWithDraw = [
  PLAYER_1,
  PLAYER_2,
  PLAYER_1,
  PLAYER_1,
  PLAYER_2,
  PLAYER_2,
  PLAYER_2,
  PLAYER_1,
  PLAYER_2
];

const movesWithWinner2 = [
  PLAYER_1,
  PLAYER_1,
  PLAYER_1,
  PLAYER_2,
  PLAYER_2,
  PENDING,
  PENDING,
  PENDING,
  PENDING
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
      xIsNext={boolean(`${PLAYER_1} is next`, false)}
      winner={null}
      isFull={boolean('Is the board full', false)}
      moves={movesAllPending}
      onMove={action('clicked')}
      onReset={action('clicked')}
    />
  ))
  .add('With full board and winner', () => (
    <Game
      xIsNext={boolean(`${PLAYER_1} is next`, false)}
      winner={PLAYER_1}
      winnerMoves={[0, 1, 2]}
      isFull={boolean('Is the board full', true)}
      moves={movesWithWinner2}
      onMove={action('clicked')}
      onReset={action('clicked')}
    />
  ))
  .add('With full board and no winner', () => (
    <Game
      xIsNext={boolean(`${PLAYER_1} is next`, false)}
      winner={null}
      isFull={boolean('Is the board full', true)}
      moves={movesWithDraw}
      onMove={action('clicked')}
      onReset={action('clicked')}
    />
  ));

storiesOf('PlayerName', module)
  .add(
    `PlayerName of  val=${PLAYER_1} label=${ACTOR.label[PLAYER_1]} name=${
      ACTOR.name[PLAYER_1]
    }`,
    () => <PlayerName player={PLAYER_1} />
  )
  .add(
    `PlayerName of  val=${PLAYER_2} label=${ACTOR.label[PLAYER_2]} name=${
      ACTOR.name[PLAYER_2]
    }`,
    () => <PlayerName player={PLAYER_2} />
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
  .add(`Game is not over and the next player is ${PLAYER_1} `, () => (
    <NextPlayerName
      player={PLAYER_1}
      isGameOver={boolean('Game over', false)}
    />
  ))
  .add('Game over! (so this component should be hidden)', () => (
    <NextPlayerName player={PLAYER_1} isGameOver={boolean('Game over', true)} />
  ));

storiesOf('WinnerName', module)
  .add(`Game over! ${PLAYER_1} wins. `, () => (
    <WinnerName isBoardFull={false} winner={PLAYER_1} />
  ))
  .add('Game is NOT over yet (so this component should be hidden)', () => (
    <WinnerName />
  ))
  .add('Game over! The board is full but without a winner', () => (
    <WinnerName isBoardFull />
  ));
