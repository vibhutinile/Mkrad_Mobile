/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {

  StyleSheet,
  Text,
  View,
  Image, Button, Alert

} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppIntroSlider from 'react-native-app-intro-slider';



class App extends React.Component {

  constructor() {
    super();
    this.state = {
      
      isVisible: true,
      showRealApp: false
    }

  }

  Hide_SplashScreen = () => {

    this.setState({
      isVisible: false
    });
  }

  componentDidMount() {
    var that = this;
    setTimeout(function () {
      that.Hide_SplashScreen();
    }, 5000);
  }


  _renderItem = ({ item }) => {
    return (
      <View style={styles.MainContainer}>
        <Image source={item.image} />
        <Text style={styles.textView}>{item.title}</Text>
        <Text >{item.text}</Text>
      </View>
    );
  }

  onSkip = () => {
    this.setState({ showRealApp: true });
  };
  _onDone = () => {
    this.setState({ showRealApp: true });
  }

  render() {

    let SplashScreen = (
      <View style={styles.SplashScreen}>
        <View style={styles.SplashScreen_ChildView}>
          <Image source={require('./src/images/mkrad.png')}
            style={{ height: 130, width: 180 }}
          />
        </View>
      </View>
    )



    // return (

      {
        if (this.state.showRealApp) {

                  
        {
          (this.state.isVisible === true) ? SplashScreen : null
        }
          return <App />;
        } else {
          return <AppIntroSlider 
          renderItem={this._renderItem} data={slides} onDone={this._onDone} showSkipButton={true} onSkip={this._onSkip} />;
        
      }
      }
      // <View style={{ flex: 1 }} >

     
      //   {/* <View style={styles.MainContainer}>
      //     <Text style={styles.textView}>Image/ Vector</Text>
      //     <Text style={styles.textView}>Imagebghjdkjgjdghjdghjdeghghjdghjghjdeghjdeghjdeghjghdghjdghdghdghghd
      //     sqwuyghjdyghgdeyggy</Text>


      //     <View >
      //       <Text style={styles.textView2} onPress={() => Alert.alert(
      //         'Its GeeksforGeeks !')}  >  Skip </Text></View>

      //     <View>
      //       <Text style={styles.textView3} onPress={() => Alert.alert(
      //         'Its GeeksforGeeks !')}>Next </Text>
      //     </View>

      //   </View>
      //   <View style={styles.SplashScreen_ChildView}>
      //     <Image source={require('./src/images/mkrad.png')}
      //       style={{ height: 100, width: 140 }}
      //     />
      //   </View> */}


        
      //   {
      //     (this.state.isVisible === true) ? SplashScreen : null
      //   }

      // </View>

    //);



  }


}



const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    Image:require('./src/images/mkrad.png'),
    backgroundColor: '#3AB34A',
  
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    Image:require('./src/images/mkrad.png'),
    backgroundColor: '#3AB34A',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    
    backgroundColor: '#3AB34A',
  }
];


const styles = StyleSheet.create(
  {
    MainContainer: {
      flex: 1,
      backgroundColor: '#3AB34A',
      margin: 10,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom: 200,

    },

    SplashScreen_ChildView:
    {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      flex: 1,
    },
    SplashScreen:
    {
      justifyContent: 'center',
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
    },

    textView: {


      fontSize: 20,
      marginTop: 140,
      alignItems: "center",
      justifyContent: 'center',
      textAlign: "center",
      color: '#fff',
      fontStyle: 'italic'

    },

    textView2: {
      color: '#fff',
      fontStyle: 'italic',
      fontSize: 20,
      top: 95,
      marginLeft: 10,
      fontWeight: 'bold',



    },
    textView3: {
      color: '#fff',
      fontStyle: 'italic',
      fontSize: 20,
      bottom: 50,
      textAlign: 'right',
      marginRight: 10,
      fontWeight: 'bold',
      marginBottom:60

    },

  }

)

export default App;
