import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  CradContainer: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  BackContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  NotificationContainer: {
    width: '12%',
    height: '16%',
    marginTop: '5%',
    alignSelf: 'center',
    borderRadius: 25,
    borderColor: '#3AB34A',
    borderWidth: 2,
    alignItems: 'center',
  },
  ItemContainer: {
    marginTop: '10%',
    marginLeft: '5%',
  },

  JobItemContainer: {
    width: '92%',
    marginTop: 16,
    marginBottom: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 14,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  TextContainer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10265C',
  },
  ImageContainer: {
    width: 50,
    height: 50,
    marginTop: '5%',
    marginLeft: '5%',
  },

  TextContainer2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7E7C7C',
    marginHorizontal: '10%',
  },

  TextContainer3: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3AB34A',
    marginHorizontal: '10%',
    alignSelf: 'center',
  },

  TextContainer_4: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  TextContainer_5: {
    fontWeight: 'bold',
    fontSize: 12,
    // marginTop: "2%",
    color: '#898989',
  },
  RectangleContainer_3: {
    width: '70%',
    marginTop: 10,
    borderColor: '#3AB34A',
    borderWidth: 2,
    alignItems: 'center',
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  TextContainer_6: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#000',
  },

  TextNote: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#000',
  },

  TextContainer_7: {
    fontWeight: 'bold',
    fontSize: 12,
    // color: '#000',
    color: '#3AB34A',
    textDecorationLine: 'underline',
  },

  TextContainer_8: {
    marginLeft: '80%',
  },

  TextContainer_9: {
    borderRadius: 22,
    backgroundColor: '#3AB34A',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginHorizontal: 6,
    marginBottom: 10,
  },
  TextContainer_10: {
    fontWeight: 'normal',
    fontSize: 14,
    color: '#fff',
  },
  BulletPint: {
    width: 8,
    height: 8,
    marginTop: '2%',
    borderRadius: 8 / 2,
    borderColor: '#ED716C',
    borderWidth: 2,
    backgroundColor: '#ED716C',
    marginLeft: 5,
    marginRight: 10,
    flexWrap: 'wrap',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#EAEAEA',
    marginTop: '0%',
    marginBottom: 10,
  },

  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 15,
  },

  SectionStyle2: {
    flexDirection: 'row',
    height: 40,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 15,
  },

  buttonStyle: {
    backgroundColor: '#222441',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#222441',
    height: 50,
    width: 200,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 90,
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
    fontWeight: 'bold',
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

  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pdfcontainer: {
    paddingHorizontal: 20,
    marginLeft: 20,
    bottom: 10,
    borderRadius: 10,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3AB34A',
  },
  pdfText: {
    color: '#fff',
    fontSize: 14,
    fontWeight:'normal'
  },
});

export default styles;
