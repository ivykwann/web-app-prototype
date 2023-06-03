//Dynamic field input for order toppings
document.addEventListener("DOMContentLoaded", function() {
    var addButton = document.getElementById("add-button");
    var dynamicInputsContainer = document.getElementById("dynamic-inputs-container");
    var counter = 1;
  
    //When 'Add' button is clicked there will be a new container for the dynamic input
    addButton.addEventListener("click", function() { 
      var inputField = document.getElementById("input-field");
      var newInputContainer = document.createElement("div");
      newInputContainer.className = "input-row";

     //New input
      var newInput = document.createElement("input");
      newInput.type = "text";
      newInput.name = "dynamic-input-" + counter;
      newInput.value = inputField.value;
  
      //Delete button element
      var deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      
      //When delete button is clicked, input container will be removed
      deleteButton.addEventListener("click", function() {
        newInputContainer.remove(); 
      });
      //Append the new input element and delete button to the input container
      newInputContainer.appendChild(newInput);
      newInputContainer.appendChild(deleteButton);
      dynamicInputsContainer.appendChild(newInputContainer);
  
      counter++;
      inputField.value = ""; //clear the value of the input field
    });
  });
//End of dynamic field input for order toppings


//Get form and order list elements
const form = document.getElementById('orderform');
const orderlist = document.querySelector('#orderlist');
const cancelBtn = document.getElementById('cancelButton');
const confirmBtn = document.getElementById('confirmButton');
let deleteItemId;

//Create an array for the orders
var orderList = [];

//Create a function and give input parameters for each object
function addOrder(store, name, flavours, toppings, size, rating, notes) {
  //create an order object
  let order = {
    id: Date.now(), // Generate a unique timestamp as the order ID
    store,
    name,
    flavours,
    toppings,
    size,
    rating,
    notes
  }
  //Add the order to the order list array
  orderList.push(order);

  //Display the order on the page
  displayOrder(order);
  
}
//Event listener for form submission
form.addEventListener('submit', function(event){
  //Block default submission behaviour
  event.preventDefault();
  console.log(form)

  //Extract form input values and add to order
  addOrder(
    form.elements.orderStore.value,
    form.elements.orderName.value,
    form.elements.orderFlavours.value, getToppings(),
    form.elements.orderSize.value,
    form.elements.orderRating.value,
    form.elements.orderNotes.value,
  )
 });

 //Function to get the toppings from the input field
 function getToppings() {
  let toppings = [];
  const inputFields = document.querySelectorAll('.toppings-input');
  inputFields.forEach(function(input) {
    toppings.push(input.value);
  });
  return toppings;
}

//Function to display an order to the page
function displayOrder(order) {
  let item = document.createElement('li');
  item.setAttribute("data-id", order.id);

  let toppingsString = order.toppings.join(', ');

  item.innerHTML = 
  item.innerHTML = 
  `<p><strong>${order.name}</strong><br> Flavour: ${order.flavours}<br> 
  Toppings: ${order.toppings.join(', ')}<br> Size: ${order.size}<br>
  Rating: ${order.rating}<br> Notes: ${order.notes} </p>`;

//Add the order item to the order list
  orderlist.appendChild(item);

  //Reset the form fields
  form.reset();

 //Create a delete button for the order item
 let deleteButton = document.createElement('button');
 deleteButton.className = 'delete-button';
 let delButtonText = document.createTextNode('Delete');
 deleteButton.appendChild(delButtonText);
 deleteButton.classList.add('delete-button'); // Add delete-button class
 item.appendChild(deleteButton);

 //Event listener for delete button click
 deleteButton.addEventListener('click', function(event){

  //Remove order item from page
   item.remove();

   //Find and remove the order from the order list array
   orderList.forEach(function(orderArrayElement, orderArrayIndex){
     if (orderArrayElement.id==item.getAttribute('data-id')){
       orderList.splice(orderArrayIndex,1)
     }
 
   })
 })
}