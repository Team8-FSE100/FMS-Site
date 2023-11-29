let targetX, targetY;
let score = 0;
let countdown = 10;
let countdownInterval = 1000;
let gameOver = false;

function setup() {
  createCanvas(400, 400);
  targetX = random(width);
  targetY = random(height);
  startCountdown();
}

function draw() {
  background(220);

  fill(255, 0, 0);
  ellipse(targetX, targetY, 30, 30);

  textSize(24);
  fill(0);
  text(`Score: ${score}`, 20, 30);
  text(`Time: ${countdown}`, 20, 60);

  targetX += random(-5, 5);
  targetY += random(-5, 5);

  targetX = constrain(targetX, 15, width - 15);
  targetY = constrain(targetY, 15, height - 15);
}

function mousePressed() {
  if (mouseButton === LEFT) {
    let d = dist(mouseX, mouseY, targetX, targetY);
    if (d < 15) {
      score++;
      targetX = random(width);
      targetY = random(height);
    }
  }
}

let countdownIntervalID;

function startCountdown() {
  countdownIntervalID = setInterval(() => {
    countdown--;

    if (countdown <= 0) {
      clearInterval(countdownIntervalID);
      endGame();
    }
  }, countdownInterval);
}

function endGame() {
  if (!gameOver) {
    alert(`Game Over!\nYour total score is: ${score}`);
    noLoop(); 
    gameOver = true;
  }
}

function keyPressed() {
  if (gameOver) {
    if (key === 'Y' || key === 'y') {
      restartGame();
    } else if (key === 'N' || key === 'n') {
      alert("Thanks for playing!\n" +
        "Your total score is: " + score);
      window.history.back();
    }
  }
}

function restartGame() {
  gameOver = false;
  score = 0;
  countdown = 10;
  loop();
  startCountdown();
}
