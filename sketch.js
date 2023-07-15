// CONST CANVAS
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// CONST
const DEBUG = true;
const needlePerClick = 1;
const lenNeedles = 50; // Length of the needles

const distBetweenTwoLattes = 100; // Distance between two lattes

// Arrays
var lattes = []; // Array that contain the X position of each latte
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
  background(255);

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
  text("Number of needles = " + needles.length, CANVAS_WIDTH + 10, 20);
  text("Size of the needles = " + lenNeedles, CANVAS_WIDTH + 10, 40);
  text("Number of slats = " + lattes.length, CANVAS_WIDTH + 10, 80);
  text("Size of the slats = " + distBetweenTwoLattes, CANVAS_WIDTH + 10, 100);
  if(needles.length > 0){
    text("Last needle: ", CANVAS_WIDTH + 10, 140);
    text("Closest slat (n°) = " + needles[needles.length - 1].nearestLatte(), CANVAS_WIDTH + 10, 160);
    text("r = " + round(needles[needles.length - 1].calculDistanceBetweenClosestLatte(), 3), CANVAS_WIDTH + 10, 180);
    text("r(theta) = " + round(needles[needles.length - 1].isCrossingLatte(), 3), CANVAS_WIDTH + 10, 200);
    text("Crossing Needles =  " + needlesCrossing() + " / " + needles.length, CANVAS_WIDTH + 10, 240);
    text("Proba = " + round(needlesCrossing()/needles.length, 5), CANVAS_WIDTH + 10, 260);

    text(round(needlesCrossing()/needles.length, 5)  + "= 2*" + lenNeedles + "/PI*" + distBetweenTwoLattes, CANVAS_WIDTH + 10, 380);
    text("Approx of Pi = " + round(approxPi(), 4), CANVAS_WIDTH + 10, 400);
    print(DEBUG);
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

function needlesCrossing(){ // The number of needles crossing a slate
  let n = 0;
  for(let i = 0; i < needles.length; i++){
    if(needles[i].isCrossing){
      n++;
    }
  }
  return n;
}

function approxPi(){
  // Pi = (2 * lenNeedles) / (probability * latteDist)
  let pi = 0;
  let prob = (needlesCrossing()/needles.length);
  pi = (2 * lenNeedles) / (prob * distBetweenTwoLattes);
  return pi;
}