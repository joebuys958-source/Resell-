import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoyTyeIAfMGXSbN6pGZdzj7-mUbcyYCQI",
  authDomain: "resell-project-11430.firebaseapp.com",
  projectId: "resell-project-11430",
  storageBucket: "resell-project-11430.firebasestorage.app",
  messagingSenderId: "356160910284",
  appId: "1:356160910284:web:9d15e800553b686b0ae369"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
