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
const DUNE_HEIGHTS = [0, 0, 0, 0, 0, 0];
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

  noStroke();
  translate(windowWidth/2-DUNE_LENGTH*(DUNE_COUNT/2), windowHeight/2)
  // for (let i = 0; i < DUNE_COUNT; i++) {
  //   bezier(
  //     DUNE_LENGTH*i, 0,
  //     DUNE_LENGTH*i+10, duneHeight1, DUNE_LENGTH*i+50, duneHeight1,
  //     DUNE_LENGTH*i+DUNE_LENGTH, 0
  //   );
  // }
  const DUNE_COLORS = ["#ffeaa7", "#e3d598", "#7ed6df", "#dff9fb", "#b8e994", "#f8c291"];
  const DUNE_CONTROL_POINTS = {
    0: [10, 30],
    1: [50, 90],
    2: [50, 20],
    3: [25, 100],
    4: [100, 20],
    5: [10, 20]
  };

  for (let i = 0; i < DUNE_COUNT; i++) {
    let leftPos = DUNE_LENGTH * i;
    fill(DUNE_COLORS[i]);
    bezier(
      leftPos, 0,
      leftPos+DUNE_CONTROL_POINTS[i][0], DUNE_HEIGHTS[i], leftPos+DUNE_CONTROL_POINTS[i][1], DUNE_HEIGHTS[i],
      leftPos+DUNE_LENGTH, 0
    );
    rect(leftPos, 0, DUNE_LENGTH, -DIVIDER_HEIGHT)
  }
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
