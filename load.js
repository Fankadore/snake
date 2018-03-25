"use strict";

let TILE_SIZE = 32;
let WIDTH = (document.body.clientWidth / 2) - ((document.body.clientWidth / 2) % TILE_SIZE);
let HEIGHT = document.body.clientHeight - (document.body.clientHeight % TILE_SIZE);
let GAME_COLUMNS = Math.floor(WIDTH / TILE_SIZE) - 1;
let GAME_ROWS = Math.floor(HEIGHT / TILE_SIZE) - 1;

const FRAMERATE = 1000/1;       // updates per second (ms)
const START_X = 5;              // x position for snake head to start (grid)
const START_Y = 5;              // y position for snake head to start (grid)

// Check if window is current tab
function isPageHidden(){
    return document.hidden || document.msHidden || document.webkitHidden || document.mozHidden;
}

const canvas = document.querySelector(".game-window");
const ctx = canvas.getContext("2d");
let snake, food, gameLoop, gameOn;

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
};