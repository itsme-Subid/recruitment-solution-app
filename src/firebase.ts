import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC3s0yzhiUmgBwvDTpDHXcdA-2y8yBMXw",
  authDomain: "interview-related.firebaseapp.com",
  projectId: "interview-related",
  storageBucket: "interview-related.appspot.com",
  messagingSenderId: "996874108874",
  appId: "1:996874108874:web:2779e724245fa0eb2d5933",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// export auth and provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
