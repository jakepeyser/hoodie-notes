import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

export default createStore(
  combineReducers(reducers),
  applyMiddleware( thunkMiddleware )
);
