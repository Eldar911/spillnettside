// board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

// food
let foodX;
let foodY;

let gameOver = false;

// Restart button
let restartButton;

// Variable to store the interval ID
let intervalId;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", restartGame);
    // Set the initial position of the restart button to be centered
    centerRestartButton();

    placeFood();
    document.addEventListener("keyup", changeDirection);

    // Set the initial interval
    intervalId = setInterval(update, 1000 / 10);
}

function restartGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    placeFood();
    gameOver = false;

    restartButton.style.display = "none";

    // Clear existing interval before setting a new one
    clearInterval(intervalId);

    // Set a new interval
    intervalId = setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    if (snakeX < 0 || snakeX > cols * blockSize - 1 || snakeY < 0 || snakeY > rows * blockSize - 1) {
        gameOver = true;
        showRestartButton();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            showRestartButton();
        }
    }
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    if (e.code === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}

function showRestartButton() {
    restartButton.style.display = "block";
    // Center the restart button after it's displayed
    centerRestartButton();
    clearInterval(intervalId);
}

function centerRestartButton() {
    const centerX = (board.width - restartButton.offsetWidth) / 2;
    const centerY = (board.height - restartButton.offsetHeight) / 2;
    restartButton.style.position = "absolute";
    restartButton.style.left = centerX + "px";
    restartButton.style.top = centerY + "px";
}
