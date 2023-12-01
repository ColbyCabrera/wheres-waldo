// Add dom cache?

let xCoord;
let yCoord;

function updateCoords(event) {
  const header = document.getElementById("header");
  const defaultWidth = 500;
  const screenWidth = window.innerWidth;
  const ratio = screenWidth / defaultWidth;
  xCoord = event.pageX;
  yCoord = event.pageY - (header.offsetHeight - 1); // subtract one for border

  xCoord = Math.floor(xCoord / ratio / 25.0);
  yCoord = Math.floor(yCoord / ratio / 25.0);

  console.log(xCoord);
  console.log(yCoord);
}

function toggleMenu(event) {
  let menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("invisible");
}

async function selectCharacter(event) {
  const imageNumber = document.getElementById("main-image").dataset.imageNumber;
  const id = event.target.id.slice(7);

  // if id is not one of the options exit function
  if (isNaN(id)) {
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3000/image/" + imageNumber + "/targets",
      {
        mode: "cors",
      }
    );

    let data = await response.json();
    let correctX = data[id][0];
    let correctY = data[id][1];

    if (xCoord == correctX && yCoord == correctY) {
      console.log("SUCCESS!");
    }
  } catch (error) {
    console.log(error);
  }
}

//update to dynamically get images based on user selection
async function getImage() {
  try {
    const image = document.getElementById("main-image");
    const imageNumber = 2;
    const response = await fetch("http://localhost:3000/image/" + imageNumber, {
      mode: "cors",
    });
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    image.src = imageUrl;
    image.dataset.imageNumber = imageNumber;
  } catch (error) {
    console.log(error);
  }
}

let image = document.getElementById("main-image");
let menu = document.getElementById("dropdown-menu");
image.addEventListener("click", updateCoords);
menu.addEventListener("click", selectCharacter);
document.addEventListener("click", toggleMenu);

getImage();
