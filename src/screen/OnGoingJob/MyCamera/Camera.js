import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import RNFetchBlob from 'react-native-blob-util';

const CameraScreen = (props) => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const cameraRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        await requestPermission();
      }
      setReady(true);
    })();
  }, [hasPermission, requestPermission]);

  const takePicture = async () => {
    if (!cameraRef.current) {
      return;
    }
    try {
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
      });
      const sourcePath = photo.path.startsWith('file://')
        ? photo.path
        : `file://${photo.path}`;

      // Move photo into the app's cache / DCIM-like dir so consumers that
      // expected a user-visible path still work.
      const destDir = RNFetchBlob.fs.dirs.CacheDir;
      const destPath = `${destDir}/${Date.now()}.jpg`;
      try {
        await RNFetchBlob.fs.cp(photo.path, destPath);
      } catch (e) {
        // ignore copy errors; pass through the original path
      }
      props.navigation.navigate('OnGoingJobScreen', {
        imageUrl: `file://${destPath}`,
      });
    } catch (err) {
      console.debug('takePicture error', err);
    }
  };

  if (!device || !ready || !hasPermission) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color="#fff" />
        <Text style={styles.text}>
          {!hasPermission ? 'Camera permission required' : 'Loading camera...'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, styles.shutter]}
          onPress={takePicture}>
          <Text style={styles.text}>SNAP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    height: 60,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutter: {
    backgroundColor: 'darkseagreen',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
