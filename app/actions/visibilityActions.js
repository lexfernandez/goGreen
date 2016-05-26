import * as actions from './actionTypes';

export function setVisibilityFilter(filter){
  return {
    type: actions.SET_VISIBILITY_FILTER,
    filter
  }
}

export function showAll() {
  return {
    type: actions.SET_VISIBILITY_FILTER,
    filter: actions.visibilityFilters.SHOW_ALL
  };
}

export function showCompleted() {
  return {
    type: actions.SET_VISIBILITY_FILTER,
    filter: actions.visibilityFilters.SHOW_COMPLETED
  };
}

export function showIncomplete() {
  return {
    type: actions.SET_VISIBILITY_FILTER,
    filter: actions.visibilityFilters.SHOW_ACTIVE
  };
}
