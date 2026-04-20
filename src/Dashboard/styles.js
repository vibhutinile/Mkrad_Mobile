import { StyleSheet } from 'react-native';


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
    alignItems: 'center',
    justifyContent: 'center'
  },
  MenuContainer: {
    marginLeft: 20,
    marginTop: 70,
    width: 30,
    height: 30,


  },
  MkradContainer: {
    width: "22%", height: 250, alignSelf: 'center', resizeMode: 'contain'
  },

  RectangleContainer: {
    width: "55%",
    height: "25%",
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
    position: 'absolute',
    bottom: "-13%",
    left: "25%"

  },

  Bottombar: {
    width: 40,
    height: 40,
    marginTop: "13%",
    marginBottom: 43,
    alignItems: 'center',
    marginHorizontal: "11.5%"
  },


  JobItemContainer: {
    width: "78%",
    height: "18%",
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  JobItemContainer2: {
    width: "78%",
    height: "8%",
    marginTop: "5%",
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
    alignItems: 'center',
    flexDirection: 'row'

  },

  NotificationContainer: {

    width: "10%",
    height: "29%",

    alignSelf: 'center',
    borderRadius: 25,
    borderColor: '#3AB34A',
    borderWidth: 2,
    alignItems: 'center',
    marginLeft: "5%"
  },
})


export default styles;









