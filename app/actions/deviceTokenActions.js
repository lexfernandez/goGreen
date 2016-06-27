import * as actions from './actionTypes';
import * as environment from '../env';

export  function setDeviceToken(token){
  return {
    type: actions.SET_DEVICE_TOKEN,
    deviceToken: token
  };
}


export function registerDeviceToken(token,deviceId,deviceToken,userId) {
  return {
    type: actions.DEVICE_TOKEN_REGISTRATION,
    payload: fetch(environment.serverURL+'/GcmTokens', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
        "deviceId": deviceId,
        "deviceToken": deviceToken,
        "userId": userId
      })
      }).then(function(response) {
          return response.json()
      }).catch(function(err) {
        return err;
      })
  };
}
