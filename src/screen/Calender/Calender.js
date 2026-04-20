import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {frequencies_list, requestGetApi} from '../../NetworkCall/Service';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import {showLoader, hideLoader} from '../../Routes/AppLoader';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';

let startDate;
let frequency_list = [];

class CalenderScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedStartDate: null,
      Datewisejob_list: '',
      Frequenct_List: [],
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    this.get_schedule_jobList();
  }

  get_schedule_jobList = async () => {
    let token = await getAsyncStorage('token');
    const body = {};

    showLoader();
    const {responseJson, err} = await requestGetApi(
      frequencies_list,
      body,
      'GET',
      token,
    );
    hideLoader();
    if (responseJson.status) {
      frequency_list = responseJson.data;
    }
    this.setState({Frequenct_List: frequency_list});
  };

  async onFrequencyChange(frequency_id, frequency_name) {
    this.props.navigation.navigate('AssignJobListOnDate', {
      frequency_id: frequency_id,
      frequency_name: frequency_name,
    });
  }
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });

    this.props.navigation.navigate('AssignJobListOnDate', {date: startDate});
  }

  render() {
    const {selectedStartDate} = this.state;
    startDate = selectedStartDate ? selectedStartDate.toString() : '';

    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Image
              style={styles.MkradContainer}
              source={require('../../images/logo.png')}
            />
            <View style={styles.RectangleContainer}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                Frequency
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{position: 'absolute', marginTop: '13%', right: '5%'}}
            onPress={() =>
              this.props.navigation.navigate('DashboardNotification')
            }>
            <Image source={require('../../images/notification.png')} />
          </TouchableOpacity>
        </View>

        <View style={{flex: 5, marginTop: '10%', marginLeft: '5%'}}>
          <View>
            <AppLoader ref={loaderRef} />
          </View>
          <FlatList
            data={this.state.Frequenct_List}
            numColumns={2}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.ViewBg}
                onPress={() => this.onFrequencyChange(item.id, item.name)}>
                <Text style={styles.frequencyText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>

        <View
          style={{
            backgroundColor: '#222441',
            height: 84,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Dashboard')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../images/ic_home.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CalenderScreen')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../images/ic_calendar.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../images/ic_user.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CradContainer: {
    flex: 2,
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
  ViewBg: {
    width: '40%',
    height: 60,
    backgroundColor: '#3AB34A',
    marginTop: '5%',
    borderRadius: 14,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
    marginBottom: 10,
  },
  frequencyText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  MenuContainer: {
    marginLeft: 20,
    marginTop: 70,
    width: 30,
    height: 30,
  },
  MkradContainer: {
    width: '24%',
    height: '45%',
    marginTop: '14%',
    marginLeft: '37%',
    resizeMode: 'contain',
  },

  RectangleContainer: {
    width: '55%',
    height: '25%',
    backgroundColor: '#3AB34A',
    alignSelf: 'center',
    borderRadius: 14,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    shadowRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: '-13%',
    right: '20%',
  },

  Bottombar: {
    width: 40,
    height: 40,
    marginTop: '13%',
    marginBottom: 43,
    alignItems: 'center',
    marginHorizontal: '11.5%',
  },

  JobItemContainer: {
    width: '85%',
    height: '20%',
    marginTop: '6%',
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
    alignItems: 'center',
    flexDirection: 'row',
  },

  NotificationContainer: {
    width: '10%',
    height: '29%',
    alignSelf: 'center',
    borderRadius: 25,
    borderColor: '#3AB34A',
    borderWidth: 2,
    alignItems: 'center',
    marginLeft: '5%',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 80,
  },
});

export default CalenderScreen;
