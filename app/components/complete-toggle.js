'use strict';
import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native';

class CompleteToggle extends Component {
  toggle = () => {
    this.props.onPress(this.props.index);
  }
  getStyle() {
    if (this.props.checked) {
      return styles.active;
    } else {
      return styles.inactive;
    }
  }
  render() {
    var todo = this.props.todo;
    return (
      <View>
      <TouchableOpacity
        style={[styles.button, this.getStyle()]}
        onPress={this.toggle} />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 20,
    height: 20,
    borderRadius: 10
  },
  active: {
    backgroundColor: '#81c04d'
  },
  inactive: {
    backgroundColor: 'gray'
  }
});

export default CompleteToggle;
