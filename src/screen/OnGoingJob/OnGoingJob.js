import React from 'react';
import {
  ToastAndroid,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import styles from './OnGoingJob_styles';
// import ImagePicker from '../../components/ImagePickerCompat';
import {
  pauseJobPost,
  crewlaedJobCompleted,
  requestPostApiMedia,
} from '../../NetworkCall/Service';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Loader from '../../NetworkCall/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import GallaryImages from '../../components/pagination/GallaryImages';

let imageList = [];
let CameraImageList = [];

let customerName = '';
let address1 = '';
let address2 = '';
let phoneNo = '';
let serviceName = '';
let startTime = '';
let endTime = '';
let job_date = '';
let jobId = '';
let city = '';
let state = '';
let zipcode = '';
let oneTimeSelected_time = '';
let lat = '';
let long = '';
let current_time = '';
class OnGoingJobScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          Job_request: 'lawn maintenance',
          Job_Location: '142 Victoria Court, Fort Kent, ME, Maine-04743',
          time_slot: '09:30 AM to 10:30 AM',
          customer_name: 'Jerry Paul',
        },
      ],
      isModalVisible: false, //state of modal default false
      isModalPauseVisible: false,
      filePath: '',
      imageurl: '',
      ImagePathFromGallery: [],
      customerName: '',
      address1: '',
      address2: '',
      phoneNo: '',
      serviceName: '',
      startTime: '',
      endTime: '',
      job_date: '',
      jobId: '',
      notes: '',
      oneTimeSelected_time: '',
      isTimePickerVisible: false,
      workingJobId: '',
      loading: false,
      lat: '',
      long: '',
      currentTime: '',
    };
  }

  async componentDidMount() {
    let {imageUrl} = await this.props.route.params;
    console.log('[OnGoingJob] route.params received:', this.props.route.params);
    current_time = moment().format('hh:mm A');
    this.setState({currentTime: current_time});
    this.setState({filePath: `file://${imageUrl}`});
    this.setState({customerName: customerName});
    this.setState({address1: address1});
    this.setState({address2: address2});
    this.setState({phoneNo: phoneNo});
    this.setState({serviceName: serviceName});
    this.setState({startTime: startTime});
    this.setState({endTime: endTime});
    this.setState({job_date: job_date});
    this.setState({jobId: jobId});
    this.setState({lat: lat});
    this.setState({long: long});
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

  addressLink = (lat, long) => {
    const daddr = `${lat},${long}`;
    const company = Platform.OS === 'ios' ? 'apple' : 'google';
    Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
  };
  Separator = () => <View style={styles.separator} />;
  OnbackClick = () => {
    this.props.navigation.navigate('NewJobAssignScreen');
    //this.props.navigation.goBack()
  };

  ShowMaxAlert = (EnteredValue) => {};
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  MarkJobCompleted = async () => {
    // if (this.state.oneTimeSelected_time == null || this.state.oneTimeSelected_time == "") {
    //     Alert.alert("Please enter end time.");
    //     return;
    // }
    // if (this.state.notes == null || this.state.notes == "") {
    //     Alert.alert("Please enter notes.");
    //     return;
    // }
    this.setState({loading: true});
    let token = await getAsyncStorage('token');
    const formData = new FormData();

    formData.append('job_id', this.state.jobId);
    formData.append('job_date', this.state.job_date);
    formData.append('note', this.state.notes);
    formData.append('end_time', this.state.currentTime);
    const {responseJson, err} = await requestPostApiMedia(
      crewlaedJobCompleted,
      formData,
      'POST',
      token,
    );
    this.setState({loading: false});
    if (responseJson.status) {
      Alert.alert(
        'Success',
        'Job completed successfully!',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.navigate('NewJobAssignScreen'),
          },
        ],
        {cancelable: false},
      );
    } else if (
      responseJson.msg ==
      'Previous date will not allowed, Please contact your administrator'
    ) {
      Alert.alert(
        '',
        'Job has been Successfully Completed or Other Reason. Please contact Administrator.',
        [{text: 'OK', onPress: () => console.debug('OK Pressed')}],
        {cancelable: false},
      );
    } else if (
      responseJson.msg ==
      'Upcoming date will not allowed, Please contact your administrator'
    ) {
      Alert.alert(
        '',
        'This is an Upcoming Event. Please contact Administrator.',
        [{text: 'OK', onPress: () => console.debug('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      Alert.alert(responseJson.msg);
    }
  };

  OpenOnPauseScreeen = async () => {
    let token = await getAsyncStorage('token');
    // if (this.state.notes == '') {
    //     Alert.alert("Please enter note.");
    //     return;
    // }
    this.setState({loading: true});
    const formData = new FormData();
    formData.append('job_id', this.state.jobId);
    formData.append('job_date', this.state.job_date);
    formData.append('note', this.state.notes);

    const {responseJson, err} = await requestPostApiMedia(
      pauseJobPost,
      formData,
      'POST',
      token,
    );
    this.setState({loading: false});

    if (responseJson.status) {
      Alert.alert(
        'Success',
        'Job paused successfully.',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.navigate('NewJobAssignScreen'),
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(responseJson.msg);
    }
  };

  // chooseFile = () => {
  //   const options = {
  //     title: 'Select Avatar',
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.showImagePicker(options, (response) => {
  //     if (response.didCancel) {
  //     } else if (response.error) {
  //     } else if (response.customButton) {
  //     } else {
  //       const source = {uri: 'data:image/jpeg;base64,' + response.data};
  //       imageList.push(source);
  //       this.setState({ImagePathFromGallery: imageList});
  //     }
  //   });
  // };

  removeImage = (index) => {
    imageList.splice(index, 1);
    this.setState({ImagePathFromGallery: imageList});
  };
  formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }
  showAllItems = (item, index) => {
    return (
      <View style={{marginLeft: 10}}>
        <Image
          style={{width: 80, height: 60, marginTop: 10, marginLeft: 10}}
          source={{uri: item.uri}}></Image>

        <TouchableOpacity
          style={{position: 'absolute'}}
          onPress={() => this.removeImage(index)}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../images/cross.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  };
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
        // oneTimeSelected_time = "0" + time.getHours() + ':' + time.getMinutes() + " " + AM_PM;
      } else {
        if (time.getMinutes().toString().length < 2) {
          oneTimeSelected_time =
            time.getHours() + ':' + '0' + time.getMinutes();
        } else {
          oneTimeSelected_time = time.getHours() + ':' + time.getMinutes();
        }
        //oneTimeSelected_time = time.getHours() + ':' + time.getMinutes();
      }
    } else {
      AM_PM = 'PM';
      //oneTimeSelected_time = time.getHours() + ':' + time.getMinutes() + " " + AM_PM;
      if (time.getMinutes().toString().length < 2) {
        oneTimeSelected_time = time.getHours() + ':' + '0' + time.getMinutes();
      } else {
        oneTimeSelected_time = time.getHours() + ':' + time.getMinutes();
      }
      //  oneTimeSelected_time = time.getHours() + ':' + time.getMinutes();
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
  render() {
    const {navigate} = this.props.navigation;
    customerName = this.props.route.params.customerName;
    address1 = this.props.route.params.address1;
    address2 = this.props.route.params.address2;
    phoneNo = this.props.route.params.phoneNo;
    serviceName = this.props.route.params.serviceName;
    startTime = this.props.route.params.startTime;
    endTime = this.props.route.params.endTime;
    jobId = this.props.route.params.jobId;
    job_date = this.props.route.params.job_date;
    city = this.props.route.params.city;
    state = this.props.route.params.state;
    zipcode = this.props.route.params.zipcode;
    lat = this.props.route.params.lat;
    long = this.props.route.params.long;

    return (
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
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
            Ongoing job
          </Text>
        </View>
        <ScrollView>
          <View style={{flex: 4}}>
            <View>
              <AppLoader ref={loaderRef} />
            </View>
            <View style={styles.JobItemContainer}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.TextContainer_4}>
                    {this.state.customerName}
                  </Text>
                </View>
                <this.Separator />

                <View style={{flexDirection: 'row', marginTop: 4}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.addressLink(this.state.lat, this.state.long)
                    }
                    style={styles.TextContainer_6}>
                    <Text
                      style={[
                        styles.TextContainer_7,
                        {color: '#3AB34A', textDecorationLine: 'underline'},
                      ]}>
                      {'Link to address'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <this.Separator />

                <Text style={styles.TextContainer_5}> Address</Text>
                {this.state.address2 == null ? (
                  <Text style={styles.TextContainer_6}>
                    {' '}
                    {this.state.address1}
                  </Text>
                ) : (
                  <Text style={styles.TextContainer_6}>
                    {' '}
                    {this.state.address1 + ' ' + this.state.address2}
                  </Text>
                )}
                {city == null ? null : (
                  <Text style={styles.TextContainer_6}> {'City: ' + city}</Text>
                )}
                {zipcode == null ? null : (
                  <Text style={styles.TextContainer_6}>
                    {' '}
                    {'Zipcode: ' + zipcode}
                  </Text>
                )}
                <this.Separator />

                <TouchableOpacity
                  onPress={() => this.dialCall(this.state.phoneNo)}
                  style={styles.ViewCall}>
                  <Text
                    style={[
                      styles.TextContainer_7,
                      {color: '#3AB34A', textDecorationLine: 'underline'},
                    ]}>
                    {'Telephone: ' + this.formatPhoneNumber(this.state.phoneNo)}
                  </Text>
                </TouchableOpacity>
                <this.Separator />

                <Text style={styles.TextContainer_5}> Scheduled Date</Text>
                <Text style={styles.TextContainer_6}>
                  {' '}
                  {this.state.job_date}
                </Text>
                <this.Separator />

                <Text style={styles.TextContainer_5}> Scheduled service</Text>
                <Text style={styles.TextContainer_6}>
                  {' '}
                  {this.state.serviceName}
                </Text>
                <this.Separator />

                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text style={styles.TextContainer_5}> Mulch</Text>
                    <Text style={styles.TextContainer_6}>
                      {' '}
                      {this.props.route.params?.mulchName || 'N/A'}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.TextContainer_5}> Amount</Text>
                    <Text style={styles.TextContainer_6}>
                      {' '}
                      {this.props.route.params?.totalBags != null &&
                      this.props.route.params?.totalBags !== ''
                        ? this.props.route.params.totalBags
                        : 'N/A'}
                    </Text>
                  </View>
                </View>
                <this.Separator />

                <Text style={styles.TextContainer_5}> Turf</Text>
                <Text style={styles.TextContainer_6}>
                  {' '}
                  {this.props.route.params?.turfName || 'N/A'}
                </Text>
                <this.Separator />

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
                {this.props.route.params?.images?.length > 0 ? (
                  <GallaryImages
                    baseUlr={this.props.route.params?.baseUrl}
                    images={this.props.route.params?.images}
                  />
                ) : null}
              </View>
            </View>
          </View>
          <View style={{flex: 3}}>
            <View style={styles.JobNotes}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginTop: 5, marginLeft: '5%'}}>Notes</Text>
                <Text style={{color: '#FF0000', top: 2}}></Text>
              </View>

              <TextInput
                style={{flex: 1, marginLeft: 10}}
                multiline={true}
                numberOfLines={6}
                onChangeText={(notes) => this.setState({notes})}></TextInput>
              <Text style={styles.TextContainer}>Maximum 500 words</Text>
            </View>
          </View>

          <View style={{flex: 1}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.OpenOnPauseScreeen}
              style={styles.PausejobButton}>
              <Text style={styles.pauseText}>Pause job</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.MarkJobCompleted}
              style={styles.JonMarked_Completed}>
              <Text style={styles.TextContainer_2}>Mark job completed</Text>
            </TouchableOpacity>
            {/* <Modal isVisible={this.state.isModalVisible}>
                            <View style={styles.JonMarked_Completed_Modal}>
                                <Text style={styles.TextContainer_13}>Upload completed job images</Text>
                                <ScrollView >
                                    <FlatList style={{ marginLeft: 20, marginTop: 30, marginRight: 10 }}
                                        data={this.state.ImagePathFromGallery}
                                        keyExtractor={(_, index) => index.toString()}
                                        extraData={this.state.data}
                                        horizontal={true}
                                        renderItem={({ item, index }) =>

                                            this.showAllItems(item, index)
                                        }
                                    />
                                </ScrollView>
                                <TouchableOpacity style={styles.JonMarked_Completed_2} title="Hide modal" onPress={this.MarkJobCompleted} >
                                    <Text style={styles.TextContainer_2}>Mark as completed</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal> */}
          </View>
        </ScrollView>
        <Loader isLoader={this.state.loading}></Loader>
      </KeyboardAwareScrollView>
    );
  }
}

export default OnGoingJobScreen;
