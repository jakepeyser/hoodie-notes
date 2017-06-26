import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import redux from './redux';

export default createStore(
  redux,
  applyMiddleware( thunkMiddleware )
);
