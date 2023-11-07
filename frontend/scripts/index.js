function printMousePos(event) {
  alert("clientX: " + event.pageX + " - pageY: " + event.pageY);
}

let image = document.getElementById("main-image")
image.addEventListener("click", printMousePos);
