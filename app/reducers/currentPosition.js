import * as actions from '../actions/actionTypes';

const initialState = {
  lat:0.0,
  lon:0.0
  };

export default function currentPositionReducer(state = initialState,action = {}){
  switch (action.type) {
    case actions.SET_CURRENT_POSITION:
      console.log("***********************************",action);
      return Object.assign({}, state, {
          lat:action.location.lat,
          lon:action.location.lon
          });
    default:
    return state;
  }

}
