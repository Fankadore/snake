"use strict";

let snake = null;
let food = null;
let gameOn = false;

function gameStart() {
    Config.setConfigs();
    canvas.setAttribute("width", Config.width);
    canvas.setAttribute("height", Config.height);
    snake = new Snake();
    food = new Food();
    gameOn = true;
}

function gameOver() {
    gameOn = false;
}