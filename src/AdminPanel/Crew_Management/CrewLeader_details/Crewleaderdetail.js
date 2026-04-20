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

import styles from './styles';

import ToggleSwitch from 'toggle-switch-react-native';

export default class CrewLeaderDetails extends React.Component {
  constructor({navigation}) {
    super({navigation});
    this.state = {
      isOnDefaultToggleSwitch: true,
      isOnActivateToggleSwitch: true,
    };
  }

  OnbackClick = (props) => {
    this.props.navigation.goBack();
  };

  onToggle(isOn) {}
  Separator = () => <View style={styles.separator} />;
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../../../images/back.png')} />
          </TouchableOpacity>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.NotificationContainer}>
              <Text
                style={{
                  fontSize: 16,
                  fontStyle: 'italic',
                  fontWeight: 'normal',
                  color: '#3AB34A',
                  marginBottom: 8,
                }}>
                06
              </Text>
            </View>
            <Text style={styles.DateContainer}>Crew lead detail</Text>
          </View>
        </View>
        <ScrollView style={{flex: 8}}>
          <View style={styles.JobItemContainer}>
            <View style={{flexDirection: 'row', marginTop: '4%'}}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  marginTop: '4%',
                  marginLeft: '10%',
                  flexWrap: 'wrap',
                }}
                source={require('../../../images/backgroundImage.png')}
              />

              <View>
                <Text
                  style={{
                    marginLeft: '13%',
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginTop: 15,
                    fontStyle: 'italic',
                    color: '#000',
                  }}>
                  {' '}
                  Jerry Paul
                </Text>
                <Text
                  style={{
                    marginLeft: '15%',
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginTop: '4%',
                    fontStyle: 'italic',
                    color: '#3AB34A',
                  }}>
                  Crew leader{' '}
                </Text>
              </View>
            </View>

            <View
              style={{
                height: '32%',
                backgroundColor: '#D7F0DB',
                marginTop: '5%',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginTop: 15,
                  fontStyle: 'italic',
                  color: '#000',
                  marginLeft: '10%',
                  marginTop: '5%',
                }}>
                Job availability
              </Text>

              <this.Separator />
              <View style={{flexDirection: 'row', marginTop: '1%'}}>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: '1%',
                    fontStyle: 'italic',
                    color: '#000',
                    marginLeft: '10%',
                    marginRight: '5%',
                  }}>
                  Available
                </Text>
                <ToggleSwitch
                  onColor="green"
                  offColor="red"
                  size="medium"
                  isOn={this.state.isOnDefaultToggleSwitch}
                  onToggle={(isOnDefaultToggleSwitch) => {
                    this.setState({isOnDefaultToggleSwitch});
                    this.onToggle(isOnDefaultToggleSwitch);
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: '1%',
                    fontStyle: 'italic',
                    color: '#000',
                    marginLeft: '5%',
                  }}>
                  Unavailable
                </Text>
              </View>
            </View>
            {/* 
                        <View style={{height:"25%",backgroundColor:'#FDCFD8',marginTop: "5%"}} >
                            <Text style={{ fontWeight: 'bold', fontSize: 18,  fontStyle: 'italic', color: '#000',marginLeft:"10%",marginTop:"5%", }} >Account status</Text>

                            <this.Separator />
                            <View style={{ flexDirection: 'row',marginTop: "5%" }}>
                                <Text style={{ fontSize: 16, marginTop:"1%", fontStyle: 'italic', color: '#000',marginLeft:"10%",marginRight:"5%" }} >Active</Text>
                                <ToggleSwitch
                                   
                                    onColor="green"
                                    offColor="red"       
                                    size="medium"
                                    isOn={this.state.isOnActivateToggleSwitch}
                                    onToggle={isOnActivateToggleSwitch => {
                                      this.setState({ isOnActivateToggleSwitch });
                                      this.onToggle(isOnActivateToggleSwitch);
                                    }}
                                    
                                    
                                
                                />
                                <Text style={{ fontSize: 16, marginTop:"1%", fontStyle: 'italic', color: '#000', marginLeft: "5%" }} >Deactive</Text>

                            </View>
                    
                     
                        </View> */}

            <View
              style={{flexDirection: 'row', marginTop: '5%', marginLeft: '8%'}}>
              <Text style={{fontStyle: 'italic', color: '#6E6E6E'}}>
                Joined on{' '}
              </Text>
              <Text style={{fontStyle: 'italic', color: '#6E6E6E'}}>
                {' '}
                26 July, 2020
              </Text>
            </View>
            <Text
              style={{
                marginLeft: '8%',
                marginTop: '2%',
                fontStyle: 'italic',
                color: '#6E6E6E',
              }}>
              38 Job completed
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
