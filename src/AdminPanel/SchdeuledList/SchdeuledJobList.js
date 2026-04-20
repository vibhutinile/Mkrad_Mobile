import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
} from 'react-native';
import styles from '../IncompleteJob/styles';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import {showLoader, hideLoader} from '../../Routes/AppLoader';
import {getSchaduledList, requestGetApi} from '../../NetworkCall/Service';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';
import moment from 'moment';

let jobList = [];
let jobid = '';
let jobDate = '';
class SchdeuledJobList extends React.Component {
  constructor() {
    super();
    this.state = {
      customerJobList: [],
      phone_number: '',
    };
  }

  componentDidMount() {
    showLoader();
    this.get_JobList();
  }

  async get_JobList() {
    let token = await getAsyncStorage('token_key');
    const body = {};
    const {responseJson, err} = await requestGetApi(
      getSchaduledList,
      body,
      'GET',
      token,
    );
    if (responseJson.status) {
      hideLoader();
      jobList = responseJson.data.data;
      this.setState({customerJobList: jobList});
    }
  }
  Separator = () => <View style={styles.separator} />;
  OnbackClick = (props) => {
    this.props.navigation.goBack();
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
  ) => {
    // startTime = startTime;
    // startTime = startTime.substring(0, startTime.length - 3);

    // endTime = endTime;
    // endTime = endTime.substring(0, endTime.length - 3);

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
    });
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
          {/* <View style={styles.NotificationContainer}>
                        <Text style={{ fontSize: 18, fontStyle: 'italic', fontWeight: 'bold', color: '#3AB34A', }} >06</Text>
                    </View> */}
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
            renderItem={({item}) => (
              <View style={styles.JobItemContainer}>
                <View style={{marginLeft: 20}}>
                  <View style={{flexDirection: 'row', marginTop: '5%'}}>
                    <Text style={styles.TextContainer_4}>
                      {' '}
                      {item.customer.name}{' '}
                    </Text>
                  </View>
                  <this.Separator />
                  <View style={{flexDirection: 'row'}}>
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
                  <Text style={styles.TextContainer_5}> Scheduled Date</Text>

                  <Text style={styles.TextContainer_6}>
                    {' '}
                    {moment(item.next_schedule_date, 'YYYY-MM-DD').format(
                      'MM-DD-YYYY',
                    )}
                  </Text>
                  <this.Separator />

                  <Text style={styles.TextContainer_5}> Scheduled Time</Text>
                  <Text style={styles.TextContainer_6}>
                    {' '}
                    {item.start_time + ' to ' + item.end_time}
                  </Text>
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
                  {/* {
                                    item.customer.state == null ? null :
                                        <Text style={styles.TextContainer_6}> {"State: " + item.customer.state}</Text>
                                } */}

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
                  <Text style={styles.TextContainer_5}> Scheduled service</Text>
                  <Text style={styles.TextContainer_6}>
                    {' '}
                    {item.service.name}
                  </Text>

                  <this.Separator />
                  <Text style={styles.TextContainer_5}>Service price</Text>
                  <Text style={styles.TextContainer_6}>
                    {' '}
                    {'$ ' + item.price}
                  </Text>

                  <this.Separator />
                  <Text style={styles.TextContainer_5}>Notes</Text>
                  <Text style={styles.TextNote}> {item.note}</Text>

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
                </View>
              </View>
            )}
          />
        </View>
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
      );
    }
  }
}

export default SchdeuledJobList;
