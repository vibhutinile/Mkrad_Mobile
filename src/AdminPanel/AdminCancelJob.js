import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './home_styles';
import {getAsyncStorage} from '../Routes/AsynstorageClass';
import {get_cancel_jobList, requestGetApi} from '../NetworkCall/Service';
import AppLoader, {loaderRef} from '../Routes/AppLoader';
import {showLoader, hideLoader} from '../Routes/AppLoader';
let cancelJobList = [];

export default class AdminCancelJob extends React.Component {
  state = {
    search: '',
  };
  constructor() {
    super();
    this.state = {
      text: '',
      canceljob: [],
      resultData: [],
      PageNo: 1,
    };
  }
  componentDidMount() {
    showLoader();
    this.get_cancel_jobList();
  }

  async get_cancel_jobList() {
    let token = await getAsyncStorage('token_key');
    const body = {
      page: this.state.PageNo,
    };
    const {responseJson, err} = await requestGetApi(
      get_cancel_jobList,
      body,
      'GET',
      token,
    );
    hideLoader();
    if (responseJson.status) {
      cancelJobList = responseJson.data.data;
      this.setState({
        canceljob: this.state.canceljob.concat(responseJson.data.data),
      });
    }
  }
  OnbackClick = (props) => {
    this.props.navigation.goBack();
  };

  OnGoingJobDetails(
    start_time,
    end_time,
    addres_line_1,
    phone_number,
    customer_name,
    service_name,
  ) {
    this.props.navigation.navigate('AdminJobDetails', {
      start_time: start_time,
      end_time: end_time,
      addres_line_1: addres_line_1,
      phone_number: phone_number,
      customer_name: customer_name,
      service_name: service_name,
    });
  }
  Separator = () => <View style={styles.separator} />;

  footerList = () => {
    return (
      <View>
        <AppLoader ref={loaderRef} />
      </View>
    );
  };
  handleLoadMore = async () => {
    await this.setState({PageNo: this.state.PageNo + 1});
    this.get_cancel_jobList();
  };
  render() {
    const {search} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../images/back.png')} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginTop: '5%'}}>
            <Text style={styles.DateContainer}>Cancelled Jobs</Text>
          </View>
        </View>

        <View style={{flex: 5, marginBottom: '5%'}}>
          <FlatList
            data={this.state.canceljob}
            renderItem={({item}) => (
              <View style={styles.CancelJobContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.cancelJobCN}> {item.customer.name} </Text>
                </View>

                <View style={styles.cancelJobView}>
                  <Text style={styles.cancelJobACT}>
                    Assigned to crew leader :
                  </Text>
                  <Text style={styles.canceljobCLn}>{item.crew_lead.name}</Text>
                </View>
                <this.Separator />
                <View style={{flexDirection: 'row'}}>
                  <View style={{}}>
                    <Text style={styles.cancelJobRequest}>
                      {' '}
                      Scheduled service{' '}
                    </Text>
                    <Text style={styles.cancelJobN}>{item.service.name}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.cancelJobNA}
                    onPress={() =>
                      this.OnGoingJobDetails(
                        item.start_time,
                        item.end_time,
                        item.customer.address_line_1,
                        item.customer.phone,
                        item.customer.name,
                        item.service.name,
                      )
                    }>
                    <Image source={require('../images/next_arrow.png')}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
            onEndReached={this.handleLoadMore}
            ListFooterComponent={this.footerList}
          />
        </View>
      </View>
    );
  }
}
