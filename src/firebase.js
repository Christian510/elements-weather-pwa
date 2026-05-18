import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB8QwrYD1835jhr11ZSFsmXoeFcxRHzcK4",
  authDomain: "elementsweatherauth.firebaseapp.com",
  projectId: "elementsweatherauth",
  storageBucket: "elementsweatherauth.firebasestorage.app",
  messagingSenderId: "202673476960",
  appId: "1:202673476960:web:bfe16a25e178917ae87a05",
  measurementId: "G-B19P28WVZ4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);