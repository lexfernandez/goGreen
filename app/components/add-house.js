import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions,TouchableOpacity,TextInput} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import { connect } from 'react-redux';
import {addHouse} from '../actions/addHouseActions';

var {
  height: deviceHeight
} = Dimensions.get("window");


class AddHouse extends Component {
    constructor(props){
        super (props);
        this.state = {
            offset: new Animated.Value(-deviceHeight)
        };
    }

    componentDidMount() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
    }

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
    }
    handleOnChange = (text) => {
      this.setState({value: text});
    }
    addTodo = () => {
      const {auth,currentPosition,addHouse} = this.props;
      addHouse(auth.token,this.state.value,{lat:currentPosition.lat,lng:currentPosition.lon},auth.userId);
      this.setState({value: null});
      this.closeModal();
    }
    render(){

        return (
            <Animated.View>
            <View style={styles.container}>
              <View style={styles.toolbar}>
                <Text style={styles.toolbarButton}></Text>
                <Text style={styles.toolbarTitle}>Add a new House</Text>
                <TouchableOpacity style={styles.toolbarButton} onPress={this.closeModal.bind(this)}>
                  <Text style={styles.toolbarText}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.content}>
                <TextInput
                  style={styles.input}
                  onChangeText={this.handleOnChange}
                  value={this.state.value} />
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.addTodo}>
                  <Text style={styles.buttonText}>Add Todo</Text>
                </TouchableOpacity>
              </View>
            </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    height: 40,
    backgroundColor: '#81c04d',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  },

  content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },

  toolbar: {
    backgroundColor: '#81c04d',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  toolbarButton: {
    width: 50
  },
  toolbarText: {
    color: '#fff',
    textAlign: 'center'
  },
  toolbarTitle: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
})


const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    currentPosition: state.currentPosition
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addHouse: (token,name,location,userId) => { dispatch(addHouse(token,name,location,userId)) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddHouse);
