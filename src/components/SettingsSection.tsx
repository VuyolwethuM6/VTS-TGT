import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface SettingsSectionProps {
  notificationSettings: {
    email: boolean;
    push: boolean;
    sound: boolean;
  };
  settings: {
    darkMode: boolean;
    language: string;
  };
}

export default function SettingsSection({
  notificationSettings,
  settings,
}: SettingsSectionProps) {
  const { colors } = useTheme();
  const { updateProfile } = useAuth();

  const handleSettingChange = async (
    section: 'notificationSettings' | 'settings',
    key: string,
    value: boolean
  ) => {
    try {
      await updateProfile({
        [section]: {
          ...(section === 'notificationSettings' ? notificationSettings : settings),
          [key]: value,
        },
      });
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Notification Settings
      </Text>
      <View style={styles.settingsList}>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>
            Email Notifications
          </Text>
          <Switch
            value={notificationSettings.email}
            onValueChange={(value) =>
              handleSettingChange('notificationSettings', 'email', value)
            }
            trackColor={{ false: '#767577', true: colors.primary }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>
            Push Notifications
          </Text>
          <Switch
            value={notificationSettings.push}
            onValueChange={(value) =>
              handleSettingChange('notificationSettings', 'push', value)
            }
            trackColor={{ false: '#767577', true: colors.primary }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>
            Notification Sounds
          </Text>
          <Switch
            value={notificationSettings.sound}
            onValueChange={(value) =>
              handleSettingChange('notificationSettings', 'sound', value)
            }
            trackColor={{ false: '#767577', true: colors.primary }}
          />
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>
        App Settings
      </Text>
      <View style={styles.settingsList}>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>
            Dark Mode
          </Text>
          <Switch
            value={settings.darkMode}
            onValueChange={(value) =>
              handleSettingChange('settings', 'darkMode', value)
            }
            trackColor={{ false: '#767577', true: colors.primary }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingsList: {
    marginLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  settingLabel: {
    fontSize: 16,
  },
}); 