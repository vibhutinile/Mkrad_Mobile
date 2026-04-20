import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  Keyboard,
  TouchableOpacity,
  BackHandler,
  Alert,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card} from 'react-native-shadow-cards';
import {
  requestPostApiMedia,
  crewMemberLogin,
  crewMemberupdatePassword,
  crewMemberforgotPassword,
} from '../../NetworkCall/Service';
import {setAsyncStorage} from '../../Routes/AsynstorageClass';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import {showLoader, hideLoader} from '../../Routes/AppLoader';
import Modal from 'react-native-modal';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import {SignUpStatus, requestGetApi} from '../../NetworkCall/Service';
import Loader from '../../NetworkCall/Loader';

class CrewMemberLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      // userEmail: 'hawicor597@trazeco.com',
      // userPassword: '390008',
      userEmail: '',
      userPassword: '',
      isModalVisible: false,
      ischangePassword: false,
      otp: '',
      password: '',
      confirmPassword: '',
      showSignUpBtn: '',
      loading: false,
      otpLoading: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
    this.getStatusApi();
  }

  static navigationOptions = {
    //  title: '',\
    headerShown: false,
    //header: null,
    gestureEnabled: false,
    disableGestures: true,
  };

  async getStatusApi() {
    const body = {};
    const {responseJson, err} = await requestGetApi(SignUpStatus, body, 'GET');

    this.setState({showSignUpBtn: responseJson.value});
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

  handleSubmitPress = async () => {
    let fcmId = await getAsyncStorage('FCMId');
    if (this.state.userEmail == '') {
      Alert.alert('Please enter Email.');
      return;
    }
    if (this.state.userPassword == '') {
      Alert.alert('Please enter Password.');
      return;
    }
    if (this.state.userPassword.length < 6) {
      Alert.alert('Please enter at least 6 digit password.');
      return;
    }

    this.setState({loading: true});
    const formData = new FormData();
    formData.append('email', this.state.userEmail);
    formData.append('password', this.state.userPassword);
    formData.append('device_id', fcmId);
    const {responseJson, err} = await requestPostApiMedia(
      crewMemberLogin,
      formData,
      'POST',
    );
    this.setState({loading: false});

    if (responseJson.status) {
      this.props.navigation.replace('CrewMemberHome', {
        userName: responseJson.data.name,
        checkInTime: responseJson.data.check_in_time,
        checkOutTime: responseJson.data.check_out_time,
        check_in: responseJson.data.check_in,
      });
      await setAsyncStorage('crewMemberToken', responseJson.access_token);
      await setAsyncStorage('CrewMemberFName', responseJson.data.first_name);
      await setAsyncStorage('CrewMemberLName', responseJson.data.last_name);
      await setAsyncStorage('CrewMemberName', responseJson.data.name);
      await setAsyncStorage(
        'check_in',
        JSON.stringify(responseJson.data.check_in),
      );
      await setAsyncStorage(
        'CrewMemberCheckInTime',
        JSON.stringify(responseJson.data.check_in_time),
      );
      await setAsyncStorage(
        'CrewMemberCheckOutTime',
        JSON.stringify(responseJson.data.check_out_time),
      );
      await setAsyncStorage('CrewMemberEmail', responseJson.data.email);
      await setAsyncStorage('CrewMemberPhone', responseJson.data.phone);
      await setAsyncStorage(
        'CrewMemberAddress_line_1',
        responseJson.data.address_line_1,
      );
      this._emailinput.clear();
      this._passinput.clear();
    } else {
      Alert.alert('Please enter valid user Id and password!');
    }
  };

  OnbackClick = () => {
    // this.props.navigation.goBack(null)
    this.props.navigation.navigate('LoginScreen');
  };

  forgetPassword = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  sendOtp = async () => {
    if (this.state.userEmail == '') {
      Alert.alert('Please enter Email!');
      return;
    }

    this.setState({isModalVisible: !this.state.isModalVisible});

    this.setState({loading: true});

    const formData = new FormData();
    formData.append('email', this.state.userEmail);
    const {responseJson, err} = await requestPostApiMedia(
      crewMemberforgotPassword,
      formData,
      'POST',
    );

    this.setState({loading: false});

    if (responseJson.status) {
      setTimeout(() => {
        this.setState({ischangePassword: !this.state.ischangePassword});
      }, 1000);
    } else {
      Alert.alert('Please enter  valid email!');
    }
  };

  changePassword = async () => {
    if (this.state.otp == '') {
      Alert.alert('Please enter otp!');
      return;
    }
    if (this.state.password == '') {
      Alert.alert('Please enter password!');
      return;
    }
    if (this.state.password.length < 6) {
      Alert.alert('Please enter at least 6 digit password!');
      return;
    }
    if (this.state.confirmPassword == '') {
      Alert.alert('Please enter confirm password!');
      return;
    }

    if (this.state.password != this.state.confirmPassword) {
      Alert.alert('password does not match!');
      return;
    }

    // this.setState({loading:true})
    const formData = new FormData();
    formData.append('otp', this.state.otp);
    formData.append('password', this.state.password);
    formData.append('password_confirmation', this.state.confirmPassword);

    const {responseJson, err} = await requestPostApiMedia(
      crewMemberupdatePassword,
      formData,
      'POST',
    );
    // this.setState({loading:false})
    if (responseJson.status) {
      Alert.alert(
        'Success',
        'Password update sucessfully.',
        [
          {
            text: 'Ok',
            onPress: () =>
              this.setState({ischangePassword: !this.state.ischangePassword}),
          },
        ],
        {cancelable: false},
      );
    } else if (responseJson.msg == 'OTP is not valid.') {
      Alert.alert('OTP is not valid.');
    } else {
      Alert.alert('something went wrong.');
    }
  };

  AdminDashBoard = async () => {
    let token = await getAsyncStorage('token_key');
    if (token == null) {
      this.props.navigation.navigate('AdminLoginPage');
    } else {
      this.props.navigation.navigate('SchedularScreen');
    }
  };

  SignUpScreen = () => {
    this.props.navigation.navigate('SignupScreen');
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: '#E8E8E8',
              flexDirection: 'row',
              height: 150,
            }}>
            <TouchableOpacity
              onPress={this.OnbackClick}
              style={{
                alignItems: 'center',
                marginTop: '8%',
                marginLeft: '5%',
              }}>
              <Image source={require('../../images/back.png')} />
            </TouchableOpacity>
            <Image
              style={{
                width: '22%',
                height: 100,
                marginLeft: '26%',
                alignSelf: 'center',
                justifyContent: 'center',
                resizeMode: 'contain',
              }}
              source={require('../../images/logo.png')}
            />
          </View>

          <Card style={styles.CradContainer}>
            <View style={styles.SectionStyle}>
              <Image
                style={{marginLeft: 10, alignSelf: 'center'}}
                source={require('../../images/email.png')}></Image>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userEmail) => this.setState({userEmail})}
                underlineColorAndroid="#F6F6F7"
                // autoCapitalize="none"
                placeholder="Enter Email"
                placeholderTextColor="#000"
                maxLength={100}
                value={this.state.userEmail}
                keyboardType="email-address"
                returnKeyType="next"
                ref={(ref) => {
                  this._passinput = ref;
                }}
                onSubmitEditing={() =>
                  this._emailinput && this._emailinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.SectionStyle2}>
              <Image
                style={{marginLeft: 10, alignSelf: 'center'}}
                source={require('../../images/password.png')}></Image>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userPassword) => this.setState({userPassword})}
                underlineColorAndroid="#FFFFFF"
                maxLength={100}
                // autoCapitalize="none"
                placeholder="Enter Password" //12345
                placeholderTextColor="#000"
                keyboardType="default"
                ref={(ref) => {
                  this._emailinput = ref;
                }}
                value={this.state.userPassword}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={styles.SectionStyle3}
              onPress={this.forgetPassword}>
              <Text style={styles.inputStyle2}> Forgot Password ?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={this.handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            {this.state.showSignUpBtn == 1 ? (
              <TouchableOpacity
                onPress={this.SignUpScreen}
                style={{
                  alignSelf: 'center',
                  marginBottom: '5%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.signup}>
                  Don't have an account? Sign Up
                </Text>
              </TouchableOpacity>
            ) : null}
          </Card>

          {/* <View style={styles.AdminButtonStyle}>
                    <TouchableOpacity
                        onPress={this.AdminDashBoard}>
                        <Text style={styles.TextStyle}> Administrator Login </Text>
                    </TouchableOpacity>

                </View> */}

          <Modal
            isVisible={this.state.isModalVisible}
            //backdropOpacity={0.5}
            onBackdropPress={() => this.setState({isModalVisible: false})}
            onRequestClose={() => {
              this.setState({isModalVisible: false});
            }}>
            <View style={styles.JonMarked_Completed_Modal}>
              <Text style={{marginTop: '5%'}}>Send OTP to your Email id</Text>
              <View style={styles.SectionStyle_2}>
                <Image
                  style={{marginLeft: 10, alignSelf: 'center'}}
                  source={require('../../images/email.png')}></Image>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(userEmail) => this.setState({userEmail})}
                  underlineColorAndroid="#F6F6F7"
                  placeholder="Enter Email"
                  placeholderTextColor="#000"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    this._emailinput && this._emailinput.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <TouchableOpacity
                style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={this.sendOtp}>
                <Text style={styles.buttonTextStyle2}>Send</Text>
              </TouchableOpacity>
            </View>
            {/* <Loader isLoader={this.state.loading}></Loader> */}
          </Modal>

          <Modal
            isVisible={this.state.ischangePassword}
            // backdropOpacity={0.1}
            onBackdropPress={() => this.setState({ischangePassword: false})}
            onRequestClose={() => {
              this.setState({ischangePassword: false});
            }}>
            <View style={styles.JonMarked_Completed_Modal}>
              <Text style={{marginTop: '5%'}}>
                OTP is sent to your email ID
              </Text>
              <View style={styles.SectionStyle_2}>
                <Image
                  style={{marginLeft: 10, alignSelf: 'center'}}
                  source={require('../../images/email.png')}></Image>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(otp) => this.setState({otp})}
                  underlineColorAndroid="#F6F6F7"
                  placeholder="Enter OTP"
                  placeholderTextColor="#000"
                  keyboardType="number-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => this._otpnput && this._otpnput.focus()}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.SectionStyle_2}>
                <Image
                  style={{marginLeft: 10, alignSelf: 'center'}}
                  source={require('../../images/email.png')}></Image>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(password) => this.setState({password})}
                  underlineColorAndroid="#F6F6F7"
                  placeholder="Password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  placeholderTextColor="#000"
                  keyboardType="default"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    this._passinput && this._passinput.focus()
                  }
                  ref={(ref) => {
                    this._otpnput = ref;
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle_2}>
                <Image
                  style={{marginLeft: 10, alignSelf: 'center'}}
                  source={require('../../images/email.png')}></Image>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(confirmPassword) =>
                    this.setState({confirmPassword})
                  }
                  underlineColorAndroid="#F6F6F7"
                  placeholder="Confirm Password"
                  placeholderTextColor="#000"
                  keyboardType="default"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={Keyboard.dismiss}
                  ref={(ref) => {
                    this._passinput = ref;
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <TouchableOpacity
                style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={this.changePassword}>
                <Text style={styles.buttonTextStyle2}>Submit</Text>
              </TouchableOpacity>
            </View>
            {/* <Loader isLoader={this.state.otpLoading}></Loader> */}
          </Modal>
        </ScrollView>
        <Loader isLoader={this.state.loading}></Loader>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  CradContainer: {
    shadowRadius: 10,
    borderRadius: 20,
    width: '82%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '10%',
    justifyContent: 'center',
    marginBottom: 10,
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
    alignItems: 'center',
  },

  SectionStyle: {
    flexDirection: 'row',
    // height: 40,
    marginTop: 60,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#379134',
    width: '80%',
  },
  SectionStyle_2: {
    flexDirection: 'row',
    //  height: 40,
    marginTop: '10%',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#379134',
    width: '80%',
  },

  SectionStyle2: {
    flexDirection: 'row',
    //height: 40,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#379134',
    width: '80%',
  },

  SectionStyle3: {
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 10,
  },

  SectionStyle4: {
    position: 'absolute',
    bottom: '8%',
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: '#3AB34A',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#3AB34A',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 20,
    alignSelf: 'center',
  },

  buttonStyle2: {
    backgroundColor: '#3AB34A',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#3AB34A',
    height: 40,
    width: 150,
    alignItems: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: '5%',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  signup: {
    color: '#000',
    fontSize: 16,
    fontStyle: 'italic',
    padding: 16,
  },
  AdminButtonStyle: {
    resizeMode: 'contain',
    backgroundColor: '#E8E8E8',
    marginBottom: '8%',
    height: '5%',
    marginTop: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '6%',
    marginBottom: '5%',
  },

  TextStyle: {
    color: '#3AB34A',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  buttonTextStyle2: {
    color: '#FFFFFF',
    fontSize: 16,
    alignSelf: 'center',
    fontStyle: 'normal',
    justifyContent: 'center',
  },
  inputStyle: {
    padding: 16,
    alignSelf: 'center',
    width: '80%',
  },

  inputStyle2: {
    color: '#379134',
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    fontSize: 16,
  },

  inputStyle3: {
    color: '#379134',
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});

export default CrewMemberLogin;
