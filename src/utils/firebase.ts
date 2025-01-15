import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDrw4cAGqsORdhMlmhvgBifXaY25Uo7sMY",
  authDomain: "vts-tgt.firebaseapp.com",
  projectId: "vts-tgt",
  storageBucket: "vts-tgt.firebasestorage.app",
  messagingSenderId: "1089458277022",
  appId: "1:1089458277022:web:3d4fcc3008db91cfbb898f"
};

console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey ? 'exists' : 'missing',
  authDomain: firebaseConfig.authDomain ? 'exists' : 'missing',
  projectId: firebaseConfig.projectId ? 'exists' : 'missing',
  storageBucket: firebaseConfig.storageBucket ? 'exists' : 'missing',
  messagingSenderId: firebaseConfig.messagingSenderId ? 'exists' : 'missing',
  appId: firebaseConfig.appId ? 'exists' : 'missing',
});


const app = initializeApp(firebaseConfig);
console.log('Firebase initialized');


export const auth = getAuth(app);
export const db = getFirestore(app);
console.log('Auth and Firestore initialized');

export default app; 
