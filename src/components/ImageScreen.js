import React, {useState} from 'react';
import {
  Modal,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';

const LargeImageModal = ({setModalVisible, imageUrl}) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={styles.modalContainer}>
          <Image source={{uri: imageUrl}} style={styles.fullImage} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default LargeImageModal;
