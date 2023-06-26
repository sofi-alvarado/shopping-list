import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://shopping-list-27442-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList")


let groceryList = [];
const addButton = document.getElementById("add-button");
const inputField = document.getElementById("input-field");
const ulEl = document.getElementById("ul-el");


addButton.addEventListener("click", function (){
    let inputValue = inputField.value;
    push(shoppingListInDB, inputValue);
    console.log(`${inputValue} added to database`)

    clearInput();
    //renderList(inputValue);
})

/*
Call the onValue function with
shoppingListInDB as the first argument and
function(snapshot) {} as the second argument
*/

onValue(shoppingListInDB, function(snapshot) {
    if(snapshot.exists()) {
        let arrayList = Object.entries(snapshot.val());
        clearList();
        for (let i = 0; i <arrayList.length; i++) {
            let currentItem = arrayList[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
            //console.log(currentItemValue)
            renderList(currentItem);
        }
    } else {
        //clearList();
        ulEl.innerHTML = "No items here... yet"
    }
    

})

function renderList(item) {
    //ulEl.innerHTML += `<li> ${value} </li>`;
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener ("dblclick", function() {
        let listItemLocation = ref(database, `shoppingList/${itemID}`);
        remove(listItemLocation);
        console.log(itemValue + " deleted")
    });


    ulEl.append(newEl);
}

function clearList() {
    ulEl.innerHTML = " ";
}

function clearInput() {
    inputField.value = "";
}

