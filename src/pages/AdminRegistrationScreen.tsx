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
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { auth, db } from '../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

type AdminRegistrationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminRegistration'>;
};

export default function AdminRegistrationScreen({ navigation }: AdminRegistrationScreenProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    position: '',
    businessNumber: '',
    phoneNumber: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async () => {
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.businessNumber) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all required fields',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match',
      });
      return;
    }

    try {
      setLoading(true);
      console.log('Creating user with email:', formData.email);
      
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log('User created successfully:', user.uid);

      const userData = {
        uid: user.uid,
        email: user.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: 'admin',
        businessNumber: formData.businessNumber,
        phoneNumber: formData.phoneNumber || '',
        debiCheckStatus: 'pending',
        createdAt: new Date().toISOString(),
        metrics: {
          totalInvites: 0,
          totalPresentations: 0,
          totalRecruits: 0,
          currentLevel: 1,
        },
        notificationSettings: {
          email: true,
          push: true,
          sound: true,
        },
        settings: {
          darkMode: true,
          language: 'en',
        },
      };

      console.log('Creating user document in Firestore...');
      await setDoc(doc(db, 'users', user.uid), userData);
      console.log('User document created successfully');

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Admin user created successfully!',
        visibilityTime: 2000,
        onHide: () => {
          navigation.replace('Login');
        },
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      let errorMessage = 'Failed to create admin user';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred';
      }
      
      Toast.show({
        type: 'error',
        text1: 'Registration Error',
        text2: errorMessage,
        visibilityTime: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Admin Account</Text>
          <Text style={styles.subtitle}>Please fill in the details below</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              placeholderTextColor="#666"
              value={formData.firstName}
              onChangeText={(text) => setFormData({ ...formData, firstName: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              placeholderTextColor="#666"
              value={formData.lastName}
              onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm your password"
                placeholderTextColor="#666"
                secureTextEntry={!showConfirmPassword}
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Company Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your company name"
              placeholderTextColor="#666"
              value={formData.companyName}
              onChangeText={(text) => setFormData({ ...formData, companyName: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Position</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your position"
              placeholderTextColor="#666"
              value={formData.position}
              onChangeText={(text) => setFormData({ ...formData, position: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Business Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your business number"
              placeholderTextColor="#666"
              value={formData.businessNumber}
              onChangeText={(text) => setFormData({ ...formData, businessNumber: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#666"
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
            />
          </View>

          <TouchableOpacity 
            style={[styles.registerButton, loading && styles.registerButtonDisabled]}
            onPress={handleCreateAdmin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.registerButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back to Login</Text>
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
  input: {
    backgroundColor: '#2A2E37',
    borderRadius: 10,
    padding: 15,
    color: '#FFFFFF',
    fontSize: 16,
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
  registerButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonDisabled: {
    backgroundColor: '#ccc',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#FFD700',
    fontSize: 16,
  },
}); 