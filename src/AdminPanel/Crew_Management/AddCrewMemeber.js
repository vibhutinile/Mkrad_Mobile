import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card} from 'react-native-shadow-cards';
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import {
  requestGetApi,
  requestPostApiMedia,
  getstateList,
  crewMemberList,
} from '../../NetworkCall/Service';
import {setAsyncStorage} from '../../Routes/AsynstorageClass';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import {showLoader, hideLoader} from '../../Routes/AppLoader';
import styles from '../../AdminPanel/Schedular/AddCustomer/styles';
import Loader from '../../NetworkCall/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

let stateList = [];

class AddCrewMemeber extends React.Component {
  constructor() {
    super();
    this.state = {
      userFName: '',
      userLName: '',
      userNumber: '',
      filePath: '',
      userAddress: '',
      Email: '',
      Phonenumber: '',
      userAddress_1: '',
      userAddress_2: '',
      city: '',
      zipcode: '',
      StateList: [],
      default_value: '',
      status: '',
    };
  }

  componentDidMount = async () => {
    this.getStateList();
  };

  OnbackClick = () => {
    this.props.navigation.goBack(null);
  };
  async getStateList() {
    let token = await getAsyncStorage('token_key');
    const body = {};
    const {responseJson, err} = await requestGetApi(
      getstateList,
      body,
      'GET',
      token,
    );
    if (responseJson.status) {
      // stateList = responseJson.data;
      for (let i = 0; i < responseJson.data.length; i++) {
        stateList.push({
          value: responseJson.data[i].id,
          label: responseJson.data[i].name,
        });
      }
      this.setState({StateList: stateList});
    }
  }
  handleSubmitPress = async () => {
    if (this.state.userFName == '') {
      Alert.alert('Please enter first name.');
      return;
    }

    if (this.state.userLName == '') {
      Alert.alert('Please enter last name.');
      return;
    }
    if (this.state.Email == '') {
      Alert.alert('Please enter email.');
      return;
    }
    if (this.state.Phonenumber == '') {
      Alert.alert('Please enter phone number.');
      return;
    }

    if (this.state.status == '') {
      Alert.alert('Please enter status.');
      return;
    }
    let name = this.state.userFName + ' ' + this.state.userLName;
    showLoader();
    let token = await getAsyncStorage('token_key');
    const formData = new FormData();
    formData.append('first_name', this.state.userFName);
    formData.append('last_name', this.state.userLName);
    formData.append('email', this.state.Email);
    formData.append('phone', this.state.Phonenumber);
    formData.append('status', this.state.status);

    const {responseJson, err} = await requestPostApiMedia(
      crewMemberList,
      formData,
      'POST',
      token,
    );
    hideLoader();
    if (responseJson.status == true) {
      hideLoader();
      Alert.alert(responseJson.msg);
      this.props.navigation.navigate('ActiveCrewMember');
    } else {
      Alert.alert(responseJson.msg);
    }
  };

  OnCustomerchangeValue(items) {
    this.setState({state: items});
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={styles.CradContainer2}>
            <TouchableOpacity
              onPress={this.OnbackClick}
              style={styles.BackContainer}>
              <Image source={require('../../images/back.png')} />
            </TouchableOpacity>

            <View style={{marginLeft: '8%'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                Add Crew Member
              </Text>
            </View>
          </View>

          <ScrollView style={{flex: 2}}>
            <Card style={styles.CradContainer}>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(userFName) => this.setState({userFName})}
                  underlineColorAndroid="#F6F6F7"
                  placeholder="First Name"
                  placeholderTextColor="#000"
                  keyboardType="default"
                  returnKeyType="next"
                  value={this.state.userFName}
                  onSubmitEditing={() =>
                    this.userLname && this.userLname.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.SectionStyle2}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(userLName) => this.setState({userLName})}
                  underlineColorAndroid="#F6F6F7"
                  placeholder="Last Name"
                  placeholderTextColor="#000"
                  keyboardType="default"
                  returnKeyType="next"
                  value={this.state.userLName}
                  ref={(ref) => {
                    this.userLname = ref;
                  }}
                  onSubmitEditing={() =>
                    this.useremail && this.useremail.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle2}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(Email) => this.setState({Email})}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Email" //12345
                  placeholderTextColor="#000"
                  keyboardType="default"
                  ref={(ref) => {
                    this.useremail = ref;
                  }}
                  onSubmitEditing={() => this.userNo && this.userNo.focus()}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle2}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(Phonenumber) => this.setState({Phonenumber})}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Phone" //12345
                  placeholderTextColor="#000"
                  keyboardType="number-pad"
                  ref={(ref) => {
                    this.userNo = ref;
                  }}
                  onSubmitEditing={() =>
                    this.address_line_1 && this.address_line_1.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              {/* <View style={styles.SectionStyle2}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={userAddress_1 => this.setState({ userAddress_1 })}
                                underlineColorAndroid="#FFFFFF"
                                placeholder="Address Line 1" //12345
                                placeholderTextColor="#000"
                                keyboardType='default'
                                ref={ref => {
                                    this.address_line_1 = ref;
                                }}
                                onSubmitEditing={() => this.address_line_2 && this.address_line_2.focus()}
                                blurOnSubmit={false}

                            />
                        </View>
                        <View style={styles.SectionStyle2}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={userAddress_2 => this.setState({ userAddress_2 })}
                                underlineColorAndroid="#FFFFFF"
                                placeholder="Address Line 2" //12345
                                placeholderTextColor="#000"
                                keyboardType='default'
                                ref={ref => {
                                    this.address_line_2 = ref;
                                }}
                                onSubmitEditing={() => this.city && this.city.focus()}
                                blurOnSubmit={false}

                            />
                        </View> */}
              {/* <View style={styles.SectionStyle2}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={city => this.setState({ city })}
                                underlineColorAndroid="#FFFFFF"
                                placeholder="City" //12345
                                placeholderTextColor="#000"
                                keyboardType='default'
                                ref={ref => {
                                    this.city = ref;
                                }}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                            />
                        </View> */}

              {/* <DropDownPicker
                            items={this.state.StateList}
                            searchable={true}
                            key={1}
                            zIndex={4}
                            searchablePlaceholder="Search"
                            placeholder="Select"
                            labelStyle={{color:'black'}}
                            searchablePlaceholderTextColor="gray"
                            defaultValue={this.state.default_value.label}
                            containerStyle={{ height: 40, marginTop: "3%", }}
                            style={styles.RectangleContainer_6}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{ backgroundColor: '#fff' }}
                            onChangeItem={(items, index) => this.OnCustomerchangeValue(items.label, index)}
                        />

                        <View style={styles.SectionStyle3}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={zipcode => this.setState({ zipcode })}
                                underlineColorAndroid="#FFFFFF"
                                placeholder="Zip Code" //12345
                                placeholderTextColor="#000"
                                keyboardType='default'
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                            />
                        </View> */}
              <DropDownPicker
                items={[
                  {label: 'Active', value: '1'},
                  {label: 'Inactive', value: '2'},
                ]}
                searchablePlaceholderTextColor="gray"
                defaultValue={this.state.status}
                zIndex={3}
                labelStyle={{color: 'black'}}
                containerStyle={{height: 40, marginTop: '0%'}}
                style={styles.RectangleContainer_6}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select"
                dropDownStyle={{backgroundColor: '#fff'}}
                onChangeItem={(item) =>
                  this.setState({
                    status: item.value,
                  })
                }
              />
              <View>
                <AppLoader ref={loaderRef} />
              </View>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={this.handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>Submit</Text>
              </TouchableOpacity>
            </Card>
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default AddCrewMemeber;
