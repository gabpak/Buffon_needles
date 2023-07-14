const DEBUG = false;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

var distBetweenTwoLattes = 100; // Distance between two lattes
var lattes = []; // Array that contain the X position of each latte

var lenNeedles = 100; // Length of the needles
var needles = []; // Array that contain all the needles


/* ------------------------------------------------------------------------ */


function setup() {
  createCanvas(CANVAS_WIDTH + 300, CANVAS_HEIGHT);

  // Let's create the lattes
  for(let i = 0; i < CANVAS_WIDTH / distBetweenTwoLattes; i++){
    lattes.push(i * distBetweenTwoLattes);
  }
}

function draw() {
  background(250);
  //line(CANVAS_WIDTH, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Let's draw the lattes
  for(let i = 0; i < lattes.length; i++){
    line(lattes[i], 0, lattes[i], CANVAS_HEIGHT);
  }

  // Let's draw the needles
  for(let i = 0; i < needles.length; i++){
    needles[i].draw();
    if(DEBUG){
      needles[i].drawDistanceBetweenLatte();
    }
  }

  // Messages
  push();
  textSize(20);
  text("Number of needles: " + needles.length, CANVAS_WIDTH + 10, 20);
  text("Size of the needles: " + lenNeedles, CANVAS_WIDTH + 10, 40);
  text("Number of lattes: " + lattes.length, CANVAS_WIDTH + 10, 80);
  text("Size of the lattes: " + distBetweenTwoLattes, CANVAS_WIDTH + 10, 100);
  if(needles.length > 0){
    text("Closest Lattes (x): " + needles[needles.length - 1].nearestLatte(), CANVAS_WIDTH + 10, 140);
    text("Distance (x):" + needles[needles.length - 1].calculDistanceBetweenClosestLatte(), CANVAS_WIDTH + 10, 160);
    text("CrossingLatte (x): " + needles[needles.length - 1].isCrossing, CANVAS_WIDTH + 10, 180);
  }
  pop();
}


// Events mousse
function mousePressed(){
  // If the mouse is pressed, we create a new needle
  needles.push(new Needle(mouseX, mouseY, (PI/4), lenNeedles));
}