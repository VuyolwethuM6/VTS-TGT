import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type InviteScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Invite'>;
};

export default function InviteScreen({ navigation }: InviteScreenProps) {
  const [emails, setEmails] = useState<string[]>(['']);
  const [role, setRole] = useState('Member');

  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const handleRemoveEmail = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails.length ? newEmails : ['']);
  };

  const handleUpdateEmail = (text: string, index: number) => {
    const newEmails = [...emails];
    newEmails[index] = text;
    setEmails(newEmails);
  };

  const handleSendInvites = () => {
    // Implement invite sending logic here
    const validEmails = emails.filter(email => email.trim() !== '');
    console.log('Sending invites to:', validEmails, 'with role:', role);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Invite Team Members</Text>
          <Text style={styles.subtitle}>Send invitations to join your team</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Role</Text>
            <View style={styles.roleContainer}>
              {['Member', 'Team Lead', 'Admin'].map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.roleButton,
                    role === r && styles.roleButtonActive,
                  ]}
                  onPress={() => setRole(r)}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      role === r && styles.roleButtonTextActive,
                    ]}
                  >
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.emailHeader}>
              <Text style={styles.label}>Email Addresses</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={handleAddEmail}
              >
                <Ionicons name="add-circle-outline" size={24} color="#FFD700" />
                <Text style={styles.addButtonText}>Add Another</Text>
              </TouchableOpacity>
            </View>

            {emails.map((email, index) => (
              <View key={index} style={styles.emailInputContainer}>
                <TextInput
                  style={styles.emailInput}
                  placeholder="Enter email address"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => handleUpdateEmail(text, index)}
                />
                {emails.length > 1 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveEmail(index)}
                  >
                    <Ionicons name="close-circle-outline" size={24} color="#F44336" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSendInvites}>
            <Text style={styles.sendButtonText}>Send Invitations</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1F24',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#2A2E37',
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  roleButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  roleButtonTextActive: {
    color: '#FFD700',
  },
  emailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  addButtonText: {
    color: '#FFD700',
    fontSize: 14,
  },
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emailInput: {
    flex: 1,
    backgroundColor: '#2A2E37',
    borderRadius: 10,
    padding: 15,
    color: '#FFFFFF',
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
  },
  sendButton: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 