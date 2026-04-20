// Import necessary modules
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';

// Define the PDFViewer component
const PDFViewer = () => {
  // Replace 'your-pdf-file.pdf' with the actual path to your PDF file
  const source = {uri: 'http://www.pdf995.com/samples/pdf.pdf', cache: true};

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        style={styles.pdf}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) =>
          console.debug(`PDF loaded: ${numberOfPages} pages from ${filePath}`)
        }
        onError={(error) => console.debug('Cannot render PDF', error)}
      />
    </View>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
  },
});

export default PDFViewer;
