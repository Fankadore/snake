"use strict";

function isPageHidden(){    // Check if window is current tab
    return document.hidden || document.msHidden || document.webkitHidden || document.mozHidden;
}
function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}

// Settings
const Config = {};
Config.setConfigs = function() {
    let maxWidth = document.body.clientWidth / 2;
    let maxHeight = document.body.clientHeight;

    // Set Tile Size
    if (inputTileSize.value) {  // User has set Tile Size
        Config.tileSize = clamp(Math.floor(inputTileSize.value), 8, 128);
        let columns = Math.floor(maxWidth / Config.tileSize);
        if (columns < 3) {
            Config.tileSize = clamp(Math.floor(maxWidth / 3), 8, 128);
            maxWidth = Config.tileSize * 3;
        }
        let rows = Math.floor(maxHeight / Config.tileSize);
        if (rows < 3) {
            Config.tileSize = clamp(Math.floor(maxHeight / 3), 8, 128);
            maxHeight = Config.tileSize * 3;
        }
        inputTileSize.value = Config.tileSize;
    }
    else if (inputColumns.value || inputRows.value) {   // User has set Columns or Rows
        if (!inputRows.value) {
            let columns = clamp(Math.floor(inputColumns.value), 3, 24);
            Config.tileSize = clamp(Math.floor(maxWidth / columns), 8, 128);
        }
        else if (!inputColumns.value) {
            let rows = clamp(Math.floor(inputRows.value), 3, 24);
            Config.tileSize = clamp(Math.floor(maxHeight / rows), 8, 128);
        }
        else {
            let columns = clamp(Math.floor(inputColumns.value), 3, 24);
            let rows = clamp(Math.floor(inputRows.value), 3, 24);
            if (maxWidth / columns <= maxHeight / rows) {
                Config.tileSize = clamp(Math.floor(maxWidth / columns), 8, 128);
            }
            else {
                Config.tileSize = clamp(Math.floor(maxHeight / rows), 8, 128);
            }
            maxWidth = columns * Config.tileSize;
            maxHeight = rows * Config.tileSize;
        }
    }
    else {  // All settings are Auto
        Config.tileSize = clamp(Math.floor(maxWidth / 12), 8, 128);
    }

    Config.width = maxWidth - (maxWidth % Config.tileSize);
    Config.height = maxHeight - (maxHeight % Config.tileSize);
    Config.columns = Math.floor(Config.width / Config.tileSize);
    Config.rows = Math.floor(Config.height / Config.tileSize);
    
    Config.framerate = 1000/60;     // updates per second (ms)
    Config.startX = 2;              // x position for snake head to start (grid)
    Config.startY = 0;              // y position for snake head to start (grid)
    Config.showNumbers = false;
};

// Inputs
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

// Game Loop
let tickTimer = 0;
function update() {
    // Game Over
    if (!gameOn) {
        ctx.fillStyle = "#000000";
        ctx.font = "32px Georgia";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        ctx.font = "28px Georgia";
        ctx.fillText("You scored " + (snake.body.length - 3) + " points!", canvas.width / 2, (canvas.height / 2) + 32);
        return;
    }

    // Game is in Play
    tickTimer += Config.framerate;
    if (tickTimer >= 1000 / snake.speed) {
        snake.move();

        if (!isPageHidden()) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            snake.draw();
            food.draw();
        }
        tickTimer = 0;
    }
}

gameStart();
setInterval(update, Config.framerate);