// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8QwrYD1835jhr11ZSFsmXoeFcxRHzcK4",
  authDomain: "elementsweatherauth.firebaseapp.com",
  projectId: "elementsweatherauth",
  storageBucket: "elementsweatherauth.firebasestorage.app",
  messagingSenderId: "202673476960",
  appId: "1:202673476960:web:bfe16a25e178917ae87a05",
  measurementId: "G-B19P28WVZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);