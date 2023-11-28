function toggleMenu(event) {
  let menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("invisible");
  menu.style.top = event.pageY + "px";
  menu.style.left = event.pageX + "px";

  // CHANGE THIS TO BE A DROPDOWN FROM TOP OF SCREEN
}


// ADD ability to dynamically determine fetch correct data based on what option is clicked
async function selectCharacter(event) {
  const header = document.getElementById("header");
  const defaultWidth = 500;
  let xCoord = event.pageX;
  let yCoord = event.pageY - (header.offsetHeight - 1); // subtract one for border
  let screenWidth = window.innerWidth;
  const ratio = screenWidth / defaultWidth;

  xCoord = Math.floor(xCoord / ratio / 25.0);
  yCoord = Math.floor(yCoord / ratio / 25.0);

  try {
    const response = await fetch("http://localhost:3000/image/1/targets", {
      mode: "cors",
    });

    let data = await response.json();
    let correctX = data[1][0];
    let correctY = data[1][1];

    if (xCoord == correctX && yCoord == correctY) {
      console.log("SUCCESS!");
    }
  } catch (error) {
    console.log(error);
  }
}

async function getImage() {
  try {
    const response = await fetch("http://localhost:3000/image/2", {
      mode: "cors",
    });
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    document.getElementById("main-image").src = imageUrl;
  } catch (error) {
    console.log(error);
  }
}

let image = document.getElementById("main-image");
image.addEventListener("click", selectCharacter);
document.addEventListener("click", toggleMenu);

getImage();
