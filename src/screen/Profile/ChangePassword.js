import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  ToastAndroid,
  Alert,
} from 'react-native';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import {requestPostApiMedia, changePassword} from '../../NetworkCall/Service';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import {showLoader, hideLoader} from '../../Routes/AppLoader';

export default class ChangePassword extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      confirm_password: '',
    };
  }
  OnbackClick = () => {
    this.props.navigation.goBack();
  };

  SavePassword = async () => {
    // this._passwordinput.clear() ;
    // this._input.clear();
    if (this.state.password == '') {
      Alert.alert('Please enter new password.');
      return;
    }
    if (this.state.confirm_password == '') {
      Alert.alert('Please enter confirm password.');
      return;
    }
    if (this.state.password <= 6) {
      Alert.alert('Please enter at least 6 digit password.');
      return;
    }
    if (this.state.password != this.state.confirm_password) {
      Alert.alert('new password and confirm password does not match.');
      return;
    }

    showLoader();
    let token = await getAsyncStorage('token');
    const formData = new FormData();
    formData.append('password', this.state.password);
    formData.append('password_confirmation', this.state.confirm_password);
    const {responseJson, err} = await requestPostApiMedia(
      changePassword,
      formData,
      'POST',
      token,
    );

    if (responseJson.status == true) {
      hideLoader();
      Alert.alert('Password change sucessfully!');
      this.props.navigation.navigate('Profile');
    } else {
      hideLoader();
      Alert.alert('something went wrong!');
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../../images/back.png')} />
          </TouchableOpacity>

          <View style={{marginTop: '14%'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
              Change Password
            </Text>
          </View>
        </View>

        <View style={{flex: 6}}>
          <View style={styles.CradContainer2}>
            <Text style={styles.TextContainer2}>New password</Text>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(password) => this.setState({password})}
                underlineColorAndroid="#F6F6F7"
                placeholder="New password"
                placeholderTextColor="#000"
                keyboardType="email-address"
                returnKeyType="next"
                ref={(ref) => {
                  this._input = ref;
                }}
                onSubmitEditing={() =>
                  this._passwordinput && this._passwordinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>

            <Text style={styles.TextContainer2}>Confirm Password</Text>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(confirm_password) =>
                  this.setState({confirm_password})
                }
                underlineColorAndroid="#F6F6F7"
                placeholder="Confirm Password"
                placeholderTextColor="#000"
                keyboardType="email-address"
                returnKeyType="next"
                ref={(ref) => {
                  this._passwordinput = ref;
                }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>

            <View>
              <AppLoader ref={loaderRef} />
            </View>
            <TouchableOpacity
              onPress={this.SavePassword}
              style={styles.SaveContainer}>
              <Text style={styles.TextContainer1}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CradContainer: {
    height: 120,
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
    marginTop: '15%',
    marginLeft: '10%',
    marginRight: '10%',
  },

  BackContainer: {
    width: '15%',
    height: '20%',
    marginLeft: '5%',
    marginTop: '13%',
  },
  SectionStyle: {
    height: 45,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 15,
  },

  SectionStyle2: {
    height: 40,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
  },
  inputStyle: {
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#379134',
    fontSize: 14,
    padding: '5%',
  },
  TextContainer: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: '15%',
    marginLeft: '8%',
  },

  TextContainer1: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: '5%',
    color: '#fff',
  },
  TextContainer2: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: '5%',
    marginLeft: '8%',
  },
  SaveContainer: {
    backgroundColor: '#379134',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#222441',
    height: 50,
    width: 200,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: '10%',
  },
});
