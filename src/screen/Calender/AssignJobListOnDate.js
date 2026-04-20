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

import styles from '../../AdminPanel/home_styles';
import {get_JobList, requestGetApi} from '../../NetworkCall/Service';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import {
  requestPostApiMedia,
  reschedule_job,
  get_crewLeadJobList,
} from '../../NetworkCall/Service';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import {showLoader, hideLoader} from '../../Routes/AppLoader';
import NetInfo from '@react-native-community/netinfo';

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
export default class AssignJobListOnDate extends React.Component {
  constructor() {
    super();
    this.state = {
      Datewisejob_list: [],
      PageNo: 1,
    };
  }

  componentDidMount() {
    this.CheckConnectivity();

    this.get_JobList();
  }

  CheckConnectivity = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
      } else {
        alert('internet not connected');
      }
    });

    NetInfo.addEventListener((state) => {
      if (state.isConnected == true) {
      } else {
        alert('internet not connected');
      }
    });
  };
  async get_JobList() {
    let token = await getAsyncStorage('token');
    const body = {
      page: this.state.PageNo,
      frequency: frequency_id,
    };
    showLoader();
    const {responseJson, err} = await requestGetApi(
      get_crewLeadJobList,
      body,
      'GET',
      token,
    );
    hideLoader();
    if (responseJson.status) {
      jobList = responseJson.data.data;
      //this.setState({ Datewisejob_list: jobList })
      this.setState({
        Datewisejob_list: this.state.Datewisejob_list.concat(
          responseJson.data.data,
        ),
      });
    }
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

    this.props.navigation.navigate('OnUpComingJobScreen', {
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

  rescheduleJob = async () => {
    this.setState({isModalVisible: !this.state.isModalVisible});

    if (oneTimeSelected_date == '') {
      ToastAndroid.show('Please enter start time ', ToastAndroid.SHORT);
      return;
    }

    if (oneTimeSelected_time == '') {
      ToastAndroid.show('Please enter start time!', ToastAndroid.SHORT);
      return;
    }
    if (secondTimeSelected_time == '') {
      ToastAndroid.show('Please enter end time!', ToastAndroid.SHORT);
      return;
    }
    if (frequency_slug != 'one-time' && secondTimeSelected_date == '') {
      ToastAndroid.show('Please enter end date!', ToastAndroid.SHORT);
      return;
    }

    let token = await getAsyncStorage('token_key');
    const formData = new FormData();
    formData.append('start_date', oneTimeSelected_date);
    formData.append('job_id', Job_Id);
    formData.append('start_time', oneTimeSelected_time);
    formData.append('end_time', secondTimeSelected_time);
    formData.append('crew_lead', Crewlead_id);
    formData.append('end_date ', secondTimeSelected_date);
    const {responseJson, err} = await requestPostApiMedia(
      reschedule_job,
      formData,
      'POST',
      token,
    );

    if (responseJson.status == true) {
      ToastAndroid.show(' reschedule job sucessfully !', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('something went wrong !', ToastAndroid.SHORT);
    }
  };

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
    frequency_id = this.props.route.params.frequency_id;
    frequency_name = this.props.route.params.frequency_name;
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../../images/back.png')} />
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
                      <Text style={styles.TextContainer_5}>Scheduled Date</Text>
                      <Text style={styles.TextContainer_6}>
                        {item.next_schedule_date}
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
                        <Text style={styles.city}>
                          {' '}
                          {'City: ' + item.customer.city}
                        </Text>
                      )}
                      {/* {
                                            item.customer.state == null ? null :
                                                <Text style={styles.TextContainer_6}> {"State: " + item.customer.state}</Text>
                                        } */}

                      {item.customer.zipcode == null ? null : (
                        <Text style={styles.city}>
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
                        style={styles.city}>
                        <Text style={styles.TextContainer_7}>
                          {' Telephone: ' + item.customer.phone}
                        </Text>
                      </TouchableOpacity>

                      {/*                                      

                                            <TouchableOpacity 
                                                onPress={() => this.OnGoingJob
                                                    (item.start_time, item.end_time,
                                                        item.customer.address_line_1,
                                                        item.customer.phone,
                                                        item.customer.name,
                                                        item.service.name,
                                                        item.next_schedule_date,
                                                        item.note,
                                                        item.customer.address_line_2,
                                                        item.frequency.name,
                                                        item.customer.city,
                                                        item.customer.state,
                                                        item.customer.zipcode
                                                        )} 
                                                        style={styles.TextContainer_9} >
                                                <Image
                                                    source={require('../../images/next_arrow.png')}></Image>
                                            </TouchableOpacity>
                                     
 */}

                      <this.Separator />

                      <Text style={styles.TextContainer_5}>Notes</Text>
                      <Text style={styles.TextContainer6}>{item.note}</Text>
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
