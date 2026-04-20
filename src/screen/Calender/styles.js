import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({



    CradContainer: {
        flex: 1.5,
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
    BackContainer: {
        width: "20%",
        height: "10%",
        marginLeft: "5%",
        marginTop: "17%",

    },
    DateContainer: {
        marginTop: "24%",
        fontSize:18,
        fontWeight:'bold',
        color:'#898989',
        fontStyle:'italic'
       
    },
    reverseBtn:{
     width:40,
     height:40,
     borderRadius:40/2,
    
     alignSelf: 'center',
    
    },

    forwordBtn:{
        width:40,
        height:40,
        borderRadius:40/2,
        alignSelf: 'center',
      

       },
   
    RectangleContainer: {
        width: 200,
        height: 50,
        marginTop: "11%",
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
        marginLeft: "5%"
    },

    NotificationConrainer: {
        marginTop: "95%",
        marginRight: "8%"
    },
   

    JobItemContainer: {

        width: 350,
        height: 150,
        marginTop: "6%",
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 14,
        borderColor: '#ddd',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 5,
        shadowRadius: 10,
        marginBottom: 10





    },
    separator: {
        marginTop: 12,
        borderBottomColor: '#000',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    tileContainer: {
        flex:1,
        height: 80,
        marginTop: "5%",
        backgroundColor: '#3AB34A',
        flexDirection: 'row',
        alignItems:'center'

    },
    tileText:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',
        fontStyle:'italic',
        alignSelf:'center',
      
      
    }

})
export default styles