import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';

type AdminRegistrationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminRegistration'>;
};

export default function AdminRegistration({ navigation }: AdminRegistrationProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAdmin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter both email and password',
        position: 'top',
        topOffset: 50,
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Password must be at least 6 characters long',
        position: 'top',
        topOffset: 50,
      });
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'admin',
        createdAt: new Date().toISOString(),
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Admin user created successfully!',
        position: 'top',
        topOffset: 50,
        onHide: () => {
          navigation.replace('Login');
        },
      });
    } catch (error: any) {
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
      }
      
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
        position: 'top',
        topOffset: 50,
      });
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.replace('Login');
  };

  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Admin User</Text>
        <Text style={styles.subtitle}>Set up your administrator account</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666666"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleCreateAdmin}
          disabled={loading}
        >
          <LinearGradient colors={['#FFD700', '#FDB931']} style={styles.gradient}>
            {loading ? (
              <ActivityIndicator color="#000000" size="small" />
            ) : (
              <Text style={styles.buttonText}>Create Admin</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLogin} style={styles.linkButton}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 30,
    opacity: 0.8,
  },
  inputContainer: {
    width: '100%',
    gap: 15,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    padding: 10,
  },
  linkText: {
    color: '#FFD700',
    fontSize: 14,
  },
}); 