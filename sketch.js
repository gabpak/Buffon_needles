const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

var distBetweenTwoLattes = 100; // Distance between two lattes
var lattes = []; // Array that contain the X position of each latte

var numberOfNeedles = 1; // Number of needles
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
  }
}


// Events mousse
function mousePressed(){
  // If the mouse is pressed, we create a new needle
  needles.push(new Needle(mouseX, mouseY, 0, lenNeedles));
}