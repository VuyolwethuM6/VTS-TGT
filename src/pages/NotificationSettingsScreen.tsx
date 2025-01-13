import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NotificationSettingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NotificationSettings'>;
};

type NotificationSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

export default function NotificationSettingsScreen({ navigation }: NotificationSettingsScreenProps) {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'team_updates',
      title: 'Team Updates',
      description: 'Get notified about team member activities and achievements',
      enabled: true,
    },
    {
      id: 'performance',
      title: 'Performance Alerts',
      description: 'Receive alerts about team performance metrics and goals',
      enabled: true,
    },
    {
      id: 'debicheck',
      title: 'DebiCheck Status',
      description: 'Get updates about DebiCheck verifications and status changes',
      enabled: true,
    },
    {
      id: 'invites',
      title: 'New Invites',
      description: 'Notifications for new team member invitations',
      enabled: true,
    },
    {
      id: 'targets',
      title: 'Target Updates',
      description: 'Get notified when team targets are updated or achieved',
      enabled: true,
    },
    {
      id: 'system',
      title: 'System Notifications',
      description: 'Important system updates and maintenance alerts',
      enabled: true,
    },
  ]);

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const handleSaveSettings = () => {
    // Implement save settings logic here
    console.log('Saving notification settings:', {
      push: pushEnabled,
      email: emailEnabled,
      sound: soundEnabled,
      notifications: settings,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Methods</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Push Notifications</Text>
            <Text style={styles.settingDescription}>
              Receive notifications on your device
            </Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: '#666', true: 'rgba(255, 215, 0, 0.3)' }}
            thumbColor={pushEnabled ? '#FFD700' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Email Notifications</Text>
            <Text style={styles.settingDescription}>
              Receive notifications via email
            </Text>
          </View>
          <Switch
            value={emailEnabled}
            onValueChange={setEmailEnabled}
            trackColor={{ false: '#666', true: 'rgba(255, 215, 0, 0.3)' }}
            thumbColor={emailEnabled ? '#FFD700' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Notification Sounds</Text>
            <Text style={styles.settingDescription}>
              Play sounds for notifications
            </Text>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: '#666', true: 'rgba(255, 215, 0, 0.3)' }}
            thumbColor={soundEnabled ? '#FFD700' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Types</Text>
        {settings.map((setting) => (
          <View key={setting.id} style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>{setting.title}</Text>
              <Text style={styles.settingDescription}>{setting.description}</Text>
            </View>
            <Switch
              value={setting.enabled}
              onValueChange={() => toggleSetting(setting.id)}
              trackColor={{ false: '#666', true: 'rgba(255, 215, 0, 0.3)' }}
              thumbColor={setting.enabled ? '#FFD700' : '#f4f3f4'}
            />
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSaveSettings}>
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 