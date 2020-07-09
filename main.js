// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const SQUARE_COUNT = 10;
const SQUARE_WIDTH = width / SQUARE_COUNT;

// Iteration 1
function drawGrid() {
  // TODO: write the code of the function

  context.strokeStyle = 'black';
  context.lineWidth = 1;

  for (let line = 0; line <= SQUARE_COUNT; line++) {
    context.beginPath();

    context.moveTo(SQUARE_WIDTH * line, 0);

    context.lineTo(SQUARE_WIDTH * line, height);

    context.stroke();

    context.closePath();
  }

  for (let line = 0; line <= SQUARE_COUNT; line++) {
    context.beginPath();

    context.moveTo(0, SQUARE_WIDTH * line);

    context.lineTo(width, SQUARE_WIDTH * line);

    context.stroke();

    context.closePath();
  }
}

//Iteration 2
class Character {
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }

  moveUp() {
    this.row--;
  }
  moveRight() {
    this.col++;
  }
  moveDown() {
    this.row++;
  }
  moveLeft() {
    this.col--;
  }
}

const player = new Character(0, 0);

function drawPlayer() {
  const viking = new Image();
  viking.src = 'images/character-down.png';

  viking.addEventListener('load', () => {
    context.drawImage(
      viking,
      player.col * SQUARE_WIDTH,
      player.row * SQUARE_WIDTH
    );
  });
}

// Iteration 3
class Treasure {
  constructor(col, row) {
    this.col = col;
    this.row = col;
  }

  setRandomPosition() {
    this.col = Math.floor(Math.random() * 10);
    this.row = Math.floor(Math.random() * 10);
  }
}

const treasure = new Treasure(0, 0);
treasure.setRandomPosition();

function drawTreasure() {
  const treasureImg = new Image();
  treasureImg.src = 'images/treasure.png';

  treasureImg.addEventListener('load', () => {
    context.drawImage(
      treasureImg,
      treasure.col * SQUARE_WIDTH,
      treasure.row * SQUARE_WIDTH,
      50,
      50
    );
  });
}

// Iteration 5
window.addEventListener('keydown', event => {
  event.preventDefault();

  switch (event.keyCode) {
    case 37:
      player.moveLeft();
      break;
    case 38:
      player.moveUp();
      break;
    case 39:
      player.moveRight();
      break;
    case 40:
      player.moveDown();
      break;
  }

  if (player.col === treasure.col && player.row === treasure.row) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    treasure.setRandomPosition();
    drawEverything();
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  drawEverything();
});

function drawEverything() {
  drawGrid();
  drawPlayer();
  drawTreasure();
}

drawEverything();
