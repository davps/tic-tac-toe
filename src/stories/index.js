import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Square from '../layouts/Square';
import { MOVE } from '../config';
import Board from '../layouts/Board';
import PlayAgainButton from '../layouts/PlayAgainButton';
import WhoIsNextInfo from '../layouts/WhoIsNextInfo';
import WinnerInfo from '../layouts/WinnerInfo';
import PlayerInfo from '../layouts/PlayerInfo';
import TicTacToe from '../TicTacToe';

storiesOf('Square', module)
  .add('as a button, pending to use', () =>  
    <Square owner={MOVE.PENDING.val} onMove={action('clicked')} disabled={false} />
  )
  .add('used by ' + MOVE.PLAYER_1.val + ' (' + MOVE.PLAYER_1.label + ')', () =>  
    <Square owner={MOVE.PLAYER_1.val} onMove={action('clicked')} disabled={false} />
  )
  .add('used by ' + MOVE.PLAYER_2.val + ' (' + MOVE.PLAYER_2.label + ')', () =>  
    <Square owner={MOVE.PLAYER_2.val} onMove={action('clicked')} disabled={false} />
  );

const squaresPending = [
  MOVE.PENDING.val, MOVE.PENDING.val, MOVE.PENDING.val,
  MOVE.PENDING.val, MOVE.PENDING.val, MOVE.PENDING.val,
  MOVE.PENDING.val, MOVE.PENDING.val, MOVE.PENDING.val,
];

const squaresWithWinner = [
  MOVE.PLAYER_1.val, MOVE.PLAYER_1.val, MOVE.PLAYER_1.val,
  MOVE.PENDING.val, MOVE.PENDING.val, MOVE.PENDING.val,
  MOVE.PENDING.val, MOVE.PENDING.val, MOVE.PENDING.val,
];

storiesOf('Board', module)
  .add('board without winner', () =>  
    <Board squares={squaresPending} onMove={action('clicked')} hasWinner={false} />
  )
  .add('board with a winner', () =>  
    <Board squares={squaresWithWinner} onMove={action('clicked')} hasWinner={true} />
  )

storiesOf('Player info', module)
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

storiesOf('Play again button', module)
  .add('game ended', () => (
    <PlayAgainButton
      hasWinner={true}
      isBoardFull={false}
      resetGame={action('clicked')}
    />
  ))
  .add('game did not end yet (component should be hidden) ', () => (
    <PlayAgainButton
      hasWinner={false}
      isBoardFull={false}
      resetGame={action('clicked')}
    />
  ));

storiesOf('Information about who is the next player', module)
  .add(MOVE.PLAYER_1.val + ' is the next player and game did not finish yet', () => (
    <WhoIsNextInfo
      player={MOVE.PLAYER_1.val}
      hasWinner={false}
      isBoardFull={false}
    />
  ))
  .add('We have a winner (so this component should be hidden)', () => (
    <WhoIsNextInfo
      player={MOVE.PLAYER_1.val}
      hasWinner={true}
      isBoardFull={false}
    />
  ))
  .add('Board is full and nobody wins (so this component should be hidden)', () => (
    <WhoIsNextInfo
      player={MOVE.PLAYER_1.val}
      hasWinner={false}
      isBoardFull={true}
    />
  ));

storiesOf('Winner information', module)
  .add(MOVE.PLAYER_1.val + ' wins. ', () =>
    <WinnerInfo hasWinner={true} isBoardFull={false} player={MOVE.PLAYER_1.val} />
  )
  .add('We do not have a winner yet (so this component should be hidden)', () =>
    <WinnerInfo hasWinner={false} isBoardFull={false} player={MOVE.PLAYER_1.val} />
  )
  .add('We do not have a winner yet and the board is full', () =>
    <WinnerInfo hasWinner={false} isBoardFull={true} player={MOVE.PLAYER_1.val} />
  )

storiesOf('Full game', module)
  .add('Play it here', () =>
    <TicTacToe />
  )

