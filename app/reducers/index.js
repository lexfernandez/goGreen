import { combineReducers } from 'redux';
import todoReducer from './todo';
import visibilityFilterReducer from './filters';
import addModalVisibilityReducer from './add-modal';
import routes from './routes';

const reducers = combineReducers({
  routes,
  todos: todoReducer,
  filter: visibilityFilterReducer,
  addModal: addModalVisibilityReducer
})

export default reducers
