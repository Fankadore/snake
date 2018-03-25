"use strict";

const update = function() {
    snake.move();

    if (!isPageHidden()) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.draw();
        food.draw();
    }
};

const gameOver = function() {
    gameOn = false;
    clearInterval(gameLoop);
    let score = snake.body.length - 3;
    console.log("You scored " + score + " points!");
};

const gameStart = (function() {
    if (gameOn) {
        gameOver();
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);

    snake = new Snake();
    food = new Food();
    gameLoop = setInterval(update, FRAMERATE);
    gameOn = true;
})();