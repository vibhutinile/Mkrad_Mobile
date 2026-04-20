
import * as React from 'react';
import { View, Text,TouchableOpacity,Image,StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider'
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '././styles';




const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    backgroundColor: '#3AB34A',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    backgroundColor: '#3AB34A',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    backgroundColor: '#3AB34A',
  }
];

function HomeScreen(props) {
const  [showRealApp , setReatlApp] =  React.useState(false)

  const _renderItem = ({ item }) => {
  return (
    <View style={styles.MainContainer}>
    <Image source={item.image} />
    <Text style={styles.textView}>{item.title}</Text>
    <Text >{item.text}</Text>
  </View>
    );
  }
 
  const  _onSkip = () => {
    
    //setReatlApp(true);  
    props.navigation.navigate('LoginScreen')
    
  }
 const _onDone = () => {
    setReatlApp(true);   
    props.navigation.navigate('LoginScreen')
    
  }


  
  return (
    <SafeAreaView style = {{flex : 1,backgroundColor:'white'}}>
    <View style = {{height : "80%"}}>
    <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone}  showSkipButton={true} onSkip={_onSkip} />
    </View>
    <View style ={{alignSelf : "center",paddingTop: "5%"}}>
    <Image source={require('./../../images/mkrad.png')}
            style={{ height: 100, width: 100, resizeMode : "contain" }}
          />
    </View>

    
     </SafeAreaView>

     
  );
}


export default HomeScreen