import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvlieTXcKrD6QcUH1CD90ZJE8_qzxCN94",
  authDomain: "personal-todo-app-d0bfb.firebaseapp.com",
  databaseURL:
    "https://personal-todo-app-d0bfb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "personal-todo-app-d0bfb",
  storageBucket: "personal-todo-app-d0bfb.firebasestorage.app",
  messagingSenderId: "212724934018",
  appId: "1:212724934018:web:a997e3734035da84b75b9b",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export { auth };
