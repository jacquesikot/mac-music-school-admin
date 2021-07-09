import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDANGoJhNzp7i0WU1OeBXwrJYxZrHuPLYI',
  authDomain: 'mac-music-school-3bc4c.firebaseapp.com',
  projectId: 'mac-music-school-3bc4c',
  storageBucket: 'mac-music-school-3bc4c.appspot.com',
  messagingSenderId: '919885850659',
  appId: '1:919885850659:web:cfa4c385a461f514126996',
  measurementId: 'G-MPL4RJ3R21',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
