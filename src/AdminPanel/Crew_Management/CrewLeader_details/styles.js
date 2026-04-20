import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({

    CradContainer: {
        flex: .3,
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
    separator: {

        height: 1.5,
        backgroundColor: '#EAEAEA',
        marginTop: "3%",
       

    },
   
    BackContainer: {
        width: "20%",
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
        fontStyle:'italic',marginLeft:"5%"
       
    },
    JobItemContainer: {

        width: 350,
        height:300,
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
        marginBottom: 10,
        
    },
   

   

})
export default styles