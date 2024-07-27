// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "yoga-website-demo-d37c1.firebaseapp.com",
  projectId: "yoga-website-demo-d37c1",
  storageBucket: "yoga-website-demo-d37c1.appspot.com",
  messagingSenderId: "239002617670",
  appId: "1:239002617670:web:2517a6bd99c97dd9864747"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);