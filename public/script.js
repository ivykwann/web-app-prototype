//Dynamic field input for order toppings
document.addEventListener("DOMContentLoaded", function() {
    var addButton = document.getElementById("add-button");
    var dynamicInputsContainer = document.getElementById("dynamic-inputs-container");
    var counter = 1;
  
    addButton.addEventListener("click", function() {
      var inputField = document.getElementById("input-field");
      var newInputContainer = document.createElement("div");
      newInputContainer.className = "input-row";
  
      var newInput = document.createElement("input");
      newInput.type = "text";
      newInput.name = "dynamic-input-" + counter;
      newInput.value = inputField.value;
  
      var deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      
      deleteButton.addEventListener("click", function() {
        newInputContainer.remove();
      });
  
      newInputContainer.appendChild(newInput);
      newInputContainer.appendChild(deleteButton);
      dynamicInputsContainer.appendChild(newInputContainer);
  
      counter++;
      inputField.value = "";
    });
  });
  