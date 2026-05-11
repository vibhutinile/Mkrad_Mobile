import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({



  CradContainer: {
    flex: 2,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 28,
  },
  NotificationButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  NotificationIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  MenuContainer: {
    marginLeft: 20,
    marginTop: 70,
    width: 30,
    height: 30,


  },
  MkradContainer: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 8,
  },

  RectangleContainer: {
    width: '50%',
    height: 44,
    backgroundColor: '#3AB34A',
    alignSelf: 'center',
    borderRadius: 22,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -22,
    alignSelf: 'center',
  },

  Bottombar: {
    flex: 1,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },


  JobItemContainer: {
    width: '86%',
    height: 80,
    marginTop: 18,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },

  JobItemTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#898989',
    flex: 1,
    textAlign: 'center',
  },

  JobItemArrow: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
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









