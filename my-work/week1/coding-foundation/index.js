document.getElementById("drawBox").addEventListener("click", createThreeBoxes);
//Pick the button by id and if it is clicked, run the function behind

function createBoxes(){
  var box = document.createElement("div");   // Create a <div> element
  box.className = 'boxOne';                  // Give this element a className
  document.getElementById("allBoxes").appendChild(box);   // Put element back to a certain div
}


function createThreeBoxes(){
  var n = document.getElementById("inputValue").value   // Check the number in the input box
  for (var i = 0; i < n; i++) {
      createBoxes();
  }   // Create boxes according to the number typed
}
