let bubbles = [];

function setup() {
    createCanvas(400, 400);
    background(220);

    stroke(0);
    strokeWeight(4);

    noFill();
    rect(0, 0, width, height);

    let numBubbles = floor(random(3, 11));
    for (let i = 0; i < numBubbles; i++) {
        let x = random(width);
        let y = random(height);
        let radius = random(20, 50);

        bubbles.push(new Bubble(x, y, radius));
      }
  }

  function draw() {
    background(220);

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].display();
    }
  }

  class Bubble {
    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
    }

    display() {
      ellipse(this.x, this.y, this.radius * 2, this.radius * 2); // Draw the bubble
    }
  }
