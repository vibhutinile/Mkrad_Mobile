import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Pdf from 'react-native-pdf';
import Loader from '../../NetworkCall/Loader';

const MyPDFViewer = (props) => {
  const [loading, setloading] = useState(true);
  let {pdfUrl} = props.route.params || {};
  console.log('[ViewPDF] MyPDFViewer received pdfUrl:', pdfUrl);
  const isValidUrl =
    typeof pdfUrl === 'string' &&
    pdfUrl.length > 0 &&
    !pdfUrl.includes('undefined') &&
    !pdfUrl.includes('null');
  const source = isValidUrl ? {uri: pdfUrl, cache: true} : null;
  useEffect(() => {
    if (!isValidUrl) setloading(false);
  }, [isValidUrl]);
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
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#898989',
            marginLeft: 12,
          }}>
          View PDF
        </Text>
      </View>
      <View style={styles.container}>
        {isValidUrl ? (
          <Pdf
            source={source}
            style={styles.pdf}
            trustAllCerts={false}
            onLoadComplete={() => setloading(false)}
            onError={(error) => console.error('Cannot render PDF', error)}
          />
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, color: '#898989', padding: 20}}>
              No PDF URL available for this job.
            </Text>
            <Text style={{fontSize: 12, color: '#bbb', padding: 8}}>
              Received: {String(pdfUrl)}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  CradContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  BackContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
  },
});

export default MyPDFViewer;
