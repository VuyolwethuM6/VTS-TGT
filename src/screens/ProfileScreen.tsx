import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import ProfileMetrics from '../components/ProfileMetrics';
import SettingsSection from '../components/SettingsSection';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { colors } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={[styles.name, { color: colors.text }]}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={[styles.email, { color: colors.textSecondary }]}>
            {user.email}
          </Text>
          <Text style={[styles.role, { color: colors.primary }]}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Text>
        </View>
      </View>

      {/* Metrics Section - Only visible to admins */}
      {user.role === 'admin' && (
        <ProfileMetrics
          metrics={{
            totalInvites: user.metrics.totalInvites,
            totalPresentations: user.metrics.totalPresentations,
            totalRecruits: user.metrics.totalRecruits,
            currentLevel: user.metrics.currentLevel,
          }}
        />
      )}

      {/* Business Information - Only visible to admins */}
      {user.role === 'admin' && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Business Information</Text>
          <View style={styles.sectionContent}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Business Number</Text>
            <Text style={[styles.value, { color: colors.text }]}>{user.businessNumber}</Text>
            
            <Text style={[styles.label, { color: colors.textSecondary }]}>DebiCheck Status</Text>
            <Text style={[styles.value, { color: colors.text }]}>{user.debiCheckStatus}</Text>
          </View>
        </View>
      )}

      {/* Settings Section - Visible to all users */}
      <SettingsSection
        notificationSettings={user.notificationSettings}
        settings={user.settings}
      />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color={colors.error} />
        <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  userInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionContent: {
    marginLeft: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
}); 