import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';


// Replace this with your Firebase SDK config snippet
const firebaseConfig = {
  apiKey: "AIzaSyBt4Su-ZxyUFHCrBpBXzSaEzuisGKMar_w",
  authDomain: "chatkitty-expo-review.firebaseapp.com",
  projectId: "chatkitty-expo-review",
  storageBucket: "chatkitty-expo-review.appspot.com",
  messagingSenderId: "891463062190",
  appId: "1:891463062190:web:ef345c8bdeb8748bc3133f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
