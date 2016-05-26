'use strict';

import * as actions from '../actions/actionTypes';
import {visibilityFilters} from '../actions/actionTypes';

const initialState = visibilityFilters.SHOW_ALL;

export default function visibilityFilterReducer(filter = initialState,action ={}){
  switch (action.type) {
    case actions.SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return filter;
  }
}
