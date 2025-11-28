import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaOAvxyVnYEp0vTqKOPBiq6O8F5bd_Mm8",
  authDomain: "geoprofs-e5103.firebaseapp.com",
  projectId: "geoprofs-e5103",
  storageBucket: "geoprofs-e5103.firebasestorage.app",
  messagingSenderId: "633349504967",
  appId: "1:633349504967:web:4631e9aa8939deaa75a3e2",
  measurementId: "G-8HJTDVHPVL"
};

// Firebase initialiseren
const app = initializeApp(firebaseConfig);

// Firebase exporteren
export const db = getFirestore(app);
