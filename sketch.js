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
let clientId;

const PLAY_STATES = {
	NotStarted: 0,
	Started: 1,
	Ended: 2,
  Loading: 3
}
let playState = PLAY_STATES.Loading;

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  DUNE_LENGTH = SCREEN_WIDTH / 10;

  socket = io('https://spektaklis-kopa-api.herokuapp.com/', { transports : ['websocket'] });
  clientId = guid();

  socket.on('connect', () => {
    console.log("Connected");
    socket.emit('join_room', {'room': 'user'});
  });
  socket.on('play_state', (data) => {
    playState = data.playState;
  })
}

function draw() {
  background("#192a56");
  if (playState == PLAY_STATES.NotStarted) {
    noStroke();
    fill("#ffeaa7");
    bezier(
      SCREEN_WIDTH/2-25, SCREEN_HEIGHT/2,
      SCREEN_WIDTH/2+40, 70, SCREEN_WIDTH/2+100, 70,
      SCREEN_WIDTH/2+50, SCREEN_HEIGHT/2
    );
    push();
    fill("#f5f6fa");
    textAlign(CENTER);
    text('Spektaklis: Smėlio dėžėje', SCREEN_WIDTH/2, SCREEN_HEIGHT/2+25);
    text('TUOJ PRASIDĖS!*', SCREEN_WIDTH/2, SCREEN_HEIGHT/2+50);
    fill("#ffeaa7");
    textSize(10);
    text('*Apverskite telefoną į gulščią poziciją', SCREEN_WIDTH/2, SCREEN_HEIGHT/2+65);
    pop();
  } else if (playState == PLAY_STATES.Started) {
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
    const DUNE_LABELS = ["Laisvalaikis", "Tėvai", "Draugai", "Išvaizda", "Laimė", "Romantika"]
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
  } else if (playState == PLAY_STATES.Loading) {
    push();
    noStroke();
    fill("#ffeaa7");
    bezier(
      SCREEN_WIDTH/2-25, SCREEN_HEIGHT/2,
      SCREEN_WIDTH/2+40, 70, SCREEN_WIDTH/2+100, 70,
      SCREEN_WIDTH/2+50, SCREEN_HEIGHT/2
    );
    fill("#f5f6fa");
    textAlign(CENTER);
    text('Spektaklis: Smėlio dėžėje', SCREEN_WIDTH/2, SCREEN_HEIGHT/2+25);
    pop();
  } else {
    push();
    fill("#f5f6fa");
    textAlign(CENTER);
    text('Spektaklis: Smėlio dėžėje', SCREEN_WIDTH/2, SCREEN_HEIGHT/2+25);
    fill("#ffeaa7");
    text('Ačiū!', SCREEN_WIDTH/2, SCREEN_HEIGHT/2+50);
    pop();
  }
}

function windowResized() {
  resizeCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
}

function touchEnded() {
  currentY = 0;
  currentDuneIndex = -1;
}

function touchMoved(event) {
  if (playState == PLAY_STATES.Started) {
    if (currentY != 0) {
      const deltaMovement = event.changedTouches[0].pageY - currentY;
      currentY = 0;
      if (currentDuneIndex != -1) {
        changeDuneHeight(currentDuneIndex, deltaMovement);
      } else if (mouseX > DUNE_START_X) {
        const duneIndex = floor(floor(mouseX - DUNE_START_X) / DUNE_LENGTH);
        changeDuneHeight(duneIndex, deltaMovement);
        currentDuneIndex = duneIndex;
      }
    } else {
      currentY = event.changedTouches[0].pageY;
    }
  }
}

function changeDuneHeight(duneIndex, change) {
  const newHeight = DUNE_HEIGHTS[duneIndex] + change;
  if (newHeight >= -SCREEN_HEIGHT/4 && newHeight <= SCREEN_HEIGHT/4) {
    DUNE_HEIGHTS[duneIndex] = newHeight;
  }
  socket.emit('write_dunes', {
    'clientId': clientId,
    'dunes': DUNE_HEIGHTS
  })
}

function guid() {
  //someone else's function
  //https://slavik.meltser.info/the-efficient-way-to-create-guid-uuid-in-javascript-with-explanation/
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}
