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
import {crewMemberList, requestGetApi} from '../NetworkCall/Service';
import AppLoader, {loaderRef} from '../Routes/AppLoader';
import {showLoader, hideLoader} from '../Routes/AppLoader';
import {getAsyncStorage} from '../Routes/AsynstorageClass';

let startDate;
let frequency_list = [];

class CrewMemberList extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedStartDate: null,
      Datewisejob_list: '',
      Frequenct_List: [],
      PageNo: 1,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    this.get_schedule_jobList();
  }

  get_schedule_jobList = async () => {
    let token = await getAsyncStorage('token_key');
    const body = {
      page: this.state.PageNo,
    };
    showLoader();
    const {responseJson, err} = await requestGetApi(
      crewMemberList,
      body,
      'GET',
      token,
    );
    hideLoader();
    if (responseJson.status) {
      frequency_list = responseJson.data.data;
      if (this.state.PageNo == 1) {
        this.setState({Frequenct_List: frequency_list});
      } else {
        this.setState({
          Frequenct_List: this.state.Frequenct_List.concat(
            responseJson.data.data,
          ),
        });
      }
    }
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
  OnbackClick = () => {
    this.props.navigation.goBack();
  };
  crewMemberLogs = (id) => {
    this.props.navigation.navigate('CrewMemberAttendanceLog', {
      id: id,
      AdminCrewMemberAttendanceLog: 'AdminCrewMemberAttendanceLog',
    });
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
    this.get_schedule_jobList();
  };
  render() {
    const {selectedStartDate} = this.state;
    startDate = selectedStartDate ? selectedStartDate.toString() : '';

    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../images/back.png')} />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 8,
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: '5%',
            }}>
            CrewMember List
          </Text>
        </View>
        <View style={{flex: 5, marginTop: '5%', marginHorizontal: '10%'}}>
          <View>
            <AppLoader ref={loaderRef} />
          </View>
          <FlatList
            data={this.state.Frequenct_List}
            numColumns={1}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity
                  style={styles.crewMemberCheckIn}
                  onPress={() => this.crewMemberLogs(item.id)}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.headet_value}>Name</Text>
                    <Text style={styles.frequencyText}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
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

const styles = StyleSheet.create({
  CradContainer: {
    height: 100,
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
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
    marginBottom: 10,
  },
  crewMemberCheckIn: {
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    shadowRadius: 2,
    marginBottom: 5,
    marginTop: '3%',
    justifyContent: 'center',
  },
  frequencyText: {
    color: '#000',
    fontSize: 14,
    marginLeft: 10,
    paddingRight: 5,
    paddingLeft: 5,
    alignSelf: 'center',
  },
  headet_value: {
    color: '#000',
    fontSize: 14,
    marginLeft: 10,
    paddingRight: 5,
    paddingLeft: 5,
    alignSelf: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  date: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: '5%',
  },
  text1: {
    color: 'green',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: '1%',
  },
  text2: {
    color: '#939397',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: '1%',
    marginLeft: '20%',
  },
  puchText: {
    color: '#000',
    fontSize: 14,
    marginLeft: 10,
    paddingRight: 5,
    paddingLeft: 5,
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
  BackContainer: {
    alignSelf: 'center',
    marginLeft: '5%',
  },
  RectangleContainer: {
    width: '65%',
    height: '22%',
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
    bottom: '-11%',
    right: '25%',
    alignItems: 'center',
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

export default CrewMemberList;
