import React, { Component } from 'react'
import { Platform,StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from '../store'
import { Router,Reducer, Scene, Switch } from 'react-native-router-flux'
import { connect } from 'react-redux'

import NavigationDrawer from '../components/NavigationDrawer'

import Login from './Login';
import Map from '../components/map';
import TodoApp from './todoApp';

const RouterWithRedux = connect()(Router);
const getSceneStyle = function (/* NavigationSceneRendererProps */ props, computedProps) {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

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
        <RouterWithRedux  getSceneStyle={getSceneStyle}>
          <Scene
          key="root"
          component={connectedSwitch}
          tabs={true}
          hideNavBar={false}
          selector={selectScene} >

            <Scene key="anonymous" >
              <Scene key="login" hideNavBar={true} component={Login}   initial={true} />
            </Scene>
            <Scene key="authenticated" component={NavigationDrawer}>
              <Scene key="main" hideNavBar={false} hideTabBar={true} >
                <Scene key="map" component={Map} title="Google Map" initial={true} />
                <Scene key="todoApp" component={TodoApp} title="Todos"  />
              </Scene>
            </Scene>

          </Scene>

        </RouterWithRedux>
      </Provider>
    );
  }
}
