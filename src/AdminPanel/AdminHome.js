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
import {frequencies_list, requestGetApi} from '../NetworkCall/Service';
import AppLoader, {loaderRef} from '../Routes/AppLoader';
import {showLoader, hideLoader} from '../Routes/AppLoader';
import {getAsyncStorage} from '../Routes/AsynstorageClass';

let startDate = '';
let frequency_list = [];
class AdminHome extends React.Component {
  constructor() {
    super();
    this.state = {
      isVisiblebtn: true,
      selectedStartDate: null,
      Datewisejob_list: '',
      Frequenct_List: [],
    };
  }
  componentDidMount() {
    showLoader();
    this.get_schedule_jobList();
  }

  get_schedule_jobList = async () => {
    let token = await getAsyncStorage('token_key');
    const body = {};
    const {responseJson, err} = await requestGetApi(
      frequencies_list,
      body,
      'GET',
      token,
    );
    if (responseJson.status) {
      hideLoader();
      frequency_list = responseJson.data;
    }
    this.setState({Frequenct_List: frequency_list});
  };

  toggleStatus() {
    this.setState({
      isVisiblebtn: !this.state.isVisiblebtn,
    });
  }

  async onFrequencyChange(frequency_id, frequency_name) {
    this.props.navigation.navigate('AdminJobScheduleList', {
      frequency_id: frequency_id,
      frequency_name: frequency_name,
    });
  }

  render() {
    const {selectedStartDate} = this.state;
    startDate = selectedStartDate ? selectedStartDate.toString() : '';

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <View
            style={{
              marginTop: '8%',
            }}>
            <Image
              style={styles.MkradContainer}
              source={require('../images/logo.png')}
            />
          </View>
          <TouchableOpacity
            style={{position: 'absolute', top: '25%', right: '8%'}}
            onPress={() => this.props.navigation.navigate('AdminNotification')}>
            <Image
              style={styles.NotificationConrainer}
              source={require('../images/notification.png')}
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
              Frequency
            </Text>
          </View>
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

        {/* <View style={styles.container}>
                    <CalendarPicker

                        onDateChange={this.onDateChange}
                    />
                </View>
                {this.state.isVisiblebtn == false ?
                    <View style={styles.WeeklyButton} onStartShouldSetResponder={() => this.toggleStatus()} >
                        <Image style={{ marginLeft: 20 }} source={require('../images/scheduler.png')} />
                        <Text style={{ marginLeft: 10, color: '#3AB34A', fontSize: 18, fontWeight: 'normal' }}>Weekly</Text>

                    </View>

                    :

                    <View style={styles.WeeklyButton} onStartShouldSetResponder={() => this.toggleStatus()} >
                        <Image style={{ marginLeft: 20 }} source={require('../images/scheduler.png')} />
                        <Text style={{ marginLeft: 10, color: '#3AB34A', fontSize: 18, fontWeight: 'normal' }}>Monthly</Text>
                    </View>
                } */}

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
                source={require('../images/ic_calendar.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SchedularScreen')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../images/ic_home.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CrewManagement')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../images/ic_group.png')}
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
                source={require('../images/ic_user.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  CradContainer: {
    flex: 2.3,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    flex: 4,
    backgroundColor: '#FFFFFF',
    marginTop: '15%',
  },

  WeeklyButton: {
    flexDirection: 'row',
    flex: 0.5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: '12%',
    width: '33%',
    height: '6%',
    borderRadius: 20,
    borderColor: '#3AB34A',
    borderWidth: 1,
    alignItems: 'center',
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
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    shadowRadius: 5,
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
});

export default AdminHome;
