
import {StyleSheet} from 'react-native'
const styles = StyleSheet.create(
    {
      MainContainer: {
        flex: 1,
        margin:10,
        backgroundColor: '#3AB34A',
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
  
    }}
)
  


export default styles