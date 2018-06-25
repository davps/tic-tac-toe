import { createStore } from 'redux';
import reducer from '../reducers/reducer';
import initialState from '../store/initialState';

const store = createStore(reducer, initialState);

export default store;
