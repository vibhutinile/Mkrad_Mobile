import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '././styles';
import {getAsyncStorage} from '../../Routes/AsynstorageClass';

function LoginScreen(props) {
  const AdminDashBoard = async () => {
    let token = await getAsyncStorage('token_key');
    if (token == null) {
      props.navigation.navigate('AdminLoginPage');
    } else {
      props.navigation.navigate('SchedularScreen');
    }
  };
  const crewMemberLogin = async () => {
    let token = await getAsyncStorage('CrewMemberName');
    if (token == null) {
      props.navigation.navigate('CrewMemberLogin');
    } else {
      props.navigation.navigate('CrewMemberHome');
    }
  };

  const LoginPage = async () => {
    let token = await getAsyncStorage('token');
    if (token == null) {
      props.navigation.navigate('LoginPage');
    } else {
      props.navigation.navigate('Dashboard');
    }
  };
  return (
    <SafeAreaView style={{height: '100%', backgroundColor: '#fff'}}>
      <View style={{height: '60%'}}>
        <View style={{backgroundColor: '#E8E8E8', flex: 2.3}}>
          <Image
            style={{
              width: '70%',
              height: '50%',
              marginTop: '10%',
              alignSelf: 'center',
              position: 'absolute',
              resizeMode: 'contain',
            }}
            source={require('../../images/logo.png')}
          />
        </View>
        <View style={{marginTop: '15%', flex: 2}}>
          <Text style={styles.TextStyle3}>Crew Lead</Text>
          {/* <View style={styles.LoginButtonStyle}> */}
          <TouchableOpacity style={styles.LoginButtonStyle} onPress={LoginPage}>
            <Text style={styles.TextStyle2}>Login </Text>
          </TouchableOpacity>
          {/* </View> */}

          <Text style={styles.TextStyle3}>Crew Member</Text>
          {/* <View style={styles.LoginButtonStyle}> */}
          <TouchableOpacity
            style={styles.LoginButtonStyle}
            onPress={crewMemberLogin}>
            <Text style={styles.TextStyle2}>Login</Text>
          </TouchableOpacity>

          {/* </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
