import store from './store';
import initialState from './initialState';
import { placeMove } from '../actions/actions';
import ACTOR from '../reducers/ACTOR';

const { PLAYER_1, PENDING } = ACTOR;

it('verify if the store works', () => {
  expect(store.getState()).toEqual(initialState);

  const unsubscribe = store.subscribe(() => {
    const moves = [
      PLAYER_1,
      PENDING,
      PENDING,
      PENDING,
      PENDING,
      PENDING,
      PENDING,
      PENDING,
      PENDING
    ];
    expect(store.getState().moves).toEqual(moves);
  });

  store.dispatch(placeMove(0));
  unsubscribe();
});
