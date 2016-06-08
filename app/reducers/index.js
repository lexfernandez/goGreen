import { combineReducers } from 'redux';
import todoReducer from './todo';
import visibilityFilterReducer from './filters';
import addModalVisibilityReducer from './add-modal';
import auth from './auth';
import routes from './routes';

const reducers = combineReducers({
  routes,
  auth,
  todos: todoReducer,
  filter: visibilityFilterReducer,
  addModal: addModalVisibilityReducer
})

export default reducers
