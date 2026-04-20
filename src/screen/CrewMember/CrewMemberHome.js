import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
import {
  requestPostApiMedia,
  crewMemberCheckIn,
  crewMemberCheckOut,
  forget_checkout,
} from '../../NetworkCall/Service';
import {getAsyncStorage, setAsyncStorage} from '../../Routes/AsynstorageClass';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

let check_in = '';
let checkinTime = '';
let checkoutTime = '';
let checkinDate = '';
let checkoutDate = '';
let userName = '';
let slected_checkout_time;
let checkoutselected_date;
class CrewMemberHome extends React.Component {
  constructor() {
    super();

    this.state = {
      currentLongitude: '',
      currentLatitude: '',
      input_location: '',
      checkInTime: '',
      checkOutTime: '',
      checkInDate: '',
      checkOutDate: '',
      check_inStatus: '',
      userName: '',
      isModalVisible: false,
      isDatePickerVisible: false,
      slected_checkout_time: '',
      isTimePickerVisible: false,
      checkoutselected_date: '',
    };
  }
  getDatafromAsync = async () => {
    checkinTime = await AsyncStorage.getItem('checkInTime');
    checkoutTime = await AsyncStorage.getItem('checkOutTime');
    checkinDate = await AsyncStorage.getItem('CrewMemberCheckInDate');
    checkoutDate = await AsyncStorage.getItem('CrewMemberCheckOutDate');

    Geocoder.init('AIzaSyDgq0A6e-eyFj71IvSJQnszWLbHOF9q27Q');
    this.setState({checkInTime: checkinTime});
    this.setState({checkOutTime: checkoutTime});
    this.setState({checkInDate: checkinDate});
    this.setState({checkOutDate: checkoutDate});
    this.setState({check_inStatus: check_in});
    this.setState({userName: userName});
  };
  componentDidMount = async () => {
    const unsubscribe = this?.props?.navigation?.addListener('focus', () => {
      this.getDatafromAsync();
    });
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
      (error) => {},
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  checkInDisable = () => {
    Alert.alert('You are already checked in.');
  };
  checkIn = async () => {
    this.getOneTimeLocation();
  };
  checkInApi = async () => {
    var currDate = moment().format('MM/DD/YYYY');
    var currTime = moment().format('HH:mm:ss');
    let token = await getAsyncStorage('crewMemberToken');
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
    Alert.alert(responseJson.msg);
    if (responseJson.status) {
      Alert.alert(responseJson.msg);
      this.setState({checkInTime: currTime});
      this.setState({checkInDate: currDate});
      AsyncStorage.setItem('checkInTime', currTime?.toString());
      AsyncStorage.setItem('CrewMemberCheckInDate', currDate?.toString());
      // await setAsyncStorage("checkInTime", currTime?.toString());
      // await setAsyncStorage('CrewMemberCheckInDate', currDate?.toString())
    } else {
      Alert.alert(responseJson.msg);
    }
  };
  checOut = async () => {
    this.getOneTimeLocation2();
  };
  checkOutApi = async () => {
    var currDate = moment().format('MM/DD/YYYY');
    var currTime = moment().format('HH:mm:ss');
    this.setState({checkOutTime: currTime});
    this.setState({checkOutDate: currDate});
    await setAsyncStorage('checkOutTime', currTime?.toString());
    await setAsyncStorage('CrewMemberCheckOutDate', currDate?.toString());
    let token = await getAsyncStorage('crewMemberToken');
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
      Alert.alert(responseJson.msg);
    } else {
      Alert.alert(responseJson.msg);
    }
  };

  forgetSigninsignOut = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
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
    // if(time.getMinutes().toString().length < 2){
    //     oneTimeSelected_time = "0" + time.getHours() + ':' + "0" +time.getMinutes()
    // }else{
    //     oneTimeSelected_time = "0" + time.getHours() + ':' + time.getMinutes()
    // }

    slected_checkout_time = time.getHours() + ':' + time.getMinutes();

    this.setState({slected_checkout_time: slected_checkout_time});
    this.hideTimePicker();
  };
  render() {
    userName = this?.props?.route?.params?.userName;
    checkinTime = this?.props?.route?.params?.checkInTime;
    checkoutTime = this?.props?.route?.params?.checkOutTime;
    check_in = this?.props?.route?.params?.check_in;

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
                Home
              </Text>
            </View>
          </View>
        </View>

        <View style={{flex: 5, marginTop: '10%', marginLeft: '5%'}}>
          <Text style={styles.frequencyText}>Hi!</Text>
          <Text style={styles.text2}>{this.state.userName}</Text>

          <View style={styles.CradContainer2}>
            <Text style={styles.frequencyText}>Working Hours</Text>
            <View style={{flexDirection: 'row', marginTop: '3%'}}>
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
                marginTop: '1%',
                justifyContent: 'space-between',
                marginHorizontal: '18%',
                marginBottom: 10,
              }}>
              <View>
                {this.state.checkInTime == 'null' ||
                this.state.checkInTime == '' ||
                this.state.checkInTime == null ? (
                  <Text style={{fontWeight: 'bold', fontSize: 14}}>
                    00:00:00
                  </Text>
                ) : (
                  <Text style={{fontWeight: 'bold', fontSize: 14}}>
                    {this.state.checkInTime.replace(/['"]+/g, '')}
                  </Text>
                )}
                {this.state.checkInDate == 'null' ||
                this.state.checkInDate == '' ||
                this.state.checkInDate == null ? (
                  <Text style={{fontWeight: 'bold', fontSize: 14}}>
                    MM/DD/YYYY
                  </Text>
                ) : (
                  <Text style={{fontWeight: 'bold', fontSize: 14}}>
                    {this.state.checkInDate.replace(/['"]+/g, '')}
                  </Text>
                )}
              </View>
              <View>
                {this.state.checkOutTime == 'null' ||
                this.state.checkOutTime == '' ||
                this.state.checkOutTime == null ? (
                  <Text style={{fontWeight: 'bold', fontSize: 14}}>
                    00:00:00
                  </Text>
                ) : (
                  <Text style={{fontWeight: 'bold', fontSize: 14}}>
                    {this.state.checkOutTime.replace(/['"]+/g, '')}
                  </Text>
                )}
                {this.state.checkOutDate == 'null' ||
                this.state.checkOutDate == '' ||
                this.state.checkOutDate == null ? (
                  <Text style={{fontWeight: 'bold', fontSize: 14}}>
                    MM/DD/YYYY
                  </Text>
                ) : (
                  <Text style={{fontWeight: 'bold', fontSize: 14}}>
                    {this.state.checkOutDate.replace(/['"]+/g, '')}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={this.forgetSigninsignOut}
            style={{
              margin: '10%',
              backgroundColor: '#3AB34A',
              height: 40,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
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
        </View>

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

        <Modal
          isVisible={this.state.isModalVisible}
          //  backdropOpacity={0.1}
          onBackdropPress={() => this.setState({isModalVisible: false})}
          onRequestClose={() => {
            this.setState({isModalVisible: false});
          }}>
          <View style={styles.JonMarked_Completed_Modal}>
            <Text style={styles.TextContainer_1}>Signout date</Text>
            <TouchableOpacity
              style={styles.RectangleContainer2}
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
              style={styles.RectangleContainer2}
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
    );
  }

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
    let token = await getAsyncStorage('crewMemberToken');
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
        {text: 'OK', onPress: () => this.setState({isModalVisible: false})},
      ]);
      await setAsyncStorage('checkOutTime', this.state.slected_checkout_time);
    } else {
      Alert.alert('', responseJson.msg, [
        {text: 'OK', onPress: () => this.setState({isModalVisible: false})},
      ]);
    }
  };
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

  CradContainer2: {
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
    marginTop: '10%',
  },
  ViewBg: {
    width: '40%',
    height: 60,
    backgroundColor: '#F94B4C',
    marginTop: '4%',
    borderRadius: 14,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    shadowRadius: 5,
    marginLeft: '5%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crewMemberCheckIn: {
    width: '40%',
    height: 60,
    backgroundColor: '#839041',
    marginTop: '4%',
    borderRadius: 14,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    shadowRadius: 5,
    marginLeft: '5%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  frequencyText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: '5%',
  },
  date: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: '5%',
  },
  text1: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '1%',
    marginLeft: 10,
  },
  text2: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: '1%',
    marginLeft: 10,
  },
  puchText: {
    color: '#fff',
    fontSize: 14,
  },

  MenuContainer: {
    marginLeft: 20,
    marginTop: 70,
    width: 30,
    height: 30,
  },
  MkradContainer: {
    width: '24%',
    height: '45%',
    marginTop: '14%',
    marginLeft: '37%',
    resizeMode: 'contain',
  },

  RectangleContainer: {
    width: '55%',
    height: '19%',
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
    position: 'absolute',
    bottom: '-7%',
    right: '20%',
  },

  Bottombar: {
    width: 40,
    height: 40,
    marginTop: '13%',
    marginBottom: 43,
    alignItems: 'center',
    marginHorizontal: '11.5%',
  },
  TextContainer_1: {
    marginTop: '4%',
    color: '#000',
    marginHorizontal: '8%',
  },
  JonMarked_Completed_Modal: {
    width: 350,
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
  },
  RectangleContainer2: {
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
  SectionStyle2: {
    flexDirection: 'row',
    //  height: 40,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#379134',
    width: '80%',
  },
  JobItemContainer: {
    width: '85%',
    height: '20%',
    marginTop: '6%',
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
    alignItems: 'center',
    flexDirection: 'row',
  },

  NotificationContainer: {
    width: '10%',
    height: '29%',
    alignSelf: 'center',
    borderRadius: 25,
    borderColor: '#3AB34A',
    borderWidth: 2,
    alignItems: 'center',
    marginLeft: '5%',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 80,
  },
});

export default CrewMemberHome;
