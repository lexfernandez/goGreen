import * as actions from './actionTypes';
import * as environment from '../env';

export function login(username,password) {

  console.log(environment.serverURL+'/Users/login?'+username+'-'+password);
  return {
    type: actions.LOGIN,
    payload: {
      promise: fetch(environment.serverURL+'/Users/login', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'username': username,
            'password': password
          })
        }).then(function(response) {
            return response.json()
        }).catch(function(err) {
          return err;
        })
    }
  }
}

export function logout(token) {
  console.log(environment.serverURL+'/Users/logout?access_token='+token);
  return {
    type: actions.LOGOUT,
    payload: fetch(environment.serverURL+'/Users/logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }).then(function(response) {
          return response.json()
      }).catch(function(err) {
        return err;
      })
  };
}
