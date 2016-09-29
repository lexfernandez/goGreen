import * as actions from './actionTypes';
import * as environment from '../env';

export  function setDeviceToken(token){
  return {
    type: actions.SET_DEVICE_TOKEN,
    deviceToken: token
  };
}


export function registerDeviceToken(token,deviceId,deviceToken,userId) {
  console.log("userId",userId);
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

export function unregisterDeviceToken(token,deviceTokenId) {
  return {
    type: actions.DEVICE_TOKEN_UNREGISTRATION,
    payload: fetch(environment.serverURL+'/GcmTokens/'+deviceTokenId, {
        method: 'DELETE',
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
