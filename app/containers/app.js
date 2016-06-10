import React, { Component } from 'react'
import { Platform,StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from '../store'
import { Router, Scene, Switch } from 'react-native-router-flux'
import { connect } from 'react-redux'

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
    const connectedSwitch = connect(
    (state) => ({
        auth: state.auth,
    })
    )(Switch);
    const selectScene = (props) => (
        props.auth.isLoggedIn
            ? 'authenticated'
            : 'anonymous'
    );

    return(
      <Provider store={this.state.store}>
        <RouterWithRedux hideNavBar={true}>
          <Scene
          key="root"
          component={connectedSwitch}
          tabs={true}
          selector={selectScene} >

            <Scene key="anonymous" >
              <Scene key="login" hideNavBar={true} component={Login}   initial={true} />
            </Scene>
            <Scene key="authenticated" >
              <Scene key="map" component={Map} title="Google Map" initial={true} />
              <Scene key="todoApp" component={TodoApp} title="Todos"  />
            </Scene>
            
          </Scene>

        </RouterWithRedux>
      </Provider>
    );
  }
}
