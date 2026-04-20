import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({



    CradContainer: {
        flex: .9,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowRadius: 30,
        borderWidth: 0,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 5,

    },
    MenuContainer: {
        marginLeft: 20,
        marginTop: 70,
        width: 30,
        height: 30,


    },
    BackContainer: {
        width: "10%",
        height: "10%",
        marginLeft: "5%",
        marginTop: "17%",

    },
    
    NotificationContainer: {

        width: "12%",
        height: "15%",
        marginTop: "8%",
        alignSelf: 'center',
        borderRadius: 25,
        borderColor: '#3AB34A',
        borderWidth: 1,
        alignItems: 'center',
    },

    DateContainer: {
        marginTop: "24%",
        fontSize:18,
        fontWeight:'bold',
        color:'#898989',
     marginLeft:"5%"
       
    },
    MkradContainer: {
        width: "30%",
        height: "42%",
        marginTop: "12%",
        marginLeft: "37%",
       

    },
    DateContainer: {
        marginTop: "20%",
        fontSize:18,
        fontWeight:'bold',
        color:'#898989',
      marginLeft:"5%"
       
    },

    RectangleContainer: {
        width: 200,
        height: 50,
       
        backgroundColor: '#3AB34A',
        alignSelf: 'center',
        borderRadius: 14,
        borderColor: '#ddd',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 5,
        shadowRadius: 10,
        alignItems: 'center',
        marginLeft: "5%",
        position:'absolute',
        bottom:"-13%"
       

    },

    NotificationConrainer: {
        marginTop: "95%",
        marginRight: "8%"
    },
    Bottombar: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        marginTop: "13%",
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 43,
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 32,
        padding: 7
    },


    JobItemContainer: {
        width: "90%",
        marginTop: "2%",
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 14,
        borderColor: '#ddd',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        shadowRadius: 5,
        marginBottom: 10,
    },
   

    SearchContainer: {
        width: 350,
        height: 50,
        marginTop: "5%",
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 25,
        borderColor: '#ddd',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        shadowRadius: 5,
        flexDirection: 'row',
        marginBottom:20

    },
  
    addCustomer:{
        width:'40%',
        height:40,
        marginLeft:'55%',
        marginTop:'5%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#3AB34A',
        flexDirection:'row',
        borderRadius:10,
   
       },

})
export default styles