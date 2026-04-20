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

let arrayholder = [];
let newData;

export default class ServiceReportScreen extends React.Component {
  state = {
    search: '',
  };
  constructor({navigation}) {
    super({navigation});
    this.state = {
      text: '',
      data: [
        {customer_name: 'Riya', job_name: 'Gardening'},
        {customer_name: 'Akash', job_name: 'Cleaning'},
        {customer_name: 'kirti', job_name: 'HouseKeeping'},
        {customer_name: 'Neah', job_name: 'Gardening'},
        {customer_name: 'Radheshyam', job_name: 'Cleaning'},
        {customer_name: 'Shiwa', job_name: 'HouseKeeping'},
      ],
      search: false,
      resultData: [],
    };
  }
  searchData(text) {
    arrayholder = [...this.state.data];
    if (text.length > 0) {
      this.setState({search: true});
    } else {
      this.setState({search: false});
    }

    let textData = text.toUpperCase();
    newData = arrayholder.filter((item) =>
      item.job_name.toUpperCase().includes(textData),
    );
  }

  Separator = () => <View style={styles.separator} />;

  render() {
    const {search} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Image
              style={styles.MkradContainer}
              source={require('../../images/logo.png')}
            />
            <View style={styles.RectangleContainer}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
                Service Report
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{position: 'absolute', marginTop: '12%', right: '5%'}}
            onPress={() =>
              this.props.navigation.navigate('DashboardNotification')
            }>
            <Image source={require('../../images/notification.png')} />
          </TouchableOpacity>
        </View>

        <View style={{flex: 5}}>
          <ScrollView>
            <View style={styles.SearchContainer}>
              <TouchableOpacity>
                <Image
                  style={{width: 30, height: 30, margin: 12}}
                  source={require('../../images/search.png')}
                />
              </TouchableOpacity>
              <TextInput
                placeholder="Search by name"
                onChangeText={(text) => this.searchData(text)}
                keyboardType="default"
                blurOnSubmit={false}
              />
            </View>
            <FlatList
              data={this.state.search ? newData : this.state.data}
              renderItem={({item}) => (
                <View style={styles.JobItemContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        marginTop: 15,
                        marginLeft: '10%',
                        alignSelf: 'center',
                        fontStyle: 'italic',
                        color: '#000',
                      }}>
                      {' '}
                      {item.customer_name}{' '}
                    </Text>
                  </View>
                  <this.Separator />
                  <View
                    style={{flexDirection: 'row'}}
                    onStartShouldSetResponder={() =>
                      this.props.navigation.navigate('OnCompleteJobScreen')
                    }>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        marginLeft: '10%',
                        alignSelf: 'center',
                        marginTop: '4%',
                        fontStyle: 'italic',
                        color: '#898989',
                      }}>
                      Job request{' '}
                    </Text>
                    <Image
                      style={{marginTop: 10, marginLeft: '52%'}}
                      source={require('../../images/next_arrow.png')}></Image>
                  </View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      marginLeft: '10%',
                      fontStyle: 'italic',
                      color: '#898989',
                    }}>
                    {' '}
                    {item.job_name}
                  </Text>
                </View>
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          </ScrollView>
        </View>
        <View
          style={{
            flex: 0.7,
            backgroundColor: '#222441',
            marginTop: '20%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Dashboard')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../images/home.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ServiceReportScreen')
              }
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../images/gear.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CalenderScreen')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../images/date.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../images/profile.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
