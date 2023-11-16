var circles = [];
var totalCircles = 10;
var inQueue = true;
var score = 0; // Variable to keep track of the score

function setup() {
  createCanvas(640, 360);
  var pinkColor = color(255, 192, 203);

  for (var i = 0; i < totalCircles; i++) {
    var circle = {
      x: random(width),
      y: random(height),
      r: random(10, 50),
      sa: Math.PI * pow(this.r, 2),
      maxSa: 500,
      expanding: false,
      xSpeed: random(-2, 2),
      ySpeed: random(-2, 2),
      color: pinkColor
    };
    circles.push(circle);
  }
  textSize(18);
  fill(0); 
}

function draw() {
  background(220);

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.expanding) {
      circle.r += 2;
      circle.sa = Math.PI * pow(circle.r, 2);

      if (circle.sa >= circle.maxSa) {

        circles.splice(i, 1);
        i--;
        score += 10;
      }
    } else {
      circle.x += circle.xSpeed;
      circle.y += circle.ySpeed;

      if (circle.x < 0 || circle.x > width) {
        circle.xSpeed *= -1;
      }
      if (circle.y < 0 || circle.y > height) {
        circle.ySpeed *= -1;
      }
    }

    fill(circle.color);
    stroke(0);
    strokeWeight(2);
    ellipse(circle.x, circle.y, circle.r * 2, circle.r * 2);
  }


  text("Score: " + score, 10, 30);
}

function mouseClicked() {
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(mouseX, mouseY, circle.x, circle.y);

    if (d < circle.r) {
      circle.expanding = true;
    }
  }
}
