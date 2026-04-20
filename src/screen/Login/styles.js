import {StyleSheet} from 'react-native'


const styles = StyleSheet.create(
    {
  
      container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
        flexDirection:'column'
  
      },
      separator: {
        marginVertical: 5,
        borderBottomColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      LoginButtonStyle: {
        alignContent: "center",
        backgroundColor: '#3AB34A',
        borderRadius:30,
        borderWidth: 3,
        borderColor: '#fff',
        height:"20%",
        marginTop:"2%",
        height:"35%",
        alignSelf:'center',
        width:'60%',
        alignItems:'center',justifyContent:'center'
       
      },

      LoginButtonStyle_2: {
        alignContent: "center",
        backgroundColor: '#609E79',
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#fff',
        width:300,
        height:"15%",
       marginTop:"1%"
      },
  
      SignupButtonStyle: {
        width:250,
        backgroundColor: '#222441',
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#fff',
        height:"45%",

      },
  
      AdminButtonStyle: {
        resizeMode:'contain',
        backgroundColor:'#E8E8E8',
        flex:.5,
        marginBottom:"8%",
        height:"5%",
      
      },

      AdminButtonStyle2: {
        resizeMode:'contain',
        backgroundColor:'#E8E8E8',
        height:"30%",
        marginTop:'30%',
        alignItems:'center',justifyContent:'center'
      
      },
      TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 22,
        marginTop:"3%",
        fontWeight:'bold',
        fontStyle: 'italic',
      },
      TextStyle2: {
        color: '#fff',
        fontSize:18,
        alignSelf:'center',
        fontWeight:'bold',
      },
      TextStyle3: {
        color: '#000',
        fontSize:18,
        alignSelf:'center',
        fontWeight:'bold',
        marginTop:'5%'
      },
      TextStyle4: {
        color: '#3AB34A',
        textAlign: 'center',
        fontSize: 22,
        fontWeight:'bold',
        alignSelf:'center',
        justifyContent:'center'
      },

    }
  )
  export default styles 