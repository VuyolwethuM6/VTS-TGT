import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../pages/LoginScreen';
import AdminDashboardScreen from '../pages/AdminDashboardScreen';
import AdminRegistrationScreen from '../pages/AdminRegistrationScreen';
import InviteScreen from '../pages/InviteScreen';
import ProfileScreen from '../pages/ProfileScreen';
import NotificationsScreen from '../pages/NotificationsScreen';
import TeamScreen from '../pages/TeamScreen';
import PerformanceScreen from '../pages/PerformanceScreen';
import TeamTargetsScreen from '../pages/TeamTargetsScreen';
import DashboardScreen from '../pages/DashboardScreen';
import PerformanceMetricsScreen from '../pages/PerformanceMetricsScreen';
import PermissionsScreen from '../pages/PermissionsScreen';
import EditProfileScreen from '../pages/EditProfileScreen';
import SecurityScreen from '../pages/SecurityScreen';
import NotificationSettingsScreen from '../pages/NotificationSettingsScreen';
import LanguageScreen from '../pages/LanguageScreen';
import AboutScreen from '../pages/AboutScreen';
import UserManagementScreen from '../pages/UserManagementScreen';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1B1F24',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#FFD700',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminRegistration"
        component={AdminRegistrationScreen}
        options={{ title: 'Admin Registration' }}
      />
      <Stack.Screen
        name="Invite"
        component={InviteScreen}
        options={{ title: 'Invite Team Members' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen
        name="Team"
        component={TeamScreen}
        options={{ title: 'Team Management' }}
      />

      <Stack.Screen 
        name="UserManagement" 
        component={UserManagementScreen}
        options={{
          title: 'User Management'
        }}
      />
      
      <Stack.Screen
        name="Performance"
        component={PerformanceScreen}
        options={{ title: 'Performance' }}
      />
      <Stack.Screen
        name="TeamTargets"
        component={TeamTargetsScreen}
        options={{ title: 'Team Targets' }}
      />
      <Stack.Screen
        name="PerformanceMetrics"
        component={PerformanceMetricsScreen}
        options={{ title: 'Performance Metrics' }}
      />
      <Stack.Screen
        name="Permissions"
        component={PermissionsScreen}
        options={{ title: 'Roles & Permissions' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen
        name="Security"
        component={SecurityScreen}
        options={{ title: 'Security Settings' }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
        options={{ title: 'Notification Settings' }}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{ title: 'Language Settings' }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: 'About' }}
      />
    </Stack.Navigator>
  );
} 