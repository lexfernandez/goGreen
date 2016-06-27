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
        longitudeDelta: 6.2290871143341064,
        latitudeDelta: 10.301953576995462,
        longitude: -86.21234200894833,
        latitude: 15.340077778510487
      },
      position: null,
      zoomIn:true
    };
  },

  onRegionChange(region) {
    if(this.state.zoomIn){
      region.latitudeDelta = 0.1;
      region.longitudeDelta = 0.1;
      this.setState({ zoomIn: false });
    }
    this.setState({ region });
  },
  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition( (position) => {
      this.setState({position});
      var region={
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         latitudeDelta: this.state.region.latitudeDelta,
         longitudeDelta: this.state.region.longitudeDelta
       };
       this.onRegionChange(region);
    },(error) => {console.log(["error",error])},
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000} );

    //event
    this.watchID = navigator.geolocation.watchPosition( (position) => {
         this.setState({position});

         var region={
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta
          };
          this.onRegionChange(region);
       },(error) => {console.log(["error",error])},
       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000,distanceFilter: 1 }
     );
  },
  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  render() {
    var marker;

    if(this.state.position!==null){
      if( this.state.position.coords!==null){
        marker = <MapView.Marker
        coordinate={{latitude: this.state.position.coords.latitude, longitude:this.state.position.coords.longitude}}
        title={'Me'}
        description={"This is my current position."}
        />;
      }
    }

    return (
       <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',}}>
          <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsPointsOfInterest={true}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
          >
          {marker}
           </MapView>
        <ActionButton buttonColor="rgba(231,76,60,1)" size={40}>
          <ActionButton.Item buttonColor='#9b59b6' degree={30} title="Agregar casa" onPress={() => { Actions.addHouse()}}>
            <Icon name="ios-home" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#9b59b6' title="Agregar basurero publico" onPress={() => { Actions.todoApp()}}>
            <Icon name="ios-trash" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Buscar basureros cercanos" onPress={() => {}}>
            <Icon name="ios-navigate" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Reportar basurero clandestino" onPress={() => {}}>
            <Icon name="ios-megaphone" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </View>

    );
  }
});

export default connect(({routes}) => ({routes}))(Map);
