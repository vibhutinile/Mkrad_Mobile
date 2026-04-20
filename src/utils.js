import {PermissionsAndroid, Platform} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import Toast from 'react-native-simple-toast';
export const checkPermission = async (pdfUrl) => {
  if (Platform.OS === 'ios') {
    //  downloadFile(pdfUrl);
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'Application needs access to your storage to download File',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile(pdfUrl);
      } else {
        Toast.show(`Storage Permission Not Granted`, Toast.SHORT);
      }
    } catch (err) {
      // To handle permission related exception
      console.error('ERROR' + err);
    }
  }
};

//function : service function
const downloadFile = async (pdfUrl) => {
  let DownloadDir =
    Platform.OS == 'ios'
      ? RNFetchBlob.fs.dirs.DocumentDir
      : RNFetchBlob.fs.dirs.DownloadDir;
  const {dirs} = RNFetchBlob.fs;
  const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
  const configfb = {
    fileCache: true,
    useDownloadManager: true,
    notification: true,
    mediaScannable: true,
    title: 'Mkard',
    path: `${dirToSave}.pdf`,
  };
  const configOptions = Platform.select({
    ios: {
      fileCache: configfb.fileCache,
      title: configfb.title,
      path: configfb.path,
      appendExt: 'pdf',
    },
    android: configfb,
  });
  Platform.OS == 'android'
    ? RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${DownloadDir}/.pdf`,
          description: 'Cosmologo',
          title: `document.pdf`,
          mime: 'application/pdf',
          mediaScannable: true,
        },
      })
        .fetch('GET', `${pdfUrl}`)
        .catch((error) => {})
    : RNFetchBlob.config(configOptions)
        .fetch('GET', `${pdfUrl}`, {})
        .then((res) => {
          if (Platform.OS === 'ios') {
            RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
            RNFetchBlob.ios.previewDocument(configfb.path);
          }
        })
        .catch((e) => {
          console.error('The file saved to ERROR', e.message);
        });

  Toast.show('Successfully Downloaded');
};
