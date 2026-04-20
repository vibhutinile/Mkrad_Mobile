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

    JobNotes: {

        width: 350,
        height: 130,
        marginTop: "6%",
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 14,
        borderColor: '#3AB34A',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 5,
        shadowRadius: 10,
        marginBottom: 10,
        borderWidth:1
    },



    PauseJobNotes: {

        width: 300,
        height: 130,
        marginTop:"5%",
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 14,
        borderColor: '#3AB34A',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 5,
        shadowRadius: 10,
        borderWidth:1
    },

    TextContainer: {
        position: 'absolute',
        right: "2%",
        bottom: "-18%",
       
        fontSize: 12
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
    },

   

    TextContainer3: {
        fontSize: 22,
        fontWeight: "bold",
        color: '#3AB34A',
        marginHorizontal: "10%",
        alignSelf: 'center'

    },

    TextContainer_4: {
        fontSize: 18,
        marginTop: "0%",
        alignSelf: 'center',
        color: '#000',
        fontWeight:'bold'
    },
    TextContainer_5: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: "0%",
        color: '#898989',
        marginRight: 20
    },

    service: {
        fontSize: 10,
        marginTop: "0%",
        color: '#000',
        marginRight: 20,
        marginBottom:10
    },
    TextContainer_6: {
        fontWeight: 'normal',
        fontSize: 12,
        marginTop: "0%",
        color: '#000'
    },

    call: {
        fontWeight: 'normal',
        fontSize: 12,
        marginTop: "0%",
        color: '#000',
        marginBottom:15
    },
    LocationContainer: {
        fontWeight: 'normal',
        fontSize: 12,
        marginTop: "-9%",
        marginLeft: "5%",
       
        color: '#000',
        marginRight: 6

    },
    TextContainer_11: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: "0%",
        marginLeft: "12%",
       
        color: '#898989',

    },

    TextContainer_12: {
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: "0%",
        marginLeft: "11%",
       
        color: '#000',

    },

    TextContainer_13: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 35,
       
        color: '#000',
        alignSelf: 'center',
       

    },

    TextContainer_7: {
        fontWeight: 'bold',
        fontSize: 14,
       
        color: '#3AB34A',
    },

    TextContainer_8: {
        position: 'absolute',
        right: "-20%",

    },

    TextContainer_9: {

        position: 'absolute',
        right: "8%",
        bottom: "29%",
        alignItems: 'center',
        flexDirection:'row'
    },
    TextContainer_10: {
        fontWeight: 'bold',
        fontSize: 14,
       
        color: '#000',
        marginTop: "8%"
    }

    , separator: {

        height: 0.5,
        backgroundColor: '#EAEAEA',
        marginTop: "4%",
        marginBottom: 10


    },



    JonMarked_Completed: {

        backgroundColor: '#3AB34A',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#222441',
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: "8%",
        alignSelf: 'center',
       paddingLeft:15,
       paddingRight:15,
       justifyContent:'center',
       paddingTop:10,
       paddingBottom:10
    },

    Pause_Job:{
        fontSize: 18,
        fontWeight: "bold",
        color: '#3AB34A',
        marginTop: "3%",
       
        marginLeft: 35,
        marginRight: 35,
        alignSelf: 'center',
        marginBottom:"5%"
       
        

    },



    JonMarked_Completed_2: {

        backgroundColor: '#3AB34A',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#222441',
        height: 50,
        width: 280,
        alignItems: 'center',
        borderRadius: 30,
        alignSelf: 'center',
        marginBottom:"5%"

    },

    
    PausejobButton: {

        backgroundColor: '#3AB34A',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#222441',
        height: 50,
        width: 280,
        alignItems: 'center',
        borderRadius: 30,
        alignSelf: 'center',
        marginTop:"15%",marginBottom:"10%"

    },

    JonMarked_Completed_Modal: {
        width: 350,
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
        marginTop:"90%"
    },


    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: '#000',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#379134',
    },

    inputStyle2: {
        flex: 1,
        color: '#379134',
        textDecorationLine: 'underline',
       
        fontSize: 16,
    },

    inputStyle3: {
        flex: 1,
        color: '#379134',
        textDecorationLine: 'underline',
       
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
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00BCD4",
        height: 300,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 80,
        marginLeft: 40,

    },
    text: {
        color: '#3f2949',
        marginTop: 10
    },
    RecatngleBox: {

        justifyContent: 'center',
        alignItems: 'center',
        height: "50%",
        width: "30%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#379134',
        marginTop: "10%",
       
        marginBottom:"10%"
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },

})


export default styles;
