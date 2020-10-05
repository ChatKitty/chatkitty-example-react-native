import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBURRAc8qEBbdblmoHAH8YO6SnuAmm7p1w",
  authDomain: "chatkitty-sample.firebaseapp.com",
  databaseURL: "https://chatkitty-sample.firebaseio.com",
  projectId: "chatkitty-sample",
  storageBucket: "chatkitty-sample.appspot.com",
  messagingSenderId: "1015344059741",
  appId: "1:1015344059741:web:a0475c70c3e440953d84b4",
  measurementId: "G-PFRK3KX8KJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
