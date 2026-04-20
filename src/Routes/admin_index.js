import 'react-native-gesture-handler';
import * as React from 'react';
import AdminDrawerContent from './AdminDrawerContent'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminHome from './../AdminPanel/AdminHome'
import SchedularScreen from './../AdminPanel/Schedular/Schedular'
import CrewManagement from './../AdminPanel/Crew_Management/Crew_management'
import AdminProfileScreen from './../AdminPanel/AdminProfile/Profile/index'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function AdminHomeStack({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="AdminHome"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="AdminHome"
                component={AdminHome}
                options={{
                    title: 'AdminHome', //Set Header Title
                }} />
        </Stack.Navigator>
    );
}


function SchedularStack({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="SchedularScreen"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="SchedularScreen"
                component={SchedularScreen}
                options={{
                    title: 'SchedularScreen', //Set Header Title
                }} />


        </Stack.Navigator>
    );
}


function CrewManagmentStack({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="CrewManagement"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="CrewManagement"
                component={CrewManagement}
                options={{
                    title: 'CrewManagement', //Set Header Title
                }} />


        </Stack.Navigator>
    );
}



function AdminProfileStack({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="AdminProfileScreen"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="AdminProfileScreen"
                component={AdminProfileScreen}
                options={{
                    title: 'AdminProfileScreen', //Set Header Title
                }} />


        </Stack.Navigator>
    );
}


function AdminDrawerNavs() {
    return (

        <Drawer.Navigator initialRouteName="AdminHome"
            drawerContentOptions={{
                activeTintColor: '#e91e63',
                itemStyle: { marginVertical: 5 },
            }}
            drawerContent={(props) => <AdminDrawerContent {...props} />}
        >

            <Drawer.Screen
                name="AdminHome"
                component={AdminHomeStack} />


            <Drawer.Screen
                name="SchedularScreen"
                component={SchedularStack} />



            <Drawer.Screen
                name="CrewManagement"
                component={CrewManagmentStack} />


            <Drawer.Screen
                name="AdminProfileScreen"
                component={AdminProfileStack} />


        </Drawer.Navigator>




    );
}


export default AdminDrawerNavs;