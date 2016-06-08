import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal
} from 'react-native';
import {bindActionCreators,dispatch} from 'redux';
import * as todoActions from '../actions/todoActions';
import * as visibilityActions from '../actions/visibilityActions';
import * as addModalVisibilityActions from '../actions/addModalVisibilityActions';
import {visibilityFilters} from '../actions/actionTypes';
import { connect } from 'react-redux';
import TitleBar from '../components/title-bar';
import TodoList from '../components/todo-list';
import AddTodo from '../components/add-todo';
import Filters from '../components/filters';

import store from '../store';

const getVisibleTodos = (state, filter) => {
  console.log(state);
  switch (filter) {
    case 'SHOW_ALL':
      return state
    case 'SHOW_COMPLETED':
      return state.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return state.filter(t => !t.completed)
    default:
    return state
  }
}


class TodoApp extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const {todos,filter,addModalVisible,dispatch} = this.props;
    const todoListBindActions= bindActionCreators(todoActions,dispatch);
    const filtersBindActions= bindActionCreators(visibilityActions,dispatch);
    const addModalBindActions= bindActionCreators(addModalVisibilityActions,dispatch);
    return (
      <View style={styles.container}>
        <TitleBar activeFilter={filter} {...addModalBindActions} />
        <TodoList activeFilter={filter} todos={todos} {...todoListBindActions} />
        <Filters activeFilter={filter} {...filtersBindActions} />
        <Modal animationType={'slide'} onRequestClose={() => {addModalBindActions.hideModal}} transparent={false} visible={addModalVisible}>
          <AddTodo {...todoListBindActions} {...addModalBindActions} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default connect(state => ({
  todos: getVisibleTodos(state.todos,state.filter),
  filter: state.filter,
  addModalVisible: state.addModal.visible
}))(TodoApp);
