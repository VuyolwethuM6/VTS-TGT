import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter both email and password',
      });
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      const userData = userDoc.data();
      
      if (!userData) {
        throw new Error('User data not found');
      }

      // Store user data in AsyncStorage for persistence
      await AsyncStorage.setItem('user', JSON.stringify({
        ...userCredential.user,
        ...userData
      }));
      
      if (userData.role === 'admin') {
        navigation.replace('AdminDashboard');
      } else {
        navigation.replace('Dashboard');
      }

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Login successful!',
      });
    } catch (error: any) {
      let errorMessage = 'Invalid email or password';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid password';
      } else if (error.message === 'User data not found') {
        errorMessage = 'User profile not found';
      }
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const goToAdminRegistration = () => {
    navigation.replace('AdminRegistration');
  };

  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={[styles.card, isLargeScreen && styles.largeCard]}>
          <Image
            source={require('../../assets/icon.png')}
            style={[styles.logo, isLargeScreen && styles.largeLogo]}
            resizeMode="contain"
          />
          <Text style={styles.title}>VTS Team Growth Tracker</Text>
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
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <LinearGradient colors={['#FFD700', '#FDB931']} style={styles.gradient}>
              {loading ? (
                <ActivityIndicator color="#000000" size="small" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToAdminRegistration} style={styles.linkButton}>
            <Text style={styles.linkText}>Need to create an admin account?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  largeCard: {
    maxWidth: 500,
    padding: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  largeLogo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 30,
    textAlign: 'center',
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
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 5,
    alignItems: 'center',
  },
  linkText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 