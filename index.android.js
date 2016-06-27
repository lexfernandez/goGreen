'use strict';
import React, { Component } from 'react';
import {AppRegistry,DeviceEventEmitter} from 'react-native';
import App from './app/containers/app'
var GcmAndroid = require('react-native-gcm-android');
import Notification from 'react-native-system-notification';

if (GcmAndroid.launchNotification) {
  var notification = GcmAndroid.launchNotification;
  var info = JSON.parse(notification.info);
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
  //GcmAndroid.stopService();
} else {
  AppRegistry.registerComponent('goGreen', () => App);
}
