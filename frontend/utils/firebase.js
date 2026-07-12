// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multi-agent-ai-fae8f.firebaseapp.com",
  projectId: "multi-agent-ai-fae8f",
  storageBucket: "multi-agent-ai-fae8f.firebasestorage.app",
  messagingSenderId: "519205793933",
  appId: "1:519205793933:web:76940bceb0e4cd578ef2c4",
  measurementId: "G-18PTEFM17P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export {auth, googleProvider};