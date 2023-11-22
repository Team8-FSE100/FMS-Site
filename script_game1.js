let bx;
let by;
let cowSize = 110;
let overCow = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;

let randomX, randomY;
let score = 0;
let objects = [];
let d1 = 25;

function setup() {
  createCanvas(700, 500);
  bx = width / 2.0;
  by = height / 2.0 + 300;
  objects.push(new Target());
}

function draw() {
  background('green');
  
  // Test if the cursor is over the cow
  if (
    mouseX > bx - cowSize &&
    mouseX < bx + cowSize &&
    mouseY > by - cowSize &&
    mouseY < by + cowSize
  ) {
    overCow = true;
    if (!locked) {
    }
  } else {
    overCow = false;
  }

  // Draw the cow
  let cow = document.getElementById("cow");
  cow.style.left = bx + 'px';
  cow.style.top = by + 'px';
  
  
  // determine random location of target
  const target = createVector(randomX, randomY);  
  
  // define region of overlap
  const vector = target.copy().sub(createVector(bx, by));     
  const overlap = vector.mag() - (d1/2 + cowSize/2);
  
  // display objects and score
  text("Score: " + score, 20, 20);
  objects[0].display();
  
  // feedback
  if (overlap < -7) {
    score = score + 1;
    objects[0] = new Target();
  } 
  fill('#58281E');
}

function mousePressed() {
  if (overCow) {
    locked = true;
  } else {
    locked = false;
  }
  xOffset = mouseX - bx;
  yOffset = mouseY - by;
}

function mouseDragged() {
  if (locked) {
    
    if (mouseX - xOffset < 0) {
      bx = 0;
    } else if (mouseX > 700) {
      bx = 700;
    } else { 
      bx = mouseX - xOffset;
    }
    /*
    if (mouseY - yOffset < ) {
      by = 0 + 300;
    } else if (mouseY > 500) {
      by = 500 ;
    } else { */
      by = mouseY - yOffset + 300;
    //}
  }
}

function mouseReleased() {
  locked = false;
}

class Target {
  constructor() {
    randomX = random(720);
    randomY = random(400);
    this.x = randomX;
    this.y = randomY;
    this.diameter = d1;
  }
  
  display() {
    circle(this.x, this.y, this.diameter);
  }
}