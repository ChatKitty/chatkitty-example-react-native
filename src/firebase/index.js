import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace with your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkkVFqNxS29xzhFoTFiZtjVyas0UqVxTk",
  authDomain: "chatkitty-react-native-example.firebaseapp.com",
  projectId: "chatkitty-react-native-example",
  storageBucket: "chatkitty-react-native-example.appspot.com",
  messagingSenderId: "105958027318",
  appId: "1:105958027318:web:fdac741221ed00e6f0a897"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };