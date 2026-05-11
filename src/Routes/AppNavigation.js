// In App.js in a new project

import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProfileScreen from './../screen/Profile/index';
import LoginPage from '../screen/Login/LoginDetails';
import SignUpPage from '../screen/Signup/Signup_index';
import DashboardNotification from '../Dashboard/DashboardNotification';
import ServiceReportScreen from '../screen/ServiceReport/ServiceReport';
import CalenderScreen from '../screen/Calender/Calender';
import NewJobAssign from '../screen/NewJobAssigned/NewJob';
import GetDirectionScreen from '../screen/NewJobAssigned/GetDirection';
import OnGoingJobScreen from '../screen/OnGoingJob/OnGoingJob';
import CameraScreen from '../screen/OnGoingJob/MyCamera/Camera';
import OnPauseScreen from '../screen/OnPauseJob/OnPauseJob';
import OnCompleteJobScreen from '../screen/ServiceReport/CompleteJob';
import AssignJobListOnDate from '../screen/Calender/AssignJobListOnDate';
import ChangePassword from '../screen/Profile/ChangePassword';
import EditProfile from '../screen/Profile/EditDetails';
import AdminLoginPage from '../AdminPanel/AdminLogin';
import AdminHome from '../AdminPanel/AdminHome';
import AdminJobScheduleList from '../AdminPanel/AdminJobScheduleList';
import AdminCancelJob from '../AdminPanel/AdminCancelJob';
import AdminJobDetails from '../AdminPanel/AdminJobDetails';
import AdminOnGoingJob from '../AdminPanel/AdminOngoingJob';
import SchedularScreen from '../AdminPanel/Schedular/Schedular';
import CrewManagement from '../AdminPanel/Crew_Management/Crew_management';
import ActiveCrewLeader from '../AdminPanel/Crew_Management/ActiveCrewLeader/ActiveCrewLeader';
import CreateNewJob from '../AdminPanel/Schedular/CreateNewJobSchedular/CreateNewJob';
import CrewLeaderDetails from '../AdminPanel/Crew_Management/CrewLeader_details/Crewleaderdetail';
import AdminProfileScreen from '../AdminPanel/AdminProfile/Profile';
import AdminEditProfile from '../AdminPanel/AdminProfile/Profile/EditDetails';
import AdminChangePassword from '../AdminPanel/AdminProfile/Profile/ChangePassword';
import NewCreateJob from '../AdminPanel/Schedular/CreateNewJobSchedular/NewJobCreate';
import OnUpComingJobScreen from '../screen/Calender/Upcoming _job';
import AdminNotification from '../AdminPanel/AdminNotification/DashboardNotification';
import TimeScreen from '../TimeSelection';
import Dashboard from '../Dashboard';
import CompletedJob from '../screen/CompletedJob/CompletedJob';
import Resumejob from '../screen/OnPauseJob/Resumejob';
import SplashScreen from '../screen/Splash/SplashScreen';
import LoginScreen from '../screen/Login';
import AddCustomerScreen from '../AdminPanel/Schedular/AddCustomer/AddCustomerScreen';
import InCompleteJob from '../AdminPanel/IncompleteJob/InCompleteJob';
import AdminPauseJob from '../AdminPanel/PauseJob/AdminPauseJob';
import SchdeuledJobList from '../AdminPanel/SchdeuledList/SchdeuledJobList';
import PauseJob from '../screen/OnGoingJob/PauseJob';
import CrewMemberLogin from '../screen/CrewMember/CrewMemberLogin';
import CrewMemberProfile from '../screen/CrewMember/CrewMemberProfile';
import CrewMemberHome from '../screen/CrewMember/CrewMemberHome';
import AttendanceLogs from '../screen/CrewMember/AttendanceLogs';
import CrewLeadAttendanceLog from '../screen/CrewLeadAttendanceLog';
import CrewMemberAttendanceLog from '../screen/CrewMemberAttendanceLog';
import CrewMemberList from '../screen/CrewMemberList';
import CrewMemberChangePassword from '../screen/CrewMember/CrewMemberChangePassword';
import CrewMemberEditDetails from '../screen/CrewMember/CrewMemberEditDetails';
import CrewLeadProfile from '../screen/Profile/CrewLeadProfile';
import CrewLeadList from '../screen/CrewLeadList';
import AddCrewLead from '../AdminPanel/Crew_Management/AddCrewLead';
import AddCrewMemeber from '../AdminPanel/Crew_Management/AddCrewMemeber';
import AssignedCrews from '../AdminPanel/Crew_Management/AssignedCrews';
import AssignCrewMember from '../AdminPanel/Crew_Management/AssignCrewMember';
import ActiveCrewMember from '../AdminPanel/Crew_Management/ActiveCrewMember/ActiveCrewMember';
import AdminCrewAttendanceLog from '../AdminPanel/AdminCrewAttendanceLog';
import ImageScreen from '../components/ImageScreen';
import MyPDFViewer from '../screen/PdfViewer/MyPdfViewer';
const Stack = createStackNavigator();

// Wraps every screen with safe-area padding (top + bottom + sides) so headers
// don't collide with the status bar / notch and footers don't sit under the
// iOS home indicator / Android gesture bar. Applied via Stack.Navigator's
// `screenLayout` so each screen gets it automatically.
//
// IMPORTANT: backgroundColor is intentionally transparent so the screen's own
// background (white header, gray body, etc.) reaches the status bar / bottom
// edge. Each screen sets its own backgroundColor on its root View.
// Top + sides only. Bottom inset is intentionally NOT applied here — screens
// that have a bottom tab/footer manage their own bottom safe-area so the
// footer's background color extends into the gesture-bar / home-indicator
// region. Screens without a footer can wrap their content in their own
// SafeAreaView with edges={['bottom']} if needed.
const SafeScreenLayout = ({children}) => (
  <SafeAreaView
    style={{flex: 1, backgroundColor: 'transparent'}}
    edges={['top', 'left', 'right']}>
    {children}
  </SafeAreaView>
);

//initialRouteName="AdminJobScheduleList"
function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        screenLayout={({children}) => (
          <SafeScreenLayout>{children}</SafeScreenLayout>
        )}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{
            gestureEnabled: false,
          }}
        />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        {/* <Stack.Screen name="DashboardScreen" component={DashboardScreen} /> */}
        <Stack.Screen
          name="SignupScreen"
          component={SignUpPage}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="DashboardNotification"
          component={DashboardNotification}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="ServiceReportScreen"
          component={ServiceReportScreen}
        />
        <Stack.Screen name="CalenderScreen" component={CalenderScreen} />
        <Stack.Screen name="NewJobAssignScreen" component={NewJobAssign} />
        <Stack.Screen
          name="GetDirectionScreen"
          component={GetDirectionScreen}
        />
        <Stack.Screen name="OnGoingJobScreen" component={OnGoingJobScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="OnPauseScreen" component={OnPauseScreen} />
        <Stack.Screen name="MyPDFViewer" component={MyPDFViewer} />
        <Stack.Screen
          name="OnCompleteJobScreen"
          component={OnCompleteJobScreen}
        />
        <Stack.Screen
          name="AssignJobListOnDate"
          component={AssignJobListOnDate}
        />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AdminLoginPage" component={AdminLoginPage} />
        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AdminJobScheduleList"
          component={AdminJobScheduleList}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AdminCancelJob"
          component={AdminCancelJob}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AdminJobDetails"
          component={AdminJobDetails}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AdminOnGoingJob"
          component={AdminOnGoingJob}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="SchedularScreen"
          component={SchedularScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CrewManagement"
          component={CrewManagement}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="ActiveCrewLeader"
          component={ActiveCrewLeader}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CreateNewJob"
          component={CreateNewJob}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="ActiveCrewMember"
          component={ActiveCrewMember}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CrewLeaderDetails"
          component={CrewLeaderDetails}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AdminProfileScreen"
          component={AdminProfileScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AdminEditProfile"
          component={AdminEditProfile}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AdminChangePassword"
          component={AdminChangePassword}
          options={{
            gestureEnabled: false,
          }}
        />
        {/* <Stack.Screen name="AdminDrawerNavs" component={AdminDrawerNavs} /> */}
        <Stack.Screen
          name="NewCreateJob"
          component={NewCreateJob}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="OnUpComingJobScreen"
          component={OnUpComingJobScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AdminNotification"
          component={AdminNotification}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="TimeScreen"
          component={TimeScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CompletedJob"
          component={CompletedJob}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Resumejob"
          component={Resumejob}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AddCustomerScreen"
          component={AddCustomerScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="InCompleteJob"
          component={InCompleteJob}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AdminPauseJob"
          component={AdminPauseJob}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="SchdeuledJobList"
          component={SchdeuledJobList}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="PauseJob"
          component={PauseJob}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CrewMemberLogin"
          component={CrewMemberLogin}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CrewMemberProfile"
          component={CrewMemberProfile}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CrewMemberHome"
          component={CrewMemberHome}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AttendanceLogs"
          component={AttendanceLogs}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CrewLeadAttendanceLog"
          component={CrewLeadAttendanceLog}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CrewMemberAttendanceLog"
          component={CrewMemberAttendanceLog}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CrewMemberList"
          component={CrewMemberList}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CrewMemberChangePassword"
          component={CrewMemberChangePassword}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CrewMemberEditDetails"
          component={CrewMemberEditDetails}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CrewLeadProfile"
          component={CrewLeadProfile}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CrewLeadList"
          component={CrewLeadList}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="AddCrewLead"
          component={AddCrewLead}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AddCrewMemeber"
          component={AddCrewMemeber}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AssignedCrews"
          component={AssignedCrews}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AssignCrewMember"
          component={AssignCrewMember}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="AdminCrewAttendanceLog"
          component={AdminCrewAttendanceLog}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="ImageScreen"
          component={ImageScreen}
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
