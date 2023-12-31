let xPos, yPos, xCoord, yCoord;

const cache = cacheDom();
const timer = timerFactory();

function cacheDom() {
  const menu = document.getElementById("dropdown-menu");
  const image = document.getElementById("main-image");
  const header = document.getElementById("header");
  const timerText = document.getElementById("timer");
  const navItems = Array.from(document.getElementsByClassName("nav-item"));
  const dropdownImages = Array.from(
    document.getElementsByClassName("dropdown-image")
  );

  const dropdownItems = Array.from(document.getElementsByClassName("item"));

  const markers = Array.from(
    document.getElementsByClassName("location-marker")
  );

  return {
    menu,
    image,
    header,
    navItems,
    dropdownImages,
    dropdownItems,
    markers,
    timerText,
  };
}

function timerFactory() {
  let intervalId;

  clearTimer = () => {
    clearInterval(intervalId);
    cache.timerText.textContent = 0;
  };

  startTimer = () => {
    clearTimer();
    let time = 0;
    intervalId = setInterval(() => {
      if (allFound()) {
        clearInterval(intervalId);
        cache.timerText.textContent = "Your time: " + time;
        intervalId = null;
      } else {
        time++;
        cache.timerText.textContent = time;
      }
    }, 1000);
  };

  return {
    startTimer,
    clearTimer,
  };
}

function updateCoords(event) {
  const defaultWidth = 500;
  const screenWidth = window.innerWidth;
  const ratio = screenWidth / defaultWidth;
  xPos = event.pageX;
  yPos = event.pageY - (header.offsetHeight - 1); // subtract one for border

  xCoord = Math.floor(xPos / ratio / 25.0);
  yCoord = Math.floor(yPos / ratio / 25.0);
}

async function selectCharacter(event) {
  const imageNumber = cache.image.dataset.imageNumber;
  const id = event.target.dataset.targetId;
  let marker = cache.markers[id - 1];

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
        toggleMenu(event);
        marker.classList.toggle("marker-invisible");
        marker.style.top = yPos + "px";
        marker.style.left = xPos - marker.offsetHeight / 2 + "px";
        cache.dropdownItems[id - 1].style.opacity = 0.5;
      }
    }
  } catch (error) {
    console.log(error);
  }

  // toggleMenu(event); //turn menu off after option selected
}

//update to dynamically get images based on user selection
async function switchImage(event) {
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
    cache.dropdownImages.forEach((image, index) => {
      image.src =
        "./images/image" + imageNumber + "target" + (index + 1) + ".JPG";
    });
    cache.dropdownItems.forEach((item) => {
      item.style.opacity = 1;
    });
    cache.markers.forEach((marker) => {
      marker.classList.add("marker-invisible");
    });
    timer.startTimer();
  } catch (error) {
    console.log(error);
  }
}

function allFound() {
  let found = true;
  cache.dropdownItems.forEach((item) => {
    if (item.style.opacity == 1) {
      found = false;
    }
  });

  return found;
}

function toggleMenu(event) {
  cache.menu.classList.toggle("invisible");
}

document.addEventListener("DOMContentLoaded", timer.startTimer());
cache.image.addEventListener("click", updateCoords);
cache.menu.addEventListener("click", selectCharacter);
cache.image.addEventListener("click", toggleMenu);
cache.navItems.forEach((navItem) => {
  navItem.addEventListener("click", switchImage);
});

switchImage("1");

/* function toggleMenu(event) {
  let menu = document.getElementById("dropdown-menu");
  menu.classList.toggle("invisible");
  menu.style.top = event.pageY + "px";
  menu.style.left = event.pageX + "px";
}
*/
