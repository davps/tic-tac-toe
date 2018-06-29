import { createStore } from 'redux';
import reducer from '../reducers/reducer';
import initialState from './initialState';

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
