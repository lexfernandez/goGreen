import * as actions from '../actions/actionTypes';
import {ToastAndroid} from 'react-native';

const initialState = {
  username: '',
  isLoggingIn: false,
  isLoggedIn: false,
  token:'',
  userId:0,
  error: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return Object.assign({}, state, {
            isLoggingIn: true,
            isLoggedIn: false,
            username: action.username
            })
    case 'LOGIN_FULFILLED':
      ToastAndroid.show(action.payload.id, ToastAndroid.LONG)
      return Object.assign({}, state, {
  error: null,
  isLoggingIn: false,
  isLoggedIn: true,
  token: action.payload.id,
  userId: action.payload.userId
})
    case 'LOGIN_REJECTED':
    ToastAndroid.show('rejected', ToastAndroid.LONG)
      return Object.assign({}, state,{
  error: action.error,
  isLoggingIn: false,
  isLoggedIn: false,
})
    default:
      return state;
  }
}
