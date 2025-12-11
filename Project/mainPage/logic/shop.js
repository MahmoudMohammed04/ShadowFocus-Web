// ==========================================================
//  SHOP SYSTEM
// ==========================================================

import {  user,
    app, auth, db, doc, setDoc, getDoc, onSnapshot, addDoc, collection,
    updateDoc, query, orderBy, limit, serverTimestamp,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, onAuthStateChanged,getDocs
} from "./FireBase.js";

window.Shop = {
    renderShop,
    buyItem,
    fetchCoin,
    useTheme

};

// let shopItems = [
//     { id: 1, name: "Blue Theme", price: 5, img: "img/back.jpg" },
//     { id: 2, name: "Red Theme", price: 8, img: "img/space.jpg" },
//     { id: 3, name: "green Theme", price: 12, img: "img/leafes.jpg" }
// ];

let shopItems = [];

let coins = 0;
let inventory = [];

window.addEventListener('load', async () => {
    shopItems = [];
    let query = await getDocs(collection(db,"shop"));
    query.forEach(doc => {
        shopItems.push(doc.data());
        // console.log(doc.id, "=>", doc.data());
    });

    let query2 = await getDocs(collection(db,"users",user.uid,"inventory"));
    query2.forEach(doc => {
        inventory.push(doc.data());
        console.log(doc.id, "=>", doc.data());
    });
    
    

    console.log(shopItems);
    console.log(inventory);
    inventory.forEach(item=>shopItems.splice(shopItems.indexOf(shopItems.find(i => i.id === item.id)), 1));


    renderShop();
    updateInventory();
});

// logic/shop.js

// ... (shopItems, coins, inventory variables) ...

function renderShop() {
    const shopGrid = document.getElementById('shopGrid');
    
    // 1. Clear the grid before adding new cards
    shopGrid.innerHTML = ''; 

    for(let i = 0; i < shopItems.length; i++) {
        const item = shopItems[i]; // Get the current item object
        
        const card = document.createElement('div');
        card.className = 'item-card';
        
        // 2. Use the 'item' object data (name, price, id)
        card.innerHTML = `
            <div class="item-icon-wrapper">
                <img src="mainPage/${item.img}" alt="${item.name} Image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"> 
                </div>
            <div class="item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-price">${item.price} <i class="fa-solid fa-coins"></i></p>
            </div>
            <button onclick="Shop.buyItem(${item.id})" class="buy-btn primary-btn">Buy</button>
        `;
        shopGrid.appendChild(card);
    }
}

renderShop();

async function fetchCoin()
{
    await getDoc(doc(db, "users", user.uid)).then(doc => {
        coins = doc.data().coins;
        updateCoinDisplay();
    });
}

fetchCoin();


async function buyItem(id) {
    const item = shopItems.find(i => i.id === id);
    if (!item) return;

    await getDoc(doc(db, "users", user.uid)).then(doc => {
        coins = doc.data().coins;
        updateCoinDisplay();
    });

    if (coins < item.price) {
        alert("Not enough coins!");
        return;
    }

    coins -= item.price;
    
   
    inventory.push(item);
    shopItems.splice(shopItems.indexOf(item), 1);
    updateInventory();
    updateCoinDisplay();
    renderShop();

    await updateDoc(doc(db, "users", user.uid), {
        coins: coins
    });

    await setDoc(doc(db,"users",user.uid,"inventory","item"+item.id),{
        id:item.id,
        name:item.name,
        price:item.price,
        img:item.img
    });
}

function useTheme(id) {
    const item = inventory.find(i => i.id === id);
    if (!item) return;

    document.body.style.backgroundImage = `url(mainPage/${item.img})`;
}

function updateInventory() {
    const inventoryGrid = document.getElementById("inventoryGrid");
     // 1. Clear the grid before adding new cards
    inventoryGrid.innerHTML = ''; 

    for(let i = 0; i < inventory.length; i++) {
        const item = inventory[i]; // Get the current item object
        
        const card = document.createElement('div');
        card.className = 'item-card';
        
        // 2. Use the 'item' object data (name, price, id)
        card.innerHTML = `
            <div class="item-icon-wrapper">
                <img src="mainPage/${item.img}" alt="${item.name} Image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;"> 
                </div>
            <div class="item-details">
                <p class="item-name">${item.name}</p>
            </div>
            <button onclick="Shop.useTheme(${item.id})" class="buy-btn primary-btn">Use</button>
        `;
        inventoryGrid.appendChild(card);
    }
}

function updateCoinDisplay() {
    document.querySelector("#coins-div p:last-child").textContent = coins;
}



