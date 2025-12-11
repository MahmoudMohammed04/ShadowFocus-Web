


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
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
    
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

  async function getAllUsers() {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);

    snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
    });
}


    // getAllUsers();

    // const auth = getAuth();

    async function loginUser(email, password)
    {
        try{
            const usersRef = await signInWithEmailAndPassword(auth, email, password);
            // console.log("User logged in:", usersRef.user.uid);
            return usersRef.user;
        }
        catch(error)
        {
            console.error("Error logging in:", error);
            // alert("Login failed: " + error.message);
            return false;
        }
        return false;
    }

    // loginUser("bro@gamil.com", "200veno200");

//----------------------------- Login Form Handling ----------------------------//

const loginForm = document.getElementById("loginForm");
const loginAlert = document.getElementById("loginAlert");

// Close button functionality for the alert
loginAlert.querySelector(".btn-close").addEventListener("click", () => {
    loginAlert.classList.remove("show");
});

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    event.stopPropagation();

    // Remove previous validation
    loginForm.classList.remove('was-validated');

    // Trigger browser validation first
    if (!loginForm.checkValidity()) {
        loginForm.classList.add('was-validated');
        return;
    }

    const email = document.getElementById("validationDefault01").value;
    const password = document.getElementById("validationDefault02").value;

    // Dummy check for user existence
    
    const userId = await loginUser(email, password);

    if (userId === false) {
        
        // Show the alert with Bootstrap fade effect
        loginAlert.classList.add('show');
        // Reset the form to allow resubmission
        loginForm.classList.remove('was-validated');

        alert("Login failed: " + error.message);

      
        return;
    }

    const docSnap = await getDoc(doc(db, "users", userId.uid));
        const userData = docSnap.data();

      localStorage.setItem("user", JSON.stringify({
            uid: userId.uid,
            email: userId.email,
            username: userData.username,
            
        }));

    // Login success
    loginAlert.classList.remove('show');
    // alert("Login successful!"); // or redirect
    window.location.href = "index.html";
    });
    


    //----------------------------- Sign Up Form Handling ----------------------------//
async function registerUser(email, password, username) {
    try {
        // Create user in Firebase Auth
        const result = await createUserWithEmailAndPassword(auth, email, password);

        const uid = result.user.uid;

        // Store username in Firestore
        await setDoc(doc(db, "users", uid), {
            username: username,
            email: email,
            createdAt: Date.now(),
            coins: 0

        });

        // Store user data in local storage
        localStorage.setItem("user", JSON.stringify({
            uid: uid,
            email: email,
            username: username
        }));

        return uid;
    }
    catch (err) {
        console.error("Registration error:", err);
        return false;
    }
}


signupForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    signupForm.classList.remove('was-validated');

    // Run browser validation
    if (!signupForm.checkValidity()) {
        signupForm.classList.add('was-validated');
        return;
    }

    const username = document.getElementById("validationDefault03").value;
    const email    = document.getElementById("validationDefault04").value;
    const password = document.getElementById("validationDefault05").value;
    let x = /.com$/;
    if(!x.test(email)){
        alert("Please enter a valid email.");
        return;
    }

    const userId = await registerUser(email, password, username);

    if (!userId) {
        alert("This email is already used or invalid.");
        return;
    }

    alert("Account created successfully!");
    window.location.href = "index.html";
});



        

        

       


//----------------------------- Form Validation Setup ----------------------------//


    function setupFormValidation(formId){
        const form = document.getElementById(formId);
        form.addEventListener('submit', function(event){
            // Custom password confirm check
            const password2 = form.querySelector("#validationDefault05");
            const password3 = form.querySelector("#validationDefault06");
            if(password2 && password3 && password2.value !== password3.value){
                password3.setCustomValidity("Passwords do not match");
            } else if(password3){
                password3.setCustomValidity("");
            }

            if(!form.checkValidity()){
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    }

    function setupPasswordMatch() {
    const pass = document.getElementById("validationDefault05");
    const confirm = document.getElementById("validationDefault06");

    function checkMatch() {
        if (pass.value !== confirm.value) {
            confirm.setCustomValidity("Passwords do not match");
        } else {
            confirm.setCustomValidity("");
        }
    }

    pass.addEventListener("input", checkMatch);
    confirm.addEventListener("input", checkMatch);
}

setupPasswordMatch();

    



    const flip = document.getElementById("flip-wrapper");

    document.getElementById("toSignUp").onclick = e => {
        e.preventDefault();
        flip.classList.add("flip");
    };
    document.getElementById("backToLogin").onclick = e => {
        e.preventDefault();
        flip.classList.remove("flip");
    };

    // Eye toggle for password
    function toggleEye(eyeId, inputId){
        const eye = document.getElementById(eyeId);
        const input = document.getElementById(inputId);
        eye.addEventListener("click", () => {
            eye.classList.toggle("fa-eye");
            eye.classList.toggle("fa-eye-slash");
            input.type = input.type === "password" ? "text" : "password";
        });
    }
    toggleEye("eye1","validationDefault02");
    toggleEye("eye2","validationDefault05");
    toggleEye("eye3","validationDefault06");

