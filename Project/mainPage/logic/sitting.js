// logic/sitting.js

// Import Firebase dependencies (assuming these are correct)
import { doc, setDoc, db } from "./FireBase.js"; 

// We wait for the DOM to load before setting up elements and handlers.
document.addEventListener('DOMContentLoaded', () => {
    // --- Element Variables (MUST be defined after DOMContentLoaded) ---
    const sittingOverlay = document.getElementById("sitting-panal-overlay");
    const sittingInput = document.getElementById("sittingInput");
    
    // Attempt to load user data (assuming 'user' is globally available or handled here)
    // NOTE: If 'user' is part of an asynchronous Firebase login, you might need to adjust.
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
    
    
    // --- SITTING PANAL LOGIC OBJECT ---
    const sittingPanalMethods = {
        
        // 1. SHOW FUNCTION
        ShowSittingPanal: function(event) {
            if (event) event.preventDefault();
            
            if (sittingOverlay) {
                sittingOverlay.setAttribute("visible", "true");
            }
            // Populate the input field with the current username when opening
            if (sittingInput && user) {
                sittingInput.value = user.username || '';
            }
        },
        
        // 2. HIDE FUNCTION
        HideSittingPanal: function() {
            if (sittingOverlay) {
                sittingOverlay.setAttribute("visible", "false");
            }
        },

        // 3. LOG OUT FUNCTION
        LogOut: function() {
            localStorage.removeItem("user");
            // NOTE: Change this to your actual logout logic
            window.location.href = "../login.html"; 
        },

        // 4. SAVE USERNAME FUNCTION (integrated from the keypress handler)
        SaveUsername: async function() {
            const name = sittingInput.value.trim();

            if (name !== "" && user && user.uid) {
                // Update local storage
                localStorage.setItem("user", JSON.stringify({
                    ...user, // Keep existing UID and email
                    username: name
                }));

                // Update the global 'user' object in this file's scope
                user.username = name;
                
                // Update Firestore
                await setDoc(doc(db, "users", user.uid), {
                    username: name,
                    email: user.email,
                }, { merge: true }); // Use merge to prevent overwriting other fields

                console.log("Username saved:", name);
                this.HideSittingPanal();
            }
        }
    };


    // --- EVENT LISTENERS ---

    // 1. Hide the panel when clicking the overlay (outside the modal)
    if (sittingOverlay) {
        sittingOverlay.addEventListener('click', (e) => {
            // Check if the click occurred directly on the overlay
            if (e.target === sittingOverlay) {
                sittingPanalMethods.HideSittingPanal();
            }
        });
    }

    // 2. Input Keypress Listener (calls the save function)
    if (sittingInput) {
        sittingInput.addEventListener("keypress", async function (Event){
            if(Event.key === "Enter") {
                await sittingPanalMethods.SaveUsername();
            }
        });
    }

    // --- EXPOSE TO GLOBAL WINDOW ---
    // This is how your HTML (onclick) finds the functions.
    window.sittingPanal = sittingPanalMethods;
    
    // Export the methods for use in other JS modules (e.g., Rooms, Main)
    // NOTE: You cannot use "export" inside DOMContentLoaded, 
    // so we rely solely on the window global for this utility object.
});