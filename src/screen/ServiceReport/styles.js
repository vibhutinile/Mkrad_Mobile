import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({



    CradContainer: {
        flex: 2,
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
    MkradContainer: {
        width: "24%",
        height: "45%",
        marginTop: "12%",
        marginLeft: "37%",
       

    },

    RectangleContainer: {
        width: 200,
        height: 45, 
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
        marginLeft: "5%",
        position:'absolute',
        bottom:"-11%",
       alignItems:'center',
       justifyContent:'center',
      right:"23%"
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

    SearchContainer: {
        width: 350,
        height: 50,
        marginTop: "10%",
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 25,
        borderColor: '#ddd',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 5,
        shadowRadius: 10,
        flexDirection: 'row',

    },

})
export default styles