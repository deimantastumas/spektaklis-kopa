let duneHeight1 = 0;
let duneHeight2 = 300;
let currentY = 0;
const screenWidth = 500;
const screenHeight = 500;
let screenOrientation;

const NIGHT_COLOR = "#34495e";
const DAY_COLOR = "#74b9ff";
let skyColor = "white";
let p = 0;
let from;
let to;
let transitioning = false;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(skyColor);
  fill("#74b9ff");
  // rectMode(CENTER);
  // rect(windowWidth/2, windowHeight/2, 100, 100);
  noStroke();
  fill("#f9ca24");
  translate(windowWidth/2, windowHeight/2)
  bezier(
    -50, 0,
    -10, duneHeight1, -10, duneHeight1,
    50, 0
  );
}

function touchEnded() {
  currentY = 0;
}

function touchMoved(event) {
  // print(event);
  if (currentY != 0) {
    const deltaMovement = event.pageY - currentY;
    currentY = 0;
    duneHeight1 += deltaMovement;
  } else {
    currentY = event.pageY;
  }
  // const movement = event.movementY * -1;
  // if (event.x <= 200) {
  //   if (movement > 0 && duneHeight1 > 0) {
  //   duneHeight1 -= movement;
  //   }
  //   if (movement < 0 && duneHeight1 < 600) {
  //     duneHeight1 -= movement;
  //   }
  //   if (duneHeight1 > 600) {
  //     duneHeight1 = 600;
  //   }
  // } else {
  //   if (movement > 0 && duneHeight2 > 0) {
  //   duneHeight2 -= movement;
  //   }
  //   if (movement < 0 && duneHeight2 < 600) {
  //     duneHeight2 -= movement;
  //   }
  //   if (duneHeight2 > 600) {
  //     duneHeight2 = 600;
  //   }
  // }
  // console.log(duneHeight);
}
