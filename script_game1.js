let target;
let letters = [];
let score = 0;
let selected = false;
let feedback = '';
let feedbackTime = 60;
let winScreen = false;

function setup() {
  createCanvas(400, 200);
  createTargetLetter();
  createLetters();
}

function draw() {
  background(220);

  if (!winScreen) {
    outputScore();
    outputTargetLetter();
    outputFeedback();

    textSize(32);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < letters.length; i++) {
      let x = map(i, 0, letters.length - 1, 50, width - 50);
      let y = height / 2;

      fill(0);
      text(letters[i], x, y);
    }

    if (mouseIsPressed && !selected) {
      let clickedLetter = getClickedLetter(mouseX, mouseY);
      if (clickedLetter === target) {
        score++;
        feedback = 'Correct!';
        feedbackTime = 60;
        if (score >= 20) {
          winScreen = true;
        } else {
          createTargetLetter();
          createLetters();
        }
        selected = true;
      } else {
        feedback = 'Incorrect, Try Again!';
        feedbackTime = 60;
      }
    } else if (!mouseIsPressed) {
      selected = false;
    }

    if (feedbackTime > 0) {
      feedbackTime--;
    } else {
      feedback = '';
    }
  } else {
    outputWinScreen();
  }
}

function outputScore() {
  textSize(24);
  textAlign(RIGHT, TOP);
  fill(0);
  text('Score: ' + score, width - 20, 20);
}

function outputTargetLetter() {
  textSize(24);
  textAlign(LEFT, TOP);
  fill(255, 0, 0);
  text('Target: ' + target, 20, 20);
}

function outputFeedback() {
  textSize(18);
  textAlign(CENTER, BOTTOM);
  if (feedback == 'Correct!') {
    fill('green');
  } else {
    fill(255, 0, 0);
  }
  text(feedback, width / 2, height - 10);
}

function createTargetLetter() {
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  target = alphabet.charAt(floor(random(alphabet.length)));
}

function createLetters() {
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  letters = [target];

  while (letters.length < 5) {
    let randomLetter = alphabet.charAt(floor(random(alphabet.length)));
    if (!letters.includes(randomLetter)) {
      letters.push(randomLetter);
    }
  }

  letters = shuffleArray(letters);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getClickedLetter(x, y) {
  let letterWidth = (width - 100) / letters.length;
  let clickedIndex = floor((x - 50) / letterWidth);
  return letters[clickedIndex];
}

function outputWinScreen() {
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
  if (winScreen) {
    score = 0;
    createTargetLetter();
    createLetters();
    winScreen = false;
  }
}
