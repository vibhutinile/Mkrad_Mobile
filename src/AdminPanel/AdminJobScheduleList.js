import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Linking,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Picker,
  ToastAndroid,
} from 'react-native';

import styles from './home_styles';
import {get_JobList, requestGetApi} from '../NetworkCall/Service';
import {getAsyncStorage} from '../Routes/AsynstorageClass';
import {
  requestPostApiMedia,
  reschedule_job,
  crew_lead_name_list,
} from '../NetworkCall/Service';
import AppLoader, {loaderRef} from '../Routes/AppLoader';
import {showLoader, hideLoader} from '../Routes/AppLoader';
import moment from 'moment';

let oneTimeSelected_time = '';
let oneTimeSelected_date = '';
let secondTimeSelected_date = '';
let secondTimeSelected_time = '';
let monthNames = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
let jobList = [];
let Crewlead_id = '';
let Job_Id = '';
let frequency_slug = '';
let frequency_id = '';
let crewleadList = [];
let frequency_name = '';
export default class AdminJobScheduleList extends React.Component {
  state = {
    search: '',
  };
  constructor() {
    super();
    this.state = {
      text: '',
      resultData: [],
      isModalVisible: false,
      isModalVisible2: false,
      choosenIndex: 0,
      isTimePickerVisible: false,
      oneTimeSelected_time: '',
      isDatePickerVisible: false,
      oneTimeSelected_date: '',
      Datewisejob_list: [],
      secondTimeSelected_date: '',
      isSecondDatePickerVisible: false,
      secondTimeSelected_time: '',
      isSecondTimePickerVisible: false,
      CrewleadNameList: [],
      default_value: '',
      PageNo: 1,
    };
  }

  componentDidMount() {
    showLoader();
    this.get_JobList();
  }

  async get_JobList() {
    let token = await getAsyncStorage('token_key');
    const body = {
      page: this.state.PageNo,
      frequency: frequency_id,
    };
    const {responseJson, err} = await requestGetApi(
      get_JobList,
      body,
      'GET',
      token,
    );
    if (responseJson.status) {
      hideLoader();
      jobList = responseJson.data.data;
      this.setState({
        Datewisejob_list: this.state.Datewisejob_list.concat(
          responseJson.data.data,
        ),
      });
    }
  }

  OnCrewLaedchangeValue(items) {
    this.setState({crewlead_id: items.value});
    this.setState({default_value: items.label});
  }

  OnbackClick = () => {
    this.props.navigation.goBack();
  };
  Separator = () => <View style={styles.separator} />;

  OnGoingJob(
    start_time,
    end_time,
    addres_line_1,
    phone_number,
    customer_name,
    service_name,
    next_schedule_date,
    note,
    address_line_2,
    frequencyName,
    city,
    state,
    zipcode,
  ) {
    start_time = start_time;
    start_time = start_time.substring(0, start_time.length - 3);

    end_time = end_time;
    end_time = end_time.substring(0, end_time.length - 3);

    this.props.navigation.navigate('AdminOnGoingJob', {
      start_time: start_time,
      end_time: end_time,
      addres_line_1: addres_line_1,
      phone_number: phone_number,
      customer_name: customer_name,
      service_name: service_name,
      next_schedule_date: next_schedule_date,
      note: note,
      address_line_2: address_line_2,
      frequencyName: frequencyName,
      city: city,
      state: state,
      zipcode: zipcode,
    });
  }

  dialCall = (phone) => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:';
      phoneNumber = phoneNumber + phone;
    } else {
      phoneNumber = 'telprompt:';
      phoneNumber = phoneNumber + phone;
    }
    Linking.openURL(phoneNumber);
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
    this.get_JobList();
  };
  render() {
    const {search} = this.state;
    frequency_id = this.props.route.params.frequency_id;
    frequency_name = this.props.route.params.frequency_name;
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../images/back.png')} />
          </TouchableOpacity>
          <View style={{alignSelf: 'center', marginTop: '5%'}}>
            <Text style={styles.DateContainer}>{frequency_name}</Text>
          </View>
        </View>

        <View style={{flex: 4}}>
          <View>
            <AppLoader ref={loaderRef} />
          </View>
          <ScrollView>
            <FlatList
              data={this.state.Datewisejob_list}
              renderItem={({item}) => (
                <View>
                  <View style={styles.JobItemContainer}>
                    <View style={{marginLeft: 20}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.cutomerName}>
                          {' '}
                          {item.customer.name}{' '}
                        </Text>
                      </View>
                      <this.Separator />
                      <Text style={styles.TextContainer_5}>
                        {' '}
                        Scheduled Date
                      </Text>
                      <Text style={styles.TextContainer_6}>
                        {moment(item.next_schedule_date, 'YYYY-MM-DD').format(
                          'MM-DD-YYYY',
                        )}
                      </Text>
                      <this.Separator />
                      <View>
                        <Text style={styles.TextContainer_5}>
                          {' '}
                          Scheduled time
                        </Text>
                        <Text style={styles.TextContainer_6}>
                          {' '}
                          {item.start_time}
                        </Text>
                      </View>
                      <this.Separator />
                      <Text style={styles.TextContainer_5}>Address</Text>
                      {item.customer.address_line_2 == null ? (
                        <Text style={styles.TextContainer_6}>
                          {item.customer.address_line_1}
                        </Text>
                      ) : (
                        <Text style={styles.TextContainer_6}>
                          {item.customer.address_line_1 +
                            ' ' +
                            item.customer.address_line_2}
                        </Text>
                      )}
                      {item.customer.city == null ? null : (
                        <Text style={styles.TextContainer_6}>
                          {' '}
                          {'City: ' + item.customer.city}
                        </Text>
                      )}
                      {item.customer.zipcode == null ? null : (
                        <Text style={styles.TextContainer_6}>
                          {' '}
                          {'Zipcode: ' + item.customer.zipcode}
                        </Text>
                      )}
                      <this.Separator />
                      <Text style={styles.TextContainer_5}>
                        Scheduled service
                      </Text>
                      <Text style={styles.TextContainer_6}>
                        {item.service.name}
                      </Text>

                      <this.Separator />
                      <TouchableOpacity
                        onPress={() => this.dialCall(item.customer.phone)}
                        style={styles.TextContainer_6}>
                        <Text style={styles.TextContainer_7}>
                          {'Telephone: ' + item.customer.phone}
                        </Text>
                      </TouchableOpacity>
                      <this.Separator />
                      <Text style={styles.TextContainer_5}>Notes</Text>
                      <Text style={styles.textNotesView}>{item.note}</Text>
                      <this.Separator />
                      {item.mulch != '' || item.mulch != null ? (
                        <Text style={styles.TextContainer_5}>
                          Mulch:{' '}
                          <Text style={styles.TextContainer_6}>
                            {' '}
                            {item.mulch.name}
                          </Text>
                        </Text>
                      ) : null}
                      <this.Separator />
                      {item.turf != '' || item.turf != null ? (
                        <Text style={styles.TextContainer_5}>
                          Turf:{' '}
                          <Text style={styles.TextContainer_6}>
                            {' '}
                            {item.turf.name}
                          </Text>
                        </Text>
                      ) : null}
                      <this.Separator />

                      {item.species?.length > 0 ? (
                        <View>
                          <View>
                            <Text style={styles.TextContainer_5}>
                              Species({item.species?.length})
                            </Text>
                            {item.species?.map((spe, index) => (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={[
                                    styles.textNotesView,
                                    {width: '30%'},
                                  ]}>
                                  {index + 1}. {spe?.name}
                                </Text>
                                <Text
                                  style={[
                                    styles.textNotesView,
                                    {marginLeft: 30},
                                  ]}>
                                  {spe?.value}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      ) : null}
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
