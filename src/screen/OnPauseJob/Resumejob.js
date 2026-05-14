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
import styles from './resume_styles';
import Modal from 'react-native-modal';
// import ImagePicker from '../../components/ImagePickerCompat';
import {
  pauseJobPost,
  postResumejob,
  requestPostApiMedia,
} from '../../NetworkCall/Service';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import {showLoader, hideLoader} from '../../Routes/AppLoader';
import Loader from '../../NetworkCall/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
let notes = '';
let city = '';
let state = '';
let zipcode = '';
class Resumejob extends React.Component {
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
    //this.props.navigation.replace("PauseJob");
    this.props.navigation.goBack();
  };

  ShowMaxAlert = (EnteredValue) => {};
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  MarkJobCompleted = async () => {
    if (this.state.notes == '') {
      Alert.alert('Please enter note!');
      return;
    }
    this.setState({loading: true});
    let token = await getAsyncStorage('token');
    const formData = new FormData();
    formData.append('job_id', this.state.jobId);
    formData.append('job_date', this.state.job_date);
    formData.append('note', this.state.notes);
    const {responseJson, err} = await requestPostApiMedia(
      postResumejob,
      formData,
      'POST',
      token,
    );
    this.setState({loading: false});
    if (responseJson.status) {
      Alert.alert(
        'Success',
        'Job resumed successfully!',
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
        'You cannot resume this job as the date is passed, please contact Administrator.',
        [
          {
            text: 'OK',
            onPress: () => this.props.navigation.navigate('NewJobAssignScreen'),
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert('something went wrong!');
    }
  };

  OpenOnPauseScreeen = async () => {
    let token = await getAsyncStorage('token');
    if (this.state.notes == '') {
      Alert.alert('please enter note!');
      return;
    }
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
        'Job paused successfully!',
        [
          {
            text: 'Ok',
            onPress: () => this.props.navigation.navigate('OnPauseScreen'),
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert('something went wrong!');
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
    notes = this.props.route.params.notes;
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
              Resume job
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
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Text style={styles.TextContainer_4}>
                    {' '}
                    {this.state.customerName}{' '}
                  </Text>
                </View>
                <this.Separator />
                <Text style={styles.TextContainer_5}>Address</Text>
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
                {/* {
                                state == null ? null :
                                    <Text style={styles.TextContainer_6}> {"State: " + state}</Text>
                            } */}

                {zipcode == null ? null : (
                  <Text style={styles.TextContainer_6}>
                    {' '}
                    {'Zipcode: ' + zipcode}
                  </Text>
                )}

                <this.Separator />
                <TouchableOpacity
                  onPress={() => this.dialCall(this.state.phoneNo)}
                  style={styles.call}>
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
                <Text style={styles.TextContainer_5}> Scheduled Time</Text>
                <Text style={styles.TextContainer_6}>
                  {' '}
                  {this.state.startTime}
                </Text>

                <this.Separator />
                <Text style={styles.TextContainer_5}> Scheduled service</Text>
                <Text style={styles.service}> {this.state.serviceName}</Text>
              </View>
            </View>
          </View>
          <View style={styles.JobNotes}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{marginTop: 5, marginLeft: '5%'}}>Notes</Text>
              <Text style={{color: '#FF0000'}}>*</Text>
            </View>

            <TextInput
              style={{flex: 1, marginLeft: 10}}
              multiline={true}
              onChangeText={(notes) => this.setState({notes})}></TextInput>
            <Text style={styles.TextContainer}>Maximum 500 words</Text>
          </View>

          <View style={{flex: 1}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.MarkJobCompleted}
              style={styles.JonMarked_Completed}>
              <Text style={styles.TextContainer_2}>Resume Job</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity activeOpacity={.5} onPress={this.OpenOnPauseScreeen}>
                            <Text style={styles.Pause_Job}>Pause the job</Text>
                        </TouchableOpacity> */}

            <Modal isVisible={this.state.isModalVisible}>
              <View style={styles.JonMarked_Completed_Modal}>
                <Text style={styles.TextContainer_13}>
                  Upload completed job images
                </Text>

                <ScrollView>
                  <FlatList
                    style={{marginLeft: 20, marginTop: 30, marginRight: 10}}
                    data={this.state.ImagePathFromGallery}
                    keyExtractor={(_, index) => index.toString()}
                    extraData={this.state.data}
                    horizontal={true}
                    renderItem={({item, index}) =>
                      this.showAllItems(item, index)
                    }
                  />
                </ScrollView>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  {/* <TouchableOpacity
                    style={styles.capture}
                    style={styles.RecatngleBox}
                    onPress={this.chooseFile}>
                    <Text
                      style={{
                        position: 'absolute',
                        top: '8%',
                        color: '#000000',
                      }}>
                      Click image
                    </Text>
                    <Image
                      style={{position: 'absolute', bottom: '20%'}}
                      source={require('../../images/camera.png')}></Image>
                  </TouchableOpacity> */}

                  {/* <TouchableOpacity style={styles.RecatngleBox}
                                        onPress={this.chooseFile}>
                                        <Text style={{ position: 'absolute', top: "8%", color: '#000000' }}>Upload image</Text>
                                        <Image style={{ position: 'absolute', bottom: "20%", }} source={require('../../images/upload_icon.png')}></Image>
                                    </TouchableOpacity> */}
                </View>

                <TouchableOpacity
                  style={styles.JonMarked_Completed}
                  title="Hide modal"
                  onPress={this.MarkJobCompleted}>
                  <Text style={styles.TextContainer_2}>Resume Job</Text>
                </TouchableOpacity>
              </View>
              <Loader isLoader={this.state.loading}> </Loader>
            </Modal>
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
                {/* <TouchableOpacity style={styles.PausejobButton} title="Hide modal" onPress={this.OpenOnPauseScreeen}  >
                                    <Text style={styles.TextContainer_2}>Paused job</Text>
                                </TouchableOpacity> */}
              </View>
              <Loader isLoader={this.state.loading}> </Loader>
            </Modal>
          </View>
        </ScrollView>
        <Loader isLoader={this.state.loading}> </Loader>
      </KeyboardAwareScrollView>
    );
  }
}

export default Resumejob;
