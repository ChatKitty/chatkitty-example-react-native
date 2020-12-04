import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBEqSZdB3qTeSTyycvYDgJ5qG-5Xg9rQZY',
  authDomain: 'chatkitty-example.firebaseapp.com',
  databaseURL: 'https://chatkitty-example.firebaseio.com',
  projectId: 'chatkitty-example',
  storageBucket: 'chatkitty-example.appspot.com',
  messagingSenderId: '540634290949',
  appId: '1:540634290949:web:cd754ff7e98087230ff56c',
  measurementId: 'G-BB7Q5DRQK6',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
