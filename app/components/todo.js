import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import CompleteToggle from './complete-toggle';
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10
  }
});

export default class Todo extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const {id,text,completed, toggleTodo } = this.props;

    return (
      <View>
      <TouchableHighlight
        underlayColor="#e4f2d9"
        key={id}
        style={styles.row}
        onPress={toggleTodo}>
        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
          <CompleteToggle
            style={styles.toggle}
            checked={completed}
            onPress={toggleTodo}/>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableHighlight>
      </View>
    );
  }
}
