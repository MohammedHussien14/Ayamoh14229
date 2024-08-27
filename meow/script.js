const bird = document.getElementById("bird");
const pipeTop = document.getElementById("pipe-top");
const pipeBottom = document.getElementById("pipe-bottom");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

let birdTop = 250;
let birdSpeed = 0;
let gravity = 0.5;
let pipeSpeed = 2;
let gameRunning = true;
let score = 0;

// Game Initialization
function initGame() {
    birdTop = 250;
    birdSpeed = 0;
    gameRunning = true;
    score = 0;
    scoreDisplay.textContent = score;
    bird.style.top = birdTop + "px";
    resetPipes();
    restartButton.style.display = "none";
    requestAnimationFrame(gameLoop);
}

// Bird Movement and Game Logic
function gameLoop() {
    if (!gameRunning) return;

    // Bird gravity effect
    birdSpeed += gravity;
    birdTop += birdSpeed;
    bird.style.top = birdTop + "px";

    // Pipe movement
    const pipeLeft = pipeTop.offsetLeft - pipeSpeed;
    pipeTop.style.left = pipeLeft + "px";
    pipeBottom.style.left = pipeLeft + "px";

    // Check for collisions
    if (checkCollision()) {
        gameRunning = false;
        alert(`Game Over! Your score: ${score}.`);
        restartButton.style.display = "block";
        return;
    }

    // Increase score and reset pipes when they move out of view
    if (pipeLeft < -60) {
        score+=10 ;
        scoreDisplay.textContent = score;
        resetPipes();
    }

    requestAnimationFrame(gameLoop);
}

// Check for collision
function checkCollision() {
    const birdRect = bird.getBoundingClientRect();
    const pipeTopRect = pipeTop.getBoundingClientRect();
    const pipeBottomRect = pipeBottom.getBoundingClientRect();

    if (
        birdRect.right > pipeTopRect.left &&
        birdRect.left < pipeTopRect.right &&
        (birdRect.top < pipeTopRect.bottom || birdRect.bottom > pipeBottomRect.top)
    ) {
        return true;
    }

    // Check if the bird hits the top or bottom of the game container
    if (birdRect.top <= 0 || birdRect.bottom >= gameContainer.offsetHeight) {
        return true;
    }

    return false;
}

// Reset pipes to the right side of the screen with a random gap
function resetPipes() {
    const gap = 150;
    const minHeight = 100;
    const maxHeight = gameContainer.offsetHeight - gap - minHeight;

    const topPipeHeight = Math.floor(Math.random() * maxHeight) + minHeight;
    const bottomPipeHeight = gameContainer.offsetHeight - topPipeHeight - gap;

    pipeTop.style.height = topPipeHeight + "px";
    pipeBottom.style.height = bottomPipeHeight + "px";
    pipeTop.style.left = "400px";
    pipeBottom.style.left = "400px";
}

// Bird Flap
function flap() {
    birdSpeed = -8;
}

// Event listeners for keyboard and touch controls
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        flap();
    }
});

gameContainer.addEventListener("touchstart", () => {
    flap();
});

// Restart button functionality
restartButton.addEventListener("click", initGame);

// Start the game for the first time
initGame();
