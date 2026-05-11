import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

import {getAsyncStorage} from '../Routes/AsynstorageClass';
import styles from './styles';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      ussername: '',
    };
  }

  async componentDidMount() {
    let userName = await getAsyncStorage('userName');
    this.setState({ussername: userName});

    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }

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
      <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            style={styles.NotificationButton}
            onPress={() =>
              this.props.navigation.navigate('DashboardNotification')
            }>
            <Image
              style={styles.NotificationIcon}
              source={require('./../images/notification.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.MkradContainer}
            source={require('./../images/logo.png')}
          />
          <View style={styles.RectangleContainer}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Home
            </Text>
          </View>
        </View>

        <View style={{flex: 5, marginTop: 30}}>
          {/* <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#201A4B', marginTop: "15%", marginLeft: "8%" }}>Hey !</Text> */}
          {/* <Text style={{ fontWeight: 'bold',fontSize: 18, color: '#000000', marginTop: "0%", marginLeft: "8%" }}>{this.state.ussername}</Text> */}

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              this.props.navigation.navigate('NewJobAssignScreen')
            }
            style={styles.JobItemContainer}>
            <Text style={styles.JobItemTitle}>Scheduled Jobs</Text>
            <Image
              style={styles.JobItemArrow}
              source={require('../images/next_arrow.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => this.props.navigation.navigate('OnPauseScreen')}
            style={styles.JobItemContainer}>
            <Text style={styles.JobItemTitle}>Paused Jobs</Text>
            <Image
              style={styles.JobItemArrow}
              source={require('../images/next_arrow.png')}
            />
          </TouchableOpacity>
        </View>

        <SafeAreaView
          edges={['bottom']}
          style={{
            backgroundColor: '#222441',
          }}>
          <View
            style={{
              backgroundColor: '#222441',
              height: 84,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Dashboard')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../images/ic_home.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.Bottombar}>
            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("CalenderScreen")} style={{ alignItems: 'center', alignSelf: 'center' }}>
              <Image style={{ width: 25, height: 25, }} source={require('../images/ic_calendar.png')} />
            </TouchableOpacity> */}
          </View>
          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../images/ic_user.png')}
              />
            </TouchableOpacity>
          </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default Dashboard;
