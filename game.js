"use strict";

// Setup Canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
canvas.setAttribute("width", WIDTH);
canvas.setAttribute("height", HEIGHT);

// Create Canvas
const gameWindow = document.querySelector("#game-window");
gameWindow.appendChild(canvas);

// Create Player
const snake = new Snake();

let foodTimer = 0;
let food = null;

// Player Inputs
window.onkeydown = function(e) {
    //console.log(e.keyCode);
    if (e.keyCode === 37 || e.keyCode === 65) {         // left arrow or A
        e.preventDefault();
        if (snake.direction !== 'right') {
            snake.newDirection = 'left';
        }
    }
    else if (e.keyCode === 39 || e.keyCode === 68) {    // right arrow or D
        e.preventDefault();
        if (snake.direction !== 'left') {
            snake.newDirection = 'right';
        }
    }
    else if (e.keyCode === 38 || e.keyCode === 87) {    // up arrow or W
        e.preventDefault();
        if (snake.direction !== 'down') {
            snake.newDirection = 'up';
        }
    }
    else if (e.keyCode === 40 || e.keyCode === 83) {    // down arrow or S
        e.preventDefault();
        if (snake.direction !== 'up') {
            snake.newDirection = 'down';
        }
    }
}

// Game Loop
function update() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    snake.update();
    
    if (food) {
        food.draw();
    }

    if (!food) {
        foodTimer += FRAMERATE;
        if (foodTimer > FOOD_RESETRATE) {
            let randomX = Math.floor(Math.random() * (GAME_COLUMNS + 1));
            let randomY = Math.floor(Math.random() * (GAME_ROWS + 1));
            food = new Food(randomX, randomY);
            foodTimer = 0;
        }
    }

}

function gameStart() {
    setInterval(update, FRAMERATE);
}

// Game Over
function gameOver(score) {
    clearInterval(update);
    console.log("You scored " + score + " points!");
}

// Run the Game
gameStart();