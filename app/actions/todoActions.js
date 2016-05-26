import * as actions from './actionTypes';
import _ from 'lodash';

var id = 1;

export function addTodo(text){
  return {
    type: actions.ADD_TODO,
    todo: {
      id: _.uniqueId('todo_'),
      completed: false,
      text
    }
  };
}

export function toggleTodo(id){
  return {
    type: actions.TOGGLE_TODO,
    id
  };
}
