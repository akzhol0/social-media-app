import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDHll5JyGtOqiOSjYjsv4P9su-7AhXmAUI',
  authDomain: 'social-media-app-66923.firebaseapp.com',
  projectId: 'social-media-app-66923',
  storageBucket: 'social-media-app-66923.appspot.com',
  messagingSenderId: '771915330961',
  appId: '1:771915330961:web:3b27397bf38466fc259630',
};

const app = initializeApp(firebaseConfig);
export const auth123 = getAuth(app);
export const db = getFirestore(app);
