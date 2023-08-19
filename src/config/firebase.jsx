// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4ogSsf1VBjzN9as9fHmog0_QmH11Kxg8",
  authDomain: "authen-dc8c5.firebaseapp.com",
  projectId: "authen-dc8c5",
  storageBucket: "authen-dc8c5.appspot.com",
  messagingSenderId: "242055764339",
  appId: "1:242055764339:web:5e647842253d6b63cf4d06",
  measurementId: "G-MLTD5PSQKC",
};

// your firebase config here

//init firebase app

const app = initializeApp(firebaseConfig);
//init services
const auth = getAuth();
const db = getFirestore(app);
export { db };
export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};

// Initialize Firebase

export const provider = new GoogleAuthProvider();
