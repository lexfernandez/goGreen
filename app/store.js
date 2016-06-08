import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import createLogger from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import promiseMiddleware from 'redux-promise-middleware';
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const store = createStoreWithMiddleware(reducers);

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});


var createStoreWithMiddleware = applyMiddleware(thunk,logger,promiseMiddleware())(createStore);

function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(createStoreWithMiddleware)(reducers);
  persistStore(store, {storage: AsyncStorage}, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

export default configureStore;
