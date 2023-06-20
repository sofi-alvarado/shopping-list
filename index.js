/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/
let groceryList = [];
const addButton = document.getElementById("add-button");
const inputField = document.getElementById("input-field");
const ulEl = document.getElementById("ul-el");

addButton.addEventListener("click", function (){
    groceryList.push(inputField.value);
    //inputField.value = "";
    console.log(groceryList)
    renderList();
})

function renderList() {
    let listItems = "";
    for (let i = 0; i < groceryList.length; i++){
        listItems += "<li>" + groceryList[i] + "</li>"
    }
    ulEl.innerHTML = listItems;
}