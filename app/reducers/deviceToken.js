import * as actions from '../actions/actionTypes';

const initialState = {
  deviceToken:"",
  isRegistered:false
  };

export default function deviceTokenReducer(state = initialState,action = {}){
  switch (action.type) {
    case actions.SET_DEVICE_TOKEN:
      return Object.assign({}, state, {
            deviceToken: action.deviceToken
            });
    case 'DEVICE_TOKEN_REGISTRATION_FULFILLED':
        if(action.payload.error){
          ToastAndroid.show(action.payload.error.message, ToastAndroid.LONG)
          return Object.assign({}, state,{
            isRegistered: false,
          })
        }
        return Object.assign({}, state, {
          isRegistered: true
        })
    case 'DEVICE_TOKEN_REGISTRATION_REJECTED':
      ToastAndroid.show('rejected', ToastAndroid.SHORT)
      return Object.assign({}, state,{
        isRegistered: false,
      })
    default:
    return state;
  }

}
