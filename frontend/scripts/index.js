function printMousePos(event) {
  const defaultWidth = 500;
  let xCoord = event.pageX;
  let yCoord = event.pageY - 87; // 87 is placeholder
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;
  
  const ratio = screenWidth / defaultWidth;

  xCoord = Math.floor((xCoord / ratio) / 25.0);
  yCoord = Math.floor((yCoord / ratio) / 25.0);

  console.log(xCoord + " " + yCoord)

}


/*
step 1: get mouse coords from click
step 2: get ratio with curretnscreensize/defaultscreensize
step 3: coords/ratio (make sure to subtract height of header)
step 4: divide coords by 25
step 5: see if coords match given coords
*/

let image = document.getElementById("main-image")
image.addEventListener("click", printMousePos);
