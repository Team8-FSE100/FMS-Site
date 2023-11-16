
let bx;
let by;
let boxSize = 110;
let overBox = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;
let randomX, randomY;
let score = 0;
let objects = [];
let d1 = 25;

function setup() {
  createCanvas(700, 400);
  bx = width / 3.0;
  by = height / 2.0;
  objects.push(new Target());
  textSize(18);
}

function draw() {
  background('green');

  // Test if the cursor is over the cow
  if (
    mouseX > bx - boxSize / 2 &&
    mouseX < bx + boxSize / 2 &&
    mouseY > by - boxSize / 2 &&
    mouseY < by + boxSize / 2
  ) {
    overBox = true;
    if (!locked) {
    }
  } else {
    overBox = false;
  }

  // Draw the cow
  let cow = document.getElementById("cow");
  cow.style.left = bx - boxSize / 2 + 'px';
  cow.style.top = by - boxSize / 2 + 'px';

  // Determine random location of target
  const target = createVector(randomX, randomY);

  // Define region of overlap
  const vector = target.copy().sub(createVector(bx, by));
  const overlap = vector.mag() - (d1 / 2 + boxSize / 2);

  // Display objects and score
  text("Score: " + score, 10, 30);
  objects[0].display();

  // Feedback
  if (overlap < -7) {
    score = score + 1;
    objects[0] = new Target();
  }
  fill('#58281E');
}

function mousePressed() {
  if (overBox) {
    locked = true;
  } else {
    locked = false;
  }
  xOffset = mouseX - bx;
  yOffset = mouseY - by;
}

function mouseDragged() {
  if (locked) {
    // Ensure the cow stays within the canvas boundaries
    bx = constrain(mouseX - xOffset, boxSize / 2, width - boxSize / 2);
    by = constrain(mouseY - yOffset, boxSize / 2, height - boxSize / 2);
  }
}

function mouseReleased() {
  locked = false;
}

class Target {
  constructor() {
    randomX = random(boxSize / 2, width - boxSize / 2);
    randomY = random(boxSize / 2, height - boxSize / 2);
    this.x = randomX;
    this.y = randomY;
    this.diameter = d1;
  }

  display() {
    circle(this.x, this.y, this.diameter);
  }
}
