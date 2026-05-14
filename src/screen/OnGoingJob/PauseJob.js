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
import Modal from 'react-native-modal';
// import ImagePicker from '../../components/ImagePickerCompat';
import {
  pauseJobPost,
  crewlaedJobCompleted,
  requestPostApiMedia,
} from '../../NetworkCall/Service';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import {showLoader, hideLoader} from '../../Routes/AppLoader';
import Loader from '../../NetworkCall/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';

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
let current_time = moment().format('hh:mm A');

class PauseJob extends React.Component {
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
      loading: false,
    };
  }

  async componentDidMount() {
    let {imageUrl} = await this.props.route.params;
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
  Separator = () => <View style={styles.separator} />;
  OnbackClick = () => {
    //this.props.navigation.replace("NewJobAssignScreen")
    this.props.navigation.goBack();
  };

  ShowMaxAlert = (EnteredValue) => {};
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  MarkJobCompleted = async () => {
    this.setState({loading: true});
    let token = await getAsyncStorage('token');
    const formData = new FormData();
    formData.append('job_id', this.state.jobId);
    formData.append('job_date', this.state.job_date);
    formData.append('note', this.state.notes);
    const {responseJson, err} = await requestPostApiMedia(
      crewlaedJobCompleted,
      formData,
      'POST',
      token,
    );
    this.setState({loading: false});
    if (responseJson.status) {
      this.props.navigation.navigate('CompletedJob');
      Alert.alert('Job completed successfully!');
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
      Alert.alert('something went wrong!');
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
            onPress: () => this.props.navigation.navigate('OnPauseScreen'),
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert('something went wrong.');
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

    return (
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../../images/back.png')} />
          </TouchableOpacity>
          <View style={{alignSelf: 'center', marginTop: 18, marginLeft: 15}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#898989'}}>
              Ongoing job
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={{flex: 4}}>
            <View>
              <AppLoader ref={loaderRef} />
            </View>
            <View style={styles.JobItemContainer}>
              <View style={{marginLeft: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.TextContainer_4}>
                    {' '}
                    {this.state.customerName}{' '}
                  </Text>
                </View>
                <this.Separator />

                <Text style={styles.TextContainer_15}>Address</Text>
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
                  <Text style={styles.TextContainer_7}>
                    {'Telephone: ' + this.state.phoneNo}
                  </Text>
                </TouchableOpacity>
                <this.Separator />
                <Text style={styles.TextContainer_5}> Scheduled Date</Text>
                <Text style={styles.TextContainer_6}>
                  {' '}
                  {this.state.job_date}
                </Text>
                <this.Separator />
                {/* <Text style={styles.TextContainer_5}> Scheduled time</Text>
                                <Text style={styles.TextContainer_6}> {this.state.startTime + " to " + this.state.endTime}</Text>

                                <this.Separator /> */}
                <Text style={styles.TextContainer_5}> Scheduled service</Text>
                <Text style={styles.serviceName}>
                  {' '}
                  {this.state.serviceName}
                </Text>
              </View>
            </View>
          </View>
          <View style={{flex: 3}}>
            <View style={styles.JobNotes}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginTop: 5, marginLeft: '5%'}}>Notes</Text>
                <Text style={{color: '#FF0000', top: 2}}>*</Text>
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
              style={styles.PausejobButton}
              activeOpacity={0.5}
              onPress={this.OpenOnPauseScreeen}>
              <Text style={styles.Pause_Job}>Pause the job</Text>
            </TouchableOpacity>
            <Modal isVisible={this.state.isModalPauseVisible}>
              <View style={styles.JonMarked_Completed_Modal}>
                <Text style={styles.TextContainer_13}>
                  Enter reason for pausing job
                </Text>

                <View style={styles.PauseJobNotes}>
                  <Text style={{marginTop: 5, marginLeft: '5%'}}>Job note</Text>
                  <Text
                    style={{
                      color: '#FF0000',
                      position: 'absolute',
                      left: '24%',
                      top: 2,
                    }}>
                    *
                  </Text>
                  <TextInput
                    style={{marginLeft: 10, position: 'absolute', top: '-5%'}}
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={(notes) =>
                      this.setState({notes})
                    }></TextInput>
                  <Text style={styles.TextContainer}>Maximum 500 words</Text>
                </View>
                <TouchableOpacity
                  style={styles.PausejobButton}
                  title="Hide modal"
                  onPress={this.OpenOnPauseScreeen}>
                  <Text style={styles.TextContainer_2}>Paused job</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

export default PauseJob;
