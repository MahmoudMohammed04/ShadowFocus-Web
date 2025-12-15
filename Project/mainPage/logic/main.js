// ==========================================================
//  ON PAGE LOAD
// ==========================================================
import {user,setDoc,getDocs,getDoc,collection,db,doc} from "./FireBase.js";

window.addEventListener('load', async () => {

    // if(!user)
    // {
    //     window.location.href = "../login.html";
    // }  

    // await setDoc(doc(db, "shop", "item1"), {
    //     id:1,
    //     name: "Blue Theme",
    //     price: 5,
    //     img: "img/back.jpg"
    //  });

    // await setDoc(doc(db, "shop", "item2"), {
    //     id:2,
    //     name: "Red Theme",
    //     price: 8,
    //     img: "img/space.jpg"
    //  });

    // await setDoc(doc(db, "shop", "item3"), {
    //     id:3,
    //     name: "Green Theme",
    //     price: 12,
    //     img: "img/leafes.jpg"
    //  });

    // let query = await getDocs(collection(db,"shop"));
    // query.forEach(doc => {
    //     console.log(doc.id, "=>", doc.data());
    // });

    
    
    
    moveCircle(0);
});

