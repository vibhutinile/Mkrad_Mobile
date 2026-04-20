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
import {
  get_activeInactiveCrewLaedList,
  requestGetApi,
} from '../../../NetworkCall/Service';
import {getAsyncStorage} from '../../../Routes/AsynstorageClass';
import AppLoader, {
  hideLoader,
  showLoader,
  loaderRef,
} from '../../../Routes/AppLoader';
let arrayholder = [];
let newData;
let ActiveCreLaedList = [];
export default class ActiveCrewLeader extends React.Component {
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
      get_activeInactiveCrewLaedList,
      body,
      'GET',
      token,
    );
    hideLoader();
    if (responseJson.status) {
      ActiveCreLaedList = responseJson.data.data;

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
            <Image source={require('../../../images/back.png')} />
          </TouchableOpacity>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.DateContainer}>Active crew lead</Text>
          </View>
        </View>
        <View style={{flex: 5}}>
          <TouchableOpacity
            style={styles.addCustomer}
            onPress={() => this.props.navigation.navigate('AddCrewLead')}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../../images/add.png')}
            />
            <Text style={{color: 'white', marginLeft: 5}}>Add Crew Lead</Text>
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
          <FlatList
            data={this.state.search ? newData : this.state.activeCreaviewLead}
            renderItem={({item}) => (
              <View style={styles.JobItemContainer}>
                <View style={{flexDirection: 'row', padding: 10}}>
                  <View style={{marginHorizontal: '10%'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        marginTop: 5,
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
                      Crew lead{' '}
                    </Text>
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
}
