import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyBF1fNvwaFiqR_iEzzTvKePUnOTd8Aty70",
    authDomain: "midyear-psyche-226419.firebaseapp.com",
    databaseURL: "https://midyear-psyche-226419-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "midyear-psyche-226419",
    storageBucket: "midyear-psyche-226419.appspot.com",
    messagingSenderId: "872273068817",
    appId: "1:872273068817:web:cc9af3004db232deb602b0",
    measurementId: "G-MHVHV8YGC2"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);