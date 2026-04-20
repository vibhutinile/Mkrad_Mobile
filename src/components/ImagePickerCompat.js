/**
 * Compatibility shim that adapts the legacy `react-native-image-picker@2`
 * `showImagePicker(options, callback)` API to v8's `launchImageLibrary` /
 * `launchCamera` promise-based API. The legacy callback receives a response
 * object with `didCancel`, `error`, `uri`, `data` (base64), `fileName`, `type`.
 */
import {Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const mapAsset = (asset) => ({
  uri: asset.uri,
  data: asset.base64,
  fileName: asset.fileName,
  type: asset.type,
  fileSize: asset.fileSize,
  width: asset.width,
  height: asset.height,
});

const run = async (invoke, options, callback) => {
  try {
    const result = await invoke({
      mediaType: 'photo',
      quality: options?.quality ?? 0.7,
      includeBase64: options?.includeBase64 ?? true,
      maxWidth: options?.maxWidth,
      maxHeight: options?.maxHeight,
      selectionLimit: 1,
    });
    if (result.didCancel) {
      callback({didCancel: true});
      return;
    }
    if (result.errorCode || result.errorMessage) {
      callback({error: result.errorMessage || result.errorCode});
      return;
    }
    const asset = result.assets && result.assets[0];
    if (!asset) {
      callback({didCancel: true});
      return;
    }
    callback(mapAsset(asset));
  } catch (err) {
    callback({error: err?.message || String(err)});
  }
};

const showImagePicker = (options, callback) => {
  Alert.alert(
    options?.title || 'Select Image',
    null,
    [
      {
        text: options?.takePhotoButtonTitle || 'Take Photo',
        onPress: () => run(launchCamera, options, callback),
      },
      {
        text: options?.chooseFromLibraryButtonTitle || 'Choose from Library',
        onPress: () => run(launchImageLibrary, options, callback),
      },
      {
        text: options?.cancelButtonTitle || 'Cancel',
        style: 'cancel',
        onPress: () => callback({didCancel: true}),
      },
    ],
    {cancelable: true},
  );
};

export default {showImagePicker, launchCamera, launchImageLibrary};
