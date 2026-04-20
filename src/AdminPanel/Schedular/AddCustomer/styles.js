import {Dimensions, StyleSheet} from 'react-native'
const styles = StyleSheet.create({

    CradContainer: {
        marginLeft: 30,
        marginRight: 30,
        shadowRadius: 10,
        borderRadius: 20,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 2,
        marginBottom: "5%",
        marginTop: "5%"

    },

    CradContainer3: {
        marginLeft: 30,
        marginRight: 30,
        shadowRadius: 10,
        borderRadius: 20,
        width: 300,
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 2,
        marginBottom: "5%",
        marginTop: "5%",

    },
    CradContainer2: {
        shadowRadius: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems:'center',
        height:80
    },
    BackContainer: {
        height: "20%",
        marginLeft: "5%",
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginLeft: 35,
        marginRight: 35,
        marginTop: '10%',
        marginBottom: 15
    },
    TextContainer_1: {
        marginTop: "8%",
        color: '#898989',
        marginLeft:'5%'
    },
    SectionStyle2: {
        flexDirection: 'row',
        height: 40,
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 15
    },
    searchView: {
        flexDirection: 'row',
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 15
    },
    SectionStyle3: {
        flexDirection: 'row',
        height: 40,
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 15,
        marginTop:15
    },

    RectangleContainer_6: {
        height: 45,
        borderColor: '#379134',
        borderWidth: 1,
        marginLeft: 1,
        width:'75%',
        borderRadius:3,
    },
    crememberlist: {
        height: 45,
        borderColor: '#379134',
        borderWidth: 1,
        marginLeft: 1,
        width:'75%',
        borderRadius:3,
        marginLeft:18,
        marginTop:8
      
    },
    buttonStyle: {
        backgroundColor: '#3AB34A',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#222441',
        height: 50,
        width: 200,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: '25%',
        alignSelf: 'center',
        marginBottom: "5%",
        zIndex:-99

    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 12,
        fontSize: 18,
    },
    inputStyle: {
        flex: 1,
        color: '#000',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#379134',
    },

    inputStyle2: {
        flex: 1,
        color: '#379134',
        textDecorationLine: 'underline',
        fontStyle: 'italic',
        fontSize: 16,
    },

    inputStyle3: {
        flex: 1,
        color: '#379134',
        textDecorationLine: 'underline',
        fontStyle: 'italic',
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
    JobNotes_1: {
        width:Dimensions.get('window').width * 0.60,
        height:100,
        color: '#000',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#379134',
        marginTop: 0,
        marginBottom: 15
    },
    description: {
        // fontWeight: 'bold',
        color: 'black',
        // color: '#455A64',
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
    row:{
        backgroundColor:'#faf6f0',
        // borderWidth:1
    },
    textInputContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        // top: 50,
        // width: width - 10,
        borderWidth: 0,
        marginTop:5,
    },
    textInput: {
        marginLeft: 0,
        paddingHorizontal:15,
        marginRight: 0,
        maxHeight:40,
        // height: 100,
        color: 'black',
        // color: '#455A64',
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#379134',
        borderRadius:10,
        fontWeight: '700',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.5,
        // shadowRadius: 2,
        // elevation: 2,
    },
    listView: {
        // backgroundColor: 'red',
        // backgroundColor: 'rgba(192,192,192,0.9)',
        // top: 23,
    },
      
})
export default styles;