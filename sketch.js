let duneHeight1 = 0;
let duneHeight2 = 300;
let currentY = 0;
let currentDuneIndex = -1;

const DUNE_HEIGHTS = [0, 0, 0, 0, 0, 0];

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
  background("#192a56");
  DUNE_START_X = windowWidth/2-DUNE_LENGTH*(DUNE_COUNT/2);

  // Add labels
  push();
  translate(windowWidth/2, windowHeight)
  rotate(radians(270));
  textAlign(CENTER);
  textSize(50);
  fill("#f5f6fa");
  text("PALANGA", windowHeight/2, -DUNE_START_X+75);
  pop();
  push();
  rotate(radians(90));
  fill("#f5f6fa");
  textSize(50);
  textAlign(CENTER);
  text("ŠVENTOJI", windowHeight/2, -DUNE_START_X-DUNE_COUNT*DUNE_LENGTH-50);
  pop();
  // Draw dunes
  push();
  noStroke();
  translate(windowWidth/2-DUNE_LENGTH*(DUNE_COUNT/2), windowHeight/2)
  const DUNE_COLORS = ["#ffeaa7", "#82589F", "#7ed6df", "#dff9fb", "#b8e994", "#e55039"];
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
    fill("#f5f6fa");
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
