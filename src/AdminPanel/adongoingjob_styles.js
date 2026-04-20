import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({

    CradContainer: {
        height: 120,
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
        width: "15%",
        height: "20%",
        marginLeft: "5%",
        marginTop: "13%",
    },

    NotificationContainer: {

        width: "12%",
        height: "20%",
        marginTop: "4%",
        alignSelf: 'center',
        borderRadius: 25,
        borderColor: '#3AB34A',
        borderWidth: 1,
        alignItems: 'center',
    },

    JobItemContainer: {
        width: 350,
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

    ImageContainer:
    {
        width: 50,
        height: 50,
        marginTop: "5%",
        marginLeft: "5%"
    },


    TextContainer_2: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#fff',
        marginTop: "4%",
        fontStyle:'italic',
        marginLeft:"5%"


    },

    
    TextContainer: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#fff',       
        fontStyle:'italic',
        marginLeft:"5%"


    },



    TextContainer3: {
        fontSize: 22,
        fontWeight: "bold",
        color: '#3AB34A',
        marginHorizontal: "10%",
        alignSelf: 'center'

    },

    TextContainer_4: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: "0%",
        marginLeft: "5%",
        alignSelf: 'center',
        fontStyle: 'italic',
        color: '#000'
    },
    TextContainer_5: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: "0%",
        marginLeft: "5%",
        fontStyle: 'italic',
        color: '#898989',
        marginRight: 20
    },

    TextContainer5: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: "0%",
        marginLeft: "5%",
        fontStyle: 'italic',
        color: '#898989',
        marginRight: 20,
        marginBottom:"5%"
    },
    TextContainer_6: {
        fontSize: 12,
        marginTop: "0%",
        marginLeft: "5%",
        fontStyle: 'italic',
        color: '#000'
    },
    LocationContainer: {
        marginTop: "-9%",
        marginLeft: "5%",
        marginRight: 6

    },
    TextContainer_11: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: "0%",
        marginLeft: "12%",
        fontStyle: 'italic',
        color: '#898989',

    },

    TextContainer_12: {
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: "0%",
        marginLeft: "11%",
        fontStyle: 'italic',
        color: '#000',

    },

    TextContainer_13: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: "10%",
        fontStyle: 'italic',
        color: '#000',
        alignSelf: 'center'

    },

    RectangleContainer_3: {
        width: "70%",
        
        marginTop: "5%",
        borderColor: '#3AB34A',
        borderRadius: 24,
        borderWidth:2,
        alignItems: 'center',
        marginLeft: "15%",   
       
    },

    RectangleContainer_5: {
        width: "70%",
        marginTop: "5%",
        borderColor: '#3AB34A',
        borderRadius: 24,
        borderWidth:2,
        alignItems: 'center',
        marginLeft: "15%",   
        flexDirection:'row',
        height:45
       
    },

    PickerContainer:{height: 35, 
        width: "90%",
        marginLeft:"5%",
      },

    TextContainer_7: {
        fontWeight: 'bold',
        fontSize: 14,
        fontStyle: 'italic',
        color: '#3AB34A',
        right: 10,

    },

    TextContainer_8: {
        position: 'absolute',
        right: "-20%",

    },

    TextContainer_9: {

        position: 'absolute',
        right: "28%",
        bottom: "29%",
        alignItems: 'center'
    },
    TextContainer_10: {
        fontWeight: 'bold',
        fontSize: 14,
        fontStyle: 'italic',
        color: '#000',
        marginTop: "8%"
    }

    , separator: {

        height: 0.5,
        backgroundColor: '#EAEAEA',
        marginTop: "4%",
        marginBottom: 10


    },
    TextJobCreate:{
        fontStyle:'italic',
        fontWeight:'bold',
        color:'#3AB34A',
        fontSize:18,
        marginLeft:"16%",
        textDecorationLine:'underline'
    },
    TextJobCreate:{
        fontStyle:'italic',
        fontWeight:'bold',
        color:'#3AB34A',
        fontSize:18,
        marginLeft:"16%",
        textDecorationLine:'underline'
    },



    JonMarked_Completed: {

        backgroundColor: '#3AB34A',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#222441',
        height: 70,
        width: 350,
        borderRadius: 15,
        marginLeft: "8%",
        marginRight: 35,
        marginTop: "8%",
        alignSelf: 'center',
       

       
        
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
    },
    JonMarked_Completed_Modal: {

        width: 350,
        height: 310,
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
        marginBottom: 10,
        position: 'absolute',
        bottom: "-1%",
        


    },

    SaveButton:{
        backgroundColor: '#3AB34A',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#222441',
        height: 50,
        width: 200,
        alignItems: 'center',
        borderRadius: 30,
        alignSelf: 'center',
        marginTop:"5%"

    },
    
    cancelJob: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#FF2F2F',
        marginTop: "5%",
        alignSelf:'center',
        fontStyle:'italic'


    },
})


export default styles;
