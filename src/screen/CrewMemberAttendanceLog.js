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
import {
  crewMemberAttendanceLog,
  requestGetApi,
  crewMemberList_details,
} from '../NetworkCall/Service';
import AppLoader, {loaderRef} from '../Routes/AppLoader';
import {showLoader, hideLoader} from '../Routes/AppLoader';
import {getAsyncStorage} from '../Routes/AsynstorageClass';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

let startDate;
let startDateList = [];
let endDateList = [];
let id = '';
let oneTimeSelected_date;
let secondTimeSelected_date;
let AdminCrewMemberAttendanceLog = '';

class CrewMemberAttendanceLog extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedStartDate: null,
      Datewisejob_list: '',
      Frequenct_List: [],
      default_value: '',
      status: '',
      dateFilter: [],
      endDateFilter: [],
      isDatePickerVisible: false,
      oneTimeSelected_date: '',
      isEndDatePickerVisible: false,
      secondTimeSelected_date: '',
      PageNo: 1,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    this.get_AdminCrewmemberLogs();
  }
  get_AdminCrewmemberLogs = async () => {
    showLoader();
    let token = await getAsyncStorage('token_key');
    const body = {
      page: this.state.PageNo,
    };
    let newcrewMemberList_details = crewMemberList_details + id;
    const {responseJson, err} = await requestGetApi(
      newcrewMemberList_details,
      body,
      'GET',
      token,
    );

    hideLoader();
    if (responseJson.status) {
      this.setState({
        Frequenct_List: this.state.Frequenct_List.concat(
          responseJson.data.data,
        ),
      });
      // let frequency_list = responseJson.data.data;
      // this.setState({ Frequenct_List: frequency_list })
    }
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };
  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };
  handleDatePicked = (date) => {
    const momentDate = moment(date.toISOString());
    var pickedDt = moment(momentDate).format('MM/DD/YYYY');
    oneTimeSelected_date = pickedDt;
    this.setState({oneTimeSelected_date, oneTimeSelected_date});
    this.hideDatePicker();
    this.onStartDateFilter(oneTimeSelected_date);
  };

  hideDatePicker2 = () => {
    this.setState({isEndDatePickerVisible: false});
  };
  showDatePicker2 = () => {
    this.setState({isEndDatePickerVisible: true});
  };
  handleDatePicked2 = (date) => {
    const momentDate = moment(date.toISOString());
    var pickedDt = moment(momentDate).format('MM/DD/YYYY');
    secondTimeSelected_date = pickedDt;
    this.setState({secondTimeSelected_date, secondTimeSelected_date});
    this.hideDatePicker2();

    this.onEndDateFilter(secondTimeSelected_date);
  };

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
    this.props.navigation.navigate('AssignJobListOnDate', {date: startDate});
  }
  OnbackClick = () => {
    this.props.navigation.goBack();
  };
  onEndDateFilter = async (end_date) => {
    this.setState({end_date: end_date});
    let token = await getAsyncStorage('token_key');
    const body = {
      end_date: end_date,
    };
    let newcrewMemberList_details = crewMemberList_details + id;
    const {responseJson, err} = await requestGetApi(
      newcrewMemberList_details,
      body,
      'GET',
      token,
    );
    if (responseJson.status) {
      let frequency_list = responseJson.data.data;
      this.setState({Frequenct_List: frequency_list});
    }
  };

  onStartDateFilter = async (start_date) => {
    this.setState({start_date: start_date});
    let token = await getAsyncStorage('token_key');
    const body = {
      start_date: start_date,
    };
    let newcrewMemberList_details = crewMemberList_details + id;
    const {responseJson, err} = await requestGetApi(
      newcrewMemberList_details,
      body,
      'GET',
      token,
    );
    if (responseJson.status) {
      let frequency_list = responseJson.data.data;
      this.setState({Frequenct_List: frequency_list});
    }
  };

  getTimeDiff(start, end) {
    let diff = moment.duration(
      moment(end, 'HH:mm:ss').diff(moment(start, 'HH:mm:ss')),
    );
    return `${diff.hours()} Hour ${diff.minutes()} min ${diff.seconds()} sec`;
  }

  footerList = () => {
    return (
      <View>
        <AppLoader ref={loaderRef} />
      </View>
    );
  };
  handleLoadMore = async () => {
    await this.setState({PageNo: this.state.PageNo + 1});
    this.get_AdminCrewmemberLogs();
  };
  render() {
    const {selectedStartDate} = this.state;
    startDate = selectedStartDate ? selectedStartDate.toString() : '';
    id = this.props.route.params.id;
    AdminCrewMemberAttendanceLog =
      this.props.route.params.AdminCrewMemberAttendanceLog;
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
              marginTop: 10,
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: '5%',
            }}>
            View Attendance Logs
          </Text>
        </View>

        <View style={{flex: 5, marginTop: '10%', marginLeft: '5%'}}>
          <View style={{flexDirection: 'row', height: '10%'}}>
            <TouchableOpacity
              style={styles.RectangleContainer_2}
              onPress={this.showDatePicker}>
              <TextInput
                editable={false}
                placeholder="Start date"
                style={{
                  alignSelf: 'center',
                  marginLeft: '5%',
                  color: '#000',
                  fontSize: 14,
                }}
                value={this.state.oneTimeSelected_date}></TextInput>
              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                headerTextIOS=""
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDatePicker}
                forment="dd-MM-y"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.RectangleContainer_2}
              onPress={this.showDatePicker2}>
              <TextInput
                editable={false}
                placeholder="End date"
                style={{
                  alignSelf: 'center',
                  marginLeft: '5%',
                  color: '#000',
                  fontSize: 14,
                }}
                value={this.state.secondTimeSelected_date}></TextInput>
              <DateTimePickerModal
                isVisible={this.state.isEndDatePickerVisible}
                mode="date"
                headerTextIOS=""
                onConfirm={this.handleDatePicked2}
                onCancel={this.hideDatePicker2}
                forment="dd-MM-y"
              />
            </TouchableOpacity>
          </View>
          <View>
            <AppLoader ref={loaderRef} />
          </View>

          <FlatList
            data={this.state.Frequenct_List}
            renderItem={({item}) => (
              <View>
                <Text style={styles.date}>{item.check_in_date}</Text>
                <View style={{flexDirection: 'row', marginLeft: '5%'}}>
                  <Text style={styles.text1}>Total working Hours</Text>
                  {item.check_out_time == null ||
                  item.check_out_time == '' ? null : (
                    <Text style={styles.text2}>
                      {this.getTimeDiff(
                        item.check_in_time,
                        item.check_out_time,
                      )}
                    </Text>
                  )}
                </View>

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={styles.crewMemberCheckIn}>
                    <Text style={styles.puchText}>Sign In</Text>
                    <Text style={styles.frequencyText}>
                      {item.check_in_time}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.crewMemberCheckIn}>
                    <Text style={styles.puchText}>Sign Out</Text>
                    <Text style={styles.frequencyText}>
                      {item.check_out_time}
                    </Text>
                  </TouchableOpacity>
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
    width: '40%',
    height: 60,
    backgroundColor: '#DEDEDE',
    marginTop: '4%',
    borderRadius: 14,
    borderColor: '#ddd',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
    shadowRadius: 10,
    marginLeft: '5%',
    marginBottom: 10,
    justifyContent: 'center',
  },
  frequencyText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  date: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 18,
    marginBottom: 5,
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
  },
  RectangleContainer_2: {
    width: '40%',
    marginTop: '3%',
    borderColor: '#3AB34A',
    borderWidth: 1,
    alignItems: 'center',
    marginLeft: '5%',
    flexDirection: 'row',
    height: '80%',
    borderRadius: 10,
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
  RectangleContainer_6: {
    height: 40,
    borderColor: '#379134',
    borderWidth: 1,
    marginLeft: 1,
    width: 130,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 80,
  },
});

export default CrewMemberAttendanceLog;
