import React, { Component } from 'react'
import { Platform,StyleSheet,BackAndroid,DeviceEventEmitter } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from '../store'
import { Router,Reducer, Scene, Switch,Modal,Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import {setDeviceToken} from '../actions/deviceTokenActions'

import NavigationDrawer from '../components/NavigationDrawer'
var GcmAndroid = require('react-native-gcm-android');
import Notification from 'react-native-system-notification';

import Login from './Login';
import Map from '../components/map';
import TodoApp from './todoApp';
import AddHouse from '../components/add-house'

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

  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', () => Actions.pop());
  }

  componentDidMount() {
      var self = this;
      GcmAndroid.addEventListener('register', function(token){
        var dt=setDeviceToken(token);
        self.state.store.dispatch(dt);
        console.log('send gcm token to server', token);
      });
      GcmAndroid.addEventListener('registerError', function(error){
        console.log('registerError', error.message);
      });
      GcmAndroid.addEventListener('notification', function(notification){
        console.log('receive gcm notification', notification);
        var info = JSON.parse(notification.data.info);
        //if (!GcmAndroid.isInForeground) {
          Notification.create({
            subject: info.subject,
            message: info.message,
            subText: info.subText,
            progress: info.progress,
            color: info.color,
            lights:'blue',
            bigStyleImageBase64: info.bigStyleImageBase64,
            bigText:info.bigText
          });
        //}
      });

      DeviceEventEmitter.addListener('sysNotificationClick', function(e) {
        console.log('sysNotificationClick', e);
      });

      GcmAndroid.requestPermissions();
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
        props.auth.isLoggedIn ? 'authenticated' : 'anonymous'
    );

    return(
      <Provider store={this.state.store} >
        <RouterWithRedux  getSceneStyle={getSceneStyle}>
          <Scene
          key="root"
          component={connectedSwitch}
          tabs={true}
          hideNavBar={true}
          selector={selectScene} >

            <Scene key="anonymous" hideNavBar={true}  hideTabBar={true} type="reset">
              <Scene key="login" component={Login}  initial={true} />
            </Scene>
            <Scene key="authenticated" component={NavigationDrawer}>
                <Scene key="main" hideNavBar={true} hideTabBar={true} >
                  <Scene key="map" component={Map} title="Google Map" initial={true} />
                  <Scene key="todoApp" component={TodoApp} title="Todos"  />
                  <Scene key="addHouse" component={AddHouse} title="Add House"  />
                </Scene>



            </Scene>

          </Scene>

        </RouterWithRedux>
      </Provider>
    );
  }
}
