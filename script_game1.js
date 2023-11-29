let targetLetter;
let clickableLetters = [];
let score = 0;
let letterSelected = false;
let feedbackMessage = '';
let feedbackTimer = 60;
let winningScreen = false;

function setup() {
  createCanvas(400, 200);
  generateTargetLetter();
  generateClickableLetters();
}

function draw() {
  background(220);

  if (!winningScreen) {
    displayScore();
    displayTargetLetter();
    displayFeedbackMessage();

    textSize(32);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < clickableLetters.length; i++) {
      let x = map(i, 0, clickableLetters.length - 1, 50, width - 50);
      let y = height / 2;

      fill(0);
      text(clickableLetters[i], x, y);
    }

    if (mouseIsPressed && !letterSelected) {
      let clickedLetter = getClickedLetter(mouseX, mouseY);
      if (clickedLetter === targetLetter) {
        score++;
        feedbackMessage = 'Correct!';
        feedbackTimer = 60;
        if (score >= 20) {
          winningScreen = true;
        } else {
          generateTargetLetter();
          generateClickableLetters();
        }
        letterSelected = true;
      } else {
        feedbackMessage = 'Incorrect, Try Again!';
        feedbackTimer = 60;
      }
    } else if (!mouseIsPressed) {
      letterSelected = false;
    }

    if (feedbackTimer > 0) {
      feedbackTimer--;
    } else {
      feedbackMessage = '';
    }
  } else {
    displayWinningScreen();
  }
}

function displayScore() {
  textSize(24);
  textAlign(RIGHT, TOP);
  fill(0);
  text('Score: ' + score, width - 20, 20);
}

function displayTargetLetter() {
  textSize(24);
  textAlign(LEFT, TOP);
  fill(0);
  text('Target: ' + targetLetter, 20, 20);
}

function displayFeedbackMessage() {
  textSize(18);
  textAlign(CENTER, BOTTOM);
  fill(0);
  text(feedbackMessage, width / 2, height - 10);
}

function generateTargetLetter() {
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  targetLetter = alphabet.charAt(floor(random(alphabet.length)));
}

function generateClickableLetters() {
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  clickableLetters = [targetLetter];

  while (clickableLetters.length < 5) {
    let randomLetter = alphabet.charAt(floor(random(alphabet.length)));
    if (!clickableLetters.includes(randomLetter)) {
      clickableLetters.push(randomLetter);
    }
  }

  clickableLetters = shuffleArray(clickableLetters);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getClickedLetter(x, y) {
  let letterWidth = (width - 100) / clickableLetters.length;
  let clickedIndex = floor((x - 50) / letterWidth);
  return clickableLetters[clickedIndex];
}

function displayWinningScreen() {
  background(200, 255, 200);
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(0);

  text('Congratulations!', width / 2, height / 2 - 20);

  textSize(20);
  text('You Win!', width / 2, height / 2 + 10);
  text('Click anywhere to play again', width / 2, height / 1.5);
}

function mousePressed() {
  if (winningScreen) {
    score = 0;
    generateTargetLetter();
    generateClickableLetters();
    winningScreen = false;
  }
}
