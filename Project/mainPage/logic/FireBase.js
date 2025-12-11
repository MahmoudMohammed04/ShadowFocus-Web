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
    
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const user = JSON.parse(localStorage.getItem("user"));


export { user,app,getDocs,deleteDoc, auth, db, doc,setDoc, getDoc,onSnapshot, addDoc, collection, updateDoc, query, orderBy, limit, serverTimestamp, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };
