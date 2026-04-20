import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import styles from './ActiveCrewLeader/styles';
import {
  requestGetApi,
  crewmember_assignlist,
  delete_crewmember_assignlist,
  requestPostApiMedia,
} from '../../NetworkCall/Service';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import AppLoader, {
  hideLoader,
  showLoader,
  loaderRef,
} from '../../Routes/AppLoader';
let arrayholder = [];
let newData;
let ActiveCreLaedList = [];
export default class AssignedCrews extends React.Component {
  state = {
    search: '',
  };
  constructor() {
    super();
    this.state = {
      text: '',
      search: false,
      resultData: [],
      activeCreaviewLead: [],
      PageNo: 1,
    };
  }

  componentDidMount() {
    showLoader();
    this.getActiveCrewLaed();
    let unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getActiveCrewLaed();
    });
  }

  async getActiveCrewLaed() {
    let token = await getAsyncStorage('token_key');
    const body = {
      page: this.state.PageNo,
      status: 1,
    };
    const {responseJson, err} = await requestGetApi(
      crewmember_assignlist,
      body,
      'GET',
      token,
    );
    hideLoader();
    if (responseJson.status) {
      ActiveCreLaedList = responseJson.data.data;
    }
    //this.setState({ activeCreaviewLead: ActiveCreLaedList })
    if (this.state.PageNo == 1) {
      this.setState({activeCreaviewLead: ActiveCreLaedList});
    } else {
      this.setState({
        activeCreaviewLead: this.state.activeCreaviewLead.concat(
          responseJson.data.data,
        ),
      });
    }
  }
  searchData(text) {
    arrayholder = [...this.state.activeCreaviewLead];
    if (text.length > 0) {
      this.setState({search: true});
    } else {
      this.setState({search: false});
    }
    let textData = text.toUpperCase();
    newData = arrayholder.filter((item) =>
      item.crew_lead.name.toUpperCase().includes(textData),
    );
    if (newData == '') {
      newData = arrayholder.filter((item) =>
        item.crew_member.name.toUpperCase().includes(textData),
      );
    }
  }
  OnbackClick = (props) => {
    this.props.navigation.goBack();
  };
  footerList = () => {
    return (
      <View>
        <AppLoader ref={loaderRef} />
      </View>
    );
  };
  handleLoadMore = async () => {
    await this.setState({PageNo: this.state.PageNo + 1});
    this.getActiveCrewLaed();
  };

  render() {
    const {search} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../../images/back.png')} />
          </TouchableOpacity>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.DateContainer}>Crew Member Assign List</Text>
          </View>
        </View>
        <View style={{flex: 5}}>
          <TouchableOpacity
            style={styles.addCustomer}
            onPress={() =>
              this.props.navigation.navigate('AssignCrewMember', {
                id: '',
                update: '',
              })
            }>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../images/add.png')}
            />
            <Text style={{color: 'white', marginLeft: 5}}>Assign New</Text>
          </TouchableOpacity>
          <View style={styles.SearchContainer}>
            <TouchableOpacity>
              <Image
                style={{width: 30, height: 30, margin: 12}}
                source={require('../../images/search.png')}
              />
            </TouchableOpacity>
            <TextInput
              style={{width: '90%'}}
              placeholder="Search by name"
              onChangeText={(text) => this.searchData(text)}
              keyboardType="default"
              blurOnSubmit={false}
            />
          </View>

          <FlatList
            data={this.state.search ? newData : this.state.activeCreaviewLead}
            renderItem={({item}) => (
              <View style={styles.JobItemContainer}>
                <View style={{flexDirection: 'row', width: '90%', padding: 10}}>
                  <View style={{width: '38%', marginTop: 10, start: 10}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: '#3AB34A',
                      }}>
                      Crew lead{' '}
                    </Text>
                    <Text style={{fontSize: 14, marginTop: 5, color: '#000'}}>
                      {' '}
                      {item.crew_lead.name}{' '}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 1,
                      color: '#000',
                      height: '100%',
                      marginHorizontal: 10,
                      backgroundColor: '#000',
                    }}></View>

                  <View style={{width: '38%', marginTop: 10}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: '#3AB34A',
                      }}>
                      Crew member{' '}
                    </Text>
                    <Text style={{fontSize: 14, marginTop: 5, color: '#000'}}>
                      {' '}
                      {item.crew_member.name}{' '}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => this.onDelete(item.id)}
                      style={{
                        width: 60,
                        backgroundColor: 'red',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        height: 30,
                        borderRadius: 10,
                        marginTop: '8%',
                        marginLeft: '5%',
                      }}>
                      <Text style={{color: '#fff', alignSelf: 'center'}}>
                        Delete
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.onUpdate(item.id)}
                      style={{
                        width: 60,
                        backgroundColor: '#3AB34A',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        height: 30,
                        borderRadius: 10,
                        marginTop: '8%',
                        marginLeft: '5%',
                      }}>
                      <Text style={{color: '#fff', alignSelf: 'center'}}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
            onEndReached={this.handleLoadMore}
            ListFooterComponent={this.footerList}
          />
        </View>
      </View>
    );
  }

  onUpdate = (id) => {
    this.props.navigation.navigate('AssignCrewMember', {
      id: id,
      update: 'update',
    });
  };

  onDelete = (id) => {
    Alert.alert(
      '',
      'Are you sure, you want to delete this assign crew member?',
      [
        {
          text: 'Cancel',
          onPress: () => console.debug('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deleteData(id)},
      ],
    );
  };

  deleteData = async (id) => {
    let token = await getAsyncStorage('token_key');
    const formData = new FormData();
    const body = {};
    formData.append('crew_lead', this.state.crewlead_id);
    let newdelete_crewmember_assignlist = delete_crewmember_assignlist + id;
    const {responseJson, err} = await requestGetApi(
      newdelete_crewmember_assignlist,
      body,
      'POST',
      token,
    );
    hideLoader();
    if (responseJson.status == true) {
      this.setState({PageNo: 1});
      this.getActiveCrewLaed();
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
}
