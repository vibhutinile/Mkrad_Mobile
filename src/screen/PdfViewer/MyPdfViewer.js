import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Pdf from 'react-native-pdf';
import Loader from '../../NetworkCall/Loader';

const MyPDFViewer = (props) => {
  const [loading, setloading] = useState(true);
  let {pdfUrl} = props.route.params;
  const source = {uri: pdfUrl, cache: true};
  return (
    <>
      <Loader isLoader={loading} />
      <View style={styles.CradContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.BackContainer}
          onPress={() => props.navigation.goBack()}>
          <Image source={require('../../images/back.png')} />
        </TouchableOpacity>
        <View style={{alignSelf: 'center', marginTop: 18, marginLeft: 15}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#898989',
              marginTop: 10,
            }}>
            View PDF
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Pdf
          source={source}
          style={styles.pdf}
          trustAllCerts={false}
          onLoadComplete={() => setloading(false)}
          onError={(error) => console.error('Cannot render PDF', error)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  CradContainer: {
    height: 120,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 0,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 5,
  },
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
  },
  BackContainer: {
    width: '10%',
    height: '30%',
    marginLeft: '5%',
    marginTop: '15%',
  },
});

export default MyPDFViewer;
