import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import TodoApp from './todoApp';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Login from '../components/login';
import Map from '../components/map';

const RouterWithRedux = connect()(Router);

export default class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="login" component={Login} title="Login Page" />
            <Scene key="map" component={Map} title="Google Map" initial={true} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}
