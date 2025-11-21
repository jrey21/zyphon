import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBGDBMqTI3FECZ6xHfsh-XIi07Q_HuLZHI",
    authDomain: "zyphon-35db7.firebaseapp.com",
    projectId: "zyphon-35db7",
    storageBucket: "zyphon-35db7.firebasestorage.app",
    messagingSenderId: "520957859618",
    appId: "1:520957859618:web:9a1abe59d833b4f12af77b",
    measurementId: "G-MT9MVK80WV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };