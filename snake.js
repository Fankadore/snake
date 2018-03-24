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
    this.grow = false;
    this.draw();
}

Snake.prototype.move = function() {
    let bodyLength = this.body.length;

    // Check if Body should Grow
    if (this.grow) {
        let tail = this.body[bodyLength - 1];
        this.body.push(new Body(tail.x, tail.y));
        this.grow = false;
    }

    // Move Body
    for (let i = bodyLength - 1; i > 0; i--) {
        this.body[i].x = this.body[i-1].x;
        this.body[i].y = this.body[i-1].y;
    }

    // Move Head
    let head = this.body[0];
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
}

Snake.prototype.draw = function() {
    ctx.fillStyle = this.colour;
    this.body.forEach(function(currentBody) {
        ctx.fillRect(currentBody.x * TILE_SIZE, currentBody.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    });
}

Snake.prototype.update = function() {
    this.move();
    this.draw();
}