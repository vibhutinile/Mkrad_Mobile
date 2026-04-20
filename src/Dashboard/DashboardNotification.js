import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import AppLoader, {loaderRef} from '../Routes/AppLoader';
import {showLoader, hideLoader} from '../Routes/AppLoader';
import {NotificationListApi, requestGetApi} from '../NetworkCall/Service';
import {getAsyncStorage} from '../Routes/AsynstorageClass';

let notificationList = [];
class DashboardNotification extends React.Component {
  constructor() {
    super();
    this.state = {
      notificationData: [],
    };
  }

  componentDidMount() {
    this.getNotifiactionList();
  }

  async getNotifiactionList() {
    showLoader();
    let token = await getAsyncStorage('token');
    const body = {};
    const {responseJson, err} = await requestGetApi(
      NotificationListApi,
      body,
      'GET',
      token,
    );
    hideLoader();
    if (responseJson.status) {
      notificationList = responseJson.data;
      this.setState({notificationData: notificationList});
    }
  }
  OnbackClick = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('./../images/back.png')} />
          </TouchableOpacity>
          {/* <View style={styles.NotificationContainer}>
                        <Text style={{ fontSize: 18, fontStyle: 'italic', fontWeight: 'bold', color: '#3AB34A', }} >06</Text>
                    </View> */}
          <View style={{alignSelf: 'center', marginTop: 18, marginLeft: 15}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#898989'}}>
              Notifications
            </Text>
          </View>
        </View>

        <View style={{flex: 5}}>
          <View>
            <AppLoader ref={loaderRef} />
          </View>
          <FlatList
            style={styles.ItemContainer}
            data={this.state.notificationData}
            renderItem={({item}) => (
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={styles.BulletPint}></View>
                  <TouchableOpacity style={{width: '60%'}}>
                    <Text style={styles.TextContainer}>
                      {' '}
                      {item.data.title}{' '}
                    </Text>
                    <Text style={styles.TextContainer_1}>
                      {' '}
                      {item.data.message}{' '}
                    </Text>
                  </TouchableOpacity>
                  <View style={{width: '30%'}}>
                    <Text style={styles.TextContainer_2}>
                      {' '}
                      {item.published}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.separator}></TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CradContainer: {
    flex: 1,
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

  BackContainer: {
    width: '10%',
    height: '30%',
    marginLeft: '5%',
    marginTop: '15%',
  },

  NotificationContainer: {
    width: '12%',
    height: '16%',
    marginTop: '5%',
    alignSelf: 'center',
    borderRadius: 25,
    borderColor: '#3AB34A',
    borderWidth: 2,
    alignItems: 'center',
  },
  ItemContainer: {
    marginTop: '10%',
    marginLeft: '5%',
  },

  TextContainer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10265C',
  },
  TextContainer_1: {
    fontSize: 13,
    color: '#10265C',
  },

  TextContainer2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7E7C7C',
    marginHorizontal: '10%',
  },
  TextContainer_2: {
    fontSize: 12,
    color: '#7E7C7C',
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },

  TextContainer3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3AB34A',
    marginHorizontal: '5%',
    alignSelf: 'center',
  },
  BulletPint: {
    width: 8,
    height: 8,
    marginTop: '2%',
    borderRadius: 8 / 2,
    borderColor: '#ED716C',
    borderWidth: 2,
    backgroundColor: '#ED716C',
    marginLeft: 5,
    marginRight: 10,
    flexWrap: 'wrap',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#707070',
    marginTop: 20,
    marginBottom: 10,
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
    backgroundColor: '#222441',
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
    marginBottom: 90,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
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

export default DashboardNotification;
