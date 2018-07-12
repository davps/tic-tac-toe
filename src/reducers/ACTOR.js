/**
 * I used the key property on this data structure because it is
 * easiert to debug with it (instead of using null or empty)
 */

// structured to make the usage more expresive
const ACTOR = {
  // these enumerations are used everywhere
  PENDING: 'PENDING',
  PLAYER_1: 'PLAYER_1',
  PLAYER_2: 'PLAYER_2',

  // these enumerations are used only on a few places, so it's not too expresive (that's the trade-off)
  label: {},
  name: {}
};

ACTOR.label[ACTOR.PENDING] = ' ';
ACTOR.label[ACTOR.PLAYER_1] = 'X';
ACTOR.label[ACTOR.PLAYER_2] = 'O';
ACTOR.name[ACTOR.PENDING] = ' ';
ACTOR.name[ACTOR.PLAYER_1] = 'Laura';
ACTOR.name[ACTOR.PLAYER_2] = 'David';

export default ACTOR;
