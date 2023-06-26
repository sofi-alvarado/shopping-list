import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
    let arrayList = Object.values(snapshot.val());
    clearList();
    for (let i = 0; i <arrayList.length; i++) {
        // Challenge: Use the appendItemToShoppingListEl(itemValue) function inside of the for loop to append item to the shopping list element for each iteration.
        renderList(arrayList[i])
    }
})

function renderList(value) {
    ulEl.innerHTML += `<li> ${value} </li>`;
}

function clearList() {
    ulEl.innerHTML = " ";
}

function clearInput() {
    inputField.value = "";
}

