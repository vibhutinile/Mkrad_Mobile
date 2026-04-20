import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Snackbar,
  Image,
  StyleSheet,
  Text,
  Keyboard,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card} from 'react-native-shadow-cards';
import {
  requestPostApiMedia,
  forgotpassword,
  ForgetPasswordUpdate,
  admin_login,
} from '../NetworkCall/Service';
import {setAsyncStorage, getAsyncStorage} from '../Routes/AsynstorageClass';
import AppLoader, {loaderRef} from '../Routes/AppLoader';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';
import Loader from '../NetworkCall/Loader';

class AdminLoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      // userEmail: 'services@mkrad.com',
      // userPassword: 'P0rsch3m@d',
      userEmail: '',
      userPassword: '',
      isModalVisible: false,
      ischangePassword: false,
      otp: '',
      password: '',
      confirmPassword: '',
      loading: false,
    };
  }
  static navigationOptions = {
    //  title: '',\
    headerShown: false,
    //header: null,
    gestureEnabled: false,
    disableGestures: true,
  };

  handleSubmitPress = async () => {
    let fcmId = await getAsyncStorage('FCMId');

    if (this.state.userEmail == '') {
      Alert.alert('Please enter Email !');
      return;
    }
    if (this.state.userPassword == '') {
      Alert.alert('Please enter Password !');
      return;
    }
    if (this.state.userPassword.length < 6) {
      Alert.alert('Please enter at least 6 digit password !');
      return;
    }

    try {
      await setAsyncStorage('admin_email', this.state.userEmail);
    } catch (error) {}
    this.setState({loading: true});
    const formData = new FormData();
    formData.append('email', this.state.userEmail);
    formData.append('password', this.state.userPassword);
    formData.append('device_id', fcmId);
    const {responseJson, err} = await requestPostApiMedia(
      admin_login,
      formData,
      'POST',
    );
    this.setState({loading: false});
    if (responseJson.status) {
      await setAsyncStorage('token_key', responseJson.access_token);
      await setAsyncStorage('userName', responseJson.data.name);
      await setAsyncStorage('email', responseJson.data.email);
      await setAsyncStorage('phone', responseJson.data.phone);
      await setAsyncStorage('address_line_1', responseJson.data.address_line_1);
      //await setAsyncStorage('address_line_2', responseJson.data.address_line_2)
      await setAsyncStorage('first_name', responseJson.data.first_name);
      await setAsyncStorage('last_name', responseJson.data.last_name);
      this._emailinput.clear();
      this._passinput.clear();
      this.props.navigation.navigate('SchedularScreen');
    } else {
      Alert.alert('Please enter  valid user Id and password!');
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
    this.setState({isModalVisible: !this.state.isModalVisible});
    if (this.state.userEmail == '') {
      Alert.alert('Please enter Email!');
      return;
    }
    this.setState({loading: true});
    const formData = new FormData();
    formData.append('email', this.state.userEmail);
    const {responseJson, err} = await requestPostApiMedia(
      forgotpassword,
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
    this.setState({loading: true});
    const formData = new FormData();
    formData.append('otp', this.state.otp);
    formData.append('password', this.state.password);
    formData.append('password_confirmation', this.state.confirmPassword);
    const {responseJson, err} = await requestPostApiMedia(
      ForgetPasswordUpdate,
      formData,
      'POST',
    );
    this.setState({loading: false});
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
    } else if (responseJson.msg == 'OTP is not valid') {
      Alert.alert('OTP is not valid!');
    } else {
      Alert.alert('something went wrong!');
    }
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
              <Image source={require('../images/back.png')} />
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
              source={require('../images/logo.png')}
            />
          </View>

          <Card style={styles.CradContainer}>
            <View style={styles.SectionStyle}>
              <Image
                style={{marginLeft: 10, alignSelf: 'center'}}
                source={require('../images/email.png')}></Image>

              <TextInput
                style={styles.inputStyle}
                onChangeText={(userEmail) => this.setState({userEmail})}
                underlineColorAndroid="#F6F6F7"
                placeholder="Enter Email"
                autoCapitalize="none"
                value={this.state.userEmail}
                placeholderTextColor="#000"
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
                source={require('../images/password.png')}></Image>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userPassword) => this.setState({userPassword})}
                underlineColorAndroid="#FFFFFF"
                autoCapitalize="none"
                value={this.state.userPassword}
                placeholder="Enter Password" //12345
                placeholderTextColor="#000"
                keyboardType="default"
                ref={(ref) => {
                  this._emailinput = ref;
                }}
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
          </Card>
          <View style={{flex: 0.5}}>
            <AppLoader ref={loaderRef} />
          </View>

          <Modal
            isVisible={this.state.isModalVisible}
            //  backdropOpacity={0.1}
            onBackdropPress={() => this.setState({isModalVisible: false})}
            onRequestClose={() => {
              this.setState({isModalVisible: false});
            }}>
            <View style={styles.JonMarked_Completed_Modal}>
              <Text style={{marginTop: '5%'}}>Send OTP to your Email id</Text>
              <View style={styles.SectionStyle2}>
                <Image
                  style={{marginLeft: 10, alignSelf: 'center'}}
                  source={require('../images/email.png')}></Image>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(userEmail) => this.setState({userEmail})}
                  underlineColorAndroid="#F6F6F7"
                  placeholder="Enter Email"
                  autoCapitalize="none"
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
          </Modal>

          <Modal
            isVisible={this.state.ischangePassword}
            //  backdropOpacity={0.1}
            onBackdropPress={() => this.setState({ischangePassword: false})}
            onRequestClose={() => {
              this.setState({ischangePassword: false});
            }}>
            <View style={styles.JonMarked_Completed_Modal}>
              <Text style={{marginTop: '5%'}}>OTP is sent in your email</Text>
              <View style={styles.SectionStyle2}>
                <Image
                  style={{marginLeft: 10, alignSelf: 'center'}}
                  source={require('../images/email.png')}></Image>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(otp) => this.setState({otp})}
                  underlineColorAndroid="#F6F6F7"
                  placeholder="enter otp"
                  placeholderTextColor="#000"
                  keyboardType="number-pad"
                  returnKeyType="next"
                  autoCapitalize="none"
                  onSubmitEditing={() => this._otpnput && this._otpnput.focus()}
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.SectionStyle2}>
                <Image
                  style={{marginLeft: 10, alignSelf: 'center'}}
                  source={require('../images/email.png')}></Image>
                <TextInput
                  style={styles.inputStyle}
                  autoCapitalize={false}
                  onChangeText={(password) => this.setState({password})}
                  underlineColorAndroid="#F6F6F7"
                  placeholder="password"
                  placeholderTextColor="#000"
                  keyboardType="default"
                  returnKeyType="next"
                  autoCapitalize="none"
                  onSubmitEditing={() =>
                    this._passinput && this._passinput.focus()
                  }
                  ref={(ref) => {
                    this._otpnput = ref;
                  }}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle2}>
                <Image
                  style={{marginLeft: 10, alignSelf: 'center'}}
                  source={require('../images/email.png')}></Image>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(confirmPassword) =>
                    this.setState({confirmPassword})
                  }
                  underlineColorAndroid="#F6F6F7"
                  placeholder="confirm password"
                  placeholderTextColor="#000"
                  keyboardType="default"
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
            <Loader isLoader={this.state.loading}></Loader>
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
    marginTop: '15%',
    marginBottom: '5%',
  },
  SectionStyle: {
    flexDirection: 'row',
    //   height: 40,
    marginTop: 60,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#379134',
    width: '80%',
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

  SectionStyle3: {
    flexDirection: 'row',
    marginLeft: 85,
    marginTop: 10,
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
    height: 50,
    width: 200,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 70,
    alignSelf: 'center',
    marginBottom: '5%',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 12,
    fontSize: 16,
    alignSelf: 'center',
    fontStyle: 'normal',
  },
  inputStyle: {
    //  marginLeft: "5%",
    alignSelf: 'center',
    width: '80%',
    padding: 16,
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
  SectionStyle_2: {
    flexDirection: 'row',
    height: 40,
    marginTop: '10%',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#379134',
    width: '80%',
  },

  buttonTextStyle2: {
    color: '#FFFFFF',
    fontSize: 16,
    alignSelf: 'center',
    fontStyle: 'normal',
    justifyContent: 'center',
  },
  inputStyle2: {
    flex: 1,
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

export default AdminLoginPage;
