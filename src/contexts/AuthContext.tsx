import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getAuth, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  businessNumber: string;
  phoneNumber?: string;
  debiCheckStatus: 'active' | 'pending' | 'inactive';
  metrics: {
    totalInvites: number;
    totalPresentations: number;
    totalRecruits: number;
    currentLevel: number;
  };
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

interface AuthContextType {
  user: (FirebaseUser & UserProfile) | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<(FirebaseUser & UserProfile) | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    // Check for persisted user data
    const loadPersistedUser = async () => {
      try {
        const persistedUser = await AsyncStorage.getItem('user');
        if (persistedUser) {
          const userData = JSON.parse(persistedUser);
          // Verify the data is still valid by checking with Firestore
          const userDoc = await getDoc(doc(db, 'users', userData.uid));
          if (userDoc.exists()) {
            setUser({ ...userData, ...userDoc.data() } as FirebaseUser & UserProfile);
          }
        }
      } catch (error) {
        console.error('Error loading persisted user:', error);
        await AsyncStorage.removeItem('user'); // Clear invalid data
      }
    };

    loadPersistedUser();

    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserProfile;
            const fullUser = {
              ...firebaseUser,
              ...userData,
            } as FirebaseUser & UserProfile;
            
            setUser(fullUser);
            // Persist user data
            await AsyncStorage.setItem('user', JSON.stringify(fullUser));
          } else {
            console.error('User document not found in Firestore');
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
        await AsyncStorage.removeItem('user');
      }
      setLoading(false);
    });
  }, []);

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user?.uid) return;

    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);

    try {
      await updateDoc(userRef, data);
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 