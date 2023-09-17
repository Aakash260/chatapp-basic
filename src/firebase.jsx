// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyA8cH6K5PVdCPZGyyFNjscj77sPIUWmQoE",
  authDomain: "chat-8eeac.firebaseapp.com",
  projectId: "chat-8eeac",
  storageBucket: "chat-8eeac.appspot.com",
  messagingSenderId: "456509453197",
  appId: "1:456509453197:web:79255811bd6339bbf383c4",
  measurementId: "G-SCNKVYXWN3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth=getAuth();
export const storage = getStorage();
export const db=getFirestore()