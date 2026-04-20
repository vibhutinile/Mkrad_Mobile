import React, { useState } from 'react';
import {
    View, TextInput, Image, StyleSheet,
    Text,
    Keyboard,
    TouchableOpacity,Alert

} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-shadow-cards';
import ImagePicker from '../../components/ImagePickerCompat';
import { ScrollView } from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'





class SignUpPage extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            userEmail: '',
            userPassword: '',
        }
    }

    OnbackClick = () => {
        this.props.navigation.goBack();
    }

    handleSubmitPress = () => {
        // userName: '',
        // userEmail: '',
        // userPassword: '',


        if(this.state.userName == ''){
            Alert.alert('Please enter username.')
        }else if(this.state.userEmail == ''){
            Alert.alert('Please enter Email.')
        }else if(this.state.userPassword == ''){
            Alert.alert('Please enter password.')
        }else {
            Alert.alert(  
                '',  
                'Please wait for admin approval, After that you will be able to login.',  
                [    
                    {text: 'OK', onPress: () =>  this.props.navigation.goBack()},  
                ],  
                {cancelable: false}  
            )      
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: .3, backgroundColor: '#E8E8E8', flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={.5} onPress={this.OnbackClick} style={{
                        height: 30, marginLeft: "5%", marginTop: "4%", justifyContent: 'center', alignSelf: 'center'
                    }} >
                        <Image source={require('./../../images/back.png')} />
                    </TouchableOpacity>

                    <Image style={{
                        width: "30%", height: "42%",
                        alignSelf: "center", backgroundColor: '#f4f4f4f', marginTop: "4%", justifyContent: 'center', position: 'absolute', left: "35%",resizeMode:'contain'

                    }} source={require('./../../images/logo.png')} />
                </View>

                <KeyboardAwareScrollView style={{ flex: 2 }}>
                    <Card style={styles.CradContainer}>
                        <View style={styles.SectionStyle}>
                            <Image style={{ marginLeft: 10, alignSelf: 'center' }} source={require('../../images/name.png')}></Image>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(userName) => this.setState({ userName })}
                                underlineColorAndroid="#F6F6F7"
                                placeholder="Name"
                                placeholderTextColor="#000"
                                keyboardType='default'
                                autoCorrect={false}
                                spellCheck={false}
                                onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle2}>
                            <Image style={{ marginLeft: 10, alignSelf: 'center' }} source={require('../../images/email.png')}></Image>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(userEmail) => this.setState({ userEmail })}
                                underlineColorAndroid="#FFFFFF"
                                placeholder="Email ID" //12345
                                placeholderTextColor="#000"
                                keyboardType="email-address"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                
                            />
                        </View>
                        <View style={styles.SectionStyle2}>
                            <Image style={{ marginLeft: 10, alignSelf: 'center', height: 25, width: 25 }} source={require('../../images/password.png')}></Image>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(userPassword) => this.setState({ userPassword })}
                                underlineColorAndroid="#FFFFFF"
                                placeholder="Enter Password" //12345
                                placeholderTextColor="#000"
                                keyboardType="default"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true} />
                        </View>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={this.handleSubmitPress}>
                            <Text style={styles.buttonTextStyle}>Submit</Text>
                        </TouchableOpacity>
                    </Card>


                </KeyboardAwareScrollView>
            </SafeAreaView>

        );

    }

}

const styles = StyleSheet.create({

    CradContainer: {
        marginTop: 110,
        marginLeft: 30,
        marginRight: 30,
        shadowRadius: 10,
        borderRadius: 20,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 2,
        marginBottom: "5%"

    }, SectionStyle: {

        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#379134',
        width: "80%",
    },

    SectionStyle2: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#379134',
        width: "80%",
    },



    buttonStyle: {
        backgroundColor: '#3AB34A',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#222441',
        height: 50,
        width: 200,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        alignSelf: 'center',
        marginBottom: "20%",
        marginTop: "20%",
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 12,
        fontSize: 16,
        fontWeight:'bold'

    },
    inputStyle: {
        marginLeft: "5%",
        alignSelf: 'center',
        flex:1,
        padding:10
    },

    inputStyle2: {
        marginLeft: "5%",
        alignSelf: 'center'
    },

    inputStyle3: {
        flex: 1,
        color: '#379134',
        textDecorationLine: 'underline',
        fontStyle: 'italic',
        fontSize: 16,
        fontWeight: 'bold'

    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    }
})

export default SignUpPage