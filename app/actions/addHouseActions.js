import * as actions from './actionTypes';
import * as environment from '../env';

export function addHouse(token,name,location,userId) {

  
  return {
    type: actions.ADD_NEW_HOUSE,
    payload: {
      promise: fetch(environment.serverURL+'/Houses', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
          name,
          location,
          userId
        })
        }).then(function(response) {
            return response.json()
        }).catch(function(err) {
          return err;
        })
    }
  }
}
