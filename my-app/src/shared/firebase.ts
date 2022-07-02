// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

 //const firebaseConfig = {
 //  apiKey: process.env.REACT_APP_API_KEY,
 //  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
 //  projectId: process.env.REACT_APP_PROJECT_ID,
 //  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
 //  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
 //  appId: process.env.REACT_APP_APP_ID,
 //  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
 //};
const firebaseConfig = {
  apiKey: "AIzaSyC3VLHMya1t8IDWdTkMLBNnNng1uZowWc8",
  authDomain: "ref-evething-project.firebaseapp.com",
  projectId: "ref-evething-project",
  storageBucket: "ref-evething-project.appspot.com",
  messagingSenderId: "427359463818",
  appId: "1:427359463818:web:9d5227b131ebf341860073",
  measurementId: "G-1B4HH9B8BM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();
export const analytics = getAnalytics();
export default app;
