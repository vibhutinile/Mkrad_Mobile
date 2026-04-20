import React from 'react';
import {
    View, Text, TouchableOpacity,
    createDrawerNavigator, TextInput, Button, Image, StyleSheet, SafeAreaView
} from 'react-native'

let startDate;
class TimeScreen extends React.Component {
    constructor() {
        super()

    }

    render() {
     
        return (
            <View >

<form className={classes.container} noValidate>
  <TextField
    id="time"
    label="Alarm clock"
    type="time"
    defaultValue="07:30"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
  />
</form>
             
                    </View>
                  




        )     

            
    }
}

const styles = StyleSheet.create({



})




export default TimeScreen


