import React from 'react';
import { Text,StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
      };
    },

    onRegionChange(region) {
      this.setState({ region });
    },

    render() {
      return (
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
      );
    }
  });

export default connect(({routes}) => ({routes}))(Map);
