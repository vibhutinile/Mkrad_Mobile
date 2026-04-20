import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
  ToastAndroid,
  Alert,
  SafeAreaView,
} from 'react-native';

import styles from './Newstyles';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  searchUser,
  get_schedule_job,
  requestGetApi,
  checkAvilability,
  mulch_ids,
  lead_source,
  turf_ids,
  customer_detail,
} from '../../../NetworkCall/Service';
import DropDownPicker from 'react-native-dropdown-picker';
import {getAsyncStorage} from '../../../Routes/AsynstorageClass';
import {
  requestPostApiMedia,
  post_schedule_job,
} from '../../../NetworkCall/Service';
import AppLoader, {
  hideLoader,
  loaderRef,
  showLoader,
} from '../../../Routes/AppLoader';
import NetInfo from '@react-native-community/netinfo';
import Moment from 'moment';
import CustomPicker from '../../customPicker';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Loader from '../../../NetworkCall/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

let oneTimeSelected_date;
let secondTimeSelected_date;
let oneTimeSelected_time;
let oneTimeSelected_time_2;
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
let text = '';
let text2 = '';
let schedule_jobList = [];
let schedule_customerList = [];
let schedule_crewLeaderList = [];
let duration_list = [];
let crew_lead_job_reminder = [];
let current_time = Moment().format('hh:mm:a');

class NewCreateJob extends React.Component {
  constructor() {
    super();
    this.state = {
      choosenIndex: 0,
      isSelected: false,
      isRepeatJobSelected: false,
      isModalVisible: false,
      customerIndex: 0,
      isDatePickerVisible: false,
      isSecondDatePickerVisible: false,
      oneTimeSelected_date: '',
      secondTimeSelected_date: '',
      isTimePickerVisible: false,
      oneTimeSelected_time: '',
      oneTimeSelected_time_2: '',
      isTimePickerVisible_2: false,
      customerName_selectedValue: '',
      crewName_selectedValue: '',
      country: 'uk',
      value3Index: 0,
      select_frequency: 'select',
      value: 0,
      factory_props: [],
      ages: [
        {key: 1, label: 20},
        {key: 2, label: 30},
        {key: 3, label: 40},
      ],

      initialRadioPos: -1,
      formKey: 0, // set an initial key here
      JobNameList: [],
      default_value: '',
      customerlist_name: [],
      crewdlist_name: [],
      duration: [],
      input_price: '',
      service_id: '',
      customer_id: '',
      crewlead_id: '',
      frequency_value: '',
      reminder_time: '',
      input_note: '',
      selectedSlug: '',
      startTimePicker: false,
      endTimePicker: false,

      defaultTime: [
        '07:00:am',
        '07:15:am',
        '07:30:am',
        '07:45:am',
        '08:00:am',
        '08:15:am',
        '08:30:am',
        '08:45:am',
        '09:00:am',
        '09:15:am',
        '09:30:am',
        '09:45:am',
        '10:00:am',
        '10:15:am',
        '10:30:am',
        '10:45:am',
        '11:00:am',
        '11:15:am',
        '11:30:am',
        '11:45:am',
        '12:00:pm',
        '12:15:pm',
        '12:30:pm',
        '12:45:pm',
        '01:00:pm',
        '01:15:pm',
        '01:30:pm',
        '01:45:pm',
        '02:00:pm',
        '02:15:pm',
        '02:30:pm',
        '02:45:pm',
        '03:00:pm',
        '03:15:pm',
        '03:30:pm',
        '03:45:pm',
        '04:00:pm',
        '04:15:pm',
        '04:30:pm',
        '04:45:pm',
        '05:00:pm',
        '05:15:pm',
        '05:30:pm',
        '05:45:pm',
        '06:00:pm',
        '06:15:pm',
        '06:30:pm',
        '06:45:pm',
        '07:00:pm',
      ],

      startTimeArr: [],
      endTimeArr: [],
      text: '',
      loading: false,
      mulch_idsList: [],
      mulch_ids: '',
      lead_sourceList: [],
      lead_source_id: '',
      species: [],
      turf_idsList: [],
      turf_ids: '',
      estimate: '',
      mulch_name: '',
      lead_source_name: '',
      turf_name: '',
    };
    this.controller;
  }

  async componentDidMount() {
    this.CheckConnectivity();
    schedule_jobList = [];
    schedule_customerList = [];
    schedule_crewLeaderList = [];
    duration_list = [];
    crew_lead_job_reminder = [];
    this.get_schedule_jobList();
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

  get_schedule_jobList = async () => {
    let token = await getAsyncStorage('token_key');
    const body = {};
    showLoader();
    const {responseJson, err} = await requestGetApi(
      get_schedule_job,
      body,
      'GET',
      token,
    );
    this.getCustomerList(text);
    // hideLoader();

    if (responseJson.status) {
      for (let i = 0; i < responseJson.data.jobs.length; i++) {
        let new_data = responseJson.data.jobs[i].name;
        schedule_jobList.push({
          value: responseJson.data.jobs[i].id,
          label: responseJson.data.jobs[i].name,
        });
      }
      this.setState({JobNameList: schedule_jobList});
    }

    // for (let i = 0; i < responseJson.data.customers.length; i++) {
    //     schedule_customerList.push({
    //         value: responseJson.data.customers[i].id,
    //         label: responseJson.data.customers[i].name
    //     })
    // }

    // this.setState({ customerlist_name: schedule_customerList })
    // responseJson.data.crew_leads.map((item) => {
    //     schedule_crewLeaderList.push({
    //         value: item.id,
    //         label: item.name
    //     })
    // })

    // this.setState({ crewdlist_name: schedule_crewLeaderList })

    for (let i = 0; i < responseJson.data.durations.length; i++) {
      duration_list.push({
        value: responseJson.data.durations[i].id,
        label: responseJson.data.durations[i].name,
        slug: responseJson.data.durations[i].slug,
      });
    }
    this.setState({duration: duration_list});
    let result = Object.entries(responseJson.data.crew_lead_job_reminder);
    result.map((item, index) => {
      crew_lead_job_reminder.push({
        label: item[1],
        value: item[0],
      });
    });
    this.setState({factory_props: crew_lead_job_reminder});
  };

  async getCustomerList(text) {
    const formData = new FormData();
    if (text == '') {
      formData.append('searchTerm', '');
    } else {
      formData.append('searchTerm', text);
    }
    let token = await getAsyncStorage('token_key');
    formData.append('type', 'customer');
    const {responseJson, err} = await requestPostApiMedia(
      searchUser,
      formData,
      'POST',
      token,
    );

    if (responseJson.status) {
      let size = responseJson.data.length;
      schedule_customerList = [];
      for (let i = 0; i < size; i++) {
        schedule_customerList.push({
          value: responseJson.data[i].id,
          label: responseJson.data[i].text,
        });
      }
      this.setState({customerlist_name: schedule_customerList});

      this.getCrewleadList(text2);
    }
  }

  async getCrewleadList(text2) {
    const formData = new FormData();
    if (text2 == '') {
      formData.append('searchTerm', '');
    } else {
      formData.append('searchTerm', text2);
    }
    let token = await getAsyncStorage('token_key');

    formData.append('type', 'crew');
    const {responseJson, err} = await requestPostApiMedia(
      searchUser,
      formData,
      'POST',
      token,
    );
    this.getLeadSource();

    if (responseJson.status) {
      let size = responseJson.data.length;
      schedule_crewLeaderList = [];
      responseJson.data.map((item) => {
        schedule_crewLeaderList.push({
          value: item.id,
          label: item.text,
        });
      });
      this.setState({crewdlist_name: schedule_crewLeaderList});
    }
  }
  async getLeadSource() {
    let token = await getAsyncStorage('token_key');
    const body = {};
    showLoader();
    const {responseJson, err} = await requestGetApi(
      lead_source,
      body,
      'GET',
      token,
    );
    //  hideLoader();
    if (responseJson.status) {
      let size = responseJson.data.length;
      let schedule_lead_sourceList = [];
      responseJson.data.map((item) => {
        schedule_lead_sourceList.push({
          value: item.id,
          label: item.name,
        });
      });
      this.setState({lead_sourceList: schedule_lead_sourceList});
    }
    this.getturf_ids();
  }
  async getturf_ids() {
    let token = await getAsyncStorage('token_key');
    const body = {};
    // showLoader();
    const {responseJson, err} = await requestGetApi(
      turf_ids,
      body,
      'GET',
      token,
    );
    this.getmulch_ids();
    hideLoader();
    if (responseJson.status) {
      let size = responseJson.data.length;
      let schedule_turf_idsList = [];
      responseJson.data.map((item) => {
        schedule_turf_idsList.push({
          value: item.id,
          label: item.name,
        });
      });
      this.setState({turf_idsList: schedule_turf_idsList});
    }
  }
  async getmulch_ids() {
    let token = await getAsyncStorage('token_key');
    const body = {};
    //showLoader();
    const {responseJson, err} = await requestGetApi(
      mulch_ids,
      body,
      'GET',
      token,
    );
    //hideLoader();
    if (responseJson.status) {
      let size = responseJson.data.length;
      let schedule_mulch_idsList = [];
      responseJson.data.map((item) => {
        schedule_mulch_idsList.push({
          value: item.id,
          label: item.name,
        });
      });
      this.setState({mulch_idsList: schedule_mulch_idsList});
    }
  }
  OnbackClick = (props) => {
    this.props.navigation.goBack();
  };
  Separator = () => <View style={styles.separator} />;

  handleChange = () => {
    this.setState({isSelected: !this.state.isSelected});
  };
  handleChangeOnRepeatJob = () => {
    this.setState({isRepeatJobSelected: !this.state.isRepeatJobSelected});
  };
  toggleModal_2 = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
    this.props.navigation.navigate('AdminJobScheduleList', {
      frequency_id: this.state.frequency_value,
      frequency_name: this.state.default_value,
    });
  };
  ShowMaxAlert = (EnteredValue) => {};
  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  showDatePicker_2 = () => {
    this.setState({isSecondDatePickerVisible: true});
  };

  showTimePicker = () => {
    this.setState({startTimePicker: true, endTimePicker: false});
  };

  showTimePicker_2 = () => {
    this.setState({startTimePicker: false, endTimePicker: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };
  hideDatePicker_2 = () => {
    this.setState({isSecondDatePickerVisible: false});
  };

  handleDatePicked = (date) => {
    const momentDate = Moment(date.toISOString());
    var pickedDt = Moment(momentDate).format('MM/DD/YYYY');
    //oneTimeSelected_date = date.getDate() + " " + monthNames[(date.getMonth())] + " ," + date.getFullYear();
    oneTimeSelected_date = pickedDt;
    //date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    this.setState({oneTimeSelected_date, secondTimeSelected_date: ''});
    this.hideDatePicker();

    if (this.state.selectedSlug != '') {
      this.GetAvailableSlots();
    }
  };

  handleDatePicked_2 = (date) => {
    if (this.state.oneTimeSelected_date == '') {
      Alert.alert('Please choose start date.');
    } else {
      const momentDate = Moment(date.toISOString());
      var pickedDt = Moment(momentDate).format('MM/DD/YYYY');
      secondTimeSelected_date = pickedDt;
      //date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
      this.setState({secondTimeSelected_date});
      this.hideDatePicker_2();

      if (this.state.selectedSlug != '') {
        this.GetAvailableSlots();
      }
    }
  };

  hideTimePicker = () => {
    this.setState({isTimePickerVisible: false});
  };
  hideTimePicker_2 = () => {
    this.setState({isTimePickerVisible_2: false});
  };

  handleTimePicked = (time) => {
    let AM_PM;
    if (time.getHours() < 12) {
      AM_PM = 'AM';
      if (time.getHours().toString().length < 2) {
        oneTimeSelected_time =
          '0' + time.getHours() + ':' + time.getMinutes() + ' ' + AM_PM;
      } else {
        oneTimeSelected_time =
          time.getHours() + ':' + time.getMinutes() + ' ' + AM_PM;
      }
    } else {
      AM_PM = 'PM';
      oneTimeSelected_time =
        time.getHours() + ':' + time.getMinutes() + ' ' + AM_PM;
    }

    this.setState({oneTimeSelected_time});
    this.hideTimePicker();
  };

  handleTimePicked_2 = (time) => {
    let AM_PM;
    if (time.getHours() < 12) {
      AM_PM = 'AM';
      if (time.getHours().toString().length < 2) {
        oneTimeSelected_time_2 =
          '0' + time.getHours() + ':' + time.getMinutes() + ' ' + AM_PM;
      } else {
        oneTimeSelected_time_2 =
          time.getHours() + ':' + time.getMinutes() + ' ' + AM_PM;
      }
    } else {
      AM_PM = 'PM';
    }
    oneTimeSelected_time_2 =
      time.getHours() + ':' + time.getMinutes() + ' ' + AM_PM;
    this.setState({oneTimeSelected_time_2});
    this.hideTimePicker_2();
  };

  OnServicechangeValue(items) {
    this.setState({service_id: items.value});
    this.setState({default_value: items.label});
  }

  OnCustomerchangeValue(items) {
    this.setState({customer_id: items.value});
    this.setState({default_value: items.label});
    this.getCustomerDetails(items.value);
  }

  OnLead_sourcechangeValue(items) {
    this.setState({lead_source_id: items.value});
    this.setState({default_value: items.label});
  }
  OnCrewLaedchangeValue(items) {
    this.setState({crewlead_id: items.value});
    this.setState({default_value: items.label});
  }
  OnTurf_idsListchangeValue(items) {
    this.setState({turf_ids: items.value});
    this.setState({default_value: items.label});
  }
  OnMulch_idschangeValue(items) {
    this.setState({mulch_ids: items.value});
    this.setState({default_value: items.label});
  }
  OnFrequencychangeValue(items) {
    this.setState({frequency_value: items.value, selectedSlug: items.slug});
    this.setState({default_value: items.label});
    if (this.state.oneTimeSelected_date != '') {
      this.GetAvailableSlots();
    }
  }

  raditoformValue(value, label) {
    this.setState({reminder_time: value});
  }

  OnCreateJob = async () => {
    //  this.setState({ isModalVisible: !this.state.isModalVisible });
    let token = await getAsyncStorage('token_key');

    if (this.state.service_id == '') {
      Alert.alert('Please select job.');
      return;
    }
    if (this.state.input_price == '') {
      Alert.alert('Please select price.');
      return;
    }
    if (this.state.oneTimeSelected_date == '') {
      Alert.alert('Please select start date.');
      return;
    }
    if (this.state.oneTimeSelected_time == '') {
      Alert.alert('Please select start time.');
      return;
    }
    if (this.state.oneTimeSelected_time_2 == '') {
      Alert.alert('Please select end time.');
      return;
    }
    if (this.state.customer_id == '') {
      Alert.alert('Please enter customer.');
      return;
    }
    if (this.state.crewlead_id == '') {
      Alert.alert('Please enter crewlead.');
      return;
    }
    if (this.state.frequency_value == '') {
      Alert.alert('Please enter reminder.');
      return;
    }
    if (this.state.input_note == '') {
      Alert.alert('Please enter notes.');
      return;
    }
    // if (this.state.secondTimeSelected_date == '') {
    //     Alert.alert("Please enter last date.");
    //     return;
    // }
    // if (this.state.reminder_time == '') {
    //     Alert.alert("Please select duration.");
    //     return;
    // }

    //this.setState({loading:true})
    showLoader();
    const formData = new FormData();
    formData.append('job', this.state.service_id);
    formData.append('price', this.state.input_price);
    formData.append('start_date', this.state.oneTimeSelected_date);
    formData.append('start_time', this.state.oneTimeSelected_time);
    formData.append('end_time', this.state.oneTimeSelected_time_2);
    formData.append('customer', this.state.customer_id);
    formData.append('crew_lead', this.state.crewlead_id);
    // formData.append('crew_job_reminder', this.state.reminder_time)
    formData.append('note', this.state.input_note);

    formData.append('lead_source', this.state.lead_source_id);
    formData.append('turf_id', this.state.turf_ids);
    formData.append('mulch_id', this.state.mulch_ids);
    formData.append('estimate_price', this.state.estimate);

    formData.append('duration', this.state.frequency_value);
    const {responseJson, err} = await requestPostApiMedia(
      post_schedule_job,
      formData,
      'POST',
      token,
    );
    //this.setState({loading:false})
    hideLoader();
    if (responseJson.status == true) {
      this.setState({isModalVisible: !this.state.isModalVisible});
    } else {
      alert(responseJson.msg);
    }
  };
  getCustomerDetails = async (customer_id) => {
    let token = await getAsyncStorage('token_key');
    const formData = new FormData();
    formData.append('customer_id', customer_id);
    const {responseJson, err} = await requestPostApiMedia(
      customer_detail,
      formData,
      'POST',
      token,
    );
    let data = responseJson.data;
    if (responseJson.status) {
      this.setState({species: responseJson.species});
      this.setState({mulch_name: data.mulch_name});
      this.setState({lead_source_name: data.lead_source_name});
      this.setState({turf_name: data.turf_name});
      this.setState({estimate: data.estimate_price});

      this.setState({mulch_ids: data.mulch_id});
      this.setState({turf_ids: data.turf_id});
      this.setState({lead_source_id: data.lead_source_id});
    }
  };
  render() {
    return (
      <View style={{height: '100%', width: '100%'}}>
        <View style={{height: 150}}>
          <View style={styles.CradContainer}>
            <TouchableOpacity
              onPress={this.OnbackClick}
              style={styles.BackContainer}>
              <Image source={require('../../../images/back.png')} />
            </TouchableOpacity>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={styles.DateContainer}>Manage Schedule Jobs</Text>
            </View>
          </View>
        </View>

        <View>
          <AppLoader ref={loaderRef} />
        </View>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.CreateJobContainer}>
          <TouchableOpacity
            style={styles.addCustomer}
            onPress={() => this.props.navigation.navigate('AddCustomerScreen')}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../../images/add.png')}
            />
            <Text style={{color: 'white'}}>Add Customer</Text>
          </TouchableOpacity>

          <Text style={styles.TextContainer_1}>Customer</Text>
          <DropDownPicker
            items={this.state.customerlist_name}
            zIndex={6}
            searchable={true}
            searchablePlaceholder="Search"
            placeholder="Select"
            searchablePlaceholderTextColor="gray"
            defaultValue={this.state.default_value.label}
            containerStyle={{height: 40, marginTop: '3%'}}
            style={styles.RectangleContainer_6}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            labelStyle={{color: 'gray'}}
            dropDownStyle={{
              backgroundColor: '#fff',
              width: '70%',
              marginLeft: '0%',
              alignSelf: 'center',
            }}
            onChangeItem={(items, index) =>
              this.OnCustomerchangeValue(items, index)
            }
            onSearch={(text) => this.getCustomerList(text)}
          />
          <Text style={styles.TextContainer_1}>Crew Lead</Text>
          <DropDownPicker
            key={5}
            zIndex={5}
            items={this.state.crewdlist_name}
            searchable={true}
            searchablePlaceholder="Search"
            placeholder="Select"
            searchablePlaceholderTextColor="gray"
            defaultValue={this.state.default_value.label}
            containerStyle={{height: 40, marginTop: '3%'}}
            style={styles.RectangleContainer_6}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            labelStyle={{color: 'gray'}}
            dropDownStyle={{
              backgroundColor: '#fff',
              width: '70%',
              marginLeft: '0%',
              alignSelf: 'center',
            }}
            searchableError={() => <Text>Not Found</Text>}
            onChangeItem={(items, index) =>
              this.OnCrewLaedchangeValue(items, index)
            }
            onSearch={(text) => this.getCrewleadList(text)}
          />
          <Text style={styles.TextContainer_1}>Lead Source</Text>
          {this.state.lead_source_name == '' ||
          this.state.lead_source_name == null ? (
            <DropDownPicker
              key={4}
              zIndex={4}
              items={this.state.lead_sourceList}
              searchable={true}
              searchablePlaceholder="Search"
              placeholder="Select"
              searchablePlaceholderTextColor="gray"
              defaultValue={this.state.default_value.label}
              containerStyle={{height: 40, marginTop: '3%'}}
              style={styles.RectangleContainer_6}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              labelStyle={{color: 'gray'}}
              dropDownStyle={{
                backgroundColor: '#fff',
                width: '70%',
                marginLeft: '0%',
                alignSelf: 'center',
              }}
              searchableError={() => <Text>Not Found</Text>}
              onChangeItem={(items, index) =>
                this.OnLead_sourcechangeValue(items, index)
              }
              onSearch={(text) => this.getLeadSource(text)}
            />
          ) : (
            <View style={styles.dataView}>
              <Text style={styles.textColor}>
                {this.state.lead_source_name}
              </Text>
            </View>
          )}
          <Text style={styles.TextContainer_1}>Service</Text>
          <DropDownPicker
            items={this.state.JobNameList}
            key={6}
            zIndex={3}
            containerStyle={{height: 40, marginTop: '3%'}}
            style={styles.RectangleContainer_6}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            labelStyle={{color: 'gray'}}
            dropDownStyle={{
              backgroundColor: '#fff',
              width: '70%',
              marginLeft: '0%',
              alignSelf: 'center',
            }}
            defaultValue={this.state.default_value.label}
            placeholder="Select"
            onChangeItem={(items, index) =>
              this.OnServicechangeValue(items, index)
            }
          />
          <Text style={styles.TextContainer_1}>Bid Given</Text>
          <View style={styles.RectangleContainer_3}>
            {this?.state?.estimate != '' ? (
              <Text style={{color: 'gray', alignSelf: 'center', fontSize: 14}}>
                {' '}
                $
              </Text>
            ) : null}
            <TextInput
              placeholder={'Bid Given'}
              style={{
                alignSelf: 'center',
                marginLeft: '0%',
                color: '#000',
                fontSize: 14,
                width: '80%',
              }}
              onChangeText={(text) => this.setState({estimate: text})}
              keyboardType="number-pad"
              value={this?.state?.estimate?.toString()}
              onSubmitEditing={Keyboard.dismiss}></TextInput>
          </View>
          <Text style={styles.TextContainer_1}>Price</Text>
          <View style={styles.RectangleContainer_3}>
            {this.state.input_price != '' ? (
              <Text style={{color: 'gray', alignSelf: 'center', fontSize: 14}}>
                {' '}
                $
              </Text>
            ) : null}
            <TextInput
              placeholder="price"
              style={{
                alignSelf: 'center',
                marginLeft: '0%',
                color: '#000',
                fontSize: 14,
                width: '80%',
              }}
              onChangeText={(input_price) => this.setState({input_price})}
              keyboardType="number-pad"
              onSubmitEditing={Keyboard.dismiss}></TextInput>
          </View>
          <Text style={styles.TextContainer_1}>Start Date</Text>
          <TouchableOpacity
            style={styles.RectangleContainer_2}
            onPress={this.showDatePicker}>
            {/* <Text style={{ alignSelf: 'center', marginLeft: "15%", }}>{oneTimeSelected_date}</Text> */}
            <TextInput
              editable={false}
              placeholder="select date"
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
              minimumDate={Moment().toDate()}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDatePicker}
              forment="dd-MM-y"
            />
            <Image
              style={{
                alignSelf: 'center',
                width: 20,
                height: 20,
                position: 'absolute',
                right: 20,
              }}
              source={require('../../../images/date_picker.png')}
            />
          </TouchableOpacity>
          <Text style={styles.TextContainer_1}>Frequency</Text>
          <DropDownPicker
            items={this.state.duration}
            controller={(instance) => (this.controller = instance)}
            containerStyle={{height: 40, marginTop: '3%'}}
            style={styles.RectangleContainer_6}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{
              backgroundColor: '#fff',
              width: '70%',
              marginLeft: '0%',
              alignSelf: 'center',
            }}
            defaultValue={this.state.default_value.label}
            placeholder="Select"
            onChangeItem={(items) => this.OnFrequencychangeValue(items)}
            searchable={true}
            labelStyle={{color: 'gray'}}
          />
          <Text style={styles.TextContainer_1}>Start Time</Text>
          <TouchableOpacity
            style={styles.RectangleContainer_3}
            onPress={this.showTimePicker}>
            <TextInput
              editable={false}
              placeholder="select time"
              style={{marginLeft: '13%', color: '#000', fontSize: 14}}
              value={this.state.oneTimeSelected_time}></TextInput>

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
            <Image
              style={{marginLeft: '35%', width: 30, height: 30}}
              source={require('../../../images/time.png')}
            />
          </TouchableOpacity>

          <Text style={styles.TextContainer_1}>End Time</Text>
          <TouchableOpacity
            style={styles.RectangleContainer_3}
            onPress={this.showTimePicker_2}>
            <TextInput
              editable={false}
              placeholder="select time"
              style={{
                alignSelf: 'center',
                marginLeft: '13%',
                color: '#000',
                fontSize: 14,
              }}
              value={this.state.oneTimeSelected_time_2}></TextInput>
            <DateTimePickerModal
              isVisible={this.state.isTimePickerVisible_2}
              mode="time"
              headerTextIOS=""
              onConfirm={this.handleTimePicked_2}
              onCancel={this.hideTimePicker_2}
              forment="dd-MM-y"
              amPmAriaLabel="Select AM/PM"
              is24Hour={false}
              maxDetail={oneTimeSelected_time}
            />
            <Image
              style={{marginLeft: '35%', width: 30, height: 30}}
              source={require('../../../images/time.png')}
            />
          </TouchableOpacity>

          <Text style={styles.TextContainer_1}>Turf ID</Text>
          {this.state.turf_name == '' || this.state.turf_name == null ? (
            <DropDownPicker
              key={2}
              zIndex={2}
              items={this.state.turf_idsList}
              searchable={true}
              searchablePlaceholder="Search"
              placeholder="Select"
              searchablePlaceholderTextColor="gray"
              defaultValue={this.state.default_value.label}
              containerStyle={{height: 40, marginTop: '3%'}}
              style={styles.RectangleContainer_6}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              labelStyle={{color: 'gray'}}
              dropDownStyle={{
                backgroundColor: '#fff',
                width: '70%',
                marginLeft: '0%',
                alignSelf: 'center',
              }}
              searchableError={() => <Text>Not Found</Text>}
              onChangeItem={(items, index) =>
                this.OnTurf_idsListchangeValue(items, index)
              }
              onSearch={(text) => this.getturf_ids(text)}
            />
          ) : (
            <View style={styles.dataView}>
              <Text style={styles.textColor}>{this.state.turf_name}</Text>
            </View>
          )}
          {/* notes section starts */}
          <View
            style={{
              flexDirection: 'row',
              marginLeft: '15%',
              marginTop: 20,
              marginBottom: 15,
            }}>
            <Text style={{color: '#898989'}}>Notes </Text>
            <Text style={{color: '#F65327'}}>*</Text>
          </View>

          <TextInput
            style={styles.JobNotes_1}
            multiline={true}
            numberOfLines={6}
            placeholder="Notes"
            spellCheck={false}
            autoCorrect={false}
            onChangeText={(input_note) =>
              this.setState({input_note})
            }></TextInput>
          <this.Separator />
          {/* notes section ends */}

          <Text style={styles.TextContainer_1}>Mulch ID</Text>
          {this.state.mulch_name == '' || this.state.mulch_name == null ? (
            <DropDownPicker
              key={1}
              zIndex={1}
              items={this.state.mulch_idsList}
              searchable={true}
              searchablePlaceholder="Search"
              placeholder="Select"
              searchablePlaceholderTextColor="gray"
              defaultValue={this.state.default_value.label}
              containerStyle={{height: 40, marginTop: '3%'}}
              style={styles.RectangleContainer_6}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              labelStyle={{color: 'gray'}}
              dropDownStyle={{
                backgroundColor: '#fff',
                width: '70%',
                marginLeft: '0%',
                alignSelf: 'center',
              }}
              searchableError={() => <Text>Not Found</Text>}
              onChangeItem={(items, index) =>
                this.OnMulch_idschangeValue(items, index)
              }
              onSearch={(text) => this.getmulch_ids(text)}
            />
          ) : (
            <View style={styles.dataView}>
              <Text style={styles.textColor}>{this.state.mulch_name}</Text>
            </View>
          )}
          {/* <Text style={styles.TextContainer_1}>Select Crew Job Reminder</Text>

                    <RadioForm
                        key={this.state.formKey}
                        initial={this.state.initialRadioPos}
                        radio_props={this.state.factory_props}
                        style={{ marginLeft: "15%", marginTop: "5%" }}
                        formVertical={true}
                        buttonSize={8}
                        buttonOuterSize={16}
                        labelStyle={{ fontSize: 16, color: '#000' }}
                        buttonColor={this.state.switched ? '#000' : '#3AB34A'}
                        selectedButtonColor={this.state.switched ? '#3AB34A' : '#3AB34A'}
                        onPress={(value, label) => {
                            this.raditoformValue(value, label)
                        }}  >

                    </RadioForm> */}

          {this.state.species?.length > 0 ? (
            <View style={{paddingLeft: 60, marginTop: 10}}>
              <View>
                <Text style={{color: '#898989', marginBottom: 10}}>
                  Species({this.state.species?.length})
                </Text>
                {this.state.species?.map((spe, index) => (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.TextNote, {width: '30%'}]}>
                      {index + 1}. {spe?.name}
                    </Text>
                    <Text style={[styles.TextNote, {marginLeft: 30}]}>
                      {spe?.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.CreateButton}
            onPress={this.OnCreateJob}>
            <Text
              style={{
                fontStyle: 'normal',
                fontWeight: 'bold',
                color: '#fff',
                fontSize: 18,
                marginTop: 10,
              }}>
              Create
            </Text>
          </TouchableOpacity>

          <Modal isVisible={this.state.isModalVisible}>
            <View style={styles.JonMarked_Completed_Modal}>
              <Image
                source={require('../../../images/checked.png')}
                style={{alignSelf: 'center', marginTop: '5%'}}
              />
              <Text style={styles.TextContainer_13}>
                Job scheduled successfully
              </Text>
              <View style={{flexDirection: 'row'}}></View>

              <TouchableOpacity
                style={styles.CreateButton}
                title="Hide modal"
                onPress={this.toggleModal_2}>
                <Text style={styles.TextContainer_3}>View job</Text>
              </TouchableOpacity>
            </View>
            {/* <Loader isLoader={this.state.loading}></Loader> */}
          </Modal>
          <View style={{height: 100}}></View>
          <AppLoader ref={loaderRef} />
        </KeyboardAwareScrollView>
        <CustomPicker
          showPicker={this.state.startTimePicker || this.state.endTimePicker}
          arr={
            this.state.startTimePicker
              ? this.state.startTimeArr
              : this.state.endTimeArr
          }
          handleClose={() =>
            this.setState({endTimePicker: false, startTimePicker: false})
          }
          pickerTitle={'Choose Time'}
          handleSubmit={this.handleSubmit}
        />
        {/* <Loader isLoader={this.state.loading}></Loader> */}
      </View>
    );
  }

  /*Handle Picker Input*/
  handleSubmit = (item, index) => {
    let dict = this.state.dict;
    if (this.state.startTimePicker) {
      var beginningTime = Moment(current_time, 'h:mma');
      var endTime = Moment(item, 'h:mma');
      if (endTime.isBefore(beginningTime)) {
        alert('Please Enter Valid Time.');
        return;
      }
      this.setState({
        startTimePicker: false,
        endTimePicker: false,
        oneTimeSelected_time: item,
        oneTimeSelected_time_2: '',
      });
      let check = false;
      let endArr = [];
      this.state.startTimeArr.map((item2, index) => {
        if (check) {
          endArr.push(item2);
        }
        if (item2 == item) {
          check = true;
        }
      });
      this.setState({endTimeArr: endArr});
    } else if (this.state.endTimePicker) {
      this.setState({
        startTimePicker: false,
        endTimePicker: false,
        showSpecificationPicker: false,
        oneTimeSelected_time_2: item,
      });
    }
  };

  async GetAvailableSlots() {
    let token = await getAsyncStorage('token_key');
    //this.setState({loading:true})
    const formData = new FormData();
    formData.append('crew_lead', this.state.crewlead_id);
    formData.append('frequency', this.state.frequency_value);
    formData.append('start_date', this.state.oneTimeSelected_date);
    // formData.append('end_date', this.state.secondTimeSelected_date)
    const {responseJson, err} = await requestPostApiMedia(
      checkAvilability,
      formData,
      'POST',
      token,
    );
    this.setState({loading: false});
    if (responseJson.status) {
      let data = responseJson.data;
      const propertyNames = Object.values(data);
      let finalArr = [];
      this.state.defaultTime.map((item1, i) => {
        let check = propertyNames.indexOf(item1) > -1;
        if (!check) {
          finalArr.push(item1);
        }
      });
      this.setState({startTimeArr: finalArr});
    } else {
      this.setState({startTimeArr: this.state.defaultTime});
    }

    // if (responseJson.status == true) {

    // }
    // else {
    // }
  }
}
export default NewCreateJob;

// <Text style={styles.TextContainer_1}>End Date</Text>
// <TouchableOpacity style={styles.RectangleContainer_2} onPress={this.showDatePicker_2} >
//     {/* <Text style={{ alignSelf: 'center', marginLeft: "15%", }}>{oneTimeSelected_date}</Text> */}
//     <TextInput editable={false}
//         placeholder="select date"
//         style={{ alignSelf: 'center', marginLeft: "13%", color: '#000', fontSize: 14 }}
//         value={this.state.secondTimeSelected_date} ></TextInput>
//     <DateTimePickerModal
//         isVisible={this.state.isSecondDatePickerVisible}
//         mode="date"
//         headerTextIOS=""
//         onConfirm={this.handleDatePicked_2}
//         onCancel={this.hideDatePicker_2}
//         forment="dd-MM-y"
//     />
//     <Image style={{ alignSelf: 'center', marginLeft: "35%", width: 20, height: 20 }} source={require('../../../images/date_picker.png')} />

// </TouchableOpacity>
