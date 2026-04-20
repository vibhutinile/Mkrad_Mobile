import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LargeImageModal from '../ImageScreen';

const GallaryImages = ({images, baseUlr}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');
  const renderImageItem = ({item}) => (
    <ImageItem
      baseUlr={baseUlr}
      image={item}
      onPress={() => {
        setModalVisible(true);
        setSelectedImg(item);
      }}
    />
  );

  return (
    <>
      <View style={{flex: 1}}>
        <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          // numColumns={3}
          renderItem={renderImageItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {modalVisible && (
        <LargeImageModal
          setModalVisible={setModalVisible}
          imageUrl={`${baseUlr}/${selectedImg?.url}`}
        />
      )}
    </>
  );
};

export default GallaryImages;
const ImageItem = ({baseUlr, image, props, onPress}) => {
  let navigation = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{uri: `${baseUlr}/${image?.url}`}} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f2f0eb',
    marginTop: 10,

    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80, // adjust the height as needed
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
