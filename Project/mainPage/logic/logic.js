// ==========================================================
//  SHOP SYSTEM
// ==========================================================

const shopItems = [
    { id: 1, name: "Blue Theme", price: 5, img: "blue.png" },
    { id: 2, name: "Red Theme", price: 8, img: "red.png" },
    { id: 3, name: "Shadow Skin", price: 12, img: "shadow.png" }
];

let coins = 0;
let inventory = [];

function renderShop() {
    const table = document.getElementById("shopTable");
    table.innerHTML = "";

    shopItems.forEach(item => {
        table.innerHTML += `
            <tr>
                <td><img src="${item.img}" width="40"> ${item.name}</td>
                <td>${item.price}💥</td>
                <td><button class="primary-btn" onclick="buyItem(${item.id})">Buy</button></td>
            </tr>
        `;
    });
}

function buyItem(id) {
    const item = shopItems.find(i => i.id === id);
    if (!item) return;

    if (coins < item.price) {
        alert("Not enough coins!");
        return;
    }

    coins -= item.price;
    inventory.push(item);
    updateInventory();
    updateCoinDisplay();
}

function updateInventory() {
    const table = document.getElementById("inventoryTable");
    table.innerHTML = "";

    inventory.forEach(i => {
        table.innerHTML += `
            <tr>
                <td><img src="${i.img}" width="40"> ${i.name}</td>
                <td>✔</td>
            </tr>
        `;
    });
}

function updateCoinDisplay() {
    document.querySelector("#coins-div p:last-child").textContent = coins;
}



// ==========================================================
//  MULTIPLAYER / ROOMS SYSTEM
// ==========================================================

let currentRoom = null;
let users = [];

function hostRoom() {
    currentRoom = Math.floor(Math.random() * 90000 + 10000).toString();
    enterRoom("You");
}

function joinRoom() {
    const id = document.getElementById("joinInput").value.trim();
    if (id === "") return;
    currentRoom = id;
    enterRoom("You");
}

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
    users.forEach(u => {
        list.innerHTML += `<li>${u}</li>`;
    });
}

function sendChat() {
    const input = document.getElementById("chatInput");
    const msg = input.value.trim();
    if (msg === "") return;

    const chat = document.getElementById("chatBox");
    chat.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
    chat.scrollTop = chat.scrollHeight;

    input.value = "";
}



// ==========================================================
//  SIDEBAR NAVIGATION (SHOP / INVENTORY / ROOMS)
// ==========================================================

function moveCircle(index) {
    const navButtons = document.getElementById("nav-buttons");
    navButtons.setAttribute("data-active", index);

    document.querySelectorAll(".sidebar-content")
        .forEach(c => c.classList.remove("active"));

    const sidebarTitle = document.getElementById("sidebarName");
    const sidebarIcon = document.getElementById("sidebarIcon");

    if (index === 0) {
        sidebarTitle.textContent = "Shop";
        sidebarIcon.className = "fa-solid fa-cart-shopping";
        document.getElementById("shopping-content").classList.add("active");
        renderShop();
    }

    if (index === 2) {
        sidebarTitle.textContent = "Inventory";
        sidebarIcon.className = "fa-solid fa-boxes-stacked";
        document.getElementById("inventory-content").classList.add("active");
    }

    if (index === 1) {
        sidebarTitle.textContent = "Rooms";
        sidebarIcon.className = "fa-solid fa-suitcase-rolling";
        document.getElementById("rooms-content").classList.add("active");
    }
}



// ==========================================================
//  ROOM BUTTON SELECTION (Gym / Study / Office)
// ==========================================================

const roomButtons = document.querySelectorAll(".room-button[data-room]");
roomButtons.forEach(button => {
    button.addEventListener("click", () => {
        roomButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
    });
});



// ==========================================================
//  SIDEBAR TOGGLE (OPEN / CLOSE)
// ==========================================================

document.getElementById("sidebarToggle").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    sidebar.classList.toggle("open");
    overlay.classList.toggle("open");

    const arrowIcon = document.querySelector("#sidebarToggle i");

    if (sidebar.classList.contains("open")) {
        arrowIcon.classList.remove("fa-chevron-right");
        arrowIcon.classList.add("fa-chevron-left");
    } else {
        arrowIcon.classList.remove("fa-chevron-left");
        arrowIcon.classList.add("fa-chevron-right");
    }
});

// Close sidebar on overlay click
document.getElementById("sidebarOverlay").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const arrowIcon = document.querySelector("#sidebarToggle i");

    sidebar.classList.remove("open");
    overlay.classList.remove("open");

    arrowIcon.classList.remove("fa-chevron-left");
    arrowIcon.classList.add("fa-chevron-right");
});





// ==========================================================
//  ON PAGE LOAD
// ==========================================================

window.addEventListener("load", () => {
    
    moveCircle(0);
});
