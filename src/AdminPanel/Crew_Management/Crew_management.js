import React from 'react';
import {
  View, Text, TouchableOpacity,
  createDrawerNavigator, TextInput, Button, Image, StyleSheet, SafeAreaView
} from 'react-native'

import styles from './styles'

class CrewManagement extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.CradContainer}>
          <View style={{
            marginTop: "8%"
          }}>
            <Image style={styles.MkradContainer}
              source={require('../../images/logo.png')} />
          </View>
          <TouchableOpacity style={{ position: 'absolute', marginTop: "1%", right: "1%" }} onPress={() => this.props.navigation.navigate('AdminNotification')}>
            <Image style={styles.NotificationConrainer}
              source={require('../../images/notification.png')} />
          </TouchableOpacity>

          <View style={styles.RectangleContainer}>
              <Text style={{ alignSelf: 'center', fontSize: 16, fontWeight: 'bold', color: '#fff'}}>Crew Management</Text>
            </View>
        </View>

        <View style={{ flex: 5, flexDirection: 'column' }}>

          <View onStartShouldSetResponder={() =>
            this.props.navigation.navigate("ActiveCrewLeader")}
            style={styles.JobItemContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: "12%", color: '#898989' }}>Active Crew Leads</Text>
            <Image style={{ position: 'absolute', right: "8%" }} source={require('../../images/next_arrow.png')}></Image>
          </View>
          <View onStartShouldSetResponder={() => this.props.navigation.navigate("ActiveCrewMember")} style={styles.JobItemContainer_2}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: "10%", color: '#898989' }}>Active Crew Members</Text>
            <Image style={{ position: 'absolute', right: "8%" }} source={require('../../images/next_arrow.png')}></Image>
          </View>


          <View onStartShouldSetResponder={() =>
            this.props.navigation.navigate("AssignedCrews")}
            style={styles.JobItemContainer_2}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: "12%", color: '#898989' }}>Assigned Crews</Text>
            <Image style={{ position: 'absolute', right: "8%" }} source={require('../../images/next_arrow.png')}></Image>
          </View>
        </View>
        <View style={{
          backgroundColor: '#222441', height:84
          , flexDirection: 'row', alignItems: 'center'
        }}>


          <View style={styles.Bottombar2}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("AdminHome")} style={{ alignItems: 'center', alignSelf: 'center', }} >
              <Image style={{ width: 25, height: 25, }} source={require('../../images/ic_calendar.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.Bottombar}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("SchedularScreen")} style={{ alignItems: 'center', alignSelf: 'center' }}>
              <Image style={{ width: 25, height: 25, }} source={require('../../images/ic_home.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.Bottombar}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("CrewManagement")} style={{ alignItems: 'center', alignSelf: 'center' }}>
              <Image style={{ width: 25, height: 25, }} source={require('../../images/ic_group.png')} />
            </TouchableOpacity>
          </View>


          <View style={styles.Bottombar}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("AdminProfileScreen")} style={{ alignItems: 'center', alignSelf: 'center' }}>
              <Image style={{ width: 20, height: 20, }} source={require('../../images/ic_user.png')} />
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    )
  }
}



export default CrewManagement


