// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/compat/app";
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaQPCxm_LxZs8m4SqtBshYe0OMGGql-vI",
  authDomain: "meme-generator-123.firebaseapp.com",
  projectId: "meme-generator-123",
  storageBucket: "meme-generator-123.appspot.com",
  messagingSenderId: "478649268100",
  appId: "1:478649268100:web:b3be770e0f7c2312384fd1"
};

// Initialize Firebase
const a = firebase.initializeApp(firebaseConfig);

export const firebaseAuth=a.auth();

