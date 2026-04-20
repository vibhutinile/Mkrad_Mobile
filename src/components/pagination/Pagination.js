import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ITEMS_PER_PAGE = 10;

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    // Replace the URL with your API endpoint
    const apiUrl = `https://your-api-endpoint.com/data?page=${currentPage}&limit=${ITEMS_PER_PAGE}`;

    try {
      const response = await fetch(apiUrl);
      const result = await response.json();

      setData(result.data); // Adjust based on your API response structure
      setTotalPages(Math.ceil(result.totalItems / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItem = (pageNumber) => (
    <TouchableOpacity
      key={pageNumber}
      style={[styles.paginationItem, currentPage === pageNumber && styles.activePaginationItem]}
      onPress={() => handlePageChange(pageNumber)}
    >
      <Text>{pageNumber}</Text>
    </TouchableOpacity>
  );

  const renderPagination = () => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    if (totalPages <= 5) {
      return pageNumbers.map((pageNumber) => renderPaginationItem(pageNumber));
    }

    const visiblePages = pageNumbers.slice(
      Math.max(currentPage - 2, 0),
      Math.min(currentPage + 3, totalPages)
    );

    return (
      <>
        {renderPaginationItem(1)}
        {currentPage > 3 && <Text style={styles.ellipsis}>...</Text>}
        {visiblePages.map((pageNumber) => renderPaginationItem(pageNumber))}
        {currentPage < totalPages - 2 && <Text style={styles.ellipsis}>...</Text>}
        {renderPaginationItem(totalPages)}
      </>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.paginationItem, styles.prevNextButton]}
          onPress={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <Text>Previous</Text>
        </TouchableOpacity>
        {renderPagination()}
        <TouchableOpacity
          style={[styles.paginationItem, styles.prevNextButton]}
          onPress={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#f9c2ff',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationItem: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  activePaginationItem: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
  },
  prevNextButton: {
    width: 80,
    alignItems: 'center',
  },
  ellipsis: {
    padding: 10,
  },
});

export default App;
