// import React, { useEffect } from 'react';
// import { View, StyleSheet, Image, Text } from 'react-native';
// import {
//     DrawerContentScrollView,
//     DrawerItem
// } from '@react-navigation/drawer';

// import { TouchableOpacity } from 'react-native-gesture-handler'



// export function AdminDrawerContent(props) {
//     return (
//         <View style={{ flex: 1, backgroundColor: '#fff' }}>
//             <DrawerContentScrollView {...props}>

//                 <View style={{ height: "40%", backgroundColor: '#3AB34A' }}>
//                     <View style={styles.Container}>

//                         <TouchableOpacity style={styles.ImageContainer} >
//                             <Image source={require('./../images/adminProfile.png')} />
//                         </TouchableOpacity>
//                         <Text style={{ marginTop: "5%", fontStyle: 'italic', fontWeight: 'bold', fontSize: 20, color: '#fff',marginLeft: "7%"  }}>Stephen</Text>
//                         <Text style={{ fontStyle: 'italic', fontSize: 16, color: '#fff' ,marginLeft: "10%" }}>Admin</Text>


//                         <View style={{ marginTop: "40%" }}>
//                             <View style={{ flexDirection: 'row' }}>

//                               <Image style={{ width: "10%", height: 38 }} source={require('./../images/user.png')}></Image>
//                                 <TouchableOpacity onPress={() => props.navigation.navigate('AdminProfileScreen')}>
//                                     <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: "8%", marginLeft: "16%", color: '#10265C' }}> My Profile</Text>
//                                 </TouchableOpacity>
//                             </View>

//                             <View style={{ flexDirection: 'row', marginTop: "6%" }}>
//                                 <Image style={{ width: "10%", height: 38 }} source={require('./../images/term_condition.png')}></Image>
//                                 <TouchableOpacity onPress={() => props.navigation.navigate("AdminTermCondition")} >
//                                     <Text style={{ marginTop: "5%", fontWeight: 'bold', fontSize: 17,  marginLeft: "10%" }}> Terms & Conditions</Text>
//                                 </TouchableOpacity>
//                             </View>

//                             <View style={{ flexDirection: 'row', marginTop: "6%" }}>

//                                 <Image style={{ width: "10%", height: 38 }} source={require('./../images/about_us.png')}></Image>
//                                 <TouchableOpacity onPress={() => props.navigation.navigate("AdminAboutUs")}>
//                                     <Text style={{ marginTop: "5%", fontWeight: 'bold', fontSize: 17,  marginLeft: "17%" }}> About us</Text>
//                                 </TouchableOpacity>

//                             </View>

//                             <View style={{ flexDirection: 'row', marginTop: "6%" }}>

//                                 <Image style={{ width: "10%", height: 38 }} source={require('./../images/disclaimer.png')}></Image>
//                                 <TouchableOpacity onPress={() => props.navigation.navigate("AdminDisclaimer")}>
//                                     <Text style={{ marginTop: "5%", fontWeight: 'bold', fontSize: 17,  marginLeft: "16%" }}> Disclaimer</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>

//                         <View style={{ flexDirection: 'row', marginTop: "6%", }}>

//                             <Image style={{ width: "10%", height: 38 }} source={require('./../images/logout.png')}></Image>
//                             <TouchableOpacity style={{    marginLeft: "20%",marginTop: "4%",  }}>
//                                 <Text style={{ fontWeight: 'bold', fontSize: 17, }}> Log Out </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </DrawerContentScrollView>

//         </View>
//     );
// }


// const styles = StyleSheet.create({

//     ImageContainer: {
//         width: "80%",
//         height: 100,
     
//         marginTop: "8%"

//     },
//     Container: {
//         marginLeft: "8%",
//         flex:1
//     }
// })


// export default AdminDrawerContent;
