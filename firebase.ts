import { getApp, getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getFunctions } from "firebase/functions"

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyA9A4QwhlRJP6u4taiouSR9X9LOv3uB1w4",
    authDomain: "irlquest-3d2f6.firebaseapp.com",
    projectId: "irlquest-3d2f6",
    storageBucket: "irlquest-3d2f6.appspot.com",
    messagingSenderId: "175342314903",
    appId: "1:175342314903:web:2ca943c31453b2600490d2",
    measurementId: "G-0YXNKXQ3LV"
  };

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions }