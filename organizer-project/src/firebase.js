// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTN-QR2M36SHpf7ndKq4154b7THFknZaA",
  authDomain: "organizer-ec32e.firebaseapp.com",
  projectId: "organizer-ec32e",
  storageBucket: "organizer-ec32e.firebasestorage.app",
  messagingSenderId: "505126297472",
  appId: "1:505126297472:web:a337cdcc684dcbe3c5ab65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };