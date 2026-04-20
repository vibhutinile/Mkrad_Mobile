import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  Keyboard,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid,
  Alert,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card} from 'react-native-shadow-cards';
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {getAsyncStorage} from '../../../Routes/AsynstorageClass';
import {
  requestGetApi,
  requestPostApiMedia,
  getstateList,
  addcustomerList,
  customer_dropdown_data,
} from '../../../NetworkCall/Service';
import {setAsyncStorage} from '../../../Routes/AsynstorageClass';
import AppLoader, {loaderRef} from '../../../Routes/AppLoader';
import {showLoader, hideLoader} from '../../../Routes/AppLoader';
import styles from './styles';
import Loader from '../../../NetworkCall/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from '../../../webapi/webapi';

let stateList = [];
let dropdownList = [];
let lead_sources = [];
let mulch_ids = [];
let services = [];
let tree_species = [];
let turf_ids = [];

class AddCustomerScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userFName: '',
      userLName: '',
      userNumber: '',
      filePath: '',
      userAddress: '',
      Email: '',
      Phonenumber: '',
      userAddress_1: '',
      userAddress_2: '',
      city: '',
      zipcode: '',
      leadSource: '',
      mulchID: '',
      turfID: '',
      services: '',
      bidPrice: '',
      notes: '',
      StateList: [],
      DropdownList: [],
      default_value: '',
      status: '',
      speciesOfTrees: [],
      Quantity: [],
      State: '',
      Lead_sources: [],
      Mulch_ids: [],
      Services: [],
      Tree_species: [],
      Turf_ids: [],
      Num_Species: 1,
      lat: '',
      lng: '',
    };
  }

  componentDidMount = async () => {
    this.getStateList();
    this.getDropdownList();
  };

  OnbackClick = () => {
    this.props.navigation.goBack(null);
  };
  async getStateList() {
    let token = await getAsyncStorage('token_key');
    const body = {};
    const {responseJson, err} = await requestGetApi(
      getstateList,
      body,
      'GET',
      token,
    );
    if (responseJson.status) {
      // stateList = responseJson.data;
      for (let i = 0; i < responseJson.data.length; i++) {
        stateList.push({
          value: responseJson.data[i].id,
          label: responseJson.data[i].name,
        });
      }
      this.setState({StateList: stateList});
    }
  }
  async getDropdownList() {
    showLoader();
    let token = await getAsyncStorage('token_key');
    const body = {};
    const {responseJson, err} = await requestGetApi(
      customer_dropdown_data,
      body,
      'GET',
      token,
    );
    hideLoader();
    if (responseJson.status) {
      hideLoader();
      lead_sources = responseJson?.data?.lead_sources?.map((el) => ({
        label: el.name,
        value: el.id,
      }));
      mulch_ids = responseJson?.data?.mulch_ids?.map((el) => ({
        label: el.name,
        value: el.id,
      }));
      services = responseJson?.data?.services?.map((el) => ({
        label: el.name,
        value: el.id,
      }));
      tree_species = responseJson?.data?.tree_species?.map((el) => ({
        label: el.name,
        value: el.id,
      }));
      turf_ids = responseJson?.data?.turf_ids?.map((el) => ({
        label: el.name,
        value: el.id,
      }));
      this.setState({Lead_sources: lead_sources});
      this.setState({Mulch_ids: mulch_ids});
      this.setState({Services: services});
      this.setState({Tree_species: tree_species});
      this.setState({Turf_ids: turf_ids});
    }
  }
  handleSubmitPress = async () => {
    if (this.state.userFName == '') {
      Alert.alert('Please enter first name.');
      return;
    }

    if (this.state.userLName == '') {
      Alert.alert('Please enter last name.');
      return;
    }
    if (this.state.Email == '') {
      Alert.alert('Please enter email.');
      return;
    }
    if (this.state.Phonenumber == '') {
      Alert.alert('Please enter phone number.');
      return;
    }
    if (this.state.userAddress_1 == '') {
      Alert.alert('Please enter address Line 1.');
      return;
    }
    if (this.state.city == '') {
      Alert.alert('Please enter city.');
      return;
    }
    if (this.state.State == '') {
      Alert.alert('Please enter state.');
      return;
    }
    if (this.state.zipcode == '') {
      Alert.alert('Please enter zip code.');
      return;
    }
    if (this.state.leadSource == '') {
      Alert.alert('Please enter lead source.');
      return;
    }
    if (this.state.bidPrice == '') {
      Alert.alert('Please enter bid.');
      return;
    }
    if (this.state.mulchID == '') {
      Alert.alert('Please enter mulch ID.');
      return;
    }
    if (this.state.turfID == '') {
      Alert.alert('Please enter turf ID.');
      return;
    }
    if (this.state.services == '') {
      Alert.alert('Please enter services.');
      return;
    }
    if (this.state.status == '') {
      Alert.alert('Please enter status.');
      return;
    }
    if (this.state.notes == '') {
      Alert.alert('Please enter notes.');
      return;
    }
    if (this.state.speciesOfTrees?.length === 0) {
      Alert.alert(`Please enter species of trees`);
      return;
    }
    if (this.state.Quantity?.length === 0) {
      Alert.alert(`Please enter Quantity`);
      return;
    }
    let indexNotFound = -1;
    let typeNotFound = '';
    for (let i = 0; i < this.state.speciesOfTrees.length; i++) {
      if (!this.state.speciesOfTrees[i]) {
        indexNotFound = i;
        typeNotFound = 'species';
        break;
      } else if (!this.state.Quantity[i]) {
        typeNotFound = 'quantity';
        indexNotFound = i;
        break;
      }
    }
    if (indexNotFound != -1) {
      Alert.alert(
        `Please enter ${
          typeNotFound == 'species' ? 'species of trees' : 'quantity'
        } for the ${indexNotFound + 1} item`,
      );
      return;
    }
    let name = this.state.userFName + ' ' + this.state.userLName;
    showLoader();
    let token = await getAsyncStorage('token_key');
    const formData = new FormData();
    // formData.append('name', name);
    formData.append('first_name', this.state.userFName);
    formData.append('last_name', this.state.userLName);
    formData.append('email', this.state.Email);
    formData.append('phone', this.state.Phonenumber);
    formData.append('address_line_1', this.state.userAddress_1);
    formData.append('lat', this.state.lat);
    formData.append('lng', this.state.lng);
    formData.append('city', this.state.city);
    formData.append('state', this.state.State);
    formData.append('zipcode', this.state.zipcode);
    formData.append('lead_source', this.state.leadSource);
    formData.append('estimate', this.state.bidPrice);
    formData.append('mulch_id', this.state.mulchID);
    formData.append('turf_id', this.state.turfID);
    formData.append('services', this.state.services);
    formData.append('status', this.state.status);
    formData.append('notes', this.state.notes);
    this.state.speciesOfTrees?.map((el, index) => {
      formData.append(`species[${index}]`, el);
    });
    this.state.Quantity?.map((el, index) => {
      formData.append(`value[${index}]`, el);
    });
    // formData.append('address_line_2', this.state.userAddress_2);
    // return

    const {responseJson, err} = await requestPostApiMedia(
      addcustomerList,
      formData,
      'POST',
      token,
    );
    hideLoader();
    if (responseJson.status == true) {
      hideLoader();
      Alert.alert('Customer added successfully.');
      this.props.navigation.navigate('NewCreateJob');
    } else {
      Alert.alert('something went wrong!');
    }
  };

  OnCustomerchangeValue(items) {
    this.setState({State: items});
  }
  changeSpecies(index) {
    this.setState({
      Num_Species:
        index === 0 ? this.state.Num_Species + 1 : this.state.Num_Species - 1,
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.CradContainer2}>
            <TouchableOpacity
              onPress={this.OnbackClick}
              style={styles.BackContainer}>
              <Image source={require('../../../images/back.png')} />
            </TouchableOpacity>

            <View style={{marginLeft: '8%'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                Add Customer
              </Text>
            </View>
          </View>

          <ScrollView style={{flex: 2}} keyboardShouldPersistTaps="handled">
            <Card style={styles.CradContainer}>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(userFName) => this.setState({userFName})}
                  underlineColorAndroid="#F6F6F7"
                  placeholder="First Name"
                  placeholderTextColor="#000"
                  keyboardType="default"
                  returnKeyType="next"
                  value={this.state.userFName}
                  onSubmitEditing={() =>
                    this.userLname && this.userLname.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.SectionStyle2}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(userLName) => this.setState({userLName})}
                  underlineColorAndroid="#F6F6F7"
                  placeholder="Last Name"
                  placeholderTextColor="#000"
                  keyboardType="default"
                  returnKeyType="next"
                  value={this.state.userLName}
                  ref={(ref) => {
                    this.userLname = ref;
                  }}
                  onSubmitEditing={() =>
                    this.useremail && this.useremail.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle2}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(Email) => this.setState({Email})}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Email" //12345
                  placeholderTextColor="#000"
                  keyboardType="default"
                  ref={(ref) => {
                    this.useremail = ref;
                  }}
                  onSubmitEditing={() => this.userNo && this.userNo.focus()}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle2}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(Phonenumber) => this.setState({Phonenumber})}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Phone" //12345
                  placeholderTextColor="#000"
                  keyboardType="number-pad"
                  maxLength={10}
                  ref={(ref) => {
                    this.userNo = ref;
                  }}
                  onSubmitEditing={() =>
                    this.address_line_1 && this.address_line_1.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.searchView}>
                <GooglePlacesAutocomplete
                  ref={(ref) => {
                    this.address_line_1 = ref;
                  }}
                  placeholder="Address Line 1"
                  textInputProps={{
                    placeholderTextColor: 'black',
                    returnKeyType: 'search',
                    multiline: true,
                    height: 55,
                  }}
                  enablePoweredByContainer={false}
                  listViewDisplayed={'auto'}
                  styles={{
                    description: styles.description,
                    predefinedPlacesDescription:
                      styles.predefinedPlacesDescription,
                    row: styles.row,
                    textInputContainer: styles.textInputContainer,
                    textInput: styles.textInput,
                    listView: styles.listView,
                  }}
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    // setShowPlacesList(false)
                    const localZipCode = details?.address_components?.find(
                      (component) => component?.types?.includes('postal_code'),
                    )?.long_name;
                    if (localZipCode) {
                      this.setState({zipcode: localZipCode});
                    }
                    this.setState({lat: details.geometry.location.lat});
                    this.setState({lng: details.geometry.location.lng});
                    this.setState({userAddress_1: data?.description});
                  }}
                  GooglePlacesDetailsQuery={{
                    fields: 'geometry,address_components,formatted_address',
                    libraries: 'places',
                    components: 'country:us', // Limit results to the United States (optional)
                  }}
                  fetchDetails={true}
                  query={{
                    key: GOOGLE_API_KEY,
                    language: 'en',
                    // components: 'country:us', // Limit results to the United States (optional)
                    // fields: 'address_components,formatted_address',
                  }}
                />
              </View>
              {/* <View style={styles.SectionStyle2}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={userAddress_1 => this.setState({ userAddress_1 })}
                                underlineColorAndroid="#FFFFFF"
                                placeholder="Address Line 1" //12345
                                placeholderTextColor="#000"
                                keyboardType='default'
                                ref={ref => {
                                    this.address_line_1 = ref;
                                }}
                                onSubmitEditing={() => this.city && this.city.focus()}
                                blurOnSubmit={false}

                            />
                        </View> */}
              {/* <View style={styles.SectionStyle2}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={userAddress_2 => this.setState({ userAddress_2 })}
                                underlineColorAndroid="#FFFFFF"
                                placeholder="Address Line 2" //12345
                                placeholderTextColor="#000"
                                keyboardType='default'
                                ref={ref => {
                                    this.address_line_2 = ref;
                                }}
                                onSubmitEditing={() => this.city && this.city.focus()}
                                blurOnSubmit={false}

                            />
                        </View> */}
              <View style={styles.SectionStyle2}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(city) => this.setState({city})}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="City" //12345
                  placeholderTextColor="#000"
                  keyboardType="default"
                  ref={(ref) => {
                    this.city = ref;
                  }}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />
              </View>

              <DropDownPicker
                items={this.state.StateList}
                searchable={true}
                key={1}
                zIndex={4}
                searchablePlaceholder="Search"
                placeholder="Select State"
                labelStyle={{color: 'black'}}
                searchablePlaceholderTextColor="gray"
                defaultValue={this.state.default_value.label}
                containerStyle={{height: 40, marginTop: '0%'}}
                style={styles.RectangleContainer_6}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                dropDownStyle={{backgroundColor: '#fff'}}
                onChangeItem={(items, index) =>
                  this.OnCustomerchangeValue(items.label, index)
                }
              />

              <View style={styles.SectionStyle3}>
                <TextInput
                  style={styles.inputStyle}
                  // value={this.state.zipcode}
                  onChangeText={(zipcode) => this.setState({zipcode})}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Zip Code" //12345
                  placeholderTextColor="#000"
                  keyboardType="number-pad"
                  maxLength={5}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />
              </View>
              <DropDownPicker
                items={this.state.Lead_sources}
                // items={[
                //     { label: 'Active', value: '1'},
                //     { label: 'Inactive', value: '2' },
                // ]}
                searchable={true}
                searchablePlaceholderTextColor="gray"
                defaultValue={this.state.default_value.label}
                zIndex={3}
                labelStyle={{color: 'black'}}
                containerStyle={{height: 40, marginTop: '0%'}}
                style={styles.RectangleContainer_6}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select Lead Source"
                dropDownStyle={{backgroundColor: '#fff'}}
                onChangeItem={(item) =>
                  this.setState({
                    leadSource: item.value,
                  })
                }
              />
              <View style={styles.SectionStyle3}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(bidPrice) => this.setState({bidPrice})}
                  underlineColorAndroid="#FFFFFF"
                  placeholder="Estimate (in $)"
                  placeholderTextColor="#000"
                  keyboardType="number-pad"
                  onSubmitEditing={() => this.notes && this.notes.focus()}
                  blurOnSubmit={false}
                />
              </View>
              <TextInput
                style={styles.JobNotes_1}
                ref={(ref) => {
                  this.notes = ref;
                }}
                multiline={true}
                numberOfLines={6}
                placeholder="Notes"
                placeholderTextColor="#000"
                spellCheck={false}
                autoCorrect={false}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                onChangeText={(notes) => this.setState({notes})}></TextInput>
              <DropDownPicker
                items={this.state.Mulch_ids}
                searchable={true}
                searchablePlaceholderTextColor="gray"
                defaultValue={this.state.default_value.label}
                zIndex={3}
                labelStyle={{color: 'black'}}
                containerStyle={{height: 40, marginTop: '0%'}}
                style={styles.RectangleContainer_6}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select Mulch ID"
                dropDownStyle={{backgroundColor: '#fff'}}
                onChangeItem={(item) =>
                  this.setState({
                    mulchID: item.value,
                  })
                }
              />
              <DropDownPicker
                items={this.state.Turf_ids}
                searchable={true}
                searchablePlaceholderTextColor="gray"
                defaultValue={this.state.default_value.label}
                zIndex={3}
                labelStyle={{color: 'black'}}
                containerStyle={{height: 40, marginTop: 15}}
                style={styles.RectangleContainer_6}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select Turf ID"
                dropDownStyle={{backgroundColor: '#fff'}}
                onChangeItem={(item) =>
                  this.setState({
                    turfID: item.value,
                  })
                }
              />
              <DropDownPicker
                items={this.state.Services}
                searchable={true}
                searchablePlaceholderTextColor="gray"
                defaultValue={this.state.default_value.label}
                zIndex={3}
                labelStyle={{color: 'black'}}
                containerStyle={{height: 40, marginTop: 15}}
                style={styles.RectangleContainer_6}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select Services"
                dropDownStyle={{backgroundColor: '#fff'}}
                onChangeItem={(item) =>
                  this.setState({
                    services: item.value,
                  })
                }
              />
              <DropDownPicker
                items={[
                  {label: 'Active', value: '1'},
                  {label: 'Inactive', value: '2'},
                ]}
                searchable={true}
                searchablePlaceholderTextColor="gray"
                defaultValue={this.state.default_value.label}
                zIndex={3}
                labelStyle={{color: 'black'}}
                containerStyle={{height: 40, marginTop: 15, marginBottom: 15}}
                style={styles.RectangleContainer_6}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select Status"
                dropDownStyle={{backgroundColor: '#fff'}}
                onChangeItem={(item) =>
                  this.setState({
                    status: item.value,
                  })
                }
              />
              {/* <View style={styles.SectionStyle3}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={notes => this.setState({ notes })}
                                underlineColorAndroid="#FFFFFF"
                                placeholder="Notes"
                                placeholderTextColor="#000"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                            />
                        </View> */}
              {[...Array(this.state.Num_Species).keys()]?.map((el, index) => (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '80%',
                      marginBottom: 15,
                    }}>
                    <DropDownPicker
                      items={this.state.Tree_species}
                      searchable={true}
                      searchablePlaceholderTextColor="gray"
                      defaultValue={this.state.default_value.label}
                      zIndex={3}
                      labelStyle={{color: 'black'}}
                      containerStyle={{height: 40, marginTop: 0}}
                      style={[
                        styles.RectangleContainer_6,
                        {width: Dimensions.get('window').width * 0.55},
                      ]}
                      itemStyle={{
                        justifyContent: 'flex-start',
                      }}
                      placeholder="Select Species Of Trees"
                      dropDownStyle={{backgroundColor: '#fff'}}
                      onChangeItem={(item) => {
                        const copy = [...this.state.speciesOfTrees];
                        copy[index] = item.value;
                        this.setState({
                          speciesOfTrees: copy,
                        });
                      }}
                    />
                    <TouchableOpacity onPress={() => this.changeSpecies(index)}>
                      <Image
                        source={
                          index === 0
                            ? require('../../../images/plus-icon.png')
                            : require('../../../images/minus-icon.png')
                        }
                        style={{height: 10, width: 10}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.SectionStyle2}>
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={(quantity) => {
                        const copy = [...this.state.Quantity];
                        copy[index] = quantity;
                        this.setState({Quantity: copy});
                      }}
                      underlineColorAndroid="#FFFFFF"
                      placeholder="Quantity" //12345
                      placeholderTextColor="#000"
                      keyboardType="number-pad"
                      onSubmitEditing={Keyboard.dismiss}
                      blurOnSubmit={false}
                    />
                  </View>
                </>
              ))}
              <View>
                <AppLoader ref={loaderRef} />
              </View>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={this.handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>Submit</Text>
              </TouchableOpacity>
            </Card>
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default AddCustomerScreen;
