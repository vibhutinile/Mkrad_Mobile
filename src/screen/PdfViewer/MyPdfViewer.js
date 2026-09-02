import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Pdf from 'react-native-pdf';
import Loader from '../../NetworkCall/Loader';

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|bmp|heic|heif)(\?.*)?$/i;

const MyPDFViewer = (props) => {
  const [loading, setloading] = useState(true);
  let {pdfUrl} = props.route.params || {};
  console.log('[ViewPDF] MyPDFViewer received pdfUrl:', pdfUrl);
  const isValidUrl =
    typeof pdfUrl === 'string' &&
    pdfUrl.length > 0 &&
    !pdfUrl.includes('undefined') &&
    !pdfUrl.includes('null');
  const isImage = isValidUrl && IMAGE_EXT.test(pdfUrl);
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
          {isImage ? 'View Document' : 'View PDF'}
        </Text>
      </View>
      <View style={styles.container}>
        {!isValidUrl ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 16, color: '#898989', padding: 20}}>
              No document URL available for this job.
            </Text>
            <Text style={{fontSize: 12, color: '#bbb', padding: 8}}>
              Received: {String(pdfUrl)}
            </Text>
          </View>
        ) : isImage ? (
          <Image
            source={source}
            style={styles.image}
            resizeMode="contain"
            onLoad={() => setloading(false)}
            onError={(e) => {
              setloading(false);
              console.log('[ViewPDF] Image load error', e.nativeEvent);
            }}
          />
        ) : (
          <Pdf
            source={source}
            style={styles.pdf}
            trustAllCerts={false}
            onLoadComplete={() => setloading(false)}
            onError={(error) => {
              setloading(false);
              console.log('[ViewPDF] Pdf render error', error && error.message);
            }}
          />
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
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f4f4f4',
  },
});

export default MyPDFViewer;
