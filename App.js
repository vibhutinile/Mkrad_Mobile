import React from 'react';
import {StatusBar, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigation from './src/Routes/AppNavigation';
import {setAsyncStorage} from './src/Routes/AsynstorageClass';

let messaging;
try {
  messaging = require('@react-native-firebase/messaging').default;
} catch (e) {
  console.warn('Firebase messaging not available:', e?.message);
}

export default class App extends React.Component {
  async requestUserPermission() {
    if (!messaging) return;
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.debug('Authorization status:', authStatus);
      }
    } catch (err) {
      console.warn('requestUserPermission failed:', err?.message);
    }
  }

  async getToken() {
    if (!messaging) return;
    try {
      const token = await messaging().getToken();
      if (token) {
        setAsyncStorage('FCMId', token);
        console.debug('FCMId', token);
      }
    } catch (err) {
      console.warn('getToken failed:', err?.message);
    }
  }

  componentDidMount() {
    this.requestUserPermission();
    this.getToken();
  }

  render() {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <AppNavigation />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }
}
