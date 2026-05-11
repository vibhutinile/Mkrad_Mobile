import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.welcomeHeader}>
        <Image
          style={styles.welcomeLogo}
          source={require('../../images/logo.png')}
        />
      </View>
      <View style={styles.welcomePill}>
        <Text style={styles.welcomePillText}>Welcome</Text>
      </View>
      <View style={styles.welcomeBody}>
        <Text style={styles.TextStyle3}>Crew Lead</Text>
        <TouchableOpacity style={styles.LoginButtonStyle} onPress={LoginPage}>
          <Text style={styles.TextStyle2}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.TextStyle3}>Crew Member</Text>
        <TouchableOpacity
          style={styles.LoginButtonStyle}
          onPress={crewMemberLogin}>
          <Text style={styles.TextStyle2}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;
