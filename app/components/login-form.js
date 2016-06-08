import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image
 } from 'react-native';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import {dispatch} from 'redux';
import login from '../actions/authActions';

var windowSize = Dimensions.get('window');


export default class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'afernandez',
      password: 'valeria'
    }
  }

  loginAtempt(){

  }

  render () {
    const {onClick} = this.props;
    return (
      <View style={styles.container}>
           <Image style={styles.bg} source={{uri: 'http://i.imgur.com/xlQ56UK.jpg'}} >
           <View style={styles.logo}>

           </View>
           <View >
               <View >
                   <TextInput
                       placeholder="Username"
                       placeholderTextColor="#FFF"
                       onChangeText={(text) => this.setState({username: text})}
                       value={this.state.username}
                   />
               </View>
               <View >
                   <TextInput
                       password={true}
                       placeholder="Pasword"
                       placeholderTextColor="#FFF"
                       onChangeText={(text) => this.setState({password: text})}
                       value={this.state.password}
                   />
               </View>
               <View >
                   <Text >Forgot Password</Text>
               </View>
           </View>
           <View >
               <Text onPress={()=>onClick(this.state.username,this.state.password)} >Sign In</Text>
           </View>
           <View >
               <Text >Dont have an account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
           </View>
           </Image>

       </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
      flex: 1,
      resizeMode: 'cover'
    },
    logo:{
      flex:1
    }
})
