// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDg0Cu89IxaHtDb0dvKNKqTFk-qYxO1XoQ",
  authDomain: "react-insta-d782a.firebaseapp.com",
  projectId: "react-insta-d782a",
  storageBucket: "react-insta-d782a.appspot.com",
  messagingSenderId: "543689064922",
  appId: "1:543689064922:web:04d28719de92ee251100e3",
  measurementId: "G-58G5SJYLKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();
export const analytics = getAnalytics();
export default app;
