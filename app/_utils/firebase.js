// Import the functions we need from the SDKs we need
import { initializeApp } from "firebase/app";

// Add SDKs for Firebase products that we want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq5hGDDnBtY1r0Uu3AkJsB00dVUYFnJXM",
  authDomain: "agora-bns-4fd29.firebaseapp.com",
  projectId: "agora-bns-4fd29",
  storageBucket: "agora-bns-4fd29.appspot.com",
  messagingSenderId: "641416887451",
  appId: "1:641416887451:web:cf83e2714efea0229f1a3e",
  measurementId: "G-LTPHKTEPYM"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

