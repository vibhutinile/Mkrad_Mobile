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
} from 'react-native';

import styles from './styles';
import {crewMemberList, requestGetApi} from '../../../NetworkCall/Service';
import {getAsyncStorage} from '../../../Routes/AsynstorageClass';
import AppLoader, {
  hideLoader,
  loaderRef,
  showLoader,
} from '../../../Routes/AppLoader';
let InActiveCreLaedList = [];
let arrayholder = [];
let newData;

export default class ActiveCrewMember extends React.Component {
  state = {
    search: '',
  };
  constructor() {
    super();
    this.state = {
      text: '',
      search: false,
      resultData: [],
      InactiveCreaviewLead: [],
      PageNo: 1,
    };
  }

  componentDidMount() {
    showLoader();
    this.getActiveCrewLaed();
    let unsubscribe = this.props.navigation.addListener('focus', () => {
      showLoader();
      this.setState({PageNo: 1});
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
      crewMemberList,
      body,
      'GET',
      token,
    );
    hideLoader();
    if (responseJson.status) {
      InActiveCreLaedList = responseJson.data.data;
      if (this.state.PageNo == 1) {
        this.setState({InactiveCreaviewLead: InActiveCreLaedList});
      } else {
        this.setState({
          InactiveCreaviewLead: this.state.InactiveCreaviewLead.concat(
            responseJson.data.data,
          ),
        });
      }
    }
  }
  searchData(text) {
    arrayholder = [...this.state.InactiveCreaviewLead];
    if (text.length > 0) {
      this.setState({search: true});
    } else {
      this.setState({search: false});
    }

    let textData = text.toUpperCase();
    newData = arrayholder.filter((item) =>
      item.name.toUpperCase().includes(textData),
    );
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
    this.get_cancel_jobList();
  };
  render() {
    const {search} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../../../images/back.png')} />
          </TouchableOpacity>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.DateContainer}>Active Crew Members</Text>
          </View>
        </View>
        <View style={{flex: 5}}>
          <TouchableOpacity
            style={styles.addCustomer}
            onPress={() => this.props.navigation.navigate('AddCrewMemeber')}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../../images/add.png')}
            />
            <Text style={{color: 'white', marginLeft: 5}}>Add Crew Member</Text>
          </TouchableOpacity>

          <View style={styles.SearchContainer}>
            <TouchableOpacity>
              <Image
                style={{width: 30, height: 30, margin: 12}}
                source={require('../../../images/search.png')}
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
          <ScrollView>
            <FlatList
              data={
                this.state.search ? newData : this.state.InactiveCreaviewLead
              }
              renderItem={({item}) => (
                <View style={styles.JobItemContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginLeft: '10%'}}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 14,
                          marginTop: 15,
                          color: '#000',
                        }}>
                        {' '}
                        {item.name}{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          marginTop: '4%',
                          color: '#3AB34A',
                          marginLeft: 5,
                        }}>
                        Crew member{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
              keyExtractor={(_, index) => index.toString()}
              onEndReached={this.handleLoadMore}
              ListFooterComponent={this.footerList}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}
