// ==========================================================
//  MULTIPLAYER / ROOMS SYSTEM
// ==========================================================

import {  user,
    app, auth, db, doc, setDoc, getDoc, onSnapshot, addDoc, collection,
    updateDoc, query, orderBy, limit, serverTimestamp,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, onAuthStateChanged,deleteDoc
} from "./FireBase.js";


let currentRoom = null;
let users = [];

let chatInterval = null; 

async function hostRoom() {
    currentRoom = Math.floor(Math.random() * 900000 + 10000).toString();
    enterRoom("You");

    await setDoc(doc(db, "rooms", currentRoom), { });
    await setDoc(doc(db, "rooms", currentRoom, "participants", user.uid), {
        name: user.username,
        status: "Active"
     });
    
    if (chatInterval) clearInterval(chatInterval); 
    listenToChat(); 
    chatInterval = setInterval(listenToChat, 3000); 

    

    
    
}

async function joinRoom() {
    const id = document.getElementById("joinInput").value.trim();
    if (id === "" || id.length !== 6 || isNaN(parseInt(id))) return;

    const roomDoc = await getDoc(doc(db, "rooms", id));

       
        if (!roomDoc.exists()) {
            alert("Room does not exist!");
            return;
        }

    currentRoom = id;
    enterRoom("You");
    await setDoc(doc(db, "rooms", currentRoom, "participants", user.uid), {
        name: user.username,
        status: "Active"
     });
    listenToChat();

    if (chatInterval) clearInterval(chatInterval);
    listenToChat();
    chatInterval = setInterval(listenToChat, 3000);
}

window.Rooms = {
    hostRoom,
    joinRoom,
    sendChat,
    LeaveRoom
};



function enterRoom(username) {
    document.getElementById("roomActions").style.display = "none";
    document.getElementById("roomCanvas").style.display = "block";
    document.getElementById("roomIdDisplay").textContent = currentRoom;
    users.push(username);
    renderUsers();
}

function renderUsers() {
    const list = document.getElementById("roomUsers");
    list.innerHTML = "";
    renderRoomUsers(users);

}

function renderRoomUsers(users) {
    const list = document.getElementById("roomUsers");
    list.innerHTML = "";

    users.forEach(u => {
        const div = document.createElement("div");
        div.className = "user-item";

        // Assume 'u' object has properties: name, avatar, isFocusing (boolean), activity (string)
        // Note: For testing, you might need to manually add these properties to your mock user data.
        const statusClass = u.isFocusing ? 'focus' : 'idle';
        const activityText = u.activity || 'Idle';
        
        div.innerHTML = `
            <div class="avatar-wrapper">
                <img src="${u.avatar || 'https://img.freepik.com/premium-vector/shadow-ninja_9778-190.jpg'}" class="avatar">
                <span class="status-dot ${statusClass}"></span>
            </div>
            <div class="user-info">
                <span class="username">${u}</span>
                <span class="activity-text">${activityText}</span>
            </div>
        `;

        list.appendChild(div);
    });
}

function sendChat() {
    const input = document.getElementById("chatInput");
    const msg = input.value.trim();
    if (msg === "") return;

    const chat = document.getElementById("chatBox");
    chat.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
    chat.scrollTop = chat.scrollHeight;

    addDoc(collection(db, "rooms", currentRoom, "messages"), {
        sender: user.username,
        text: msg,
        timestamp: serverTimestamp()
    });

    input.value = "";
}

 async function LeaveRoom() {
     users = [];
     document.getElementById("roomActions").style.display = "block";
     document.getElementById("roomCanvas").style.display = "none";
     
     if (chatInterval) {
         clearInterval(chatInterval);
         chatInterval = null;
        }
        
        if (chatUnsubscribe) {
            chatUnsubscribe(); // unsubscribe Firestore listener
            chatUnsubscribe = null;
        }
        
    const docRef =   doc(db, "rooms", currentRoom, "participants", user.uid);
    await deleteDoc(docRef);
    currentRoom = null;
}




//-------------------------------------------------

const rooms = document.getElementById("rooms");
const chatMessages = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");

// --- Chat ---
let chatUnsubscribe = null;
async function listenToChat() {
    const roomId = currentRoom;
    const chatQuery = query(
        collection(db, "rooms", roomId, "messages"),
        orderBy("timestamp", "desc"),
        limit(20)
    );
    chatUnsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
        chatMessages.innerHTML = '';
        querySnapshot.docs.reverse().forEach(docSnap => {
            const msg = docSnap.data();
            chatMessages.innerHTML += `
                <div class="chat-msg">
                    <strong>${msg.sender}:</strong> ${msg.text}
                </div>
            `;
            console.log(msg.text);
        });

        chatMessages.scrollTop = chatMessages.scrollHeight;

        

        
    });

    const sendersRef = collection(db, "rooms", roomId, "participants");
    const sendersSnapshot = onSnapshot(sendersRef, (querySnapshot) => {
        users = []; // Clear the current users before rendering
        querySnapshot.forEach(docSnap => {
            const sender = docSnap.data();  // Get the data of the document
            if (sender && sender.name) {
                users.push(sender.name);  // Push the participant's name to the users array
            }
        });
        renderUsers();
    });
}


chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendChat();
    }
});

