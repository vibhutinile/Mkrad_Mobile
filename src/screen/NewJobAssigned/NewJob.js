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
import Toast from 'react-native-simple-toast';

import PageNumber from '../../components/pagination/PageNumber';
import Pagination from '../../components/pagination/Pagination';
import GallaryImages from '../../components/pagination/GallaryImages';
import MyPDFViewer from '../PdfViewer/MyPdfViewer';
import {checkPermission} from '../../utils';
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
      numberofPage: 0,
    };
  }

  componentDidMount() {
    unsubscribe = this.props.navigation.addListener('focus', () => {
      current_time = moment().format('hh:mm A');
      this.setState({currentTime: current_time});
      this.get_JobList();
    });
  }

  async get_JobList(page) {
    let token = await getAsyncStorage('token');

    const body = {};
    this.setState({loading: true});
    const list_url =
      page != 1 ? `${crewlaedjob_list}?page=${page}` : crewlaedjob_list;
    const {responseJson, err} = await requestGetApi(
      list_url,
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
      if (jobList && jobList.length > 0) {
        this.setState({
          customerJobList: jobList,
          numberofPage: responseJson.data.last_page,
        });
      }
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
    totalBags,
    mulchName,
    turfName,
    images,
    baseUrl,
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
      totalBags,
      mulchName,
      turfName,
      images,
      baseUrl,
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
      this.get_JobList(1);
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
  isSpeciseVisiable = (arr) => {
    if (arr.length > 0) {
      if (arr[0].name == 'N/A') {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  formatPhoneNumber = (input) => {
    // Remove all non-numeric characters
    const cleanedInput = input.replace(/\D/g, '');

    // Format the number in (XXX) XXX-XXXX
    const formattedNumber = cleanedInput.replace(
      /(\d{3})(\d{3})(\d{4})/,
      '($1) $2-$3',
    );

    return formattedNumber;
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
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#898989',
              marginLeft: 12,
            }}>
            Scheduled Jobs
          </Text>
        </View>
        <View style={{flex: 5}}>
          <View>
            <AppLoader ref={loaderRef} />
          </View>
          <FlatList
            data={this.state.customerJobList}
            renderItem={({item}) => {
              console.log('[ScheduledItem]', {
                id: item?.id,
                mulch: item?.mulch,
                turf: item?.turf,
                bags_schedule: item?.parent_job?.schedule?.total_bags,
                bags_customer: item?.parent_job?.customer?.total_bags,
                top_level_keys: Object.keys(item || {}),
              });
              return (
                <View style={styles.JobItemContainer}>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.TextContainer_4}>
                        {item?.parent_job?.customer?.name}
                      </Text>
                    </View>
                    <this.Separator />
                    <View style={{flexDirection: 'row', marginTop: 4}}>
                      <TouchableOpacity
                        onPress={() =>
                          this.addressLink(
                            item?.parent_job.customer.latitude,
                            item?.parent_job?.customer.longitude,
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
                    {item?.parent_job?.customer?.address_line_2 == null ? (
                      <Text style={styles.TextContainer_6}>
                        {' '}
                        {item?.parent_job?.customer.address_line_1}
                      </Text>
                    ) : (
                      <Text style={styles.TextContainer_6}>
                        {' '}
                        {item?.parent_job?.customer.address_line_1 +
                          ' ' +
                          item.customer.address_line_2}
                      </Text>
                    )}
                    {item?.parent_job?.customer?.city == null ? null : (
                      <Text style={styles.TextContainer_6}>
                        {' '}
                        {'City: ' + item?.parent_job?.customer.city}
                      </Text>
                    )}
                    {item?.parent_job?.customer?.zipcode == null ? null : (
                      <Text style={styles.TextContainer_6}>
                        {' '}
                        {'Zipcode: ' + item?.parent_job?.customer?.zipcode}
                      </Text>
                    )}
                    <this.Separator />
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() =>
                          this.dialCall(item?.parent_job?.customer?.phone)
                        }
                        style={styles.TextContainer_6}>
                        <Text style={styles.TextContainer_7}>
                          {'Telephone: ' +
                            this.formatPhoneNumber(
                              item?.parent_job?.customer?.phone,
                            )}
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
                          {moment(item?.job_date, 'YYYY-MM-DD').format(
                            'MM-DD-YYYY',
                          )}
                        </Text>
                      </View>
                      <this.Separator />
                      {/* <View style={{marginLeft: 30}}>
                        <Text style={styles.TextContainer_5}> Frequency</Text>
                        <Text style={styles.TextContainer_6}>
                          {' '}
                          {item?.parent_job?.frequency?.frequency_interval_name}
                        </Text>
                      </View> */}
                    </View>
                    <this.Separator />
                    <Text style={styles.TextContainer_5}>
                      {' '}
                      Scheduled service
                    </Text>
                    <Text style={styles.TextContainer_6}>
                      {' '}
                      {item?.parent_job?.service?.name}
                    </Text>
                    <this.Separator />
                    <Text style={styles.TextContainer_5}>Notes</Text>
                    <Text style={styles.TextNote}>
                      {' '}
                      {item?.parent_job?.schedule?.note}
                    </Text>
                    <this.Separator />
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <Text style={styles.TextContainer_5}> Mulch</Text>
                        <Text style={styles.TextContainer_6}>
                          {' '}
                          {item?.mulch?.name || 'N/A'}
                        </Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={styles.TextContainer_5}> Amount</Text>
                        <Text style={styles.TextContainer_6}>
                          {' '}
                          {item?.parent_job?.schedule?.total_bags ??
                            item?.parent_job?.customer?.total_bags ??
                            'N/A'}
                        </Text>
                      </View>
                    </View>
                    <this.Separator />
                    <Text style={styles.TextContainer_5}> Turf</Text>
                    <Text style={styles.TextContainer_6}>
                      {' '}
                      {item?.turf?.name || 'N/A'}
                    </Text>
                    <this.Separator />

                    {item.species?.length > 0 &&
                    this.isSpeciseVisiable(item?.species) ? (
                      <View>
                        <View>
                          <Text
                            style={{
                              ...styles.TextContainer_5,
                              marginBottom: 5,
                            }}>
                            Species
                            {/* ({item.species?.length}) */}
                          </Text>
                          {/* <View
                            style={{flexDirection: 'row', flexWrap: 'wrap'}}> */}
                          {item.species?.map((spe, index) => (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text style={[styles.TextNote]}>
                                {spe?.value} {spe?.name}
                              </Text>
                              <Text
                                style={[
                                  styles.TextNote,
                                  {marginLeft: 30},
                                ]}></Text>
                            </View>
                          ))}
                          {/* </View> */}
                        </View>
                        <this.Separator />
                      </View>
                    ) : null}

                    {item.job_date == null ? null : item?.job_start_time !=
                      null ? (
                      <>
                        <GallaryImages
                          baseUlr={item?.base_url}
                          images={item?.images}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 20,
                            width: '100%',
                          }}>
                          <>
                            {item.job_date == null ? (
                              <TouchableOpacity
                                onPress={() =>
                                  this.onGoingScreen(
                                    item?.parent_job?.customer.name,
                                    item?.parent_job.customer.address_line_1,
                                    item.parent_job.customer.address_line_2,
                                    item.parent_job.customer.phone,
                                    item.job_date,
                                    item.job_start_time,
                                    item.job_end_time,
                                    (jobid = 0),
                                    (jobDate = '00:00'),
                                    item.parent_job.customer.city,
                                    item.parent_job.customer.state,
                                    item.parent_job.customer.zipcode,
                                    item.parent_job.customer.latitude,
                                    item.parent_job.customer.longitude,
                                    item?.parent_job?.schedule?.total_bags ??
                                      item?.parent_job?.customer?.total_bags,
                                    item?.mulch?.name,
                                    item?.turf?.name,
                                    item?.images,
                                    item?.base_url,
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
                          </>
                          <TouchableOpacity
                            onPress={() => {
                              const pdfUrl =
                                item?.base_url && item?.pdf_doc
                                  ? `${item.base_url}/${item.pdf_doc}`
                                  : null;
                              console.log('[ViewPDF] NewJob#1', {
                                base_url: item?.base_url,
                                pdf_doc: item?.pdf_doc,
                                pdfUrl,
                              });
                              if (pdfUrl) {
                                this.props.navigation.navigate('MyPDFViewer', {
                                  pdfUrl,
                                });
                              } else {
                                Toast.show('PDF URL not found');
                              }
                            }}
                            style={[styles.TextContainer_9]}>
                            <Text style={styles.pdfText}>View PDF</Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <View>
                        <Text style={styles.TextContainer_5}>Start Time</Text>

                        <View style={styles.RectangleContainer_3}>
                          <TextInput
                            editable={false}
                            placeholder="select time"
                            textAlignVertical="center"
                            includeFontPadding={false}
                            style={{
                              flex: 1,
                              color: '#000',
                              fontSize: 14,
                              paddingHorizontal: 10,
                              paddingVertical: 0,
                            }}
                            value={this.state.currentTime}></TextInput>
                          <Image
                            style={{width: 24, height: 24, marginRight: 8}}
                            source={require('../../images/time.png')}
                          />
                        </View>

                        <GallaryImages
                          baseUlr={item?.base_url}
                          images={item?.images}
                        />
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
                            onPress={() => this.onStartJobApi(item.id)}
                            style={styles.TextContainer_9}>
                            <Text style={styles.TextContainer_10}>
                              {' '}
                              Start Job
                            </Text>
                          </TouchableOpacity>
                          {item.pdf_doc && (
                            <TouchableOpacity
                              onPress={() => {
                                const pdfUrl =
                                  item?.base_url && item?.pdf_doc
                                    ? `${item.base_url}/${item.pdf_doc}`
                                    : null;
                                console.log('[ViewPDF] NewJob#2', {
                                  base_url: item?.base_url,
                                  pdf_doc: item?.pdf_doc,
                                  pdfUrl,
                                });
                                if (pdfUrl) {
                                  this.props.navigation.navigate(
                                    'MyPDFViewer',
                                    {pdfUrl},
                                  );
                                } else {
                                  Toast.show('PDF URL not found');
                                }
                              }}
                              style={styles.TextContainer_9}>
                              <Text style={styles.pdfText}>View PDF</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
          <View style={{backgroundColor: '#fff'}}>
            <PageNumber
              onPressNumber={(page) => {
                this.get_JobList(page);
              }}
              numberofPage={this.state.numberofPage}
            />
          </View>
        </View>
        <Loader isLoader={this.state.loading}></Loader>
      </View>
    );
  }

  ongoing(item) {
    if (item.job_date != null) {
      this.onGoingScreen(
        item?.parent_job?.customer.name,
        item?.parent_job?.customer.address_line_1,
        item?.parent_job?.customer.address_line_2,
        item?.parent_job?.customer.phone,
        item.parent_job?.service.name,
        item.job_start_time,
        item.job_end_time,
        item.id,
        item.job_date,
        item?.parent_job?.customer.city,
        item?.parent_job?.customer.state,
        item?.parent_job?.customer.zipcode,
        item?.parent_job?.customer.latitude,
        item?.parent_job?.customer.longitude,
        item?.parent_job?.schedule?.total_bags ??
          item?.parent_job?.customer?.total_bags,
        item?.mulch?.name,
        item?.turf?.name,
        item?.images,
        item?.base_url,
      );
    }
  }

  OnPause(item) {
    if (item.job_date != null) {
      this.onPauseScreen(
        item?.parent_job?.customer.name,
        item?.parent_job?.customer.address_line_1,
        item?.parent_job?.customer.address_line_2,
        item?.parent_job?.customer.phone,
        item.service.name,
        item.job_start_time,
        item.job_end_time,
        item.id,
        item.job_date,
        item?.parent_job?.customer.city,
        item?.parent_job?.customer.state,
        item?.parent_job?.customer.zipcode,
      );
    }
  }
}

export default NewJobAssign;
