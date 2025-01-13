import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type SecurityScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Security'>;
};

export default function SecurityScreen({ navigation }: SecurityScreenProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangePassword = () => {
    // Implement password change logic here
    console.log('Changing password:', passwordForm);
  };

  const handleSetupTwoFactor = () => {
    // Implement 2FA setup logic here
    console.log('Setting up 2FA');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Password</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showCurrentPassword}
              value={passwordForm.currentPassword}
              onChangeText={(text) => setPasswordForm({ ...passwordForm, currentPassword: text })}
              placeholder="Enter current password"
              placeholderTextColor="#666"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              <Ionicons
                name={showCurrentPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showNewPassword}
              value={passwordForm.newPassword}
              onChangeText={(text) => setPasswordForm({ ...passwordForm, newPassword: text })}
              placeholder="Enter new password"
              placeholderTextColor="#666"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <Ionicons
                name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showConfirmPassword}
              value={passwordForm.confirmPassword}
              onChangeText={(text) => setPasswordForm({ ...passwordForm, confirmPassword: text })}
              placeholder="Confirm new password"
              placeholderTextColor="#666"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Two-Factor Authentication</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Enable 2FA</Text>
            <Text style={styles.settingDescription}>
              Add an extra layer of security to your account
            </Text>
          </View>
          <Switch
            value={twoFactorEnabled}
            onValueChange={setTwoFactorEnabled}
            trackColor={{ false: '#666', true: 'rgba(255, 215, 0, 0.3)' }}
            thumbColor={twoFactorEnabled ? '#FFD700' : '#f4f3f4'}
          />
        </View>
        {twoFactorEnabled && (
          <TouchableOpacity style={styles.button} onPress={handleSetupTwoFactor}>
            <Text style={styles.buttonText}>Setup 2FA</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Biometric Authentication</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Enable Biometric Login</Text>
            <Text style={styles.settingDescription}>
              Use fingerprint or face recognition to log in
            </Text>
          </View>
          <Switch
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
            trackColor={{ false: '#666', true: 'rgba(255, 215, 0, 0.3)' }}
            thumbColor={biometricEnabled ? '#FFD700' : '#f4f3f4'}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1F24',
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
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2E37',
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    color: '#FFFFFF',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 15,
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
}); 