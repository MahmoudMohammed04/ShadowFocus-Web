// ==========================================================
//  SIDEBAR NAVIGATION (SHOP / INVENTORY / ROOMS)
// ==========================================================

function moveCircle(index) {
    const navButtons = document.getElementById("nav-buttons");
    navButtons.setAttribute("data-active", index);

    const sidebar = document.getElementById("sidebar");

    // Remove any active content
    document.querySelectorAll(".sidebar-content").forEach(c => c.classList.remove("active"));

    const sidebarTitle = document.getElementById("sidebarName");
    const sidebarIcon = document.getElementById("sidebarIcon");

    // SHOP TAB
    if (index === 0) {
        sidebar.classList.remove("wide");

        sidebarTitle.textContent = "Shop";
        sidebarIcon.className = "fa-solid fa-cart-shopping";

        document.getElementById("shopping-content").classList.add("active");
        Shop.renderShop();
    }

    // ROOMS TAB (Expand Sidebar)
    if (index === 1) {
        sidebar.classList.add("wide");

        sidebarTitle.textContent = "Rooms";
        sidebarIcon.className = "fa-solid fa-users-viewfinder";

        document.getElementById("rooms-content").classList.add("active");
    }

    // INVENTORY TAB
    if (index === 2) {
        sidebar.classList.remove("wide");

        sidebarTitle.textContent = "Inventory";
        sidebarIcon.className = "fa-solid fa-boxes-stacked";

        document.getElementById("inventory-content").classList.add("active");
    }
}


// ==========================================================
//  SIDEBAR TOGGLE (OPEN / CLOSE)
// ==========================================================

document.getElementById("sidebarToggle").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    sidebar.classList.toggle("open");
    overlay.classList.toggle("open");

    const arrowIcon = document.querySelector("#sidebarToggle i");
    arrowIcon.classList.toggle("fa-chevron-right");
    arrowIcon.classList.toggle("fa-chevron-left");
});

document.getElementById("sidebarOverlay").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const arrowIcon = document.querySelector("#sidebarToggle i");

    sidebar.classList.remove("open");
    overlay.classList.remove("open");

    arrowIcon.classList.remove("fa-chevron-left");
    arrowIcon.classList.add("fa-chevron-right");
});

function renderRoomUsers(users) {
    const list = document.getElementById("roomUsers");
    list.innerHTML = "";

    users.forEach(u => {
        const div = document.createElement("div");
        div.className = "user-item";

        div.innerHTML = `
            <img src="${u.avatar || 'https://i.pravatar.cc/100'}">
            <span>${u.name}</span>
        `;

        list.appendChild(div);
    });
}

