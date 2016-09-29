import * as actions from '../actions/actionTypes';
import {ToastAndroid} from 'react-native';

const initialState = {
  deviceToken:"",
  isRegistered:false,
  id:0
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
            id:0
          })
        }
        return Object.assign({}, state, {
          isRegistered: true,
          id:action.payload.id
        })
    case 'DEVICE_TOKEN_REGISTRATION_REJECTED':
      ToastAndroid.show('rejected', ToastAndroid.SHORT)
      return Object.assign({}, state,{
        isRegistered: false,
        id:0
      })
      case 'DEVICE_TOKEN_UNREGISTRATION_FULFILLED':
          if(action.payload.error){
            ToastAndroid.show(action.payload.error.message, ToastAndroid.LONG)
            return state
          }
          return Object.assign({}, state, {
            isRegistered: false,
            id:0
          })
      case 'DEVICE_TOKEN_UNREGISTRATION_REJECTED':
        ToastAndroid.show('rejected', ToastAndroid.SHORT)
        return state
    default:
    return state;
  }

}
