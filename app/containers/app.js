import React, { Component } from 'react'
import { Platform,StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from '../store'
import { Router, Scene, Switch } from 'react-native-router-flux'
import { connect } from 'react-redux'
import NavigationDrawer from '../components/NavigationDrawer'

import Login from './Login';
import Map from '../components/map';
import TodoApp from './todoApp';

const RouterWithRedux = connect()(Router);
const hideNavBar = Platform.OS === 'android'
const paddingTop = Platform.OS === 'android' ? 0 : 8

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false})),
    };
  }
  render(){
    if (this.state.isLoading) {
      return null;
    }
    return(
      <Provider store={this.state.store}>
        <RouterWithRedux>
        <Scene key="drawer" component={NavigationDrawer}>
        <Scene key="root"
        tabs={true}
        component={connect(state => ({auth: state.auth}))(Switch)}
        selector={(props)=> props.auth.isLoggedIn ? "map" : "login"}>
          <Scene key="login" hideNavBar={true} component={Login} type="replace" />
            <Scene key="map" component={Map} title="Google Map" initial={true} type="replace" />
            <Scene key="todoApp" component={TodoApp} title="Todos" type="replace"  />
        </Scene>
        </Scene>

        </RouterWithRedux>
      </Provider>
    );
  }
}
