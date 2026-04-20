import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  ActivityIndicator,
} from 'react-native';
import styles from './styles_completedJob';
import AppLoader, {loaderRef} from '../../Routes/AppLoader';
import {showLoader, hideLoader} from '../../Routes/AppLoader';
import {completedJobList, requestGetApi} from '../../NetworkCall/Service';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';

let jobList = [];
class CompletedJob extends React.Component {
  constructor() {
    super();
    this.state = {
      customerJobList: [],
      phone_number: '',
      PageNo: 1,
    };
  }

  componentDidMount() {
    showLoader();
    this.get_JobList();
  }

  async get_JobList() {
    let token = await getAsyncStorage('token');
    const body = {
      page: this.state.PageNo,
    };
    const {responseJson, err} = await requestGetApi(
      completedJobList,
      body,
      'GET',
      token,
    );
    hideLoader();
    if (responseJson.status) {
      jobList = responseJson.data.data;
      //this.setState({ customerJobList: jobList.concate(jobList) })

      let arr = jobList.filter(function (item) {
        return item.api_job_scheduler_details != null;
      });

      //this.setState({ customerJobList: arr })
      this.setState({customerJobList: this.state.customerJobList.concat(arr)});
    }
  }
  Separator = () => <View style={styles.separator} />;
  OnbackClick = (props) => {
    this.props.navigation.goBack();
    //this.props.navigation.replace("NewJobAssignScreen");
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
            <Text
              style={{
                fontSize: 18,
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: '#898989',
              }}>
              Completed Jobs
            </Text>
          </View>
        </View>

        <View style={{flex: 5}}>
          <View>
            <AppLoader ref={loaderRef} />
          </View>
          <FlatList
            data={this.state.customerJobList}
            renderItem={({item, index}) => (
              <View style={styles.JobItemContainer}>
                <View style={{flexDirection: 'row', marginTop: '5%'}}>
                  <Text style={styles.TextContainer_4}>
                    {' '}
                    {item.api_job_scheduler_details.customer.name}{' '}
                  </Text>
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
                {item.api_job_scheduler_details.customer.city == null ? null : (
                  <Text style={styles.TextContainer_6}>
                    {' '}
                    {'City: ' + item.api_job_scheduler_details.customer.city}
                  </Text>
                )}
                {item.api_job_scheduler_details.customer.state ==
                null ? null : (
                  <Text style={styles.TextContainer_6}>
                    {' '}
                    {'State: ' + item.api_job_scheduler_details.customer.state}
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

                <TouchableOpacity
                  onPress={() =>
                    this.dialCall(item.api_job_scheduler_details.customer.phone)
                  }
                  style={{
                    position: 'absolute',
                    right: '1%',
                    top: '50%',
                    width: '50%',
                    height: '20%',
                  }}>
                  <Text style={styles.TextContainer_7}>
                    {'call: ' + item.api_job_scheduler_details.customer.phone}
                  </Text>
                </TouchableOpacity>
                <this.Separator />

                <Text style={styles.TextContainer_5}> Scheduled service</Text>
                <Text style={styles.TextContainer_6}>
                  {' '}
                  {item.api_job_scheduler_details.service.name}
                </Text>
                <this.Separator />
                <Text style={styles.TextContainer_5}> Scheduled time</Text>
                <Text style={styles.TextContainer_6}>
                  {' '}
                  {item.api_job_scheduler_details.start_time}
                </Text>
                <this.Separator />
                <Text style={styles.TextContainer_5}>notes</Text>
                <Text style={styles.TextContainer_6}>
                  {' '}
                  {item.api_job_scheduler_details.note}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.handleLoadMore}
            ListFooterComponent={this.footerList}
          />
        </View>
      </View>
    );
  }
}

export default CompletedJob;
