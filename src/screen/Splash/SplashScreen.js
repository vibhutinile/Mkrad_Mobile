import React from 'react';
import {
  Alert,
  View,
  StyleSheet,
  Image,
  BackHandler,
  PushNotificationIOS,
  DeviceInfo,
} from 'react-native';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import NetInfo from '@react-native-community/netinfo';
import Firebase from '@react-native-firebase/app';
import {setAsyncStorage} from '../../Routes/AsynstorageClass';
// import PushNotification from "react-native-push-notification";

let FcmId = '';
let check_in = '';
let checkInTime = '';
let checkOutTime = '';
let userName = '';
class SplashScreen extends React.Component {
  async componentDidMount() {
    // this.CheckConnectivity();
    check_in = await getAsyncStorage('check_in');
    checkInTime = await getAsyncStorage('checkInTime');
    checkOutTime = await getAsyncStorage('checkOutTime');
    userName = await getAsyncStorage('CrewMemberName');
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
    setTimeout(() => {
      this._retrieveData();
      // this.props.navigation.navigate('LoginScreen')
    }, 2000);
  }

  // CheckConnectivity =async () => {

  //   Firebase.initializeApp(this);

  //   // Must be outside of any component LifeCycle (such as `componentDidMount`).
  //   PushNotification.configure({
  //       // (optional) Called when Token is generated (iOS and Android)
  //       onRegister:async function  (token) {
  //           const device = {
  //             tokenDispositivo: token.token,
  //             plataforma: token.os,

  //         };
  //        // FcmId= device.tokenDispositivo;

  //         FcmId = device.tokenDispositivo.replace(/^"(.*)"$/, '$1');

  //         //alert(FcmId);
  //         await setAsyncStorage('FCMId',FcmId);
  //       },

  //       // (required) Called when a remote is received or opened, or local notification is opened
  //       onNotification: function (notification) {
  //           // process the notification
  //           // (required) Called when a remote is received or opened, or local notification is opened
  //           notification.finish(PushNotificationIOS.FetchResult.NoData);
  //       },

  //       // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  //       onAction: function (notification) {

  //           // process the action
  //       },

  //       // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  //       onRegistrationError: function (err) {
  //           console.error(err.message, err);
  //       },

  //       // IOS ONLY (optional): default: all - Permissions to register.
  //       permissions: {
  //           alert: true,
  //           badge: true,
  //           sound: true,
  //       },

  //       // Should the initial notification be popped automatically
  //       // default: true
  //       popInitialNotification: true,

  //       /**
  //        * (optional) default: true
  //        * - Specified if permissions (ios) and token (android and ios) will requested or not,
  //        * - if not, you must call PushNotificationsHandler.requestPermissions() later
  //        * - if you are not using remote notification or do not have Firebase installed, use this:
  //        *     requestPermissions: Platform.OS === 'ios'
  //        */
  //       requestPermissions: true,
  //   });

  //   NetInfo.fetch().then(state => {
  //     if (state.isConnected == true) {
  //     } else {
  //       alert("internet not connected")
  //     }
  //   });

  //   NetInfo.addEventListener(state => {
  //     if (state.isConnected == true) {
  //     } else {
  //       alert("internet not connected")
  //     }
  //   });
  // }

  _retrieveData = async () => {
    try {
      let token = await getAsyncStorage('token');
      let tokenAdmin = await getAsyncStorage('token_key');
      let crewMemberToken = await getAsyncStorage('crewMemberToken');

      // this.props.navigation.navigate('LoginScreen')
      if (token != null) {
        this.props.navigation.navigate('Dashboard');
      } else if (tokenAdmin != null) {
        this.props.navigation.navigate('SchedularScreen');
      } else if (crewMemberToken != null) {
        this.props.navigation.navigate('CrewMemberHome', {
          userName: userName,
          checkInTime: checkInTime,
          checkOutTime: checkOutTime,
          check_in: check_in,
        });
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    } catch (error) {}
  };

  handleBackButton() {
    Alert.alert(
      'Exit App:',
      'Are you sure you want to exit?',
      [
        {
          text: 'Cancel',
          onPress: () => console.debug('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {cancelable: false},
    );
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../images/logo_img.png')}
          style={{width: '100%', height: '100%', resizeMode: 'contain'}}
        />
      </View>
    );
  }
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
