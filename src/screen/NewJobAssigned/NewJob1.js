import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import styles from './styles';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import {
  JobStartTime,
  crewlaedjob_list,
  requestGetApi,
  requestPostApiMedia,
} from '../../NetworkCall/Service';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Loader from '../../NetworkCall/Loader';
import moment from 'moment';

let jobList = [];
let jobid = '';
let jobDate = '';
let oneTimeSelected_time;
let unsubscribe;
let current_time = '';
class NewJobAssign extends React.Component {
  constructor() {
    super();
    this.state = {
      customerJobList: [],
      phone_number: '',
      startTimePicker: false,
      oneTimeSelected_time: '',
      isTimePickerVisible: false,
      workingJobId: '',
      PageNo: 1,
      slectedId: '',
      start_status: 0,
      loading: false,
      currentTime: '',
    };
  }

  componentDidMount() {
    unsubscribe = this.props.navigation.addListener('focus', () => {
      current_time = moment().format('hh:mm A');
      this.setState({currentTime: current_time});
      this.get_JobList();
    });
  }

  async get_JobList() {
    let token = await getAsyncStorage('token');
    const body = {};
    this.setState({loading: true});
    const {responseJson, err} = await requestGetApi(
      crewlaedjob_list,
      body,
      'GET',
      token,
    );

    this.setState({loading: false});
    jobList = [];
    if (responseJson.status) {
      jobList = responseJson.data.data;

      // if(this.state.PageNo>1){
      //     this.setState({ customerJobList: this.state.customerJobList.concat(jobList) })
      // }else{
      this.setState({customerJobList: jobList});
      // }
    }
  }

  handleTimePicked = (time) => {
    let AM_PM;
    if (time.getHours() < 12) {
      AM_PM = 'AM';
      if (time.getHours().toString().length < 2) {
        if (time.getMinutes().toString().length < 2) {
          oneTimeSelected_time =
            '0' + time.getHours() + ':' + '0' + time.getMinutes();
        } else {
          oneTimeSelected_time =
            '0' + time.getHours() + ':' + time.getMinutes();
        }
      } else {
        if (time.getMinutes().toString().length < 2) {
          oneTimeSelected_time =
            time.getHours() + ':' + '0' + time.getMinutes();
        } else {
          oneTimeSelected_time = time.getHours() + ':' + time.getMinutes();
        }
      }
    } else {
      AM_PM = 'PM';
      if (time.getMinutes().toString().length < 2) {
        oneTimeSelected_time = time.getHours() + ':' + '0' + time.getMinutes();
      } else {
        oneTimeSelected_time = time.getHours() + ':' + time.getMinutes();
      }
      //  oneTimeSelected_time = time.getHours() + ':' + time.getMinutes() + " " + AM_PM;
      //oneTimeSelected_time = time.getHours() + ':' + time.getMinutes();
    }

    this.setState({oneTimeSelected_time});
    this.hideTimePicker();
  };

  hideTimePicker = () => {
    this.setState({isTimePickerVisible: false});
  };
  Separator = () => <View style={styles.separator} />;
  OnbackClick = (props) => {
    this.props.navigation.navigate('Dashboard');
    //this.props.navigation.goBack()
  };

  dialCall = (phonenumber) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:';
      phoneNumber = phoneNumber + phonenumber;
    } else {
      phoneNumber = 'telprompt:';
      phoneNumber = phoneNumber + phonenumber;
    }
    Linking.openURL(phoneNumber);
  };
  addressLink = (lat, long) => {
    const daddr = `${lat},${long}`;
    const company = Platform.OS === 'ios' ? 'apple' : 'google';
    Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
  };
  showTimePicker = (workingJobId, id) => {
    this.setState({oneTimeSelected_time: ''});
    this.setState({
      isTimePickerVisible: true,
      workingJobId: workingJobId,
      slectedId: id,
    });
  };
  onGoingScreen = (
    customerName,
    address1,
    address2,
    phoneNo,
    serviceName,
    startTime,
    endTime,
    jobId,
    job_date,
    city,
    state,
    zipcode,
    lat,
    long,
  ) => {
    if (job_date == null) {
      job_date = '00:00';
    }
    this.props.navigation.navigate('OnGoingJobScreen', {
      customerName: customerName,
      address1: address1,
      address2: address2,
      phoneNo: phoneNo,
      serviceName: serviceName,
      startTime: startTime,
      endTime: endTime,
      jobId: jobId,
      job_date: job_date,
      city: city,
      state: state,
      zipcode: zipcode,
      lat,
      long,
    });
  };
  onPauseScreen = (
    customerName,
    address1,
    address2,
    phoneNo,
    serviceName,
    startTime,
    endTime,
    jobId,
    job_date,
    city,
    state,
    zipcode,
  ) => {
    if (job_date == null) {
      job_date = '00:00';
    }
    this.props.navigation.navigate('PauseJob', {
      customerName: customerName,
      address1: address1,
      address2: address2,
      phoneNo: phoneNo,
      serviceName: serviceName,
      startTime: startTime,
      endTime: endTime,
      jobId: jobId,
      job_date: job_date,
      city: city,
      state: state,
      zipcode: zipcode,
    });
  };

  onStartJobApi = async (workingJobId) => {
    let token = await getAsyncStorage('token');
    this.setState({oneTimeSelected_time: this.state.oneTimeSelected_time});
    this.setState({loading: true});
    const formData = new FormData();
    formData.append('job_id', workingJobId);
    formData.append('start_time', this.state.currentTime);
    const {responseJson, err} = await requestPostApiMedia(
      JobStartTime,
      formData,
      'POST',
      token,
    );
    this.setState({loading: false});

    if (responseJson.status) {
      this.get_JobList();
      Alert.alert('Job Started successfully!');
      this.setState({start_status: 1});
    } else {
      Alert.alert(
        '',
        responseJson.msg,
        [{text: 'OK', onPress: () => console.debug('OK Pressed')}],
        {cancelable: false},
      );
    }
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
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../../images/back.png')} />
          </TouchableOpacity>
          <View style={{alignSelf: 'center', marginTop: 18, marginLeft: 15}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#898989'}}>
              Scheduled Jobs
            </Text>
          </View>
        </View>
        <View style={{flex: 5}}>
          <View>
            <AppLoader ref={loaderRef} />
          </View>
          <FlatList
            data={this.state.customerJobList}
            renderItem={({item}) => {
              return (
                <View style={styles.JobItemContainer}>
                  <View style={{marginLeft: 20}}>
                    <View style={{flexDirection: 'row', marginTop: '5%'}}>
                      <Text style={styles.TextContainer_4}>
                        {' '}
                        {item.customer.name}{' '}
                      </Text>
                      {/* <Text style={styles.TextContainer_4}> {item.id} </Text> */}
                    </View>
                    <this.Separator />
                    <View style={{flexDirection: 'row', marginTop: '2%'}}>
                      <TouchableOpacity
                        onPress={() =>
                          this.addressLink(
                            item.customer.latitude,
                            item.customer.longitude,
                          )
                        }
                        style={styles.TextContainer_6}>
                        <Text style={styles.TextContainer_7}>
                          {'Link to address'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <this.Separator />
                    <Text style={styles.TextContainer_5}> Address</Text>
                    {item.customer.address_line_2 == null ? (
                      <Text style={styles.TextContainer_6}>
                        {' '}
                        {item.customer.address_line_1}
                      </Text>
                    ) : (
                      <Text style={styles.TextContainer_6}>
                        {' '}
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
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => this.dialCall(item.customer.phone)}
                        style={styles.TextContainer_6}>
                        <Text style={styles.TextContainer_7}>
                          {'Telephone: ' + item.customer.phone}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <this.Separator />
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View>
                        <Text style={styles.TextContainer_5}>
                          {' '}
                          Scheduled Date
                        </Text>
                        <Text style={styles.TextContainer_6}>
                          {' '}
                          {moment(
                            item?.working_date?.job_date,
                            'YYYY-MM-DD',
                          ).format('MM-DD-YYYY')}
                        </Text>
                      </View>
                      {/* <this.Separator /> */}
                      {/* <View style={{marginLeft: 30}} >
                                            <Text style={styles.TextContainer_5}> Frequency</Text>
                                            <Text style={styles.TextContainer_6}> {item?.frequency?.name}</Text>
                                        </View> */}
                    </View>
                    <this.Separator />
                    <Text style={styles.TextContainer_5}>
                      {' '}
                      Scheduled service
                    </Text>
                    <Text style={styles.TextContainer_6}>
                      {' '}
                      {item?.service?.name}
                    </Text>
                    <this.Separator />
                    <Text style={styles.TextContainer_5}>Notes</Text>
                    <Text style={styles.TextNote}> {item?.note}</Text>
                    <this.Separator />
                    {item.mulch != '' || item.mulch != null ? (
                      <Text style={styles.TextContainer_5}>
                        Mulch:{' '}
                        <Text style={styles.TextContainer_6}>
                          {' '}
                          {item?.mulch?.name}
                        </Text>
                      </Text>
                    ) : null}
                    <this.Separator />
                    {item.turf != '' || item.turf != null ? (
                      <Text style={styles.TextContainer_5}>
                        Turf:{' '}
                        <Text style={styles.TextContainer_6}>
                          {' '}
                          {item?.turf?.name}
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
                              <Text style={[styles.TextNote, {width: '30%'}]}>
                                {index + 1}. {spe?.name}
                              </Text>
                              <Text style={[styles.TextNote, {marginLeft: 30}]}>
                                {spe?.value}
                              </Text>
                            </View>
                          ))}
                        </View>
                        <this.Separator />
                      </View>
                    ) : null}
                    {item.working_date == null ? null : item.working_date
                        .job_start_time != null ? (
                      <View style={{flexDirection: 'row', marginTop: 20}}>
                        {item.working_date == null ? (
                          <TouchableOpacity
                            onPress={() =>
                              this.onGoingScreen(
                                item.customer.name,
                                item.customer.address_line_1,
                                item.customer.address_line_2,
                                item.customer.phone,
                                item.start_date,
                                item.start_time,
                                item.end_time,
                                (jobid = 0),
                                (jobDate = '00:00'),
                                item.customer.city,
                                item.customer.state,
                                item.customer.zipcode,
                                item.customer.latitude,
                                item.customer.longitude,
                              )
                            }
                            style={styles.TextContainer_9}>
                            <Text style={styles.TextContainer_10}>
                              {' '}
                              Started Job
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => this.ongoing(item)}
                            style={styles.TextContainer_9}>
                            <Text style={styles.TextContainer_10}>
                              {' '}
                              Started Job
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : (
                      <View>
                        <Text style={styles.TextContainer_5}>Start Time</Text>

                        <View style={styles.RectangleContainer_3}>
                          <TextInput
                            editable={false}
                            placeholder="select time"
                            style={{
                              marginLeft: '13%',
                              color: '#000',
                              fontSize: 14,
                              padding: 5,
                            }}
                            value={this.state.currentTime}></TextInput>
                          <Image
                            style={{marginLeft: '35%', width: 30, height: 30}}
                            source={require('../../images/time.png')}
                          />
                        </View>
                        {/* <TouchableOpacity style={styles.RectangleContainer_3}
                                                onPress={() => this.showTimePicker(item.working_date.id, item.id)} >
                                                {item.id == this.state.slectedId ?
                                                    <TextInput editable={false}
                                                        placeholder="select time"
                                                        style={{ color: '#000', fontSize: 14, padding: 5 }}

                                                        value={this.state.oneTimeSelected_time} ></TextInput>
                                                    :
                                                    <TextInput editable={false}
                                                        placeholder="select time"
                                                        style={{ color: '#000', fontSize: 14, padding: 5 }}

                                                        value={""} ></TextInput>
                                                }
                                                <DateTimePickerModal
                                                    isVisible={this.state.isTimePickerVisible}
                                                    mode="time"
                                                    headerTextIOS=""
                                                    onConfirm={this.handleTimePicked}
                                                    onCancel={this.hideTimePicker}
                                                    forment="dd-MM-y"
                                                    amPmAriaLabel="Select AM/PM"
                                                    is24Hour={false}

                                                />
                                                <Image style={{ marginLeft: "35%", width: 30, height: 30 }} source={require('../../images/time.png')} />
                                            </TouchableOpacity> */}
                        <this.Separator />
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 20,
                            width: '100%',
                          }}>
                          <TouchableOpacity
                            onPress={() =>
                              this.onStartJobApi(item.working_date.id, item.id)
                            }
                            style={styles.TextContainer_9}>
                            <Text style={styles.TextContainer_10}>
                              {' '}
                              Start Job
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
        <Loader isLoader={this.state.loading}></Loader>
      </View>
    );
  }

  ongoing(item) {
    if (item.working_date != null) {
      this.onGoingScreen(
        item.customer.name,
        item.customer.address_line_1,
        item.customer.address_line_2,
        item.customer.phone,
        item.service.name,
        item.start_time,
        item.end_time,
        item.working_date.id,
        item.working_date.job_date,
        item.customer.city,
        item.customer.state,
        item.customer.zipcode,
        item.customer.latitude,
        item.customer.longitude,
      );
    }
  }

  OnPause(item) {
    if (item.working_date != null) {
      this.onPauseScreen(
        item.customer.name,
        item.customer.address_line_1,
        item.customer.address_line_2,
        item.customer.phone,
        item.service.name,
        item.start_time,
        item.end_time,
        item.working_date.id,
        item.working_date.job_date,
        item.customer.city,
        item.customer.state,
        item.customer.zipcode,
      );
    }
  }
}

export default NewJobAssign;
