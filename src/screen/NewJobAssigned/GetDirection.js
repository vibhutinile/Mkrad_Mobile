import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import styles from './styles';
class GetDirectionScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  OnbackClick = (props) => {
    // this.props.navigation.state.params.updateData(status);
    this.props.navigation.goBack();
  };

  onRegionChange(region) {
    this.setState({region});
  }
  render() {
    var mapStyle = [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}],
      },
    ];
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../../images/back.png')} />
          </TouchableOpacity>
          <View style={styles.NotificationContainer}>
            <Text
              style={{
                fontSize: 18,
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: '#3AB34A',
              }}>
              06
            </Text>
          </View>
          <View style={{alignSelf: 'center', marginTop: 18, marginLeft: 10}}>
            <Text
              style={{
                fontSize: 18,
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: '#898989',
              }}>
              New job assigned
            </Text>
          </View>
        </View>

        <View style={{flex: 7}}>
          <View style={styles.container}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              customMapStyle={mapStyle}>
              <Marker
                draggable
                coordinate={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                }}
                onDragEnd={(e) =>
                  alert(JSON.stringify(e.nativeEvent.coordinate))
                }
                title={'Test Marker'}
                description={'This is a description of the marker'}
              />
            </MapView>
          </View>
        </View>
      </View>
    );
  }
}

export default GetDirectionScreen;
