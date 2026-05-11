import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import {clearAsyncStorage} from '../../Routes/AsynstorageClass';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import {
  requestGetApi,
  LogoutApi,
  delete_account,
} from '../../NetworkCall/Service';
import messaging from '@react-native-firebase/messaging';

import {setAsyncStorage} from '../../Routes/AsynstorageClass';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
import {
  requestPostApiMedia,
  crewMemberCheckIn,
  crewMemberCheckOut,
  forget_checkout,
} from '../../NetworkCall/Service';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Loader from '../../NetworkCall/Loader';

let userName = '';
let email = '';
let phone = '';
let slected_checkout_time;
let checkoutselected_date;
let checkinTime = '';
let checkoutTime = '';
let checkinDate = '';
let checkoutDate = '';

class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      username: '',
      email_id: '',
      phoneNo: '',
      currentLongitude: '',
      currentLatitude: '',
      input_location: '',
      checkInTime: '',
      checkOutTime: '',
      checkInDate: '',
      checkOutDate: '',
      isCheckOutModalVisible: false,
      isDatePickerVisible: false,
      slected_checkout_time: '',
      isTimePickerVisible: false,
      checkoutselected_date: '',
      loading: false,
    };
  }

  componentDidMount = async () => {
    Geocoder.init('AIzaSyDgq0A6e-eyFj71IvSJQnszWLbHOF9q27Q');
    userName = await getAsyncStorage('userName');
    email = await getAsyncStorage('email');
    phone = await getAsyncStorage('phone');

    checkinTime = await getAsyncStorage('CrewcheckInTime');
    checkoutTime = await getAsyncStorage('CrewcheckOutTime');
    checkinDate = await getAsyncStorage('CrewcheckInDate');
    checkoutDate = await getAsyncStorage('CrewcheckOutDate');

    this.setState({username: userName});
    this.setState({email_id: email});
    this.setState({phoneNo: phone});
    this.setState({checkInTime: checkinTime});
    this.setState({checkOutTime: checkoutTime});
    this.setState({checkInDate: checkinDate});
    this.setState({checkOutDate: checkoutDate});

    let unsubscribe = this.props.navigation.addListener('focus', async () => {
      userName = await getAsyncStorage('userName');
      email = await getAsyncStorage('email');
      phone = await getAsyncStorage('phone');

      checkinTime = await getAsyncStorage('CrewcheckInTime');
      checkoutTime = await getAsyncStorage('CrewcheckOutTime');
      this.setState({username: userName});
      this.setState({email_id: email});
      this.setState({phoneNo: phone});
      this.setState({checkInTime: checkinTime});
      this.setState({checkOutTime: checkoutTime});
    });
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
    this.props.navigation.navigate('CrewLeadAttendanceLog', {
      id: '',
      AdminCrewLeadAttendanceLog: '',
    });
  };
  crewMemberList = () => {
    this.props.navigation.navigate('CrewMemberList');
  };

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      this.getOneTimeLocation();
      this.subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getOneTimeLocation();
          this.subscribeLocationLocation();
        } else {
        }
      } catch (err) {}
    }
  };
  getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        this.setState({currentLongitude: currentLongitude});
        this.setState({currentLatitude: currentLatitude});

        Geocoder.from(currentLatitude, currentLongitude)
          .then((json) => {
            var addressComponent = json.results[0].formatted_address;
            this.setState({input_location: addressComponent});
            this.checkInApi();
          })
          .catch((error) => console.error(error));
      },
      (error) => {
        this.checkInApi();
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  getOneTimeLocation2 = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        this.setState({currentLongitude: currentLongitude});
        this.setState({currentLatitude: currentLatitude});

        Geocoder.from(currentLatitude, currentLongitude)
          .then((json) => {
            var addressComponent = json.results[0].formatted_address;
            this.setState({input_location: addressComponent});
            this.checkOutApi();
          })
          .catch((error) => console.error(error));
      },
      (error) => {
        this.checkOutApi();
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        this.setState({currentLongitude: currentLongitude});

        this.setState({currentLatitude: currentLatitude});
        // this.setState({ input_location: addressComponent })
      },
      (error) => {
        console.error('error,,,,,,', error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  checkIn = async () => {
    this.setState({loading: true});
    this.getOneTimeLocation();

    // setTimeout(() => { this.checkInApi() }, 4000)
  };
  checkInApi = async () => {
    var currDate = moment().format('MM/DD/YYYY');
    var currTime = moment().format('HH:mm:ss');
    let token = await getAsyncStorage('token');
    const formData = new FormData();
    formData.append('check_in_date', currDate);
    formData.append('check_in_time', currTime);
    formData.append('check_in_location', this.state.input_location);
    const {responseJson, err} = await requestPostApiMedia(
      crewMemberCheckIn,
      formData,
      'POST',
      token,
    );
    if (responseJson.status) {
      this.setState({checkInTime: currTime});
      this.setState({checkInDate: currDate});
      await setAsyncStorage('CrewcheckInTime', currTime);
      await setAsyncStorage('CrewcheckInDate', currDate);

      Alert.alert(responseJson.msg);
      this.setState({loading: false});
    } else {
      Alert.alert(responseJson.msg);
      this.setState({loading: false});
    }
  };
  checOut = async () => {
    this.setState({loading: true});
    this.getOneTimeLocation2();
    // if (this.state.input_location == "" || this.state.input_location == null) {

    //   setTimeout(() => { this.checkOutApi() }, 5000)
    // } else {
    //   this.checkOutApi()
    // }
  };
  checkOutApi = async () => {
    var currDate = moment().format('MM/DD/YYYY');
    var currTime = moment().format('HH:mm:ss');
    this.setState({checkOutTime: currTime});
    let token = await getAsyncStorage('token');
    const formData = new FormData();
    formData.append('check_out_date', currDate);
    formData.append('check_out_time', currTime);
    formData.append('check_out_location', this.state.input_location);
    const {responseJson, err} = await requestPostApiMedia(
      crewMemberCheckOut,
      formData,
      'POST',
      token,
    );
    if (responseJson.status) {
      this.setState({checkOutTime: currTime});
      this.setState({checkOutDate: currDate});
      await setAsyncStorage('CrewcheckOutTime', currTime);
      await setAsyncStorage('CrewcheckOutDate', currDate);
      Alert.alert(responseJson.msg);
      this.setState({loading: false});
    } else {
      Alert.alert(responseJson.msg);
      this.setState({loading: false});
    }
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
  formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }
  deleteAccount = async () => {
    const token = await getAsyncStorage('token');
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
          onPress: () => this.props.navigation.navigate('LoginPage'),
        },
      ]);
    } else {
      alert(responseJson.message);
    }
  };
  render() {
    return (
      <>
        <Loader isLoader={this.state.loading}></Loader>
        <View style={{height: '100%'}}>
          <View style={styles.CradContainer}>
            <TouchableOpacity
              style={styles.NotificationButton}
              onPress={() =>
                this.props.navigation.navigate('DashboardNotification')
              }>
              <Image
                style={styles.NotificationIcon}
                source={require('../../images/notification.png')}
              />
            </TouchableOpacity>
            <Image
              style={styles.MkradContainer}
              source={require('../../images/logo.png')}
            />
            <View style={styles.RectangleContainer}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                My Profile
              </Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.Checkout}>
              <View style={{flexDirection: 'row', marginTop: 24}}>
                <TouchableOpacity
                  style={styles.crewMemberCheckIn}
                  onPress={this.checkIn}>
                  <Text style={styles.puchText}>SIGN-IN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ViewBg} onPress={this.checOut}>
                  <Text style={styles.puchText}>SIGN-OUT</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 12,
                  marginBottom: 24,
                }}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.attendanceTime}>
                    {!this.state.checkInTime ||
                    this.state.checkInTime === 'null'
                      ? '00:00:00'
                      : this.state.checkInTime.replace(/['"]+/g, '')}
                  </Text>
                  <Text style={styles.attendanceTime}>
                    {!this.state.checkInDate ||
                    this.state.checkInDate === 'null'
                      ? '00:00:00'
                      : this.state.checkInDate.replace(/['"]+/g, '')}
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.attendanceTime}>
                    {!this.state.checkOutTime ||
                    this.state.checkOutTime === 'null'
                      ? '00:00:00'
                      : this.state.checkOutTime.replace(/['"]+/g, '')}
                  </Text>
                  <Text style={styles.attendanceTime}>
                    {!this.state.checkOutDate ||
                    this.state.checkOutDate === 'null'
                      ? '00:00:00'
                      : this.state.checkOutDate.replace(/['"]+/g, '')}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={this.forgetSigninsignOut}
              style={{
                width: '55%',
                margin: '1%',
                backgroundColor: '#3AB34A',
                height: 40,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 15,
              }}>
              <Text
                style={{
                  marginHorizontal: 10,
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Forgot to sign out?
              </Text>
            </TouchableOpacity>
            <View style={styles.CradContainer2}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: '#000',
                }}>
                {this.state.username}
              </Text>
              <Text style={{fontSize: 16, color: '#3AB34A', marginTop: 4}}>
                Crew lead
              </Text>

              <View style={styles.infoBox}>
                <Text style={{fontSize: 14, color: '#000', marginBottom: 4}}>
                  {this.state.email_id}
                </Text>
                <Text style={{fontSize: 14, color: '#000'}}>
                  {this.formatPhoneNumber(this.state.phoneNo)}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{paddingVertical: 12, alignItems: 'center'}}
              onPress={() => this.props.navigation.navigate('ChangePassword')}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000000',
                  fontWeight: 'bold',
                }}>
                Change password
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{paddingVertical: 12, alignItems: 'center'}}
              onPress={this.toggleModal}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000000',
                  fontWeight: 'bold',
                }}>
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
          </ScrollView>
          <SafeAreaView
            edges={['bottom']}
            style={{backgroundColor: '#222441'}}>
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
                {/* calendar slot */}
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
          </SafeAreaView>

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

          <Modal
            isVisible={this.state.isCheckOutModalVisible}
            //  backdropOpacity={0.1}
            onBackdropPress={() =>
              this.setState({isCheckOutModalVisible: false})
            }
            onRequestClose={() => {
              this.setState({isCheckOutModalVisible: false});
            }}>
            <View style={styles.JonMarked_Completed_Modal}>
              <Text style={styles.TextContainer_1}>Signout date</Text>
              <TouchableOpacity
                style={styles.chevkoutFiled}
                onPress={this.showDatePicker}>
                <TextInput
                  editable={false}
                  placeholder="select date"
                  style={{
                    alignSelf: 'center',
                    marginLeft: '5%',
                    color: '#000',
                    fontSize: 14,
                  }}
                  value={this.state.checkoutselected_date}></TextInput>
                <DateTimePickerModal
                  isVisible={this.state.isDatePickerVisible}
                  mode="date"
                  headerTextIOS=""
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDatePicker}
                  forment="dd-MM-y"
                />
                <Image
                  style={{
                    alignSelf: 'center',
                    marginLeft: '35%',
                    width: 20,
                    height: 20,
                  }}
                  source={require('../../images/date_picker.png')}
                />
              </TouchableOpacity>
              <Text style={styles.TextContainer_1}>Signout time</Text>
              <TouchableOpacity
                style={styles.chevkoutFiled}
                onPress={this.showTimePicker}>
                <TextInput
                  editable={false}
                  placeholder="select time"
                  style={{
                    alignSelf: 'center',
                    marginLeft: '13%',
                    color: '#000',
                    fontSize: 14,
                  }}
                  value={this.state.slected_checkout_time}></TextInput>
                <DateTimePickerModal
                  isVisible={this.state.isTimePickerVisible}
                  mode="time"
                  headerTextIOS=""
                  onConfirm={this.handleTimePicked}
                  onCancel={this.hideTimePicker}
                  forment="dd-MM-y"
                  amPmAriaLabel="Select AM/PM"
                  is24Hour={false}
                  maxDetail={slected_checkout_time}
                />
                <Image
                  style={{marginLeft: '35%', width: 30, height: 30}}
                  source={require('../../images/time.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '30%',
                  height: 30,
                  backgroundColor: '#3AB34A',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 16,
                  borderRadius: 10,
                }}
                activeOpacity={0.5}
                onPress={this.getOneTimeLocation3}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </>
    );
  }
  forgetSigninsignOut = () => {
    this.setState({isCheckOutModalVisible: !this.state.isCheckOutModalVisible});
  };

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };
  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleDatePicked = (date) => {
    const momentDate = moment(date.toISOString());
    var pickedDt = moment(momentDate).format('MM/DD/YYYY');
    checkoutselected_date = pickedDt;
    this.setState({checkoutselected_date: checkoutselected_date});
    this.hideDatePicker();
  };
  showTimePicker = () => {
    this.setState({isTimePickerVisible: true});
  };
  hideTimePicker = () => {
    this.setState({isTimePickerVisible: false});
  };
  handleTimePicked = (time) => {
    slected_checkout_time = time.getHours() + ':' + time.getMinutes();
    this.setState({slected_checkout_time: slected_checkout_time});
    this.hideTimePicker();
  };

  getOneTimeLocation3 = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        this.setState({currentLongitude: currentLongitude});
        this.setState({currentLatitude: currentLatitude});

        Geocoder.from(currentLatitude, currentLongitude)
          .then((json) => {
            var addressComponent = json.results[0].formatted_address;
            this.setState({input_location: addressComponent});
            this.submit();
          })
          .catch((error) => console.error(error));
      },
      (error) => {
        this.submit();
        console.error('error=== log', error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  submit = async () => {
    if (this.state.checkoutselected_date == '') {
      Alert.alert('Please enter checkout date.');
      return;
    }
    if (this.state.slected_checkout_time == '') {
      Alert.alert('Please enter checkout time.');
      return;
    }
    let token = await getAsyncStorage('token');
    const formData = new FormData();
    formData.append('check_out_date', this.state.checkoutselected_date);
    formData.append('check_out_time', this.state.slected_checkout_time);
    formData.append('check_out_location', this.state.input_location);
    const {responseJson, err} = await requestPostApiMedia(
      forget_checkout,
      formData,
      'POST',
      token,
    );
    if (responseJson.status) {
      Alert.alert('', responseJson.msg, [
        {
          text: 'OK',
          onPress: () => this.setState({isCheckOutModalVisible: false}),
        },
      ]);
      await setAsyncStorage('checkOutTime', this.state.slected_checkout_time);
    } else {
      Alert.alert('', responseJson.msg, [
        {
          text: 'OK',
          onPress: () => this.setState({isCheckOutModalVisible: false}),
        },
      ]);
    }
  };
}

const styles = StyleSheet.create({
  CradContainer: {
    height: 220,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 28,
  },
  NotificationButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  NotificationIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  RectangleContainer2: {
    width: '55%',
    height: 40,
    backgroundColor: '#3AB34A',
    alignSelf: 'center',
    borderRadius: 14,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
    justifyContent: 'center',
  },
  RectangleContainer3: {
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
    marginTop: 20,
    marginBottom: 20,
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
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 24,
    marginHorizontal: 24,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  Checkout: {
    flexDirection: 'column',
    marginTop: 24,
    marginHorizontal: 24,
    alignItems: 'stretch',
  },
  puchText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  crewMemberCheckIn: {
    flex: 1,
    height: 44,
    backgroundColor: '#839041',
    borderRadius: 22,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  ViewBg: {
    flex: 1,
    height: 44,
    backgroundColor: '#F94B4C',
    borderRadius: 22,
    elevation: 3,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  attendanceTime: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
    color: '#000',
  },
  infoBox: {
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  MenuContainer: {
    marginLeft: 20,
    marginTop: 70,
    width: 30,
    height: 30,
  },
  MkradContainer: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 8,
  },

  RectangleContainer: {
    width: '50%',
    height: 44,
    backgroundColor: '#3AB34A',
    alignSelf: 'center',
    borderRadius: 22,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -22,
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
  TextContainer_1: {
    marginTop: '4%',
    color: '#000',
    marginHorizontal: '8%',
  },

  logoutText: {
    alignSelf: 'center',
    fontSize: 18,
  },
  goutText: {
    alignSelf: 'center',
    fontSize: 18,
  },
  chevkoutFiled: {
    width: '70%',
    marginTop: '2%',
    borderColor: '#3AB34A',
    borderWidth: 2,
    alignItems: 'center',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '8%',
  },
});

export default ProfileScreen;
