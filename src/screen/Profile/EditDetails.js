import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  Keyboard,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card} from 'react-native-shadow-cards';
// import ImagePicker from '../../components/ImagePickerCompat';
import {ScrollView} from 'react-native-gesture-handler';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import {requestPostApiMedia, update_profile} from '../../NetworkCall/Service';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import {showLoader, hideLoader} from '../../Routes/AppLoader';
import {setAsyncStorage} from '../../Routes/AsynstorageClass';

let email = '';
let phone = '';
let address_line_1 = '';
let first_name = '';
let last_name = '';

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      userFName: '',
      userLName: '',
      userNumber: '',
      filePath: '',
      userAddress: '',
    };
  }

  componentDidMount = async () => {
    phone = await getAsyncStorage('phone');
    first_name = await getAsyncStorage('first_name');
    last_name = await getAsyncStorage('last_name');

    this.setState({userFName: first_name});
    this.setState({userLName: last_name});
    this.setState({userNumber: phone});
  };

  OnbackClick = () => {
    this.props.navigation.goBack(null);
  };

  handleSubmitPress = async () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.userFName == '') {
      Alert.alert('Please enter first name!');
      return;
    }

    if (this.state.userLName == '') {
      Alert.alert('Please enter last name!');
      return;
    }
    if (this.state.userNumber == '') {
      Alert.alert('Please enter phone number!');
      return;
    }

    showLoader();
    let token = await getAsyncStorage('token');
    const formData = new FormData();
    formData.append('first_name', this.state.userFName);
    formData.append('last_name', this.state.userLName);
    formData.append('phone', this.state.userNumber);

    const {responseJson, err} = await requestPostApiMedia(
      update_profile,
      formData,
      'POST',
      token,
    );

    if (responseJson.status == true) {
      hideLoader();
      Alert.alert('Profile updated successfully.!');
      //await setAsyncStorage('first_name', this.state.userFName);
      //await setAsyncStorage('last_name', this.state.userLName);
      let userFullName = this.state.userFName + ' ' + this.state.userLName;
      await setAsyncStorage('userName', userFullName);
      await setAsyncStorage('phone', this.state.userNumber);
      this.props.navigation.replace('Profile');
    } else {
      hideLoader();
      Alert.alert('something went wrong!');
    }
  };

  // chooseFile = async () => {
  //   const options = {
  //     title: 'Select Avatar',
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };

  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //     {
  //       title: 'We need your permission',
  //     },
  //   );

  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     ImagePicker.showImagePicker(options, (response) => {
  //       if (response.didCancel) {
  //       } else if (response.error) {
  //       } else if (response.customButton) {
  //       } else {
  //         const source = {uri: 'data:image/jpeg;base64,' + response.data};
  //         this.setState({filePath: source.uri});
  //       }
  //     });
  //   } else {
  //   }
  // };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.CradContainer2}>
          <TouchableOpacity
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../../images/back.png')} />
          </TouchableOpacity>

          <View style={{marginTop: '11%'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
              Edit profile
            </Text>
          </View>
        </View>

        <ScrollView style={{flex: 2}}>
          <Card style={styles.CradContainer}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  textAlign: 'center',
                  marginTop: '15%',
                }}>
                Edit profile
              </Text>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userFName) => this.setState({userFName})}
                underlineColorAndroid="#F6F6F7"
                placeholder="first name"
                placeholderTextColor="#000"
                keyboardType="default"
                returnKeyType="next"
                value={this.state.userFName}
                onSubmitEditing={() => this.userLname && this.userLname.focus()}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userLName) => this.setState({userLName})}
                underlineColorAndroid="#F6F6F7"
                placeholder="last name"
                placeholderTextColor="#000"
                keyboardType="default"
                returnKeyType="next"
                value={this.state.userLName}
                ref={(ref) => {
                  this.userLname = ref;
                }}
                onSubmitEditing={() => this.useremail && this.useremail.focus()}
                blurOnSubmit={false}
              />
            </View>
            {/* <View style={styles.SectionStyle2}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={userAddress => this.setState({ userAddress })}
                                underlineColorAndroid="#FFFFFF"
                                placeholder="address" //12345
                                placeholderTextColor="#000"
                                keyboardType='default'
                                value={this.state.userAddress}
                                ref={ref => {
                                    this.useremail = ref;
                                }}
                                onSubmitEditing={() => this.userNo && this.userNo.focus()}

                                blurOnSubmit={false}

                            />
                        </View> */}
            <View style={styles.SectionStyle2}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(userNumber) => this.setState({userNumber})}
                underlineColorAndroid="#FFFFFF"
                placeholder="Contact  number" //12345
                placeholderTextColor="#000"
                keyboardType="number-pad"
                maxLength={10}
                value={this.state.userNumber}
                ref={(ref) => {
                  this.userNo = ref;
                }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
              />
            </View>

            <View>
              <AppLoader ref={loaderRef} />
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={this.handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Save Changes</Text>
            </TouchableOpacity>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  CradContainer: {
    marginLeft: 30,
    marginRight: 30,
    shadowRadius: 10,
    borderRadius: 20,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 2,
    marginBottom: '5%',
    marginTop: '15%',
  },
  CradContainer2: {
    shadowRadius: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    flex: 0.13,
    flexDirection: 'row',
  },
  BackContainer: {
    width: '15%',
    height: '20%',
    marginLeft: '5%',
    marginTop: '10%',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 15,
  },

  SectionStyle2: {
    flexDirection: 'row',
    height: 40,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 15,
  },

  buttonStyle: {
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
    marginBottom: '5%',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 12,
    fontSize: 18,
  },
  inputStyle: {
    flex: 1,
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#379134',
  },

  inputStyle2: {
    flex: 1,
    color: '#379134',
    textDecorationLine: 'underline',
    fontSize: 16,
  },

  inputStyle3: {
    flex: 1,
    color: '#379134',
    textDecorationLine: 'underline',
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

export default EditProfile;
