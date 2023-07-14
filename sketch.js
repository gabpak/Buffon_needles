/* 
  Modélisation des aiguilles de Buffon - Cours de Proba/Stats Juillet 2023 
*/

let CanvasWidth = 800;
let CanvasHeight = 600;

let DEBUG = true;

let largeurLatte = 100;
let nbrAiguille = 0;

let lenghtSlider; // Lenght of the aiguille
let nbrAiguilleSlider; // Slider for the number of aiguille to add when cliking on the button
let buttonAddAiguille; // Button to add aiguille
let debugCheckbox;

let aiguilleArray = []; // Array d'aiguilles
let XCoordLatte = []; // Array of the X coordinate of the latte

// Objet aiguille
class Aiguille{
  constructor(){
    this.x = random(0, CanvasWidth);
    this.y = random(0, CanvasHeight);
    this.angle = (PI / 2) + random(0, PI / 2); // Angle
    //this.angle = (PI / 2);
    this.randomColor = color(random(0, 255), random(0, 255), random(0, 255));
    this.lenght = largeurLatte * 2;
    this.crossingLatte = false;
  }

  show(){
    push();
    noStroke();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(this.randomColor);
    rect(-this.lenght / 4, -1, this.lenght / 2, 1);
    pop();
  }

  drawPointMiddle(){
    push();
    noStroke();
    translate(this.x, this.y);
    fill(0, 0, 0);
    ellipse(0, 0, 5, 5);
    pop();
  }

  update(){ // Updating the aiguille in real time
    this.lenght = lenghtSlider.value();
    //this.angle += 0.002;
  }

  nearestLatte(){ // Function to found the neared Latte [0, 1, ..., n]
    // This function give the 
    let r = Infinity;
    let n = 0; // The nearest latte
    let dist = 0;
    for(let i = 0; i < XCoordLatte.length; i++){
      dist = abs(this.x - XCoordLatte[i]);
      if(r > dist){
        r = dist;
        n = i;
      }
    }

    return n;
  }

  calculR(){ // Function to calculate the distance between the center of the aiguille and the nearest Latte
    let r = abs(this.x - XCoordLatte[this.nearestLatte()]);

    if(DEBUG){ // I draw the ligns between the center of the aiguille and the nearest latte
      push();
      noStroke();
      fill(color(255, 0, 0));
      if(this.x > XCoordLatte[this.nearestLatte()]){
        rect(this.x, this.y, -r, 1);
      }
      else{
        rect(this.x, this.y, r, 1);
      }
      pop();
    }

    r = round(r, 3);
    return r;
  }

  checkCrossingLatte(){
    // Step 1 : Let's take the distance between the nearest latte and the angle.
    let r = this.calculR();
    let angle = this.angle;
    // Step 2 : Let's calcul the triangle side
    // opposé = Sinus(0) * hyp
    let op = sin(angle) * (this.lenght / 2); // A modifier car actuellement utilisé avec this.x & this.y translate ...


    return op;

  }

}

// --------------------------------------------- Setup ---------------------------------------------

function setup() {
  createCanvas(CanvasWidth + 300, CanvasHeight);
  for(let i = 0; i < nbrAiguille; i++){
    aiguilleArray.push(new Aiguille());
  }

  // X coordinate of the lattes
  for(let i = 0; i < CanvasWidth + 1; i += largeurLatte){
    XCoordLatte.push(i);
  }

  // Slider for the lenght of the aiguille
  lenghtSlider = createSlider(largeurLatte, largeurLatte * 2, largeurLatte * 2);
  nbrAiguilleSlider = createSlider(1, 1000, 1);

  // Button
  buttonAddAiguille = createButton("Ajouter une aiguille");
  buttonAddAiguille.mousePressed(addAiguilleEvent); 

  // Clear button
  buttonClear = createButton("Clear");
  buttonClear.mousePressed(function(){
    aiguilleArray = [];
  });

  debugCheckbox = createCheckbox("DEBUG Mode", true);
  debugCheckbox.changed(switchDebugMode);

}

// --------------------------------------------- Draw ---------------------------------------------

function draw() {
  background(250);

  for (let i = 0; i < XCoordLatte.length; i++) {
    line(XCoordLatte[i], 0, XCoordLatte[i], height);
  }

  for(let i = 0; i < aiguilleArray.length; i++){
    aiguilleArray[i].show();
    aiguilleArray[i].drawPointMiddle();
    aiguilleArray[i].update();
    aiguilleArray[i].checkCrossingLatte();
  }

  // Text n aiguille
  fill(0, 0, 0);
  text("Nombre d'aiguille : " + aiguilleArray.length, 850, 20);
  text("Longueur des aiguilles : " + lenghtSlider.value() / 2, 850, 40);
  text("Largeur des lattes : " + largeurLatte, 850, 60);
  if(DEBUG){
    if(aiguilleArray[0] != undefined){
      text("Nearest Latte: " + aiguilleArray[aiguilleArray.length - 1].nearestLatte(), 850, CanvasHeight - 180);
      text("r = " + aiguilleArray[aiguilleArray.length - 1].calculR(), 850, CanvasHeight - 160);
      text("Angle Theta: " + aiguilleArray[aiguilleArray.length - 1].angle, 850, CanvasHeight - 120);
      text("Omega: " + aiguilleArray[aiguilleArray.length - 1].checkCrossingLatte(), 850, CanvasHeight - 100);
    }
    for(let i = 0; i < XCoordLatte.length; i++){
      text("Lattes[" + i + "] = " + XCoordLatte[i] , 850, CanvasHeight - 500 + i*18);
    }
  }
  text("Nombre de Lattes: " + XCoordLatte.length, 850, CanvasHeight - 60);
  text("Nombre d'aiguilles à ajouter : " + nbrAiguilleSlider.value(), 850, CanvasHeight - 40);

}

// --------------------------------------------- Functions ---------------------------------------------

// Add 10 aiguilles to the array
function addAiguille(n) {
  for (let i = 0; i < n; i++) {
    aiguilleArray.push(new Aiguille());
  }
}

// Event function for buttonAddAiguille
function addAiguilleEvent() {
  addAiguille(nbrAiguilleSlider.value()); // Utiliser la valeur du slider nbrAiguilleSlider pour déterminer le nombre d'aiguilles à ajouter
}

function switchDebugMode(){
    DEBUG = !DEBUG;
}


