import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

export default class Launch extends Component {
    constructor(props){
      super(props);
    }
    render(){
        return (
            <View {...this.props}  style={[styles.container, this.props.sceneStyle]}>
                <Text>Launch page</Text>
                <Button onPress={()=>Actions.todoApp()}>Todo App</Button>
                <Button onPress={()=>Actions.map()}>Map</Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});
