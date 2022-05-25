// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCcN80omID272xIr-oZZVAm4GY7a_ilZ0",
    authDomain: "manufacter-e2227.firebaseapp.com",
    projectId: "manufacter-e2227",
    storageBucket: "manufacter-e2227.appspot.com",
    messagingSenderId: "746199061231",
    appId: "1:746199061231:web:84514df6a045528c7d411a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;