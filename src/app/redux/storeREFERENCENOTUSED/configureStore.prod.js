// @flow weak

import {
  createStore,
  applyMiddleware
}                               from 'redux';
import thunkMiddleware          from 'redux-thunk';
import reducer                  from '../reducers';
import { composeWithDevTools }  from 'redux-devtools-extension';

// createStore : enhancer
const enhancer = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware,
  )
);

export default function configureStore(initialState) {
  return createStore(reducer, initialState, enhancer);
}
