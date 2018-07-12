import { PLACE_MOVE, RESET_GAME } from '../actions/actions';
import initialState from '../store/initialState';
import MoveResolver from './MoveResolver';
import Script from './Script';
import GameOverDetector from './GameOverDetector';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PLACE_MOVE: {
      const { position } = action;
      return MoveResolver.reduce({ state, position, Script, GameOverDetector });
    }

    case RESET_GAME: {
      return initialState;
    }

    default:
      return state;
  }
}
