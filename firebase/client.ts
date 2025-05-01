// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCvw6-8tQOJVpwNG7g8czlG_6EfUwwCyfc",
  authDomain: "prepwise-8ace4.firebaseapp.com",
  projectId: "prepwise-8ace4",
  storageBucket: "prepwise-8ace4.firebasestorage.app",
  messagingSenderId: "100769808647",
  appId: "1:100769808647:web:02135e45fa817742fcc5a2",
  measurementId: "G-H9YJKMH1G4"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);