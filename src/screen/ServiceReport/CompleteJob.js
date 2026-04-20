import React from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

import styles from './complete_styles';

class OnCompleteJobScreen extends React.Component {
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
    };
  }

  Separator = () => <View style={styles.separator} />;
  OnbackClick = (props) => {
    this.props.navigation.goBack();
  };

  render() {
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
              Complete job
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={{flex: 4}}>
            <FlatList
              data={this.state.data}
              renderItem={({item}) => (
                <View style={styles.JobItemContainer}>
                  <View style={{flexDirection: 'row', marginTop: '5%'}}>
                    <Text style={styles.TextContainer_4}>
                      {' '}
                      {item.customer_name}{' '}
                    </Text>
                  </View>
                  <this.Separator />
                  <Text style={styles.TextContainer_5}> Job Request</Text>
                  <Text style={styles.TextContainer_6}>
                    {' '}
                    {item.Job_request}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('GetDirectionScreen')
                    }
                    style={{position: 'absolute', right: '10%', top: '39%'}}>
                    <Text style={styles.TextContainer_7}> Get direction</Text>
                    <Image
                      style={styles.TextContainer_8}
                      source={require('../../images/directions_button.png')}
                    />
                  </TouchableOpacity>
                  <this.Separator />

                  <Text style={styles.TextContainer_5}> Time slot</Text>
                  <Text style={styles.TextContainer_6}> {item.time_slot}</Text>
                  {/* <TouchableOpacity onPress={() => alert('hijhh')} style={styles.TextContainer_9}>
                                        <Text style={styles.TextContainer_10}> Call</Text>
                                    </TouchableOpacity> */}
                  <this.Separator />
                  <Text style={styles.TextContainer_11}>Job Location </Text>
                  <Text style={styles.TextContainer_12}>
                    {' '}
                    {item.Job_Location}
                  </Text>
                  <Image
                    style={styles.LocationContainer}
                    source={require('../../images/location.png')}
                  />
                </View>
              )}
            />
          </View>

          <View style={{flex: 3}}>
            <View style={{marginLeft: '8%', marginTop: '4%'}}>
              <Text
                style={{
                  marginTop: 5,
                  fontStyle: 'italic',
                  color: '#000',
                  fontWeight: 'bold',
                }}>
                Job note
              </Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                mi dolor, rhoncus vitae justo rhoncus, laoreet sagittis nibh.
                Aliquam mattis ligula sapien, nec elementum urna tincidunt quis.{' '}
              </Text>
            </View>
          </View>

          <View style={{flex: 1}}>
            <View style={styles.JonMarked_Completed}>
              <Text style={styles.TextContainer_2}>Next schedule job</Text>
              <Text style={styles.TextContainer}>26 July, 2020</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default OnCompleteJobScreen;
