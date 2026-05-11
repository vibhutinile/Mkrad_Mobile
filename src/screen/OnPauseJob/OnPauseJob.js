import React from 'react';
import {
  Linking,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import styles from './styles';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import {showLoader, hideLoader} from '../../Routes/AppLoader';
import {
  crewlaedPausejob_list,
  mulch_ids,
  turf_ids,
  requestGetApi,
} from '../../NetworkCall/Service';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import {TextInput} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  pauseJobPost,
  pauseJobsetTime,
  requestPostApiMedia,
} from '../../NetworkCall/Service';
import moment from 'moment';
import GallaryImages from '../../components/pagination/GallaryImages';
import PageNumber from '../../components/pagination/PageNumber';
import {checkPermission} from '../../utils';
import Toast from 'react-native-simple-toast';
import Loader from '../../NetworkCall/Loader';
let jobList = [];
let oneTimeSelected_time = '';
let endTimeSelected_time = '';

let current_time = '';
class OnPauseScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      customerJobList: [],
      PageNo: 1,
      numberofPage: 0,
      loading: false,
      oneTimeSelected_time: '',
      isTimePickerVisible: false,
      endTimeSelected_time: '',
      isEndTimePickerVisible: false,
      currentTime: '',
      mulchMap: {},
      turfMap: {},
    };
  }
  componentDidMount() {
    this.fetchLookups();
    let unsubscribe = this.props.navigation.addListener('focus', () => {
      current_time = moment().format('hh:mm A');
      var CurrentDate = moment().toISOString();
      this.setState({currentTime: current_time});
      showLoader();
      this.get_JobList();
    });
  }
  async fetchLookups() {
    try {
      const token = await getAsyncStorage('token');
      const [mulchRes, turfRes] = await Promise.all([
        requestGetApi(mulch_ids, {}, 'GET', token),
        requestGetApi(turf_ids, {}, 'GET', token),
      ]);
      const toMap = (resp) => {
        const list =
          resp?.responseJson?.data?.data || resp?.responseJson?.data || [];
        const map = {};
        if (Array.isArray(list)) {
          list.forEach((it) => {
            if (it && it.id != null) map[it.id] = it.name;
          });
        }
        return map;
      };
      this.setState({mulchMap: toMap(mulchRes), turfMap: toMap(turfRes)});
    } catch (e) {
      console.log('[Lookups] failed:', e?.message);
    }
  }
  componentWillUnmount() {
    hideLoader();
  }
  async get_JobList(page) {
    let token = await getAsyncStorage('token');
    const body = {};
    this.setState({loading: true});
    const list_url =
      page && page !== 1
        ? `${crewlaedPausejob_list}?page=${page}`
        : crewlaedPausejob_list;
    const {responseJson, err} = await requestGetApi(
      list_url,
      body,
      'GET',
      token,
    );
    hideLoader();
    this.setState({loading: false});
    if (responseJson?.status) {
      jobList = responseJson.data.data || [];
      let arr = jobList.filter(function (item) {
        return item.api_job_scheduler_details != null;
      });
      this.setState({
        customerJobList: arr,
        numberofPage: responseJson.data.last_page,
      });
    }
  }
  Separator = () => <View style={styles.separator} />;
  OnbackClick = (props) => {
    //this.props.navigation.replace("NewJobAssignScreen")
    this.props.navigation.goBack();
  };
  formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }
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
  addressLink = (lat, long) => {
    const daddr = `${lat},${long}`;
    const company = Platform.OS === 'ios' ? 'apple' : 'google';
    Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
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
            Paused Jobs
          </Text>
        </View>
        <View style={{flex: 5}}>
          <View>
            <AppLoader ref={loaderRef} />
          </View>
          <FlatList
            data={this.state.customerJobList}
            renderItem={({item, index}) => (
              <View style={styles.JobItemContainer}>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.TextContainer_4}>
                      {item.api_job_scheduler_details.customer.name}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 4,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.addressLink(
                          item.api_job_scheduler_details.customer.latitude,
                          item.api_job_scheduler_details.customer.longitude,
                        )
                      }
                      style={styles.TextContainer_6}>
                      <Text
                        style={{...styles.TextContainer_7, color: '#3AB34A'}}>
                        {'Link to address'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <this.Separator />
                  <Text style={styles.TextContainer_5}> Address</Text>
                  {item.api_job_scheduler_details.customer.address_line_2 ==
                  null ? (
                    <Text style={styles.TextContainer_6}>
                      {' '}
                      {item.api_job_scheduler_details.customer.address_line_1}
                    </Text>
                  ) : (
                    <Text style={styles.TextContainer_6}>
                      {' '}
                      {item.api_job_scheduler_details.customer.address_line_1 +
                        ' ' +
                        item.api_job_scheduler_details.customer.address_line_2}
                    </Text>
                  )}
                  {item.api_job_scheduler_details.customer.city ==
                  null ? null : (
                    <Text style={styles.TextContainer_6}>
                      {' '}
                      {'City: ' + item.api_job_scheduler_details.customer.city}
                    </Text>
                  )}
                  {item.api_job_scheduler_details.customer.zipcode ==
                  null ? null : (
                    <Text style={styles.TextContainer_6}>
                      {' '}
                      {'Zipcode: ' +
                        item.api_job_scheduler_details.customer.zipcode}
                    </Text>
                  )}
                  <this.Separator />
                  <TouchableOpacity
                    onPress={() =>
                      this.dialCall(
                        item.api_job_scheduler_details.customer.phone,
                      )
                    }
                    style={styles.TextContainer_6}>
                    <Text style={styles.TextContainer_7}>
                      {'Telephone: ' +
                        this.formatPhoneNumber(
                          item.api_job_scheduler_details.customer.phone,
                        )}
                    </Text>
                  </TouchableOpacity>
                  <this.Separator />
                  <Text style={styles.TextContainer_5}> Scheduled Date </Text>
                  <Text style={styles.TextContainer_6}> {item.job_date}</Text>
                  <this.Separator />
                  <Text style={styles.TextContainer_5}> Scheduled service</Text>
                  <Text style={styles.TextContainer_6}>
                    {' '}
                    {item.api_job_scheduler_details.service.name}
                  </Text>
                  <this.Separator />
                  <Text style={styles.NotesView}>Notes</Text>
                  <Text style={styles.Notes}>
                    {' '}
                    {item.api_job_scheduler_details.note}
                  </Text>
                  <this.Separator />
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <Text style={styles.TextContainer_5}> Mulch</Text>
                      <Text style={styles.TextContainer_6}>
                        {' '}
                        {item?.api_job_scheduler_details?.mulch?.name ||
                          this.state?.mulchMap?.[
                            item?.api_job_scheduler_details?.mulch_id
                          ] ||
                          (item?.api_job_scheduler_details?.mulch_id
                            ? `#${item.api_job_scheduler_details.mulch_id}`
                            : 'N/A')}
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={styles.TextContainer_5}> Amount</Text>
                      <Text style={styles.TextContainer_6}>
                        {' '}
                        {item?.api_job_scheduler_details?.total_bags ??
                          item?.api_job_scheduler_details?.customer
                            ?.total_bags ??
                          'N/A'}
                      </Text>
                    </View>
                  </View>
                  <this.Separator />
                  <Text style={styles.TextContainer_5}> Turf</Text>
                  <Text style={styles.TextContainer_6}>
                    {' '}
                    {item?.api_job_scheduler_details?.turf?.name ||
                      this.state?.turfMap?.[
                        item?.api_job_scheduler_details?.turf_id
                      ] ||
                      (item?.api_job_scheduler_details?.turf_id
                        ? `#${item.api_job_scheduler_details.turf_id}`
                        : 'N/A')}
                  </Text>
                  <this.Separator />

                  {item.job_start_time == '' ||
                  item.job_start_time == null ? (
                    <>
                      <Text style={styles.TextContainer_enddate}>
                        Start Time
                      </Text>
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
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 20,
                          width: '100%',
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            this.onGoingScreen(
                              item.api_job_scheduler_details.customer.name,
                              item.api_job_scheduler_details.customer
                                .address_line_1,
                              item.api_job_scheduler_details.customer
                                .address_line_2,
                              item.api_job_scheduler_details.customer.phone,
                              item.api_job_scheduler_details.service.name,
                              item.api_job_scheduler_details.start_time,
                              item.api_job_scheduler_details.end_time,
                              item.id,
                              item.job_date,
                              item.api_job_scheduler_details.note,
                              item.api_job_scheduler_details.customer.city,
                              item.api_job_scheduler_details.customer.state,
                              item.api_job_scheduler_details.customer.zipcode,
                            )
                          }
                          style={styles.TextContainer_9}>
                          <Text
                            style={styles.TextContainer_10}
                            numberOfLines={1}>
                            Start Job
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            const pdfUrl =
                              item?.base_url && item?.pdf_doc
                                ? `${item.base_url}/${item.pdf_doc}`
                                : null;
                            if (pdfUrl) {
                              this.props.navigation.navigate('MyPDFViewer', {
                                pdfUrl,
                              });
                            } else {
                              Toast.show('PDF URL not found');
                            }
                          }}
                          style={styles.TextContainer_9}>
                          <Text style={styles.pdfText} numberOfLines={1}>
                            View PDF
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <Text style={styles.TextContainer_enddate}>End Time</Text>
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
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 20,
                          width: '100%',
                        }}>
                        <TouchableOpacity
                          onPress={() => this.completejob(item.id)}
                          style={styles.TextContainer_9}>
                          <Text
                            style={styles.TextContainer_10}
                            numberOfLines={1}>
                            Complete Job
                          </Text>
                        </TouchableOpacity>
                        {item.pdf_doc && (
                          <TouchableOpacity
                            onPress={() => {
                              const pdfUrl =
                                item?.base_url && item?.pdf_doc
                                  ? `${item.base_url}/${item.pdf_doc}`
                                  : null;
                              if (pdfUrl) {
                                this.props.navigation.navigate('MyPDFViewer', {
                                  pdfUrl,
                                });
                              } else {
                                Toast.show('PDF URL not found');
                              }
                            }}
                            style={styles.TextContainer_9}>
                            <Text style={styles.pdfText} numberOfLines={1}>
                              View PDF
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </>
                  )}
                </View>
              </View>
            )}
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
    }
    this.setState({oneTimeSelected_time});
    this.hideTimePicker();
  };
  showTimePicker = () => {
    this.setState({isTimePickerVisible: true});
  };
  hideTimePicker = () => {
    this.setState({isTimePickerVisible: false});
  };

  onGoingScreen = async (
    customerName,
    address1,
    address2,
    phoneNo,
    serviceName,
    startTime,
    endTime,
    jobId,
    job_date,
    notes,
    city,
    state,
    zipcode,
  ) => {
    let token = await getAsyncStorage('token');
    this.setState({oneTimeSelected_time: this.state.oneTimeSelected_time});
    this.setState({loading: true});
    const formData = new FormData();
    formData.append('job_id', jobId);
    formData.append('start_time', this.state.currentTime);
    const {responseJson, err} = await requestPostApiMedia(
      pauseJobsetTime,
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
  handleEndTimePicked = (time) => {
    let AM_PM;
    if (time.getHours() < 12) {
      AM_PM = 'AM';
      if (time.getHours().toString().length < 2) {
        if (time.getMinutes().toString().length < 2) {
          endTimeSelected_time =
            '0' + time.getHours() + ':' + '0' + time.getMinutes();
        } else {
          endTimeSelected_time =
            '0' + time.getHours() + ':' + time.getMinutes();
        }
      } else {
        if (time.getMinutes().toString().length < 2) {
          endTimeSelected_time =
            time.getHours() + ':' + '0' + time.getMinutes();
        } else {
          endTimeSelected_time = time.getHours() + ':' + time.getMinutes();
        }
      }
    } else {
      AM_PM = 'PM';
      if (time.getMinutes().toString().length < 2) {
        endTimeSelected_time = time.getHours() + ':' + '0' + time.getMinutes();
      } else {
        endTimeSelected_time = time.getHours() + ':' + time.getMinutes();
      }
    }

    this.setState({endTimeSelected_time});
    this.hideEndTimePicker();
  };
  showEndTimePicker = () => {
    this.setState({isEndTimePickerVisible: true});
  };
  hideEndTimePicker = () => {
    this.setState({isEndTimePickerVisible: false});
  };
  completejob = async (id) => {
    let token = await getAsyncStorage('token');
    this.setState({endTimeSelected_time: this.state.endTimeSelected_time});
    this.setState({loading: true});
    const formData = new FormData();
    formData.append('job_id', id);
    formData.append('end_time', this.state.currentTime);
    const {responseJson, err} = await requestPostApiMedia(
      pauseJobsetTime,
      formData,
      'POST',
      token,
    );
    this.setState({loading: false});
    if (responseJson.status) {
      this.get_JobList();
      this.setState({start_status: 1});
      Alert.alert(
        '',
        'Job completed successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              this.setState({loading: true});
              this.setState({PageNo: 1});
              setTimeout(() => {
                this.props.navigation.navigate('OnPauseScreen');
                this.get_JobList();
              }, 500);

              // this.props.navigation.navigate('NewJobAssignScreen')
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        '',
        responseJson.msg,
        [{text: 'OK', onPress: () => console.debug('OK Pressed')}],
        {cancelable: false},
      );
    }
  };
}

export default OnPauseScreen;
