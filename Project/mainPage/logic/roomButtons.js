// ==========================================================
//  ROOM BUTTON SELECTION (Gym / Study / Office)
// ==========================================================

const roomButtons = document.querySelectorAll(".room-button[data-room]");
roomButtons.forEach(button => {
    button.addEventListener("click", () => {
        roomButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");

       let temp =  button.getAttribute("data-room");
       switch(temp)
       {
           case "gym":
               document.body.style.backgroundImage = "url(mainPage/img/gym.jpg)";
               break;
           case "study":
               document.body.style.backgroundImage = "url(mainPage/img/lof.jpg)";
               break;
           case "office":
               document.body.style.backgroundImage = "url(mainPage/img/office.jpg)";
               break;
       }
    });
});
