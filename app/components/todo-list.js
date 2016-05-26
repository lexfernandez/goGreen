'use strict';
import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
  ListView
} from 'react-native';
import {visibilityFilters} from '../actions/actionTypes';
import Todo from './todo'
class TodoList extends Component {
  constructor(props){
    super(props);
  }

  render(){
    console.log('this.props');
    console.log(this.props);
    const { todos, toggleTodo } = this.props;
    return(
      <View style={styles.container}>
        { todos.map(todo =>
            <Todo key={todo.id} {...todo} toggleTodo={() => toggleTodo(todo.id)} />
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default TodoList;
