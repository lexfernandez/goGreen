import React from 'react';
import { Text,StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

var Map = React.createClass({
  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      initialPosition: null,
      lastPosition: null
    };
  },

  onRegionChange(region) {
    this.setState({ region });
  },
  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition( (position) => {
      var initialPosition = JSON.stringify(position);
      console.log("initialPosition:");
      console.log(initialPosition);
      this.setState({initialPosition});
    },(error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} );

    //event
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        var lastPosition = JSON.stringify(position);
        console.log("lastPosition:");
        console.log(lastPosition);
         this.setState({lastPosition});
       }
     );
  },


  render() {
    return (
       <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',}}>
        <MapView
        style={styles.map}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
        />
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => {console.log("triyin to push scene"); Actions.todoApp()}}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="md-notifications" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </View>

    );
  }
});

export default connect(({routes}) => ({routes}))(Map);
