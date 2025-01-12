import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar barStyle="light-content" backgroundColor="#1B1F24" />
          <AppNavigator />
          <Toast />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
