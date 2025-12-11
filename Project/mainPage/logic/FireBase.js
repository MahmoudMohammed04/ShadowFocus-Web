import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    onSnapshot,
    addDoc,
    collection,
    updateDoc,
    query,
    orderBy,
    limit,
    serverTimestamp,
    deleteDoc,
    getDocs 
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB7sw2Q34Qh5-TKF3EZXY-RAtotfZu8Ec0",
    authDomain: "maf21-de0fc.firebaseapp.com",
    projectId: "maf21-de0fc",
    storageBucket: "maf21-de0fc.firebasestorage.app",
    messagingSenderId: "532823832819",
    appId: "1:53823832819:web:b86b5d5ea808edea4c9f86",
    measurementId: "G-N30F9SD4J8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const user = JSON.parse(localStorage.getItem("user"));

export { user,app,getDocs,deleteDoc, auth, db, doc,setDoc, getDoc,onSnapshot, addDoc, collection, updateDoc, query, orderBy, limit, serverTimestamp, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };