// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDix0taFuYmFUFKfqo5bl-u1hVBgHI1kaQ",
  authDomain: "clone-f72b3.firebaseapp.com",
  projectId: "clone-f72b3",
  storageBucket: "clone-f72b3.appspot.com",
  messagingSenderId: "202201394624",
  appId: "1:202201394624:web:7a9b2c94e6da5a63132c25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
