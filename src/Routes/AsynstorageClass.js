import AsyncStorage from '@react-native-async-storage/async-storage';

const setAsyncStorage = async (key, item) => {
  try {
    await AsyncStorage.setItem(key, item);
  } catch (error) {}
};

const getAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const clearAsyncStorage = async () => {
  try {
    AsyncStorage.clear();
  } catch (error) {}
};

export {setAsyncStorage, getAsyncStorage, clearAsyncStorage};
