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
          if(action.payload.error){
            ToastAndroid.show(action.payload.error.message, ToastAndroid.LONG)
            return Object.assign({}, state,{
              error: action.payload.error.message,
              isLoggingIn: false,
              isLoggedIn: false,
            })
          }

          ToastAndroid.show('Welcome!', ToastAndroid.SHORT)
          return Object.assign({}, state, {
            error: null,
            isLoggingIn: false,
            isLoggedIn: true,
            token: action.payload.id,
            userId: action.payload.userId
          })
      case 'LOGIN_REJECTED':
        ToastAndroid.show('rejected', ToastAndroid.SHORT)
        return Object.assign({}, state,{
          error: action.payload.error.message,
          isLoggingIn: false,
          isLoggedIn: false,
        })
      case 'LOGOUT_PENDING':
          return state;
      case 'LOGOUT_FULFILLED':
        if(action.payload.error){
          ToastAndroid.show(action.payload.error.message, ToastAndroid.SHORT)
          if(action.payload.error.status===500){
            return Object.assign({}, state,{
              error: action.payload.error.message,
              isLoggingIn: false,
              isLoggedIn: false,
              token: ''
            })
          }
          return Object.assign({}, state,{
            error: action.payload.error.message,
          })
        }
          ToastAndroid.show('bye!', ToastAndroid.SHORT)
          return initialState;
      case 'LOGOUT_REJECTED':
        if(action.payload.error){
          ToastAndroid.show(action.payload.error.message, ToastAndroid.SHORT)

          return Object.assign({}, state,{
            error: action.payload.error.message,
          })
        }
        ToastAndroid.show('Logout failed!', ToastAndroid.SHORT)
        return state
        default:
          return state;
      }
    }
