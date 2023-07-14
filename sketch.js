const DEBUG = false;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

var needlePerClick = 100;

var distBetweenTwoLattes = 100; // Distance between two lattes
var lattes = []; // Array that contain the X position of each latte

var lenNeedles = 50; // Length of the needles
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

  // Let's draw the lattes
  for(let i = 0; i < lattes.length; i++){
    line(lattes[i], 0, lattes[i], CANVAS_HEIGHT);
  }

  // Let's draw the needles
  for(let i = 0; i < needles.length; i++){
    needles[i].isCrossingLatte();
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
    text("Closest Lattes (n°): " + needles[needles.length - 1].nearestLatte(), CANVAS_WIDTH + 10, 140);
    text("Distance to: " + needles[needles.length - 1].calculDistanceBetweenClosestLatte(), CANVAS_WIDTH + 10, 160);
    text("Hyp: " + needles[needles.length - 1].isCrossingLatte(), CANVAS_WIDTH + 10, 180);
    text("Crossing Needles: " + needlesCrossing() + " / " + needles.length, CANVAS_WIDTH + 10, 220);
    text("Proba: " + needlesCrossing()/needles.length, CANVAS_WIDTH + 10, 240);

    text("P = 2 * a / PI * p", CANVAS_WIDTH + 10, 380);
    text("Approx of Pi: " + round(approxPi(), 4), CANVAS_WIDTH + 10, 400);
  }
  pop();

}

// Events mousse
function mousePressed(){
  // If the mouse is pressed, we create a new needle
  for(let i = 0; i < needlePerClick; i++){
    needles.push(new Needle(lenNeedles));
  }
}

function needlesCrossing(){
  let n = 0;
  for(let i = 0; i < needles.length; i++){
    if(needles[i].isCrossing){
      n++;
    }
  }
  return n;
}

function approxPi(){
  // Pi = 2 * a / l * p
  let pi = 0;
  pi = (2 * lenNeedles) / ((needlesCrossing()/needles.length) * distBetweenTwoLattes);
  return pi;
}