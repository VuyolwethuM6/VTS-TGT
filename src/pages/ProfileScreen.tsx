import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../contexts/AuthContext';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { user, logout, updateProfile } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(user?.settings?.darkMode ?? true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(user?.notificationSettings?.push ?? true);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleToggleDarkMode = async (value: boolean) => {
    setIsDarkMode(value);
    try {
      await updateProfile({
        settings: {
          ...user?.settings,
          darkMode: value,
        },
      });
    } catch (error) {
      console.error('Error updating dark mode:', error);
    }
  };

  const handleToggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    try {
      await updateProfile({
        notificationSettings: {
          ...user?.notificationSettings,
          push: value,
        },
      });
    } catch (error) {
      console.error('Error updating notifications:', error);
    }
  };

  if (!user) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#FFD700" />
          </View>
          <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
          <Text style={styles.role}>{user.role}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.businessNumber}>Business #: {user.businessNumber}</Text>
        </View>
      </View>

      {user.role === 'admin' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Admin Controls</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('UserManagement')}
          >
            <View style={styles.menuItemContent}>
              <Ionicons name="people-circle-outline" size={24} color="#FFD700" />
              <Text style={styles.menuItemText}>User Management</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('TeamTargets')}
          >
            <View style={styles.menuItemContent}>
              <Ionicons name="trophy-outline" size={24} color="#FFD700" />
              <Text style={styles.menuItemText}>Set Team Targets</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('PerformanceMetrics')}
          >
            <View style={styles.menuItemContent}>
              <Ionicons name="analytics-outline" size={24} color="#FFD700" />
              <Text style={styles.menuItemText}>Performance Metrics</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Permissions')}
          >
            <View style={styles.menuItemContent}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#FFD700" />
              <Text style={styles.menuItemText}>Permissions & Roles</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <View style={styles.menuItemContent}>
            <Ionicons name="person-circle-outline" size={24} color="#FFD700" />
            <View>
              <Text style={styles.menuItemText}>Edit Profile</Text>
              <Text style={styles.menuItemSubtext}>Update your personal information</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Security')}
        >
          <View style={styles.menuItemContent}>
            <Ionicons name="lock-closed-outline" size={24} color="#FFD700" />
            <View>
              <Text style={styles.menuItemText}>Security</Text>
              <Text style={styles.menuItemSubtext}>Password & authentication</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('NotificationSettings')}
        >
          <View style={styles.menuItemContent}>
            <Ionicons name="notifications-outline" size={24} color="#FFD700" />
            <View>
              <Text style={styles.menuItemText}>Notifications</Text>
              <Text style={styles.menuItemSubtext}>Manage alerts and notifications</Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggleNotifications}
            trackColor={{ false: '#666', true: 'rgba(255, 215, 0, 0.3)' }}
            thumbColor={notificationsEnabled ? '#FFD700' : '#f4f3f4'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemContent}>
            <Ionicons name="moon-outline" size={24} color="#FFD700" />
            <View>
              <Text style={styles.menuItemText}>Dark Mode</Text>
              <Text style={styles.menuItemSubtext}>Toggle app theme</Text>
            </View>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={handleToggleDarkMode}
            trackColor={{ false: '#666', true: 'rgba(255, 215, 0, 0.3)' }}
            thumbColor={isDarkMode ? '#FFD700' : '#f4f3f4'}
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Language')}
        >
          <View style={styles.menuItemContent}>
            <Ionicons name="language-outline" size={24} color="#FFD700" />
            <View>
              <Text style={styles.menuItemText}>Language</Text>
              <Text style={styles.menuItemSubtext}>{user.settings?.language || 'English (US)'}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('About')}
        >
          <View style={styles.menuItemContent}>
            <Ionicons name="information-circle-outline" size={24} color="#FFD700" />
            <View>
              <Text style={styles.menuItemText}>About</Text>
              <Text style={styles.menuItemSubtext}>App version 1.0.0</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#F44336" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1F24',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2E37',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  email: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  businessNumber: {
    fontSize: 14,
    color: '#FFD700',
    opacity: 0.8,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2E37',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2E37',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 15,
  },
  menuItemSubtext: {
    fontSize: 12,
    color: '#666',
    marginLeft: 15,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
}); 