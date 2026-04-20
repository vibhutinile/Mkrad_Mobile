import React from 'react';
import {
  Picker,
  Alert,
  Button,
  CheckBox,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import styles from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
class CreateNewJob extends React.Component {
  constructor({navigation}) {
    super({navigation});
    this.state = {
      isDatePickerVisible: false,
    };
  }

  OnbackClick = (props) => {
    this.props.navigation.goBack();
  };

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleConfirm = (date) => {
    this.hideDatePicker();
  };

  render() {
    const {search} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.CradContainer}>
          <TouchableOpacity
            onPress={this.OnbackClick}
            style={styles.BackContainer}>
            <Image source={require('../../../images/back.png')} />
          </TouchableOpacity>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.NotificationContainer}>
              <Text
                style={{
                  fontSize: 16,
                  fontStyle: 'italic',
                  fontWeight: 'normal',
                  color: '#3AB34A',
                  marginBottom: 8,
                }}>
                06
              </Text>
            </View>
            <Text style={styles.DateContainer}>Create new Job schedule</Text>
          </View>
        </View>
        <View style={{flex: 5, alignItems: 'center', marginTop: 30}}>
          <Button title="Show Date Picker" onPress={this.showDatePicker} />
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            onConfirm={this.handleConfirm}
            onCancel={this.hideDatePicker}
            dayPlaceholder="select datevchchchhcvbb"
          />
        </View>
      </View>
    );
  }
}

export default CreateNewJob;
