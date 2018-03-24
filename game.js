"use strict";

const canvas = document.querySelector('#game-window');
canvas.setAttribute("width", WIDTH);
canvas.setAttribute("height", HEIGHT);
const ctx = canvas.getContext('2d');

const snake = new Snake();

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

function update() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    snake.update();
}
setInterval(update, FRAMERATE);