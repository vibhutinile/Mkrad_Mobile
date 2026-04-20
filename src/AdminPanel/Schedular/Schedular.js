import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  createDrawerNavigator,
  TextInput,
  Button,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import styles from './styles';

class SchedularScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{height: '100%'}}>
        <View style={styles.CradContainer}>
          <View
            style={{
              alignItems: 'center',
              marginTop: '10%',
            }}>
            <Image
              style={styles.MkradContainer}
              source={require('../../images/logo.png')}
            />
          </View>
          <TouchableOpacity
            style={{position: 'absolute', right: '1%'}}
            onPress={() => this.props.navigation.navigate('AdminNotification')}>
            <Image
              style={styles.NotificationConrainer}
              source={require('../../images/notification.png')}
            />
          </TouchableOpacity>
          <View style={styles.RectangleContainer}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Home
            </Text>
          </View>
        </View>

        <ScrollView style={{}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('NewCreateJob')}
            style={styles.JobItemContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                marginLeft: '10%',
                color: '#898989',
              }}>
              Manage Schedule Jobs
            </Text>
            <Image
              style={{}}
              source={require('../../images/next_arrow.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SchdeuledJobList')}
            style={styles.JobItemContainer_2}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                marginLeft: '10%',
                color: '#898989',
              }}>
              Scheduled Jobs
            </Text>
            <Image
              style={{}}
              source={require('../../images/next_arrow.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AdminPauseJob')}
            style={styles.JobItemContainer_2}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                marginLeft: '10%',
                color: '#898989',
              }}>
              Paused Jobs
            </Text>
            <Image
              style={{}}
              source={require('../../images/next_arrow.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('InCompleteJob')}
            style={styles.JobItemContainer_2}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                marginLeft: '10%',
                color: '#898989',
              }}>
              Incomplete Jobs
            </Text>
            <Image
              style={{}}
              source={require('../../images/next_arrow.png')}></Image>
          </TouchableOpacity>
        </ScrollView>
        <View
          style={{
            backgroundColor: '#222441',
            height: 84,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.Bottombar2}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AdminHome')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../images/ic_calendar.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SchedularScreen')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../images/ic_home.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CrewManagement')}
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../images/ic_group.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.Bottombar}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('AdminProfileScreen')
              }
              style={{alignItems: 'center', alignSelf: 'center'}}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../../images/ic_user.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SchedularScreen;
