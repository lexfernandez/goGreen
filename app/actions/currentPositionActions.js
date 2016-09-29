import * as actions from './actionTypes';

export  function setCurrentPosition(lat,lon){
  return {
    type: actions.SET_CURRENT_POSITION,
    location: {
      lat,
      lon
    }
  };
}
