import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'

export default class SideMenu extends Component {
    render(){
        return (
            <View {...this.props} >
                <Text>Launch page</Text>
                <Button onPress={Actions.todoApp}>Todo App</Button>
                <Button onPress={Actions.map}>Map</Button>
            </View>
        );
    }
}
