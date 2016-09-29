import { combineReducers } from 'redux';
import todoReducer from './todo';
import visibilityFilterReducer from './filters';
import addModalVisibilityReducer from './add-modal';
import deviceTokenReducer from './deviceToken';
import currentPositionReducer from './currentPosition';
import AddHouseReducer from './addHouse';
import auth from './auth';
import routes from './routes';

const reducers = combineReducers({
  routes,
  auth,
  todos: todoReducer,
  filter: visibilityFilterReducer,
  addModal: addModalVisibilityReducer,
  deviceToken: deviceTokenReducer,
  currentPosition:currentPositionReducer,
  houses:AddHouseReducer
})

export default reducers
