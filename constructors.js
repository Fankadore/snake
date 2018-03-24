"use strict";

function Body(x, y) {
    this.x = x;
    this.y = y;
}

function Snake() {
    this.colour = '#00ff00';
    this.speed = 1;
    this.direction = 'right';
    this.newDirection = this.direction;
    this.body = [new Body(START_X, START_Y), new Body(START_X - 1, START_Y), new Body(START_X - 2, START_Y)];
    this.draw();
}

Snake.prototype.move = function() {
    let bodyLength = this.body.length;
    let head = this.body[0];
    let tail = this.body[bodyLength - 1];
    let retainTailX = tail.x;
    let retainTailY = tail.y;

    // Move Body
    for (let i = bodyLength - 1; i > 0; i--) {
        this.body[i].x = this.body[i-1].x;
        this.body[i].y = this.body[i-1].y;
    }

    // Move Head
    if (this.newDirection === 'left') {
        head.x = (head.x - 1 < 0) ? GAME_COLUMNS : head.x - 1;
    }
    else if (this.newDirection === 'right') {
        head.x = (head.x + 1 > GAME_COLUMNS) ? 0 : head.x + 1;
    }
    else if (this.newDirection === 'up') {
        head.y = (head.y - 1 < 0) ? GAME_ROWS : head.y - 1;
    }
    else if (this.newDirection === 'down') {
        head.y = (head.y + 1 > GAME_ROWS) ? 0 : head.y + 1;
    }
    this.direction = this.newDirection;

    // Check Collision Head with Body
    for (let currentBody of this.body) {
        if (head !== currentBody && head.x === currentBody.x && head.y === currentBody.y) {
            return gameOver();
        }
    }

    // Check Collision Head with Food
    if (head.x === food.x && head.y === food.y) {
        this.body.push(new Body(retainTailX, retainTailY));
        food.move();
    }
};

Snake.prototype.checkCollision = function(x, y) {
    for (let currentBody of this.body) {
        if (currentBody.x === x && currentBody.y === y) {
            return true;
        }
    }
    return false;
};

Snake.prototype.draw = function() {
    ctx.fillStyle = this.colour;
    this.body.forEach(function(currentBody) {
        ctx.fillRect(currentBody.x * TILE_SIZE, currentBody.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    });
};


function Food() {
    this.colour = '#ff0000';
    this.move();
    this.draw();
}

Food.prototype.move = function() {
    let randomX, randomY;
    do {
        randomX = Math.floor(Math.random() * (GAME_COLUMNS + 1));
        randomY = Math.floor(Math.random() * (GAME_ROWS + 1));
    } while (snake.checkCollision(randomX, randomY) === true);
    this.x = randomX;
    this.y = randomY;
}

Food.prototype.draw = function() {
    ctx.fillStyle = this.colour;
    ctx.fillRect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
};