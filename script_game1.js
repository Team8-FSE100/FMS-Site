let dragX, dragY;
let randomX, randomY;
let mouse = (0,0);
let score = 0;
let objects = [];
let d1 = 25;
let d2 = 40

function setup() {
  createCanvas(400, 400);
  noStroke();
  objects.push(new Target());
}

function draw() {
  background(220);
  
  // determine random location of target
  const target = createVector(randomX, randomY);  
  
  // define region of overlap
  const vector = target.copy().sub(mouse);        
  const overlap = vector.mag() - (d1/2 + d2/2); 
  
  // display objects and score
  text("Score: " + score, 20, 20);
  objects[0].display();
  circle(mouse.x, mouse.y, d2);
  
  // feedback
  if (overlap < -7) {
    score = score + 1;
    //let shift = vector.copy().normalize().setMag(overlap);
    objects[0] = new Target();
  } 
  fill(0);
}

function mouseDragged() {
  mouse = createVector(mouseX, mouseY)
}


class Target {
  constructor() {
    randomX = random(width);
    randomY = random(height);
    this.x = randomX;
    this.y = randomY;
    this.diameter = d1;
  }
  
  display() {
    circle(this.x, this.y, this.diameter);
  }
}