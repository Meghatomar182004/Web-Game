const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
let paddleWidth = 150;
let paddleHeight = 20;
let paddleX = (canvas.width - paddleWidth) / 2;

let boxX = Math.random() * (canvas.width - 30);
let boxY = 0;
let boxSize = 30;

let score = 0;

// Handle keypress
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
}

// Draw functions
function drawPaddle() {
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
}

function drawBox() {
    ctx.fillStyle = "red";
    ctx.fillRect(boxX, boxY, boxSize, boxSize);
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#333";
    ctx.fillText("Score: " + score, 20, 30);
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPaddle();
    drawBox();
    drawScore();

    // Move box
    boxY += 5;

    // Move paddle
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 10;
    }
    if (leftPressed && paddleX > 0) {
        paddleX -= 10;
    }

    // Check for collision
    if (
        boxY + boxSize >= canvas.height - paddleHeight - 10 &&
        boxX + boxSize >= paddleX &&
        boxX <= paddleX + paddleWidth
    ) {
        score++;
        resetBox();
    }

    // Reset box if missed
    if (boxY > canvas.height) {
        alert("Game Over! Your score: " + score);
        document.location.reload();
    }

    requestAnimationFrame(gameLoop);
}

function resetBox() {
    boxX = Math.random() * (canvas.width - boxSize);
    boxY = 0;
}

gameLoop();
