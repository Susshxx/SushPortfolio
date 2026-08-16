import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getDatabase, Database } from 'firebase/database';

// TODO: Replace with your Firebase project configuration
// Get these values from Firebase Console > Project Settings > General
// Visit: https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://sushport-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Check if Firebase is configured
export const isFirebaseConfigured = 
  firebaseConfig.apiKey !== "YOUR_API_KEY" && 
  firebaseConfig.projectId !== "YOUR_PROJECT_ID" &&
  firebaseConfig.apiKey !== "";

let app: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;
let realtimeDb: Database | null = null;

// Only initialize Firebase if configured
if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    firestoreDb = getFirestore(app);
    realtimeDb = getDatabase(app);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
} else {
  console.warn('Firebase not configured. Using localStorage as fallback.');
  console.warn('To use Firebase:');
  console.warn('1. Create a .env file in the project root');
  console.warn('2. Add your Firebase configuration:');
  console.warn('   VITE_FIREBASE_API_KEY=your_api_key');
  console.warn('   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain');
  console.warn('   VITE_FIREBASE_PROJECT_ID=your_project_id');
  console.warn('   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket');
  console.warn('   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id');
  console.warn('   VITE_FIREBASE_APP_ID=your_app_id');
}

// Export Firestore instance (will be null if not configured)
export const db = firestoreDb as Firestore;
export const rtdb = realtimeDb as Database;
