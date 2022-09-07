let duneHeight1 = 0;
let duneHeight2 = 300;
let currentY = 0;
let currentDuneIndex = -1;
const screenWidth = 500;
const screenHeight = 500;
let screenOrientation;

const NIGHT_COLOR = "#34495e";
const DAY_COLOR = "#74b9ff";
let skyColor = DAY_COLOR;
let p = 0;
let from;
let to;
let transitioning = false;
const DUNE_HEIGHTS = [0, 0, 0];
const DUNE_COLORS = ["255, 234, 167", "227, 213, 152", "235, 217, 138"];

// COLORS
const DIVIDER_COLOR = "#eb9986";
const DUNE_COLOR = "#ffeaa7";

// SIZES
const DIVIDER_HEIGHT = 2;
const DUNE_LENGTH = 100;

// OTHER
const DUNE_COUNT = 6;
const DUNE_CONTROL_POINTS_X1 = [30, 60, 40, 10, 80, 30]
const DUNE_CONTROL_POINTS_X2 = [60, 90, 50, 70, 150, 40]
let DUNE_START_X;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("#fab1a0");
  DUNE_START_X = windowWidth/2-DUNE_LENGTH*(DUNE_COUNT/2);

  // Draw divider
  fill(DIVIDER_COLOR);
  noStroke();
  rect(0, windowHeight/2-DIVIDER_HEIGHT, windowWidth, DIVIDER_HEIGHT)

  // Draw dunes
  push();
  fill(DUNE_COLOR);
  noStroke();
  translate(windowWidth/2-DUNE_LENGTH*(DUNE_COUNT/2), windowHeight/2)
  // for (let i = 0; i < DUNE_COUNT; i++) {
  //   bezier(
  //     DUNE_LENGTH*i, 0,
  //     DUNE_LENGTH*i+10, duneHeight1, DUNE_LENGTH*i+50, duneHeight1,
  //     DUNE_LENGTH*i+DUNE_LENGTH, 0
  //   );
  // }

  const OFFSET = 0;

  // Dune #1
  bezier(
    0, 0,
    10, DUNE_HEIGHTS[0], 30, DUNE_HEIGHTS[0],
    DUNE_LENGTH, 0
  );
  rect(0, 0, DUNE_LENGTH, -DIVIDER_HEIGHT)

  // Dune #2
  let leftPos = DUNE_LENGTH - OFFSET;
  fill("#e3d598");
  bezier(
    leftPos, 0,
    leftPos+50, DUNE_HEIGHTS[1], leftPos+90, DUNE_HEIGHTS[1],
    leftPos+DUNE_LENGTH, 0
  );
  rect(leftPos, 0, DUNE_LENGTH, -DIVIDER_HEIGHT)

  // Dune #3
  leftPos = DUNE_LENGTH*2 - OFFSET*2;
  fill("#7ed6df");
  bezier(
    leftPos, 0,
    leftPos+50, DUNE_HEIGHTS[2], leftPos+20, DUNE_HEIGHTS[2],
    leftPos+DUNE_LENGTH, 0
  );
  rect(leftPos, 0, DUNE_LENGTH, -DIVIDER_HEIGHT)

  // bezier(
  //   0, 0,
  //   10, duneHeight1, 30, duneHeight1,
  //   DUNE_LENGTH+DUNE_LENGTH, 0
  // );

  // bezier(
  //   DUNE_LENGTH/2, 0,
  //   -10, duneHeight1, -10, duneHeight1,
  //   DUNE_LENGTH/2 * 2, 0
  // );

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function touchEnded() {
  currentY = 0;
  currentDuneIndex = -1;
}

function touchMoved(event) {
  // print(event);
  const color = `${get(mouseX, mouseY)[0]}, ${get(mouseX, mouseY)[1]}, ${get(mouseX, mouseY)[2]}`;
  const duneIndex = DUNE_COLORS.indexOf(color);
  if (currentY != 0) {
    const deltaMovement = event.pageY - currentY;
    currentY = 0;
    if (currentDuneIndex != -1) {
      DUNE_HEIGHTS[currentDuneIndex] += deltaMovement;
    } else if (mouseX > DUNE_START_X) {
      const duneIndex = floor(floor(mouseX - DUNE_START_X) / DUNE_LENGTH);
      DUNE_HEIGHTS[duneIndex] += deltaMovement;
      currentDuneIndex = duneIndex;
    }
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
