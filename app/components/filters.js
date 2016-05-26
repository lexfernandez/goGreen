'use strict';
import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {visibilityFilters} from '../actions/actionTypes';

class Filters extends Component {
  render() {
    return (
      <View style={styles.bar}>
        {this.renderFilters()}
      </View>
    );
  }
  renderFilters() {
    const {showAll,showCompleted,showIncomplete, activeFilter} = this.props;
    return [
      {name: 'All', action: showAll, filter: visibilityFilters.SHOW_ALL},
      {name: 'Complete', action: showCompleted, filter: visibilityFilters.SHOW_COMPLETED},
      {name: 'Active', action: showIncomplete, filter: visibilityFilters.SHOW_ACTIVE}
    ].map(filter => {
      var style = [styles.button];
      if (activeFilter === filter.filter) {
        style.push(styles.current);
      }
      return (
        <TouchableOpacity
          key={filter.name}
          style={style}
          onPress={filter.action}>
          <Text style={styles.text}>{filter.name}</Text>
        </TouchableOpacity>
      )
    });
  }
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#81c04d',
    flexDirection: 'row'
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1
  },
  text: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  current: {
    backgroundColor: '#70a743'
  }
})

export default Filters;
