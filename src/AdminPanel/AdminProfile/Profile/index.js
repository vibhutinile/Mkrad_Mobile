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
import {clearAsyncStorage} from '../../../Routes/AsynstorageClass';
import {getAsyncStorage} from '../../../Routes/AsynstorageClass';
import {
  requestGetApi,
  LogoutApi,
  delete_account,
  requestPostApiMedia,
} from '../../../NetworkCall/Service';
import Loader from '../../../NetworkCall/Loader';
import {ScrollView} from 'react-native-gesture-handler';

let userName = '';
let email = '';
let phone = '';
let userFullName = '';
class AdminProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      username: '',
      email_id: '',
      phoneNo: '',
      loading: false,
    };
  }

  componentDidMount = async () => {
    userName = await getAsyncStorage('userName');
    let userFName = await getAsyncStorage('first_name');
    let userLName = await getAsyncStorage('last_name');
    if (userLName != null) {
      userFullName = userFName + ' ' + userLName;
    } else {
      userFullName = userFName;
    }

    email = await getAsyncStorage('email');
    phone = await getAsyncStorage('phone');

    this.setState({username: userName});
    this.setState({username: userFullName});
    this.setState({email_id: email});
    this.setState({phoneNo: phone});
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  logout = async () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
    this.props.navigation.navigate('LoginPage');
    let token = await getAsyncStorage('token_key');
    const body = {};
    const {responseJson, err} = await requestGetApi(
      LogoutApi,
      body,
      'GET',
      token,
    );
    clearAsyncStorage();
  };
  attendanceLog = () => {
    this.props.navigation.navigate('CrewLeadList');
  };
  crewMemberList = () => {
    this.props.navigation.navigate('CrewMemberList');
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
    const token = await getAsyncStorage('token_key');
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
          onPress: () => this.props.navigation.navigate('AdminLoginPage'),
        },
      ]);
    } else {
      alert(responseJson.message);
    }
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <View
            style={{
              marginTop: '10%',
            }}>
            <Image
              style={styles.MkradContainer}
              source={require('../../../images/logo.png')}
            />
          </View>
          <TouchableOpacity
            style={{position: 'absolute', marginTop: '1%', right: '1%'}}
            onPress={() => this.props.navigation.navigate('AdminNotification')}>
            <Image
              style={styles.NotificationConrainer}
              source={require('../../../images/notification.png')}
            />
          </TouchableOpacity>
          <View style={styles.RectangleContainer}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Profile
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.CradContainer2}>
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
              style={{
                fontSize: 16,
                color: '#3AB34A',
                alignSelf: 'center',
              }}>
              Admin
            </Text>
            <View
              style={{
                width: '100%',
                height: 50,
                backgroundColor: '#F4F4F4',
                marginTop: '5%',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  position: 'absolute',
                  top: 1,
                  alignSelf: 'center',
                  left: '25%',
                }}>
                {this.state.email_id}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                  position: 'absolute',
                  left: '38%',
                  top: 22,
                }}>
                {this.state.phoneNo}
              </Text>
            </View>
          </View>

          <View style={{flex: 2}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('AdminEditProfile')
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
                this.props.navigation.navigate('AdminChangePassword')
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
                  marginTop: 10,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#fff',
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                Crew lead attendance logs
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.RectangleContainer3}
              onPress={this.crewMemberList}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#fff',
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                Crew member attendance logs
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={this.confirmDelete}>
            <Text style={{ fontSize: 16, alignSelf: 'center', color: '#000000', marginTop: "3%", fontWeight: "bold" }}> Delete Account</Text>
          </TouchableOpacity> */}
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: '#222441',
            height: 84,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.Bottombar2}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AdminHome')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../../images/ic_calendar.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SchedularScreen')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../../images/ic_home.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CrewManagement')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../../images/ic_group.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('AdminProfileScreen')
              }
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../../images/ic_user.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Loader isLoader={this.state.loading}></Loader>

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
                onPress={this.logout}>
                <Text style={styles.OKText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  CradContainer: {
    height: '26%',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    shadowRadius: 10,
    borderWidth: 0,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: '12%',
    marginLeft: '10%',
    marginRight: '10%',
    alignItems: 'center',
    height: '28%',
    justifyContent: 'center',
  },
  MenuContainer: {
    marginLeft: 20,
    marginTop: 70,
    width: 30,
    height: 30,
  },
  MkradContainer: {
    alignSelf: 'center',
    width: 100,
    height: 90,
    resizeMode: 'contain',
  },

  RectangleContainer: {
    width: '45%',
    height: '18%',
    backgroundColor: '#3AB34A',
    alignSelf: 'center',
    borderRadius: 14,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 3,
    shadowRadius: 2,
    alignItems: 'center',
    position: 'absolute',
    bottom: '-8%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  NotificationConrainer: {
    marginTop: '85%',
    marginRight: '8%',
    width: 30,
    height: 30,
  },
  Bottombar: {
    width: 40,
    height: 40,
    marginTop: '13%',
    borderColor: '#ddd',
    marginBottom: 43,
    alignItems: 'center',
    marginLeft: '4%',
    marginRight: 22,
    padding: 7,
  },

  Bottombar2: {
    width: 40,
    height: 40,
    marginTop: '13%',
    borderColor: '#ddd',
    marginBottom: 43,
    alignItems: 'center',
    marginLeft: '15%',
    marginRight: 22,
    padding: 7,
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
  RectangleContainer2: {
    height: 40,
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
    marginTop: 20,
  },
  RectangleContainer3: {
    height: 40,
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
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default AdminProfileScreen;
