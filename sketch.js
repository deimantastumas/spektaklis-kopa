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
let DUNE_LENGTH;

// OTHER
const DUNE_COUNT = 6;
const DUNE_CONTROL_POINTS_X1 = [30, 60, 40, 10, 80, 30]
const DUNE_CONTROL_POINTS_X2 = [60, 90, 50, 70, 150, 40]
let DUNE_START_X;

const SCREEN_WIDTH = 450;
const SCREEN_HEIGHT = 320;

let socket;

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  DUNE_LENGTH = SCREEN_WIDTH / 10;

  // socket = io.connect("http://cf5b-84-15-183-246.eu.ngrok.io");
  // socket = io('https://spektaklis-kopa-api.herokuapp.com/', { transports : ['websocket'] });
  // socket = io('localhost:3000', { transports : ['websocket'] });

  // socket.on('connect', function() {
  //   console.log("Connected");
  // });
}

function draw() {
  background("#192a56");
  DUNE_START_X = SCREEN_WIDTH/2-DUNE_LENGTH*(DUNE_COUNT/2);

  // Add labels
  push();
  fill("#f5f6fa");
  textAlign(CENTER);
  text('Spektaklis: Smėlio dėžėje', SCREEN_WIDTH/2, SCREEN_HEIGHT/10);
  pop();
  push();
  const labelSize = SCREEN_HEIGHT / 15;
  translate(SCREEN_WIDTH/2, SCREEN_HEIGHT)
  rotate(radians(270));
  textAlign(CENTER);
  textSize(labelSize);
  fill("#f5f6fa");
  text("PREILA", SCREEN_HEIGHT/2, -DUNE_START_X-SCREEN_WIDTH/7);
  pop();
  push();
  rotate(radians(90));
  fill("#f5f6fa");
  textSize(labelSize);
  textAlign(CENTER);
  text("NIDA", SCREEN_HEIGHT/2, -DUNE_START_X-DUNE_COUNT*DUNE_LENGTH-SCREEN_WIDTH/20);
  pop();
  // Draw dunes
  push();
  noStroke();
  translate(SCREEN_WIDTH/2-DUNE_LENGTH*(DUNE_COUNT/2), SCREEN_HEIGHT/2)
  const DUNE_COLORS = ["#ffeaa7", "#82589F", "#7ed6df", "#dff9fb", "#b8e994", "#e55039"];
  const DUNE_LABELS = ["Laisvalaikis", "Tikslai", "Tėvai", "Draugai", "Išvaizda", "Laimė"]
  const DUNE_CONTROL_POINTS = {
    0: [10, 30],
    1: [50, 60],
    2: [50, 20],
    3: [25, 30],
    4: [50, 30],
    5: [-10, 20]
  };

  for (let i = 0; i < DUNE_COUNT; i++) {
    let leftPos = DUNE_LENGTH * i;
    fill(DUNE_COLORS[0]);
    bezier(
      leftPos, 0,
      leftPos+DUNE_CONTROL_POINTS[i][0], DUNE_HEIGHTS[i], leftPos+DUNE_CONTROL_POINTS[i][1], DUNE_HEIGHTS[i],
      leftPos+DUNE_LENGTH, 0
    );
    rect(leftPos, 0, DUNE_LENGTH, -DIVIDER_HEIGHT)
    textAlign(CENTER);
    fill("#f5f6fa");
    textSize(SCREEN_HEIGHT/30);
    text(DUNE_LABELS[i], leftPos+DUNE_LENGTH/2, SCREEN_HEIGHT/3.5)
  }
  pop();
}

function windowResized() {
  resizeCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
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
  // socket.emit("clientEvent", {x: mouseX, y: mouseY});
  const newHeight = DUNE_HEIGHTS[duneIndex] + change;
  if (newHeight >= -SCREEN_HEIGHT/4 && newHeight <= SCREEN_HEIGHT/4) {
    DUNE_HEIGHTS[duneIndex] = newHeight;
  }
}
