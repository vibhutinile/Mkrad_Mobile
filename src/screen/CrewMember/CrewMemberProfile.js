import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {clearAsyncStorage} from '../../Routes/AsynstorageClass';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import {
  requestGetApi,
  LogoutApi,
  delete_account,
  requestPostApiMedia,
} from '../../NetworkCall/Service';
import messaging from '@react-native-firebase/messaging';

import {setAsyncStorage} from '../../Routes/AsynstorageClass';
import {ScrollView} from 'react-native-gesture-handler';

let userName = '';
let email = '';
let phone = '';
class CrewMemberProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      username: '',
      email_id: '',
      phoneNo: '',
    };
  }

  componentDidMount = async () => {
    userName = await getAsyncStorage('CrewMemberName');
    email = await getAsyncStorage('CrewMemberEmail');
    phone = await getAsyncStorage('CrewMemberPhone');
    this.setState({username: userName});
    this.setState({email_id: email});
    this.setState({phoneNo: phone});
  };
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  LoginScreen = async () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
    this.props.navigation.navigate('CrewMemberLogin');
    let token = await getAsyncStorage('crewMemberToken');
    const body = {};
    const {responseJson, err} = await requestGetApi(
      LogoutApi,
      body,
      'GET',
      token,
    );

    await clearAsyncStorage();
    this.requestUserPermission();
    this.getToken();
  };

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
    }
  }
  formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }
  async getToken() {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        setAsyncStorage('FCMId', token);
      });
  }
  attendanceLog = () => {
    this.props.navigation.navigate('AttendanceLogs');
  };

  confirmDelete = () => {
    Alert.alert('', 'Are you sure you want to delete this account?', [
      {
        text: 'Cancel',
        onPress: () => console.debug('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this.deleteAccount()},
    ]);
  };
  deleteAccount = async () => {
    const token = await getAsyncStorage('crewMemberToken');
    const formData = new FormData();
    const {responseJson, err} = await requestPostApiMedia(
      delete_account,
      formData,
      'POST',
      token,
    );
    if (responseJson.status) {
      await clearAsyncStorage();
      Alert.alert('', responseJson.message, [
        {
          text: 'Cancel',
          onPress: () => console.debug('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.props.navigation.navigate('CrewMemberLogin'),
        },
      ]);
    } else {
      alert(responseJson.message);
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Image
              style={styles.MkradContainer}
              source={require('../../images/logo.png')}
            />
            <View style={styles.RectangleContainer}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                Profile
              </Text>
            </View>
          </View>
          {/* <TouchableOpacity style={{ position: 'absolute', marginTop: "13%", right: "5%" }}
                        onPress={() => this.props.navigation.navigate('DashboardNotification')}>
                        <Image
                            source={require('../../images/notification.png')} />
                    </TouchableOpacity> */}
        </View>

        <ScrollView>
          <View style={styles.CradContainer2}>
            <View style={{flex: 2}}>
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: 'bold',
                  fontSize: 18,
                  alignSelf: 'center',
                }}>
                {this.state.username}
              </Text>
              <Text
                style={{fontSize: 16, color: '#3AB34A', alignSelf: 'center'}}>
                {' '}
                Crew Member
              </Text>

              <View
                style={{
                  width: 300,
                  height: 40,
                  backgroundColor: '#F4F4F4',
                  alignItems: 'center',
                  marginTop: '4%',
                  marginBottom: '2%',
                }}>
                <Text style={{fontSize: 14, alignSelf: 'center'}}>{email}</Text>
                <Text style={{fontSize: 14, color: '#000000'}}>
                  {this.formatPhoneNumber(phone)}
                </Text>
              </View>
            </View>
          </View>

          <View style={{flex: 2}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CrewMemberEditDetails')
              }>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'center',
                  marginTop: '5%',
                  fontWeight: 'bold',
                }}>
                Edit profile{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CrewMemberChangePassword')
              }>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'center',
                  color: '#000000',
                  marginTop: '5%',
                  fontWeight: 'bold',
                }}>
                {' '}
                Change password
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.toggleModal}>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'center',
                  color: '#000000',
                  marginTop: '5%',
                  fontWeight: 'bold',
                }}>
                {' '}
                Logout
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.RectangleContainer2}
              onPress={this.attendanceLog}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                View Attendance Logs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.confirmDelete}>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'center',
                  color: '#000000',
                  marginTop: '3%',
                  fontWeight: 'bold',
                }}>
                {' '}
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: '#222441',
            height: 84,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CrewMemberHome')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../images/ic_home.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CrewMemberProfile')
              }
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../images/ic_user.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.JonMarked_Completed_Modal}>
            <View style={{flex: 1.5, marginTop: '15%'}}>
              <Text style={styles.logoutText}>Are you sure</Text>
              <Text style={styles.logoutText}>you want to logout?</Text>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
              <TouchableOpacity
                style={styles.OkBox}
                title="Hide modal"
                onPress={this.toggleModal}>
                <Text style={styles.CancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.OkBox}
                title="Hide modal"
                onPress={this.LoginScreen}>
                <Text style={styles.OKText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CradContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowRadius: 30,
    borderWidth: 0,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
  },

  CancelText: {
    marginTop: '8%',
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  OKText: {
    marginTop: '8%',
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  OkBox: {
    width: '15%',
    height: '55%',
    borderRadius: 15,
    backgroundColor: '#3AB34A',
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },

  CradContainer2: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowRadius: 30,
    borderWidth: 0,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    marginTop: '25%',
    marginLeft: '10%',
    marginRight: '10%',
    alignItems: 'center',
  },
  MenuContainer: {
    marginLeft: 20,
    marginTop: 70,
    width: 30,
    height: 30,
  },
  MkradContainer: {
    width: '25%',
    height: '45%',
    marginTop: '14%',
    marginLeft: '37%',
    resizeMode: 'contain',
  },

  RectangleContainer: {
    width: '55%',
    height: '18%',
    backgroundColor: '#3AB34A',
    alignSelf: 'center',
    borderRadius: 14,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    shadowRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: '-7%',
    right: '20%',
  },

  RectangleContainer2: {
    width: '55%',
    height: 50,
    backgroundColor: '#3AB34A',
    alignSelf: 'center',
    borderRadius: 14,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    shadowRadius: 5,
    alignItems: 'center',
    marginTop: '5%',
    justifyContent: 'center',
  },
  NotificationConrainer: {
    width: 30,
    height: 30,
  },
  Bottombar: {
    width: 40,
    height: 40,
    marginTop: '13%',
    marginBottom: 43,
    alignItems: 'center',
    marginHorizontal: '11.5%',
  },
  JonMarked_Completed_Modal: {
    width: 300,
    height: 250,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 14,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    shadowRadius: 10,
    marginBottom: 10,
  },

  logoutText: {
    alignSelf: 'center',
    fontSize: 18,
  },
  goutText: {
    alignSelf: 'center',
    fontSize: 18,
  },
});

export default CrewMemberProfile;
