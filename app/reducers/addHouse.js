import * as actions from '../actions/actionTypes';
import {ToastAndroid} from 'react-native';

const initialState = [];

export default function AddHouseReducer(state = initialState,action = {}){
  switch (action.type) {
    case 'ADD_NEW_HOUSE_FULFILLED':
        if(action.payload.error){
          ToastAndroid.show(action.payload.error.message, ToastAndroid.LONG)
          return state
        }
        return [
          ...state,
          action.house
        ]
    case 'ADD_NEW_HOUSE_REJECTED':
      ToastAndroid.show('rejected', ToastAndroid.SHORT)
      return state
    default:
    return state;
  }

}
