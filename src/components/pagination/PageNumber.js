import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';

const BRAND_GREEN = '#3AB34A';
const BRAND_GREEN_DISABLED = '#C8E6C9';

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

  if (!numberofPage || numberofPage <= 1) return null;

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
          style={styles.arrowImage}
        />
      </TouchableOpacity>

      {currentPage > 5 && (
        <View style={styles.ellipsisRow}>
          <View style={styles.ellipsis} />
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
        keyExtractor={(item) => item.toString()}
        renderItem={({item}) => {
          const isSelected = item === selectedPage;
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedPage(item);
                onPressNumber(item);
              }}
              activeOpacity={0.7}
              style={[
                styles.pageItem,
                isSelected && styles.pageItemSelected,
              ]}>
              <Text
                style={[
                  styles.pageText,
                  isSelected && styles.pageTextSelected,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {currentPage < totalPages - 5 && (
        <View style={styles.ellipsisRow}>
          <View style={styles.ellipsis} />
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
        <Image
          source={require('../../images/next_arrow.png')}
          style={styles.arrowImage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PageNumber;

const styles = StyleSheet.create({
  renderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  arrowImage: {
    height: 35,
    width: 35,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageItem: {
    height: 36,
    minWidth: 36,
    paddingHorizontal: 6,
    borderColor: BRAND_GREEN,
    borderWidth: 1,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  pageItemSelected: {
    backgroundColor: BRAND_GREEN,
  },
  pageText: {
    color: BRAND_GREEN,
    fontSize: 14,
    fontWeight: '600',
  },
  pageTextSelected: {
    color: '#fff',
  },
  ellipsisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  ellipsis: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: BRAND_GREEN,
    marginHorizontal: 1.5,
  },
});
