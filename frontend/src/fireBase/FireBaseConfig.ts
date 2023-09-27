// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEAPIKEY,
  authDomain: "bizzbuddy-b2743.firebaseapp.com",
  projectId: "bizzbuddy-b2743",
  storageBucket: "bizzbuddy-b2743.appspot.com",
  messagingSenderId: "1039750800749",
  appId: "1:1039750800749:web:50e7067a935ec2811b6664",
  measurementId: "G-M7LN4GSVFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
