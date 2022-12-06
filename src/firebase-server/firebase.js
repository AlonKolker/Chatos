import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { updateProfile } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBULIznM0AFA7NIaotyGBM-Rgzqd9ZLifA",
  authDomain: "chatos-app.firebaseapp.com",
  projectId: "chatos-app",
  storageBucket: "chatos-app.appspot.com",
  messagingSenderId: "136085627415",
  appId: "1:136085627415:web:c06308d936bc8565733252"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
console.log(db);

