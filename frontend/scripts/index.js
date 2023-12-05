let xCoord;
let yCoord;
const cache = cacheDom();

function cacheDom() {
  const menu = document.getElementById("dropdown-menu");
  const image = document.getElementById("main-image");
  const header = document.getElementById("header");
  const navItems = Array.from(document.getElementsByClassName("nav-item"));

  return {
    menu,
    image,
    header,
    navItems,
  };
}

function updateCoords(event) {
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

async function selectCharacter(event) {
  const imageNumber = cache.image.dataset.imageNumber;
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
    let correctX;
    let correctY;

    // Check all possible coordinates for target
    for (let i = 0; i < data[id].length; i += 2) {
      correctX = data[id][i];
      correctY = data[id][i + 1];
      if (xCoord == correctX && yCoord == correctY) {
        console.log("SUCCESS!");
      }
    }
  } catch (error) {
    console.log(error);
  }

  // toggleMenu(event); //turn menu off after option selected
}

//update to dynamically get images based on user selection
async function getImage(event) {
  try {
    let imageNumber;

    if (event.target) imageNumber = event.target.dataset.imageNumber;
    else imageNumber = 1;

    const response = await fetch("http://localhost:3000/image/" + imageNumber, {
      mode: "cors",
    });
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    cache.image.src = imageUrl;
    cache.image.dataset.imageNumber = imageNumber;
  } catch (error) {
    console.log(error);
  }
}

function toggleMenu(event) {
  cache.menu.classList.toggle("invisible");
}

cache.image.addEventListener("click", updateCoords);
cache.menu.addEventListener("click", selectCharacter);
cache.image.addEventListener("click", toggleMenu);
cache.navItems.forEach((navItem) => {
  navItem.addEventListener("click", getImage);
});

getImage("1");
