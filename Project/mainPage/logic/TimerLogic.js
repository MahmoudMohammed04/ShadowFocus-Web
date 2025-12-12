import {  user,
    app, auth, db, doc, setDoc, getDoc, onSnapshot, addDoc, collection,
    updateDoc, query, orderBy, limit, serverTimestamp,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, onAuthStateChanged
} from "./FireBase.js";

let currentTime = 25;
let endTime = null;


window.Timer={
    HideMessageBox,
    ShowTimer,
    Timer,
    StartTimer,
    StopTimer,
    SurrenderFocus
}

function ShowTimer() {
    if(window.timerInterval)
    {
         const message = document.getElementById("message-box-surrender");
        message.setAttribute("visible", "true");
    }
    else
    {
    const timerBox = document.getElementById("TimerBox");
    const isActive = timerBox.getAttribute("select-timer-active") === "true";
    timerBox.setAttribute("select-timer-active", !isActive);
    }
}

async function Timer() {
    const timerDisplay = document.getElementById("timer");

    let now = Date.now();
    let remaining = endTime - now;

    if (remaining <= 0) {
        remaining = 0;
    }

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    timerDisplay.innerText =
        `${minutes < 10 ? "0" + minutes : minutes}:` +
        `${seconds < 10 ? "0" + seconds : seconds}`;

    if (remaining <= 0) {
        clearInterval(window.timerInterval);
        window.timerInterval = null;

        let coins = document.getElementById("coins");
        let temp = Number(coins.innerText);

        switch(currentTime) {
            case 25: temp += 12; break;
            case 15: temp += 8; break;
            case 30: temp += 15; break;
            case 90: temp += 45; break;
        }

        coins.innerText = temp;

        await setDoc(doc(db, "users", user.uid), {
            coins: temp
        }, { merge: true });

        return;
    }
}


function StartTimer(button) {
    const timerBox = document.getElementById("TimerBox");
    timerBox.setAttribute("select-timer-active", "false");

    if (window.timerInterval) {
        document.getElementById("message-box-surrender").setAttribute("visible", "true");
    } 
    else {
        const stop = document.getElementById("stopBtn");
        stop.setAttribute("stopped", "false");

        const timerDisplay = document.getElementById("timer");
        timerDisplay.innerText = button.value;

        currentTime = Number(button.value.substr(0, 2));

        // Calculate real-time end moment
        const now = Date.now();
        endTime = now + currentTime * 60 * 1000;

        clearInterval(window.timerInterval);
        window.timerInterval = setInterval(Timer, 1000);
    }
}


function StopTimer(button) {

    const stop = button.getAttribute("stopped") === "true";
    if (!stop) {
        button.setAttribute("stopped", "true");
        clearInterval(window.timerInterval);
        return;
    } else {
        button.setAttribute("stopped", "false");
        clearInterval(window.timerInterval);
        window.timerInterval = setInterval(Timer, 1000);
    }
    
}

function SurrenderFocus()
{
    const messageBox = document.getElementById("message-box-surrender");
    const isVisible = messageBox.getAttribute("visible") === "true";
    messageBox.setAttribute("visible", !isVisible);

    const stop = document.getElementById("stopBtn");
    if(stop.getAttribute("stopped") === "true")
    {
        stop.setAttribute("stopped", "false");
    }
    

    clearInterval(window.timerInterval);
    window.timerInterval = null;
    
}

function HideMessageBox()
{
    const messageBox = document.getElementById("message-box-surrender");
    messageBox.setAttribute("visible", "false");
}
