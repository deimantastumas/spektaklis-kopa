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
  fill("black");
  text(`${DUNE_HEIGHTS[0]}`, 100, 100);
  DUNE_START_X = windowWidth/2-DUNE_LENGTH*(DUNE_COUNT/2);

  // Draw divider
  // fill(DIVIDER_COLOR);
  // noStroke();
  // rect(DUNE_START_X, windowHeight/2-DIVIDER_HEIGHT, DUNE_COUNT*DUNE_LENGTH, DIVIDER_HEIGHT)

  // Draw dunes
  push();

  noStroke();
  translate(windowWidth/2-DUNE_LENGTH*(DUNE_COUNT/2), windowHeight/2)
  const DUNE_COLORS = ["#ffeaa7", "#e3d598", "#7ed6df", "#dff9fb", "#b8e994", "#e55039"];
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
    textAlign(CENTER);
    fill("#0a3d62");
    text("lorem ipsum", leftPos+DUNE_LENGTH/2, 130)
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
  if (currentY != 0) {
    const deltaMovement = event.pageY - currentY;
    currentY = 0;
    if (currentDuneIndex != -1) {
      changeDuneHeight(currentDuneIndex, deltaMovement);
    } else if (mouseX > DUNE_START_X) {
      const duneIndex = floor(floor(mouseX - DUNE_START_X) / DUNE_LENGTH);
      changeDuneHeight(duneIndex, deltaMovement);
      currentDuneIndex = duneIndex;
    }
  } else {
    currentY = event.pageY;
  }
}

function changeDuneHeight(duneIndex, change) {
  const newHeight = DUNE_HEIGHTS[duneIndex] + change;
  if (newHeight >= -150 && newHeight <= 150) {
    DUNE_HEIGHTS[duneIndex] = newHeight;
  }
}
