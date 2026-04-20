import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
// import Entypo from 'react-native-vector-icons/Entypo'
const PageNumber = ({numberofPage, onPressNumber}) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const data = Array.from({length: numberofPage}, (_, index) => index + 1);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const isPrevButtonDisabled = currentPage === 1;
  const isNextButtonDisabled = currentPage === totalPages;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (numberofPage === 0) return null;

  return (
    <View style={styles.renderContainer}>
      <TouchableOpacity
        onPress={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={isPrevButtonDisabled}
        style={[
          styles.arrowImage,
          {backgroundColor: isPrevButtonDisabled ? 'gray' : 'green'},
        ]}>
        <Image
          source={require('../../images/back.png')}
          style={[
            styles.arrowImage,
            // {tintColor: isNextButtonDisabled ? 'gray' : 'green'},
          ]}
        />
        {/* <Entypo name='chevron-small-left' size={25} color={'#fff'}/> */}
      </TouchableOpacity>

      {currentPage > 5 && (
        <View style={{flexDirection: 'row'}}>
          <View style={styles.ellipsis} />
          <View style={styles.ellipsis} />
        </View>
      )}

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        )}
        horizontal
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedPage(item);
              onPressNumber(item);
            }}
            style={[
              styles.ellipsisContainer,
              {backgroundColor: item === selectedPage ? 'green' : null},
            ]}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {currentPage < totalPages - 5 && (
        <View style={{flexDirection: 'row'}}>
          <View style={styles.ellipsis} />
          <View style={styles.ellipsis} />
        </View>
      )}

      <TouchableOpacity
        onPress={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={isNextButtonDisabled}
        style={[
          styles.arrowImage,
          {backgroundColor: isNextButtonDisabled ? 'gray' : 'green'},
        ]}>
        {/* <Entypo name='chevron-small-right' size={25} color={'#fff'}/> */}
        <Image
          source={require('../../images/next_arrow.png')}
          style={[
            styles.arrowImage,
            // {tintColor: isNextButtonDisabled ? 'gray' : 'green'},
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PageNumber;

const styles = StyleSheet.create({
  ellipsisContainer: {
    height: 35,
    width: 35,
    borderColor: 'green',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipsis: {
    height: 6,
    width: 6,
    borderRadius: 5,
    backgroundColor: 'green',
    margin: 1.8,
  },
  renderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'center',
  },
  arrowImage: {
    height: 35,
    width: 35,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
