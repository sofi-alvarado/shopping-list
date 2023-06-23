import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
    //inputField.value = "";
    console.log(`${inputValue} added to database`)
    //console.log(groceryList)
    //renderList();
})

function renderList() {
    let listItems = "";
    for (let i = 0; i < groceryList.length; i++){
        listItems += "<li>" + groceryList[i] + "</li>"
    }
    ulEl.innerHTML = listItems;
}