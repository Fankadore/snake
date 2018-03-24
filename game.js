"use strict";

let snake, food, gameLoop, gameOn;

// Check if window is current tab
function isPageHidden(){
    return document.hidden || document.msHidden || document.webkitHidden || document.mozHidden;
}

// Game Loop
function update() {
    snake.move();

    if (!isPageHidden()) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.draw();
        food.draw();
    }
}

function gameStart() {
    if (gameOn) {
        gameOver();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake = new Snake();
    food = new Food();
    gameLoop = setInterval(update, FRAMERATE);
    gameOn = true;
}

function gameOver() {
    gameOn = false;
    clearInterval(gameLoop);
    let score = snake.body.length - 3;
    console.log("You scored " + score + " points!");
}


// Create Canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
canvas.setAttribute("width", WIDTH);
canvas.setAttribute("height", HEIGHT);
document.querySelector(".game-window").appendChild(canvas);

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

gameStart();