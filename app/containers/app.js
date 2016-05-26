import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store';
import TodoApp from './todoApp';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Login from '../components/login';
import Map from '../components/map';

const RouterWithRedux = connect()(Router);

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
          <Scene key="root">
            <Scene key="login" component={Login} title="Login Page" />
            <Scene key="map" component={Map} title="Google Map" initial={true} />
            <Scene key="todoApp" component={TodoApp} title="Todos"  />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}
