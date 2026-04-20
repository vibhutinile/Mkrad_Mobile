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
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import {
  requestGetApi,
  requestPostApiMedia,
  edit_crewmember_assignlist,
  update_crewmember_assignlist,
  assign_crewmember_to_crewlead,
} from '../../NetworkCall/Service';
import {setAsyncStorage} from '../../Routes/AsynstorageClass';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import {showLoader, hideLoader} from '../../Routes/AppLoader';
import styles from './../Schedular/AddCustomer/styles';
import Loader from '../../NetworkCall/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

let stateList = [];
let text2 = '';
let schedule_crewLeaderList = [];
let schedule_crewMemberList = [];
let id = '';
let update = '';
class AssignCrewMember extends React.Component {
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
      crewdlist_name: [],
      selectedItems: [],
      crew_members_List: [],
      crew_leads_List: [],
      default_value_caremember: '',
      crewMember_id: '',
      crewlead_id: '',
    };
  }

  componentDidMount = async () => {
    //this.getStateList();
    if (update == 'update') {
      this.getupdateCrewleadList();
    } else {
      this.getCrewleadList();
    }
  };

  OnbackClick = () => {
    this.props.navigation.goBack();
  };

  render() {
    id = this.props.route.params.id;
    update = this.props.route.params.update;
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
              {update == 'update' ? (
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                  Update Assign Crew Member
                </Text>
              ) : (
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                  Assign Crew Member
                </Text>
              )}
            </View>
          </View>

          <ScrollView style={{flex: 2}}>
            <Card style={styles.CradContainer3}>
              <Text style={styles.TextContainer_1}>Select Crew Lead</Text>

              <DropDownPicker
                zIndex={2}
                items={this.state.crew_leads_List}
                searchable={true}
                searchablePlaceholder="Search"
                placeholder="Select"
                searchablePlaceholderTextColor="gray"
                defaultValue={this.state.default_value.label}
                containerStyle={{height: 40, marginTop: '3%', marginLeft: '5%'}}
                style={styles.RectangleContainer_6}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                multipleText={2}
                labelStyle={{color: 'gray'}}
                dropDownStyle={{backgroundColor: '#fff'}}
                searchableError={() => <Text>Not Found</Text>}
                onChangeItem={(items, index) =>
                  this.OnCrewLaedchangeValue(items, index)
                }
                onSearch={(text) => this.getCrewleadList(text)}
              />
              <Text style={styles.TextContainer_1}>Select Crew Members</Text>
              {update == 'update' ? (
                <View
                  style={{
                    height: 45,
                    borderColor: '#379134',
                    borderWidth: 1,
                    marginLeft: 1,
                    width: '75%',
                    marginLeft: '5%',
                    justifyContent: 'center',
                    marginTop: 5,
                    borderRadius: 3,
                  }}>
                  <Text style={{color: 'gray', marginLeft: 10}}>
                    {this.state.default_value_caremember}
                  </Text>
                </View>
              ) : (
                <DropDownPicker
                  zIndex={1}
                  items={this.state.crew_members_List}
                  searchable={true}
                  searchablePlaceholder="Search"
                  placeholder="Select"
                  searchablePlaceholderTextColor="gray"
                  defaultValue={this.state.default_value_caremember.label}
                  containerStyle={{
                    height: 40,
                    marginTop: '3%',
                    marginLeft: '5%',
                  }}
                  style={styles.RectangleContainer_6}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  multipleText={2}
                  labelStyle={{color: 'gray'}}
                  dropDownStyle={{backgroundColor: '#fff'}}
                  searchableError={() => <Text>Not Found</Text>}
                  onChangeItem={(items, index) =>
                    this.OnCrewMemberchangeValue(items, index)
                  }
                  onSearch={(text) => this.getCrewleadList(text)}
                />
              )}
              <View>
                <AppLoader ref={loaderRef} />
              </View>
              {update == 'update' ? (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={this.updateData}>
                  <Text style={styles.buttonTextStyle}>Update</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={this.handleSubmitPress}>
                  <Text style={styles.buttonTextStyle}>Submit</Text>
                </TouchableOpacity>
              )}
            </Card>
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  handleSubmitPress = async () => {
    if (this.state.crewlead_id == '') {
      Alert.alert('Please select crew lead.');
      return;
    }

    if (this.state.crewMember_id == '') {
      Alert.alert('Please select crew member.');
      return;
    }
    showLoader();
    let token = await getAsyncStorage('token_key');
    const formData = new FormData();
    formData.append('crew_lead', this.state.crewlead_id);
    formData.append('crew_members', this.state.crewMember_id);
    const {responseJson, err} = await requestPostApiMedia(
      assign_crewmember_to_crewlead,
      formData,
      'POST',
      token,
    );
    hideLoader();
    if (responseJson.status == true) {
      hideLoader();
      Alert.alert('', responseJson.msg, [
        {
          text: 'OK',
          onPress: () => this.props.navigation.navigate('AssignedCrews'),
        },
      ]);
    } else {
      Alert.alert(responseJson.msg);
    }
  };

  updateData = async () => {
    if (this.state.crewlead_id == '') {
      Alert.alert('Please select crew lead.');
      return;
    }

    showLoader();
    let token = await getAsyncStorage('token_key');
    const formData = new FormData();
    formData.append('crew_lead', this.state.crewlead_id);
    let new_update_crewmember_assignlist = update_crewmember_assignlist + id;
    const {responseJson, err} = await requestPostApiMedia(
      new_update_crewmember_assignlist,
      formData,
      'POST',
      token,
    );
    hideLoader();
    if (responseJson.status == true) {
      hideLoader();
      Alert.alert('', responseJson.msg, [
        {
          text: 'OK',
          onPress: () => this.props.navigation.navigate('AssignedCrews'),
        },
      ]);
    } else {
      Alert.alert(responseJson.msg);
    }
  };
  OnCrewLaedchangeValue(items) {
    this.setState({crewlead_id: items.value});
    this.setState({default_value: items.label});
  }

  OnCrewMemberchangeValue(items, index) {
    this.setState({crewMember_id: items.value});
    this.setState({default_value_caremember: items.label});
  }
  async getCrewleadList(text2) {
    let token = await getAsyncStorage('token_key');
    const body = {};
    const {responseJson, err} = await requestGetApi(
      assign_crewmember_to_crewlead,
      body,
      'GET',
      token,
    );
    if (responseJson.status) {
      schedule_crewLeaderList = [];
      responseJson.crew_leads.map((item) => {
        schedule_crewLeaderList.push({
          value: item.id,
          label: item.name,
        });
      });
      schedule_crewMemberList = [];
      responseJson.crew_members.map((item) => {
        schedule_crewMemberList.push({
          value: item.id,
          label: item.name,
        });
      });
      this.setState({crew_leads_List: schedule_crewLeaderList});
      this.setState({crew_members_List: schedule_crewMemberList});
    }
  }

  async getupdateCrewleadList() {
    let token = await getAsyncStorage('token_key');
    const body = {};
    let Edit_crewmember_assignlist = edit_crewmember_assignlist + id;
    const {responseJson, err} = await requestGetApi(
      Edit_crewmember_assignlist,
      body,
      'GET',
      token,
    );
    if (responseJson.status) {
      schedule_crewLeaderList = [];
      responseJson.crew_leads.map((item) => {
        schedule_crewLeaderList.push({
          value: item.id,
          label: item.name,
        });
      });
      this.setState({
        default_value_caremember: responseJson.crew_member.crew_member.name,
      });
      this.setState({crew_leads_List: schedule_crewLeaderList});
      this.setState({crew_members_List: schedule_crewMemberList});
    }
  }
}

export default AssignCrewMember;
