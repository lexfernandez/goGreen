'use strict';

import * as actions from '../actions/actionTypes';

const initialState = [];

export default function todoReducer(todos = initialState,action = {}){
  switch (action.type) {
    case actions.ADD_TODO:
      return [
        ...todos,
        action.todo
      ];
    case actions.TOGGLE_TODO:
      return todos.map(todo => {
        if(todo.id==action.id){
          return Object.assign({}, todo, {
                    completed: !todo.completed
                  })
        }
        return todo;
      })
    default:
    return todos;
  }

}
