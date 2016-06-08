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
            console.log("response then");
	          console.log(response);
            return response.json()
        }).catch(function(err) {
          console.log("err catch");
          console.log(err);
        })
    }
  }
}

export function logout(token) {
  return {
    type: actions.LOGOUT,
    payload: fetch(environment.serverURL+'/Users/logout?access_token=${token}', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
  };
}
