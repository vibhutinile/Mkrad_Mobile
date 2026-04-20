import React from 'react';
import {
  Linking,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

import styles from './UpcomingJob_styles';

let customerName = '';
let address1 = '';
let address2 = '';
let phoneNo = '';
let serviceName = '';
let startTime = '';
let endTime = '';
let next_schedule_date = '';
let note = '';
let frequencyName = '';
let city = '';
let state = '';
let zipcode = '';
class OnUpComingJobScreen extends React.Component {
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

      customerName: '',
      address1: '',
      address2: '',
      phoneNo: '',
      serviceName: '',
      startTime: '',
      endTime: '',
      note: '',
      next_schedule_date: '',
    };
  }

  componentDidMount() {
    this.setState({customerName: customerName});
    this.setState({address1: address1});
    this.setState({address2: address2});
    this.setState({phoneNo: phoneNo});
    this.setState({serviceName: serviceName});
    this.setState({startTime: startTime});
    this.setState({endTime: endTime});
    this.setState({note: note});
    this.setState({next_schedule_date: next_schedule_date});
  }

  Separator = () => <View style={styles.separator} />;
  OnbackClick = (props) => {
    this.props.navigation.goBack();
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

  render() {
    customerName = this.props.route.params.customer_name;
    address1 = this.props.route.params.addres_line_1;
    address2 = this.props.route.params.address_line_2;
    phoneNo = this.props.route.params.phone_number;
    serviceName = this.props.route.params.service_name;
    startTime = this.props.route.params.start_time;
    endTime = this.props.route.params.end_time;
    next_schedule_date = this.props.route.params.next_schedule_date;
    note = this.props.route.params.note;
    frequencyName = this.props.route.params.frequencyName;
    city = this.props.route.params.city;
    state = this.props.route.params.state;
    zipcode = this.props.route.params.zipcode;
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../../images/back.png')} />
          </TouchableOpacity>
          <View style={{alignSelf: 'center', marginTop: 18, marginLeft: 15}}>
            <Text
              style={{
                fontSize: 18,
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: '#898989',
              }}>
              Upcoming job
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={{flex: 4}}>
            <View style={styles.JobItemContainer}>
              <View style={{flexDirection: 'row', marginTop: '5%'}}>
                <Text style={styles.TextContainer_4}>
                  {' '}
                  {this.state.customerName}{' '}
                </Text>
              </View>
              <this.Separator />
              <Text style={styles.TextContainer_5}>Address</Text>
              {this.state.address2 == null ? (
                <Text style={styles.TextContainer_6}>
                  {this.state.address1}
                </Text>
              ) : (
                <Text style={styles.TextContainer_6}>
                  {this.state.address1 + ' ' + this.state.address2}
                </Text>
              )}
              {city == null ? null : (
                <Text style={styles.TextContainer_6}> {'City: ' + city}</Text>
              )}
              {state == null ? null : (
                <Text style={styles.TextContainer_6}> {'State: ' + state}</Text>
              )}

              {zipcode == null ? null : (
                <Text style={styles.TextContainer_6}>
                  {' '}
                  {'Zipcode: ' + zipcode}
                </Text>
              )}
              <this.Separator />
              <Text style={styles.TextContainer_5}>Scheduled service</Text>
              <Text style={styles.TextContainer_6}>
                {this.state.serviceName}
              </Text>
              <TouchableOpacity
                onPress={() => this.dialCall(this.state.phoneNo)}
                style={{
                  position: 'absolute',
                  right: '1%',
                  top: '45%',
                  width: '50%',
                  height: '20%',
                }}>
                <Text style={styles.TextContainer_7}>
                  {'call: ' + this.state.phoneNo}
                </Text>
              </TouchableOpacity>
              <this.Separator />
              <Text style={styles.TextContainer_5}> Scheduled time</Text>
              <Text style={styles.TextContainer_6}>
                {' '}
                {this.state.startTime + ' to ' + this.state.endTime}
              </Text>

              <this.Separator />
              <Text style={styles.TextContainer_5}>notes</Text>
              <Text style={styles.TextContainer_6}> {this.state.note}</Text>
            </View>
          </View>

          <View style={{flex: 1}}>
            {frequencyName == 'ONE TIME' ? null : (
              <View style={styles.JonMarked_Completed}>
                <Text style={styles.TextContainer_2}>Next schedule job</Text>
                <Text style={styles.TextContainer}>
                  {this.state.next_schedule_date}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default OnUpComingJobScreen;
