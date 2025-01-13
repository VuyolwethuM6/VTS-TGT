import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type AboutScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'About'>;
};

export default function AboutScreen({ navigation }: AboutScreenProps) {
  const appVersion = '1.0.0';
  const buildNumber = '100';

  const handleLinkPress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>VTS Team Growth Tracker</Text>
        <Text style={styles.version}>Version {appVersion} ({buildNumber})</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          VTS Team Growth Tracker is a comprehensive solution for network marketing teams to track their growth, manage DebiCheck verifications, and monitor team performance in real-time.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Ionicons name="people-outline" size={24} color="#FFD700" />
            <Text style={styles.featureText}>Team Management</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="stats-chart-outline" size={24} color="#FFD700" />
            <Text style={styles.featureText}>Performance Tracking</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#FFD700" />
            <Text style={styles.featureText}>DebiCheck Integration</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="notifications-outline" size={24} color="#FFD700" />
            <Text style={styles.featureText}>Real-time Notifications</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact & Support</Text>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => handleLinkPress('mailto:support@vtsteamtracker.com')}
        >
          <Ionicons name="mail-outline" size={24} color="#FFD700" />
          <Text style={styles.linkText}>support@vtsteamtracker.com</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => handleLinkPress('https://vtsteamtracker.com')}
        >
          <Ionicons name="globe-outline" size={24} color="#FFD700" />
          <Text style={styles.linkText}>Visit Our Website</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => handleLinkPress('https://vtsteamtracker.com/privacy')}
        >
          <Ionicons name="shield-checkmark-outline" size={24} color="#FFD700" />
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => handleLinkPress('https://vtsteamtracker.com/terms')}
        >
          <Ionicons name="document-text-outline" size={24} color="#FFD700" />
          <Text style={styles.linkText}>Terms of Service</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 VTS Team Growth Tracker. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1F24',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2E37',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  version: {
    fontSize: 14,
    color: '#666',
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
  description: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  featureList: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 15,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  linkText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 15,
    textDecorationLine: 'underline',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
}); 