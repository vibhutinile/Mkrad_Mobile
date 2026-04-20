import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import {clearAsyncStorage} from '../../Routes/AsynstorageClass';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import {requestGetApi, LogoutApi} from '../../NetworkCall/Service';
import messaging from '@react-native-firebase/messaging';

import {setAsyncStorage} from '../../Routes/AsynstorageClass';
import {ScrollView} from 'react-native-gesture-handler';

let userName = '';
let email = '';
let phone = '';
class CrewLeadProfile extends React.Component {
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
    userName = await getAsyncStorage('userName');
    // let userFName = await getAsyncStorage("first_name");
    // let userLName = await getAsyncStorage("last_name");

    // let userFullName = userFName + " " + userLName;
    email = await getAsyncStorage('email');
    phone = await getAsyncStorage('phone');
    this.setState({username: userName});
    //  this.setState({ username: userFullName });
    this.setState({email_id: email});
    this.setState({phoneNo: phone});
  };
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  LoginScreen = async () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
    this.props.navigation.navigate('LoginPage');
    let token = await getAsyncStorage('token');
    const body = {};
    const {responseJson, err} = await requestGetApi(
      LogoutApi,
      body,
      'GET',
      token,
    );

    clearAsyncStorage();
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

  async getToken() {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        setAsyncStorage('FCMId', token);
      });
  }
  attendanceLog = () => {
    this.props.navigation.navigate('CrewLeadAttendanceLog');
  };
  crewMemberList = () => {
    this.props.navigation.navigate('CrewMemberList');
  };
  render() {
    return (
      <View style={{height: '100%'}}>
        <View style={styles.CradContainer}>
          <View style={styles.profileheader}>
            <Text style={styles.text}>My Profile</Text>
            <TouchableOpacity
              style={styles.NotificationConrainer}
              onPress={() =>
                this.props.navigation.navigate('DashboardNotification')
              }>
              <Image
                style={{width: 20, height: 25}}
                source={require('../../images/ic_notification.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={styles.CradContainer2}>
            <View style={{margin: 16}}>
              <View style={styles.RectangleContainer}>
                <Text style={styles.text2}>{this.state.username}</Text>
              </View>
              <View style={styles.RectangleContainer}>
                <Text style={styles.text2}> Crew lead</Text>
              </View>
              <View style={styles.RectangleContainer}>
                <Text style={styles.text2}> {this.state.email_id}</Text>
              </View>
              <View style={styles.RectangleContainer}>
                <Text style={styles.text2}>{this.state.phoneNo}</Text>
              </View>
              <TouchableOpacity
                style={styles.RectangleContainer}
                onPress={() => this.props.navigation.navigate('EditProfile')}>
                <Text style={styles.text2}>Edit profile </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.RectangleContainer}
                onPress={() =>
                  this.props.navigation.navigate('ChangePassword')
                }>
                <Text style={styles.text2}> Change password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.RectangleContainer}
                onPress={this.toggleModal}>
                <Text style={styles.text2}> Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.RectangleContainer}
                onPress={this.attendanceLog}>
                <Text style={styles.text2}>View Attendance Logs</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.RectangleContainer}
                onPress={this.crewMemberList}>
                <Text style={styles.text2}>
                  View Crew Member Attendance Logs
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '5%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.crewMemberCheckIn}
                  onPress={() => alert('sakdhshd')}>
                  <Text style={styles.puchText}>SIGN-IN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.ViewBg}
                  onPress={() => alert('sakdhshd')}>
                  <Text style={styles.puchText}>SIGN-OUT</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '1%',
                  justifyContent: 'space-between',
                  marginHorizontal: '15%',
                  marginBottom: 10,
                }}>
                <Text>00:00:00</Text>
                <Text>00:00:00</Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
                source={require('../../images/ic_home.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CalenderScreen')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../images/ic_calendar.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}
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
    height: '10%',
    backgroundColor: '#222441',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '5%',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: '7%',
    color: '#fff',
    marginLeft: '7%',
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: '5%',
  },
  RectangleContainer2: {
    width: '55%',
    height: 40,
    backgroundColor: '#3AB34A',
    alignSelf: 'center',
    borderRadius: 14,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    shadowRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  RectangleContainer: {
    height: 40,
    borderColor: '#3AB34A',
    borderRadius: 14,
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: 10,
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
    marginTop: '5%',
    marginHorizontal: 40,
    marginVertical: 10,
  },
  puchText: {
    color: '#fff',
    fontSize: 14,
  },
  crewMemberCheckIn: {
    width: '40%',
    height: 40,
    backgroundColor: '#839041',
    marginTop: '4%',
    borderRadius: 14,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    shadowRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  ViewBg: {
    width: '40%',
    height: 40,
    backgroundColor: '#F94B4C',
    marginTop: '4%',
    borderRadius: 14,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    shadowRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
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

  // RectangleContainer: {
  //     width: "55%",
  //     height: "25%",
  //     backgroundColor: '#3AB34A',
  //     alignSelf: 'center',
  //     borderRadius: 14,
  //     borderColor: '#ddd',
  //     shadowColor: '#000000',
  //     shadowOffset: { width: 0, height: 2 },
  //     shadowOpacity: 0.9,
  //     shadowRadius: 3,
  //     elevation: 5,
  //     shadowRadius: 10,
  //     alignItems: 'center',
  //     position: 'absolute',
  //     bottom: "-13%",
  //     right: "20%"
  // },

  NotificationConrainer: {
    marginTop: '6%',
    marginRight: 20,
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

export default CrewLeadProfile;
