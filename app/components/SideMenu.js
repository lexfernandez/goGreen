import React, {Component,PropTypes} from 'react'
import {View, Text} from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'
import { logout } from '../actions/authActions'
import {unregisterDeviceToken} from '../actions/deviceTokenActions'
import { connect } from 'react-redux';

class SideMenu extends Component {
    render(){
      const { drawer } = this.context
      const {auth,deviceToken,logout,unregisterDeviceToken} = this.props;
      return (
          <View {...this.props} >
              <Text>Launch page</Text>
              <Button onPress={()=>{drawer.close(); Actions.todoApp();}}>Todo App</Button>
              <Button onPress={()=>{drawer.close(); Actions.map();}}>Map</Button>
              <Button onPress={()=>{drawer.close(); unregisterDeviceToken(auth.token,deviceToken.id); logout(auth.token);}}>Logout</Button>
          </View>
      );
    }
}

SideMenu.contextTypes = {
  drawer: PropTypes.object
}


const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    deviceToken: state.deviceToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (token) => {dispatch(logout(token))},
    unregisterDeviceToken: (token,deviceTokenId) => {dispatch(unregisterDeviceToken(token,deviceTokenId))}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu)
