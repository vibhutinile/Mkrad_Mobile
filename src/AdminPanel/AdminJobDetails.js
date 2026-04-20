import React from 'react';
import { Linking, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './Jobdetails_styles'

let start_time = ''
let end_time = ''
let addres_line_1 = ''
let phone_number = ''
let customer_name = ''
let service_name = ''

class AdminJobDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [
                { Job_request: 'lawn maintenance', Job_Location: '142 Victoria Court, Fort Kent, ME, Maine-04743', time_slot: '09:30 AM to 10:30 AM', customer_name: 'Jerry Paul' },
            ],

        }
    }

    Separator = () => (
        <View style={styles.separator} />
    );
    OnbackClick = (props) => {
        this.props.navigation.goBack()

    }

    dialCall = (phone) => {
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:';
            phoneNumber = phoneNumber + phone;
        }
        else {
            phoneNumber = 'telprompt:';
            phoneNumber = phoneNumber + phone;

        }
        Linking.openURL(phoneNumber);
    };

    render() {

        start_time = this.props.route.params.start_time;
        end_time = this.props.route.params.end_time;
        addres_line_1 = this.props.route.params.addres_line_1;
        phone_number = this.props.route.params.phone_number;
        customer_name = this.props.route.params.customer_name;
        service_name = this.props.route.params.service_name;
        return (


            <View style={{ flex: 1 }}>
                <View style={styles.CradContainer}>
                    <TouchableOpacity
                        onPress={this.OnbackClick} style={styles.BackContainer} >
                        <Image source={require('../images/back.png')} />
                    </TouchableOpacity>

                    <View style={{ alignSelf: 'center', marginTop: 18, marginLeft: 15 }}>
                        <Text style={{ fontSize: 18, fontStyle: 'italic', fontWeight: 'bold', color: '#898989' }}>Job detail</Text>
                    </View>
                </View>


                <View style={{ flex: 4 }}>
                    <View style={styles.JobItemContainer}>

                        <View style={{ flexDirection: 'row' ,marginTop:"5%"}}>
                            {/* <Image style={styles.ImageContainer} source={require('../images/backgroundImage.png')} /> */}
                            <Text style={styles.TextContainer_4}> {customer_name} </Text>

                        </View>
                        <this.Separator />
                        <Text style={styles.TextContainer_5}> Scheduled service</Text>
                        <Text style={styles.TextContainer_6}> {service_name}</Text>
                        <TouchableOpacity  onPress={()=>this.dialCall(phone_number)}
                        style={{ position: 'absolute', right: "10%", top: "35%", }} >
                            <Text style={styles.TextContainer_7}>{"call:" + phone_number}</Text>
                        </TouchableOpacity>
                        <this.Separator />

                        <Text style={styles.TextContainer_5}> Scheduled Time</Text>
                        <Text style={styles.TextContainer_6}> {start_time + " to " + end_time}</Text>

                        <this.Separator />
                        <Text style={styles.TextContainer_11}>Address </Text>
                        <Text style={styles.TextContainer_12}> {addres_line_1}</Text>
                     
                    </View>

                </View>





            </View>

        )
    }
}




export default AdminJobDetails;