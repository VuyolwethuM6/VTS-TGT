import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const createAdminUser = async (email: string, password: string) => {
  try {
    console.log('Starting admin user creation...', { email });
    
    // Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created in Auth:', userCredential.user.uid);
    
    const user = userCredential.user;

    // Add user data to Firestore with admin role
    const userData = {
      email: user.email,
      role: 'admin',
      createdAt: new Date().toISOString(),
    };
    
    console.log('Adding user data to Firestore...', userData);
    await setDoc(doc(db, 'users', user.uid), userData);
    console.log('Admin user created successfully in Firestore');

    return user;
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    throw error;
  }
}; 