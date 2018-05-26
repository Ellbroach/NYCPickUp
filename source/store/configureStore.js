import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './actions/auth';
// import roomsReducer from '../reducers/rooms';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    console.log('creating store')
  const store = createStore(
    combineReducers({
      auth: authReducer,
    //   rooms: roomsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
