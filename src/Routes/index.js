import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image } from 'react-native';
import DrawerContent from './DrawerContent'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from './../Dashboard/index'
import ProfileScreen from './../screen/Profile/index'
import CalenderScreen from './../screen/Calender/Calender'
import ServiceReportScreen from './../screen/ServiceReport/ServiceReport'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function DashboardStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Dashboard', //Set Header Title
        }} />


    </Stack.Navigator>
  );
}




function CalenderStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="CalenderScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="CalenderScreen"
        component={CalenderScreen}
        options={{
          title: 'CalenderScreen', //Set Header Title
        }} />


    </Stack.Navigator>
  );
}



function ProfileStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile', //Set Header Title
        }} />


    </Stack.Navigator>
  );
}



function ReportStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="ServiceReportScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="ServiceReportScreen"
        component={ServiceReportScreen}
        options={{
          title: 'ServiceReportScreen', //Set Header Title
        }} />


    </Stack.Navigator>
  );
}




function DrawerNavs() {
  return (

    <Drawer.Navigator initialRouteName="Dashboard"
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 5 },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardStack} />

      <Drawer.Screen
        name="CalenderScreen"
        component={CalenderStack} />


      <Drawer.Screen
        name="Profile"
        component={ProfileStack} />
      <Drawer.Screen
        name="ServiceReportScreen"
        component={ReportStack} />
    </Drawer.Navigator>
  );
}


export default DrawerNavs;