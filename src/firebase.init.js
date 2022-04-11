// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwni-R10YgowYyG-S7rt6Xvn0LSQ_fGGI",
  authDomain: "email-password-auth-bb3b0.firebaseapp.com",
  projectId: "email-password-auth-bb3b0",
  storageBucket: "email-password-auth-bb3b0.appspot.com",
  messagingSenderId: "464267399355",
  appId: "1:464267399355:web:28139d1b72977572d3d99e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;