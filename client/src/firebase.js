// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-dca1f.firebaseapp.com",
  projectId: "mern-estate-dca1f",
  storageBucket: "mern-estate-dca1f.firebasestorage.app",
  messagingSenderId: "858065190604",
  appId: "1:858065190604:web:f2c521359f5cba43078c69",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
