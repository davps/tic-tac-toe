import { PLACE_MOVE, RESET_GAME } from '../actions/actions';
import initialState from '../store/initialState';
import Logic from './Logic';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PLACE_MOVE: {
      return Logic.makeMove(action.position, state);
    }

    case RESET_GAME: {
      return initialState;
    }

    default:
      return state;
  }
}
